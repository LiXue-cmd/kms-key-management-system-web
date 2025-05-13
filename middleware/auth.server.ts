// middleware/auth.server.ts
export default defineNuxtRouteMiddleware(async (to, from) => {
  const { setUser } = useAuthorization()
  
  // 从 cookie 或 session 获取用户
  const user = await getUserFromSession()
  
  if (user) {
    setUser(user)
  }
})