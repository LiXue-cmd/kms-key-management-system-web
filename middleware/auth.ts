// 在路由跳转时，检查用户是否登录以及是否具备管理员权限
export default defineNuxtRouteMiddleware((to, from) => {
  const { user } = useAuthorization()
  const currentRoute = useRoute()
  console.log('user',user)
  console.log('currentRoute',currentRoute)
  if (!user && currentRoute.path!== '/login') {
    return navigateTo('/login')
  }
  if (user && currentRoute.path === '/login') {
    return navigateTo('/')
  }
  return true
})