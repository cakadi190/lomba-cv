import { db } from "../../../prisma/db";
import { route } from "../../../lib/route";

export default defineSitemapEventHandler(async () => {
  const portfolios = await db.orm.portfolios
    .select("name", "slug", "updatedAt", "image", "galleries")
    .all();

  const portfolioUrls = portfolios.map((portfolio) => {
    const images = [];

    if (portfolio.image) {
      images.push({
        loc: portfolio.image,
        title: portfolio.name,
      });
    }

    if (portfolio.galleries && portfolio.galleries.length > 0) {
      for (const gallery of portfolio.galleries) {
        if (gallery.imageUrl) {
          images.push({
            loc: gallery.imageUrl,
            caption: gallery.description || undefined,
            title: portfolio.name,
          });
        }
      }
    }

    return {
      loc: route("portfolios.show", portfolio.slug),
      lastmod: portfolio.updatedAt,
      gzip: true,
      images: images.length > 0 ? images : undefined,
    };
  });

  const posts = await db.orm.posts
    .where({ published: true })
    .select("title", "slug", "updatedAt", "coverImage")
    .all();

  const postUrls = posts.map((post) => ({
    loc: route("blog.show", post.slug),
    lastmod: post.updatedAt,
    gzip: true,
    images: post.coverImage
      ? [{ loc: post.coverImage, title: post.title }]
      : undefined,
  }));

  return [...portfolioUrls, ...postUrls];
});
