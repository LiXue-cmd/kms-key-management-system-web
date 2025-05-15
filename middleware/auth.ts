// middleware/auth.ts
export default defineNuxtRouteMiddleware((to, from) => {
    const { user } = useAuthorization();

    console.log('当前用户信息:', user.value);
    console.log('目标路由元信息:', to.meta);

    if (!user.value && to.meta.requiresAuth) {
        if (to.path === '/login') {
            return;
        }
        console.log('用户未登录，重定向到登录页面');
        return navigateTo('/login');
    }

    if (to.meta.requiresAdmin && user.value?.role!== 'super-admin') {
        console.log('用户不具备管理员权限，重定向到首页');
        return navigateTo('/');
    }
});