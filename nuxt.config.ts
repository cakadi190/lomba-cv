import { defineNuxtConfig } from "nuxt/config";
import { route } from "./lib/route";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: process.env.NODE_ENV === "development",

    timeline: {
      enabled: process.env.NODE_ENV === "development",
    },
  },

  runtimeConfig: {
    public: {
      baseUrl: process.env.APP_URL ?? "http://localhost:3000",
    },
    mail: {
      mailer: process.env.MAIL_MAILER || "smtp",
      host: process.env.MAIL_HOST || "127.0.0.1",
      port: Number(process.env.MAIL_PORT || 2525),
      username: process.env.MAIL_USERNAME || "",
      password: process.env.MAIL_PASSWORD || "",
      encryption: process.env.MAIL_ENCRYPTION || "",
      fromAddress: process.env.MAIL_FROM_ADDRESS || "hello@example.com",
      fromName: process.env.MAIL_FROM_NAME || "Lomba CV",
    },
    turnstile: {
      secretKey: process.env.NUXT_TURNSTILE_SECRET_KEY || "",
    },
    redis: {
      url: process.env.REDIS_URL || "",
    },
  },

  turnstile: {
    siteKey: process.env.NUXT_TURNSTILE_SITE_KEY || "",
    addValidateEndpoint: true,
  },

  routeRules: {
    "/portofolio/**": { prerender: false },

    "/admin/auth/**": { appLayout: "auth" },
    "/admin/**": { appLayout: "admin" },
  },

  css: ["~/assets/scss/app.scss"],

  nitro: {
    prerender: {
      crawlLinks: false,
      failOnError: false,
      ignore: ["/_ipx", "/_ipx/**"],
    },
  },

  modules: [
    "@vueuse/motion/nuxt",
    "@nuxt/image",
    "nuxt-swiper",
    "nuxt-svgo",
    "dayjs-nuxt",
    "@vesp/nuxt-fontawesome",
    "@nuxtjs/color-mode",
    "@nuxt/icon",
    [
      "@nuxtjs/google-fonts",
      {
        families: {
          Signika: true,
          "Fira Code": true,
          Merriweather: true,
        },
        download: false,
        base64: false,
        display: "swap",
        preload: true,
        useStylesheet: true,
        overwriting: true,
        inject: true,
      },
    ],
    "@nuxtjs/sitemap",
    "nuxt-skew-protection",
    "@nuxtjs/turnstile",
  ],

  image: {
    inject: true,
    quality: 80,
    format: ["webp", "avif"],
    screens: {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      "2xl": 1536,
    },
    domains: ["cakadi.eu.org", "cdn.cakadi.eu.org", "images.unsplash.com"],
    densities: [1, 2],
    alias: {
      cdn: "cdn.cakadi.eu.org",
      unsplash: "https://images.unsplash.com",
    },
    cloudflare: {
      baseURL: "https://cdn.cakadi.eu.org",
    },
  },

  site: {
    url: "https://v3.masadi.net",
  },

  sitemap: {
    hostname: "https://v3.masadi.net",
    exclude: ["/admin/**"],
    autoAlternativeAliases: true,
    autoI18n: true,
    sources: [route("api.sitemap.urls")],
    autoLastmod: true,
  },

  colorMode: {
    preference: "system",
    fallback: "light",
    dataValue: "bs-theme",
    classSuffix: "",
    storageKey: "nuxt-color-mode",
  },

  icon: {
    serverBundle: "remote",
  },

  vite: {
    build: {
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        onwarn(warning, warn) {
          if (
            warning.code === "INVALID_ANNOTATION" ||
            warning.code === "PLUGIN_TIMINGS" ||
            warning.code === "CSS_IMPORT_ORDER"
          ) {
            return;
          }
          warn(warning);
        },
      },
    },
    optimizeDeps: {
      include: [
        "@vue/devtools-core",
        "@vue/devtools-kit",
        "bootstrap",
        "date-fns",
        "dayjs", // CJS
        "dayjs/locale/id", // CJS
        "dayjs/plugin/relativeTime", // CJS
        "dayjs/plugin/updateLocale", // CJS
        "dayjs/plugin/utc", // CJS
        "jquery",
        "swiper/element/bundle",
        "swiper/modules",
      ],
    },
    css: {
      preprocessorOptions: {
        scss: {
          quietDeps: true,
          silenceDeprecations: [
            "import",
            "global-builtin",
            "color-functions",
            "if-function",
          ],
        },
      },
    },
  },

  sourcemap: false,

  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: "2026-07-05",
});
