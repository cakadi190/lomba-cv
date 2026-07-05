import { logger } from "~~/lib/pino";
import prisma from "~~/lib/prisma";
import { forgotPasswordChangeSchema } from "~~/lib/zod/schemas/forgotPassword";
import { Cache } from "~~/server/lib/facades/cache";
import { hashPassword } from "~~/server/lib/utils/auth";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    const validationResult = forgotPasswordChangeSchema.safeParse(body);

    if (!validationResult.success) {
      const formattedErrors: Record<string, string> = {};
      for (const issue of validationResult.error.issues) {
        const path = issue.path[0] as string;
        if (!formattedErrors[path]) {
          formattedErrors[path] = issue.message;
        }
      }
      logger.warn({ errors: formattedErrors }, "Validasi ubah password gagal");
      throw createError({
        statusCode: 422,
        statusMessage: "Validasi gagal. Silakan periksa input Anda.",
        data: {
          errors: formattedErrors,
        },
      });
    }

    const { email, token, password } = validationResult.data;

    // Verify token in cache
    const cacheKey = `password_reset:${token}`;
    const cachedEmail = await Cache.get<string>(cacheKey);

    if (!cachedEmail || cachedEmail !== email) {
      logger.warn(
        { email, token },
        "Ubah password gagal: Token tidak cocok atau kedaluwarsa",
      );
      throw createError({
        statusCode: 400,
        statusMessage:
          "Tautan atur ulang kata sandi tidak valid atau telah kedaluwarsa.",
      });
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      logger.warn(
        { email },
        "User tidak ditemukan saat mencoba mengubah password",
      );
      throw createError({
        statusCode: 404,
        statusMessage: "Pengguna tidak ditemukan.",
      });
    }

    // Update password in DB
    const hashedPassword = hashPassword(password);
    await prisma.user.update({
      where: { email },
      data: {
        password: hashedPassword,
      },
    });

    logger.info({ email }, "Kata sandi user berhasil diperbarui");

    // Remove token from cache
    await Cache.forget(cacheKey);

    return {
      code: 200,
      message: "Kata sandi Anda telah berhasil diubah. Silakan masuk kembali.",
    };
  } catch (error) {
    logger.error({ err: error }, "Terjadi kesalahan saat mengubah kata sandi");
    if (error && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
