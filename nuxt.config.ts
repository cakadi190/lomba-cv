// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },

  css: [
    '~/assets/scss/app.scss',
  ],

  nitro: {
    prerender: {
      crawlLinks: true,
      failOnError: false, 
    },
  },

  modules: [
    '@vueuse/motion/nuxt',
    "@nuxt/image",
    'nuxt-swiper',
    "nuxt-svgo",
    'dayjs-nuxt',
    '@vesp/nuxt-fontawesome',
    '@nuxtjs/color-mode',
    'nuxt-icon',
    ["@nuxtjs/google-fonts", {
      families: {
        Signika: true,
        'Fira Code': true,
        Merriweather: true
      },
      download: true,
      base64: true,
      display: 'swap',
      preload: true,
      useStylesheet: true,
      overwriting: true,
      inject: true,
    }]
  ],

  compatibilityDate: '2024-07-06',
})