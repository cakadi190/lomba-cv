import { setResponseHeader } from "h3";

/**
 * ipx's Node bridge (srvx/node's toNodeHandler -> h3's fromNodeMiddleware,
 * see @nuxt/image's server/routes/_ipx.js) drops every header ipx sets
 * internally (content-type, etag, cache-control, ...) under Bun — the
 * response always falls back to application/octet-stream. Browsers refuse
 * to render an <img> as SVG unless its Content-Type is image/svg+xml, so
 * every SVG served through nuxt-img/_ipx shows as a broken image.
 *
 * Fixed here instead of patching ipx/h3: this hook runs on the real
 * response event right before it's sent, bypassing the broken bridge.
 */
export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook("beforeResponse", (event) => {
    if (event.path?.startsWith("/_ipx/") && event.path.includes(".svg")) {
      setResponseHeader(event, "content-type", "image/svg+xml");
    }
  });
});
