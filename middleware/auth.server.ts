// middleware/auth.server.ts
// 如果在服务端渲染时设置用户，考虑使用服务器端中间件：
export default defineNuxtRouteMiddleware(async (to, from) => {
  const { setUser } = useAuthorization()
  
  // 从 cookie 或 session 获取用户
  const user = await getUserFromSession()
  
  if (user) {
    setUser(user)
  }
})