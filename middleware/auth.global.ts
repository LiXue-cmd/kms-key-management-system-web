// middleware/auth.global.ts
import { useUserStore } from '~/store/user' // 确保正确引入

export default defineNuxtRouteMiddleware(async (to, from) => {
  const userStore = useUserStore()
  
  // 如果用户未登录且尝试访问受保护的路由
  if (!userStore.isAuthenticated && to.meta.requiresAuth) {
    return navigateTo('/login-basic')
  }
})