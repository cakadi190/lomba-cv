import { logger } from "~~/lib/pino";
import { db } from "~~/prisma/db";
import { Cache } from "~~/server/lib/facades/cache";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);

    const page = Math.max(1, parseInt(query?.page as string, 10) || 1);
    const perPage = Math.min(
      100,
      Math.max(1, parseInt(query?.perPage as string, 10) || 12),
    );
    const skip = (page - 1) * perPage || 0;

    const cacheKey = `posts:list:page:${page}:perPage:${perPage}`;

    return await Cache.remember(cacheKey, 3600, async () => {
      const posts = await db.orm.posts
        .where({ published: true })
        .orderBy({ publishedAt: -1 })
        .offset(skip)
        .limit(perPage)
        .all();

      const totalCount = (await db.orm.posts.where({ published: true }).all())
        .length;

      // Same application-level lookup pattern as /api/portofolios — categories
      // are referenced by `categoryIds: ObjectId[]` on the Post document.
      const allCategoryIds = new Set(
        posts.flatMap((p) => (p.categoryIds ?? []).map((id) => String(id))),
      );
      const categories =
        allCategoryIds.size > 0
          ? (await db.orm.post_categories.all()).filter((category) =>
              allCategoryIds.has(String(category._id)),
            )
          : [];
      const categoriesById = new Map(
        categories.map((category) => [String(category._id), category]),
      );

      const data = posts.map((post) => ({
        ...post,
        categories: (post.categoryIds ?? [])
          .map((id) => categoriesById.get(String(id)))
          .filter((category) => category !== undefined),
      }));

      const hasNextPage = skip + perPage < totalCount;
      const hasPrevPage = page > 1;

      return {
        code: 200,
        data,
        hasNextPage,
        hasPrevPage,
        totalPage: Math.ceil(totalCount / perPage),
        page,
        perPage,
        totalData: totalCount,
      };
    });
  } catch (error) {
    logger.error({ err: error }, "Terjadi kesalahan saat mengambil data blog");
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
