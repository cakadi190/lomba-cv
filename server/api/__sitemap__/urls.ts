import { db } from "../../../prisma/db";
import { route } from "../../../lib/route";

export default defineSitemapEventHandler(async () => {
  const portfolios = await db.orm.portfolios
    .select("name", "slug", "updatedAt", "image", "galleries")
    .all();

  return portfolios.map((portfolio) => {
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
});
