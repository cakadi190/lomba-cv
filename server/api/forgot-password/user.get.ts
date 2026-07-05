import { logger } from "~~/lib/pino";
import prisma from "~~/lib/prisma";
import { Cache } from "~~/server/lib/facades/cache";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const email = query.email as string | undefined;
    const token = query.token as string | undefined;

    if (!email || !token) {
      throw createError({
        statusCode: 400,
        statusMessage: "Parameter email dan token wajib diisi.",
      });
    }

    // Verify token in cache
    const cacheKey = `password_reset:${token}`;
    const cachedEmail = await Cache.get<string>(cacheKey);

    if (!cachedEmail || cachedEmail !== email) {
      logger.warn(
        { email, token },
        "Mendapatkan kredensial gagal: Token tidak valid atau kedaluwarsa",
      );
      throw createError({
        statusCode: 400,
        statusMessage:
          "Tautan atur ulang kata sandi tidak valid atau telah kedaluwarsa.",
      });
    }

    // Get user info
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        name: true,
        email: true,
      },
    });

    if (!user) {
      logger.warn(
        { email },
        "User terasosiasi dengan token tidak ditemukan di database",
      );
      throw createError({
        statusCode: 404,
        statusMessage: "Pengguna tidak ditemukan.",
      });
    }

    return {
      code: 200,
      user: {
        name: user.name,
        email: user.email,
      },
    };
  } catch (error) {
    logger.error(
      { err: error },
      "Terjadi kesalahan pada pengambilan user info reset password",
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
