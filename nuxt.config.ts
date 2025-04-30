// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

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
    '@sidebase/nuxt-auth'
  ],
  auth: {
    // 配置应用的基础 URL（用于重定向等）
    origin: process.env.ORIGIN || 'http://localhost:3000',
    
    // 启用全局身份验证中间件
    enableGlobalAppMiddleware: true,
    
    // 自定义登录和错误页面路径
    globalMiddlewareOptions: {
      allow404WithoutAuth: true, // 允许无权限访问 404 页面
      addDefaultCallbackUrl: true // 自动添加回调 URL 参数
    }
  },
  // 授权模块配置
  authorization: {
    roles: {
      // 定义角色及其权限
      admin: ['manage_users', 'manage_posts', 'view_dashboard'],
      editor: ['manage_posts', 'view_dashboard'],
      user: ['view_dashboard']
    },
    
    // 自定义权限检查函数
    permissions: {
      isAdmin: (user) => user.role === 'admin',
      canEdit: (user, post) => user.id === post.authorId || user.role === 'admin'
    },
    
    // 未授权时的重定向路径
    redirect: {
      login: '/login-basic',
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
  },

  imports: {
    dirs: [
      './lib',
    ],
  },

  compatibilityDate: '2024-12-14',
})
