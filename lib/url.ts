/**
 * Menghasilkan URL absolut/penuh untuk path yang diberikan ala helper `url()` di Laravel.
 *
 * @param path - Path relatif atau URL absolut. Jika null/kosong, mengembalikan base URL.
 * @param parameters - Parameter tambahan. Jika array, digabung sebagai segmen path. Jika objek, digabung sebagai query string.
 * @param secure - Jika true, memaksa protokol HTTPS. Jika false, memaksa HTTP.
 * @returns URL final yang telah terformat.
 *
 * @example
 * url('user/profile')              // "http://localhost:3000/user/profile"
 * url('user', [1, 'edit'])         // "http://localhost:3000/user/1/edit"
 * url('search', { q: 'cv' })       // "http://localhost:3000/search?q=cv"
 * url('login', [], true)           // "https://localhost:3000/login"
 */
export const url = (
  path?: string | null,
  parameters: Record<string, unknown> | unknown[] = [],
  secure?: boolean | null,
) => {
  let baseUrl = "";
  try {
    const config = useRuntimeConfig();
    baseUrl =
      (config.public?.baseUrl as string) || (config.baseUrl as string) || "";
  } catch {
    // Silently ignore if called outside of Nuxt context
  }

  if (!baseUrl) {
    baseUrl = process.env.APP_URL || process.env.NEXT_PUBLIC_APP_URL || "";
  }

  if (!baseUrl && typeof window !== "undefined") {
    baseUrl = window.location.origin;
  }

  if (!baseUrl) {
    baseUrl = "http://localhost:3000";
  }

  baseUrl = baseUrl.replace(/\/+$/, "");

  const isAbsolute = path ? /^(https?:)?\/\//i.test(path) : false;
  let finalUrl = "";

  if (path) {
    if (isAbsolute) {
      finalUrl = path;
    } else {
      const cleanPath = path.startsWith("/") ? path : `/${path}`;
      finalUrl = `${baseUrl}${cleanPath}`;
    }
  } else {
    finalUrl = baseUrl;
  }

  let urlObj: URL;
  try {
    urlObj = new URL(finalUrl, "http://localhost");
  } catch {
    return finalUrl;
  }

  if (Array.isArray(parameters)) {
    if (parameters.length > 0) {
      const segments = parameters
        .filter((p) => p !== undefined && p !== null)
        .map((p) => encodeURIComponent(String(p)));

      if (segments.length > 0) {
        let currentPath = urlObj.pathname;
        if (!currentPath.endsWith("/")) {
          currentPath += "/";
        }
        currentPath += segments.join("/");
        urlObj.pathname = currentPath;
      }
    }
  } else if (parameters && typeof parameters === "object") {
    for (const [key, value] of Object.entries(parameters)) {
      if (value !== undefined && value !== null) {
        urlObj.searchParams.set(key, String(value));
      }
    }
  }

  if (secure === true) {
    urlObj.protocol = "https:";
  } else if (secure === false) {
    urlObj.protocol = "http:";
  }

  let result = urlObj.toString();

  // If path or baseUrl was protocol-relative and secure was not explicitly set, preserve protocol-relative
  if (secure === undefined || secure === null) {
    if (path?.startsWith("//")) {
      result = result.replace(/^https?:/, "");
    } else if (!isAbsolute && baseUrl.startsWith("//")) {
      result = result.replace(/^https?:/, "");
    } else if (!isAbsolute && !/https?:\/\//i.test(baseUrl)) {
      result = result.replace(/^https?:\/\/localhost/, "");
    }
  }

  return result;
};

export default url;
