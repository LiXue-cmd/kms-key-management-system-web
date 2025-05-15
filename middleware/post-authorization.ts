// middleware/post-authorization.ts
// 创建自定义中间件来验证复杂的权限，比如检查文章的权限
export default defineNuxtRouteMiddleware((to, from) => {
  // const { can } = useAuthorization()
  // const postId = to.params.id
  
  // // 异步验证（如检查数据库）
  // const isAuthorized = await checkPostPermissions(postId)
  
  // if (!isAuthorized) {
  //   return navigateTo('/')
  // }
})