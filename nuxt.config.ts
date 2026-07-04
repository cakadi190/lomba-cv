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
  ],

  colorMode: {
    preference: "system",
    fallback: "light",
    attribute: "data-bs-theme",
    classSuffix: "",
    storageKey: "nuxt-color-mode",
  },

  vite: {
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

  compatibilityDate: "2024-07-06",
});
