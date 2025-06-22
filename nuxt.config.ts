// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  modules: ['@nuxt/icon', '@nuxtjs/tailwindcss', '@nuxt/ui', '@nuxt/image', '@pinia/nuxt'],
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  app: {
    head: {
      title: 'Omni app',
      titleTemplate: 'Omni %s',
      meta: [{ name: 'description', content: 'Все в одном...' }],
    },
  },
});
