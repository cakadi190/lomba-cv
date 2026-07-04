import { route } from "~/lib/route";
import prisma from "~~/lib/prisma";

export default defineSitemapEventHandler(async () => {
  const portfolios = await prisma.portfolio.findMany({
    select: {
      name: true,
      slug: true,
      updated_at: true,
      image: true,
      galleries: {
        select: {
          imageUrl: true,
          description: true,
        },
      },
    },
  });

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
      lastmod: portfolio.updated_at,
      images: images.length > 0 ? images : undefined,
    };
  });
});
