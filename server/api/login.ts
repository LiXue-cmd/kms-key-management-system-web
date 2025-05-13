// server/api/login.ts
import { createError } from 'h3';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, password } = body;

  // 实际项目中应查询数据库或调用认证服务
  if (email === 'admin@example.com' && password === 'password') {
    // 模拟用户数据
    const user = {
      id: 1,
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'admin',
      permissions: ['manageUsers', 'managePosts', 'accessDashboard']
    };

    // 在实际项目中，这里应该生成并返回JWT或设置session
    return user;
  }

  throw createError({
    statusCode: 401,
    statusMessage: '认证失败，无效的凭证'
  });
});