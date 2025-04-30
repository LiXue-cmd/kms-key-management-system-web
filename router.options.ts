// router.options.ts
export default defineRouterOptions({
    routes: (_routes) => [
      {
        path: '/',
        component: () => import('~/pages/index.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/settings',
        component: () => import('~/pages/settings/profile.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/login-basic',
        component: () => import('~/pages/(auth)/login-basic.vue'),
        meta: {
          public: true
        }
      }
    ]
  })