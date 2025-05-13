// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@unocss/nuxt',
    'shadcn-nuxt',
    '@vueuse/nuxt',
    '@nuxt/eslint',
    '@nuxt/icon',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    'nuxt-authorization',
  ],

  authorization: {
    // 配置选项（可选）
    roles: {
      admin: ['manageUsers', 'managePosts'],
      user: ['viewProfile', 'editProfile'],
      guest: []
    },
    defaultRole: 'guest',
    redirect: {
      login: '/login',
      home: '/'
    }
  },

  css: [
    '@unocss/reset/tailwind.css',
  ],

  colorMode: {
    classSuffix: '',
  },

  features: {
    // For UnoCSS
    inlineStyles: false,
  },

  eslint: {
    config: {
      standalone: false,
    },
  },

  routeRules: {
    '/components': { redirect: '/components/accordion' },
    '/settings': { redirect: '/settings/profile' },
    // '/login': { redirect: '/login' },

     '/': { redirect: '/login' },
    '/login': { redirect: '/', condition: (to, from) => {
      const { user } = useAuthorization()
      return user
    } }
  },

  imports: {
    dirs: [
      './lib',
    ],
  },

  compatibilityDate: '2024-12-14',
})
