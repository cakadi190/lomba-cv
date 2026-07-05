import { getQuery, getRequestHeaders, getRequestIP } from "h3";
import { logger } from "~~/lib/pino";
import { parseIpAddress } from "~~/lib/string";

export default defineEventHandler((event) => {
  const method = event.method;
  const path = event.path;

  // Hanya log request yang diarahkan ke REST API (/api/)
  if (!path?.startsWith("/api/")) return;

  const startTime = Date.now();
  const headers = getRequestHeaders(event);
  const rawIp =
    getRequestIP(event, { xForwardedFor: true }) ||
    event.node.req.socket.remoteAddress;
  const ip = parseIpAddress(rawIp);
  const query = getQuery(event);

  logger.info({
    msg: `[API Request] ${method}:${path}`,
    method,
    path,
    ip,
    userAgent: headers["user-agent"],
    query: Object.keys(query).length > 0 ? query : undefined,
  });

  // Pasang listener pada event finish response
  event.node.res.on("finish", () => {
    const duration = Date.now() - startTime;
    const statusCode = event.node.res.statusCode;
    const statusMessage = event.node.res.statusMessage;

    const payload = {
      msg:
        statusMessage && statusCode !== 404
          ? `[API Response:${statusCode}] ${method}:${path} - ${statusMessage} (${duration}ms)`
          : `[API Response:${statusCode}] ${method}:${path} (${duration}ms)`,
      method,
      path,
      statusCode,
      statusMessage,
      duration,
      ip,
      userAgent: headers["user-agent"],
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
