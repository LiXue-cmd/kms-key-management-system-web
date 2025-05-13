// middleware/post-authorization.ts
// 创建自定义中间件验证复杂权限
export default defineNuxtRouteMiddleware((to, from) => {
  const { can } = useAuthorization()
  const postId = to.params.id
  
  // 异步验证（如检查数据库）
  const isAuthorized = await checkPostPermissions(postId)
  
  if (!isAuthorized) {
    return navigateTo('/')
  }
})