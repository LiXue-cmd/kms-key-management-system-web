// 路由守卫，在路由跳转时，检查用户是否登录以及是否具备管理员权限
// middleware/auth.ts
export default defineNuxtRouteMiddleware((to, from) => {
  const { user } = useAuthorization();
  
  console.log('User in middleware:', user.value); // 添加日志确认用户信息
  
  // 如果用户未登录且访问需要认证的页面
  if (!user.value && to.meta.requiresAuth) {
    // 避免无限重定向
    if (to.path === '/login') {
      return;
    }
    return navigateTo('/login');
  }
  
  // 检查管理员权限
  if (to.meta.requiresAdmin && user.value?.role !== 'admin') {
    return navigateTo('/');
  }
});