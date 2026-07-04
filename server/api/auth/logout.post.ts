export default defineEventHandler((event) => {
  try {
    deleteCookie(event, "auth_token", {
      path: "/",
    });

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
