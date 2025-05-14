export default defineNuxtPlugin(async (nuxtApp) => {
  const { setUser } = useAuthorization()

  // 尝试从本地存储获取用户信息
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    const user = JSON.parse(storedUser);
    setUser(user);
    return;
  }

  const baseUrl = window.location.origin;
  const userUrl = `${baseUrl}/api/user`;

  try {
    const response = await fetch(userUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const user = await response.json();
    console.log('user', user);
    setUser(user);

    // 将用户信息存储到本地存储
    localStorage.setItem('user', JSON.stringify(user));
  } catch (error) {
    console.error('获取用户信息失败:', error);
  }
});