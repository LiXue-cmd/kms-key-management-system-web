// plugins/auth.ts
import { defineNuxtPlugin } from '#app';
import { useAuthorization } from '~/composables/useAuthorization';
import { navigateTo } from '#app';
import { useRoute } from '#app';
import { useCookie } from '#app';
import axios from '~/utils/axios'; // 使用自定义的 axios 实例

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
    const response = await axios.get('/api/user', {
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    });

    const user = response.data;

    if (user) {
      console.log('User information retrieved:', user);
      setUser(user);
    } else {
      // 如果没有获取到用户信息，且当前页面不是登录页面，则跳转到登录页面
      if (route.path !== '/login') {
        await navigateTo('/login');
      }
    }
  } catch (error: any) {
    console.log('Response error:', error);
    if (error.response && error.response.status === 401 && route.path !== '/login') {
      // 会话过期或无效，跳转到登录页
      await navigateTo('/login');
    }
    console.error('获取用户信息失败:', error);
    // 捕获到错误时，且当前页面不是登录页面，则跳转到登录页面
    if (route.path !== '/login') {
      await navigateTo('/login');
    }
  }
});