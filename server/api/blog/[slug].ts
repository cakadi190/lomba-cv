import { logger } from "~~/lib/pino";
import { db } from "~~/prisma/db";

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");
  try {
    const post = await db.orm.posts.where({ slug, published: true }).first();

    if (!post) {
      throw createError({
        statusCode: 404,
        statusMessage: "Post not found",
      });
    }

    const categoryIds = (post.categoryIds ?? []).map((id) => String(id));
    const categories =
      categoryIds.length > 0
        ? (await db.orm.post_categories.all()).filter((category) =>
            categoryIds.includes(String(category._id)),
          )
        : [];

    return { code: 200, data: { ...post, categories } };
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "statusCode" in error &&
      error.statusCode === 404
    ) {
      throw error;
    }
    logger.error(
      { err: error, slug },
      "Terjadi kesalahan saat mengambil data blog berdasarkan slug",
    );
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
