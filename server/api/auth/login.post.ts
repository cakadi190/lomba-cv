import { loginSchema } from "~~/app/composables/auth/login";
import prisma from "~~/lib/prisma";
import { setAuthCookie, signToken, verifyPassword } from "~~/server/utils/auth";

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
      throw createError({
        statusCode: 400,
        statusMessage: "Validasi gagal. Silakan periksa input Anda.",
        data: {
          errors: formattedErrors,
        },
      });
    }

    const { email, password, remember } = validationResult.data;
    const isRemembered = !!remember;

    // Find user in database
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: "Kredensial salah atau terjadi gangguan server.",
      });
    }

    // Verify password
    const isPasswordValid = verifyPassword(password, user.password);
    if (!isPasswordValid) {
      throw createError({
        statusCode: 401,
        statusMessage: "Kredensial salah atau terjadi gangguan server.",
      });
    }

    // Sign JWT token
    const expiresInSeconds = isRemembered ? 30 * 24 * 60 * 60 : 24 * 60 * 60;
    const token = signToken(
      { userId: user.id, email: user.email },
      expiresInSeconds,
    );

    // Set cookie
    setAuthCookie(event, token, isRemembered);

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
    console.error(error);
    if (error && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
