import { route } from "~/lib/route";
import prisma from "~~/lib/prisma";

export default defineSitemapEventHandler(async () => {
  const portfolios = await prisma.portfolio.findMany({
    select: {
      slug: true,
      updated_at: true,
    },
  });

  return portfolios.map((portfolio) => ({
    loc: route("portfolios.show", portfolio.slug),
    lastmod: portfolio.updated_at,
  }));
});
