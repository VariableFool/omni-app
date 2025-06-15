// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxt/icon',
    '@nuxtjs/tailwindcss',
    '@nuxt/ui',
    '@nuxt/image',
  ],
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
});