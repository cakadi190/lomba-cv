import crypto from "node:crypto";
import { logger } from "~~/lib/pino";
import prisma from "~~/lib/prisma";
import { forgotPasswordRequestSchema } from "~~/lib/zod/schemas/forgotPassword";
import { Cache } from "~~/server/lib/facades/cache";
import { Mail } from "~~/server/lib/facades/mail";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    const validationResult = forgotPasswordRequestSchema.safeParse(body);

    if (!validationResult.success) {
      const formattedErrors: Record<string, string> = {};
      for (const issue of validationResult.error.issues) {
        const path = issue.path[0] as string;
        if (!formattedErrors[path]) {
          formattedErrors[path] = issue.message;
        }
      }
      logger.warn(
        { errors: formattedErrors },
        "Validasi request forgot password gagal",
      );
      throw createError({
        statusCode: 422,
        statusMessage: "Validasi gagal. Silakan periksa input Anda.",
        data: {
          errors: formattedErrors,
        },
      });
    }

    const { email, token: turnstileToken } = validationResult.data;

    // Verify Turnstile
    const verification = await verifyTurnstileToken(turnstileToken, event);
    if (!verification.success) {
      logger.warn(
        { email, errorCodes: verification["error-codes"] },
        "Validasi Turnstile gagal pada request forgot password",
      );
      throw createError({
        statusCode: 422,
        statusMessage: "Validasi gagal. Silakan periksa input Anda.",
        data: {
          errors: {
            token: "Verifikasi anti-bot gagal. Silakan coba lagi.",
          },
        },
      });
    }

    // Check if user exists in database
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      logger.info(
        { email },
        "Forgot password request untuk email yang tidak terdaftar",
      );
      // Prevent user enumeration by returning success message
      return {
        code: 200,
        message:
          "Instruksi atur ulang kata sandi telah dikirim ke email Anda jika terdaftar.",
      };
    }

    // Generate secure token
    const token = crypto.randomBytes(32).toString("hex");

    // Store in Cache (1 hour TTL)
    await Cache.put(`password_reset:${token}`, email, 3600);

    const baseUrl = useRuntimeConfig().public.baseUrl;
    const resetUrl = `${baseUrl}/forgot-password/change?email=${encodeURIComponent(email)}&token=${token}`;

    logger.info(
      { email, token },
      "Reset token berhasil digenerate dan disimpan di Cache",
    );

    // Send reset email
    await Mail.to(email)
      .subject("Atur Ulang Kata Sandi Akun Lomba CV Anda")
      .template("forgot-password", {
        "Nama Pengguna": user.name,
        ResetUrl: resetUrl,
      })
      .send();

    logger.info({ email }, "Email atur ulang kata sandi berhasil dikirim");

    return {
      code: 200,
      message:
        "Instruksi atur ulang kata sandi telah dikirim ke email Anda jika terdaftar.",
    };
  } catch (error) {
    logger.error(
      { err: error },
      "Terjadi kesalahan pada request forgot password",
    );
    if (error && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
