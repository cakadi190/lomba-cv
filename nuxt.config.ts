import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },

  css: ["~/assets/scss/app.scss"],

  nitro: {
    prerender: {
      crawlLinks: true,
      failOnError: false,
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
        download: true,
        base64: true,
        display: "swap",
        preload: true,
        useStylesheet: true,
        overwriting: true,
        inject: true,
      },
    ],
    "@nuxtjs/sitemap",
    "nuxt-skew-protection",
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
    densities: [1, 2, 3],
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
    sources: ["/api/__sitemap__/urls"],
    autoLastmod: true,
  },

  colorMode: {
    preference: "system",
    fallback: "light",
    attribute: "data-bs-theme",
    classSuffix: "",
    storageKey: "nuxt-color-mode",
  },

  vite: {
    build: {
      chunkSizeWarningLimit: 2000,
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

  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: "2026-07-05",
});
