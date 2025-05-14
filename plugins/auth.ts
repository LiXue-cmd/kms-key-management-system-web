// plugins/auth.ts
import { defineNuxtPlugin } from '#app';
import { useAuthorization } from '~/composables/useAuthorization';
import { navigateTo } from '#app';
import { useRoute } from '#app';
import { useCookie } from '#app';

export default defineNuxtPlugin(async (nuxtApp) => {
  const { setUser } = useAuthorization();
  const route = useRoute();
  const token = useCookie('token');

  // 定义登录页的路径数组，可根据实际情况添加更多登录页路径
  const loginPaths = ['/login', '/login-basic']; 

  // 检查当前路径是否为登录页
  if (loginPaths.includes(route.path)) {
    return;
  }

  try {
    const { data: user, error } = await useFetch('/api/user', {
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    });

    if (error.value) {
      console.log('Response error:', error.value);
      if (error.value.statusCode === 401 && route.path !== '/login') {
        // 会话过期或无效，跳转到登录页
        await navigateTo('/login');
      }
      throw new Error(`获取用户信息失败: ${error.value.message}`);
    }

    if (user.value) {
      console.log('User information retrieved:', user.value);
      setUser(user.value);
    } else {
      // 如果没有获取到用户信息，且当前页面不是登录页面，则跳转到登录页面
      if (route.path !== '/login') {
        await navigateTo('/login');
      }
    }
  } catch (error) {
    console.error('获取用户信息失败:', error);
    // 捕获到错误时，且当前页面不是登录页面，则跳转到登录页面
    if (route.path !== '/login') {
      await navigateTo('/login');
    }
  }
});