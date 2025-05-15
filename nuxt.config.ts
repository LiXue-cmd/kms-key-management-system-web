// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // 启用 Nuxt DevTools
  devtools: { enabled: true },

  // 引入的 Nuxt 模块
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

  // 授权配置
  authorization: {
    // 角色和权限配置
    roles: {
      admin: ['manageUsers', 'managePosts'],
      user: ['viewProfile', 'editProfile'],
      guest: []
    },
    // 默认角色
    defaultRole: 'guest',
    // 重定向配置
    redirect: {
      login: '/login',
      home: '/'
    }
  },

  // 应用配置
  app: {
    // 应用中间件，可根据需求调整
    // middleware: ['auth', 'auth-server']
  },

  // 运行时配置
  runtimeConfig: {
    public: {
      // API 基础路径
      apiBase: '/api'
    }
  },

  // 开发环境下的代理配置
  nitro: {
    devProxy: {
      '/api': {
        target: 'http://localhost:3000', // 你的 Nuxt 服务器地址
        changeOrigin: true,
      },
    },
  },

  // 全局 CSS 文件
  css: [
    '@unocss/reset/tailwind.css',
  ],

  // 颜色模式配置
  colorMode: {
    classSuffix: '',
  },

  // 功能特性配置
  features: {
    // 禁用内联样式（用于 UnoCSS）
    inlineStyles: false,
  },

  // ESLint 配置
  eslint: {
    config: {
      standalone: false,
    },
  },

  // 路由规则配置
  routeRules: {
    '/components': { redirect: '/components/accordion' },
    '/settings': { redirect: '/settings/profile' },
  },

  // 自动导入配置
  imports: {
    dirs: [
      './lib',
    ],
  },

  // 兼容性日期配置
  compatibilityDate: '2024-12-14',
})