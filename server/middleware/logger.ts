import { logger } from "~~/lib/pino";

export default defineEventHandler((event) => {
  const method = event.method;
  const path = event.path;

  // Hanya log request yang diarahkan ke REST API (/api/)
  if (!path.startsWith("/api/")) return;

  const startTime = Date.now();

  logger.info({
    msg: `[API Request] ${method} ${path}`,
    method,
    path,
  });

  // Pasang listener pada event finish response
  event.node.res.on("finish", () => {
    const duration = Date.now() - startTime;
    const statusCode = event.node.res.statusCode;

    const payload = {
      msg: `[API Response] ${method} ${path} - ${statusCode} (${duration}ms)`,
      method,
      path,
      statusCode,
      duration,
    };

    if (statusCode >= 500) {
      logger.error(payload);
    } else if (statusCode >= 400) {
      logger.warn(payload);
    } else {
      logger.info(payload);
    }
  });
});
