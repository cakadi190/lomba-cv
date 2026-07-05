import { logger } from "~~/lib/pino";
import { loginSchema } from "~~/lib/zod/schemas/login";
import { Auth } from "~~/server/lib/facades/auth";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    const validationResult = loginSchema.safeParse(body);
    if (!validationResult.success) {
      const formattedErrors: Record<string, string> = {};
      for (const issue of validationResult.error.issues) {
        const path = issue.path[0] as string;
        if (!formattedErrors[path]) {
          formattedErrors[path] = issue.message;
        }
      }
      logger.warn({ errors: formattedErrors }, "Validasi login gagal");
      throw createError({
        statusCode: 400,
        statusMessage: "Validasi gagal. Silakan periksa input Anda.",
        data: {
          errors: formattedErrors,
        },
      });
    }

    const { email, password, remember, token } = validationResult.data;
    const isRemembered = !!remember;

    const verification = await verifyTurnstileToken(token, event);
    if (!verification.success) {
      logger.warn(
        { email, errorCodes: verification["error-codes"] },
        "Validasi Turnstile gagal",
      );
      throw createError({
        statusCode: 400,
        statusMessage: "Validasi gagal. Silakan periksa input Anda.",
        data: {
          errors: {
            token: "Verifikasi anti-bot gagal. Silakan coba lagi.",
          },
        },
      });
    }

    const auth = Auth.guard(event);
    const loginSuccess = await auth.attempt({ email, password }, isRemembered);

    if (!loginSuccess) {
      logger.warn({ email }, "Percobaan login gagal: Kredensial salah");
      throw createError({
        statusCode: 401,
        statusMessage: "Kredensial salah.",
      });
    }

    const user = await auth.user();
    if (!user) {
      throw createError({
        statusCode: 500,
        statusMessage: "Internal Server Error",
      });
    }

    logger.info({ userId: user.id, email: user.email }, "User berhasil login");

    return {
      code: 200,
      message: "Logged in successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  } catch (error) {
    logger.error({ err: error }, "Terjadi kesalahan pada proses login");
    if (error && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
