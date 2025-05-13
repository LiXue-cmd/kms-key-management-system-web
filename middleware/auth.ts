// middleware/auth.global.ts
export default defineNuxtRouteMiddleware((to, from) => {
  const { hasRole, can } = useAuthorization()
  
  // 示例：检查是否登录
  if (!useAuthorization().user.value) {
    return navigateTo('/login')
  }
  
  // 示例：检查管理员权限
  if (to.meta.requiresAdmin && !hasRole('admin')) {
    return navigateTo('/')
  }
})