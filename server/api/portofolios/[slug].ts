import prisma from "~~/lib/prisma";

export default defineEventHandler(async (event) => {
	try {
		const slug = getRouterParam(event, "slug");
		const portfolios = await prisma.portfolios.findMany({
			where: { slug },
		});

		if (!portfolios || portfolios.length === 0) {
			return { code: 404, message: "Educations not found" };
		}

		return { code: 200, data: portfolios };
	} catch (error) {
		console.error(error);
		throw createError({
			statusCode: 500,
			statusMessage: "Internal Server Error",
		});
	}
});
