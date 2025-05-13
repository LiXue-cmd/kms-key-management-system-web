// middleware/auth.server.ts
export default defineNuxtRouteMiddleware(async (to, from) => {
  const { setUser, user } = useAuthorization()
  
  // 从 cookie 或 session 获取用户
  // const authUser = await getUserFromSession()
  const authUser = {
    id: 1,
    name: 'John Doe',
    email: '<EMAIL>',
    role: 'admin',
    permissions: ['manageUsers', 'managePosts', 'accessDashboard'],
  }
  if (authUser) {
    setUser(authUser)
  }

  // 仅在用户未登录且访问需要认证的路由时重定向
  if (!user.value && to.path !== '/login') {
    return navigateTo('/login')
  }
})