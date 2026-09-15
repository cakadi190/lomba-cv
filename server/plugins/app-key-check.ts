import { getAppKeys } from "~~/server/lib/utils/keys";

export default defineNitroPlugin(() => {
  // Resolve the app key once at boot so a missing/invalid APP_KEY (which
  // would otherwise only surface later as "auth_token" cookies silently
  // failing to decrypt, i.e. everyone getting logged out) fails loudly here.
  getAppKeys();
});
