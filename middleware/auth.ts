export default defineNuxtRouteMiddleware((to, from) => {
  const { user } = useAuthorization()
  const currentRoute = useRoute()
  if (!user && currentRoute.path!== '/login') {
    return navigateTo('/login')
  }
  if (user && currentRoute.path === '/login') {
    return navigateTo('/')
  }
  return true
})