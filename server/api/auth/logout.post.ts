import { deleteAuthCookie } from "~~/server/utils/auth";

export default defineEventHandler((event) => {
  try {
    deleteAuthCookie(event);

    return {
      code: 200,
      message: "Logged out successfully",
    };
  } catch (error) {
    console.error(error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
