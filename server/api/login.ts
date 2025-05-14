// server/api/login.ts
import { createError } from 'h3';
import { setCookie } from 'h3';
import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event) => {
  // 使用 console.log 替换 alert
  console.log('login', event); 
  const body = await readBody(event);
  const { email, password } = body;
  console.log('Received email:', email, 'password:', password);

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

    // 生成 JWT
    const token = jwt.sign(user, 'your-secret-key', { expiresIn: '1h' });

    // 设置 cookie
    setCookie(event, 'token', token, {
      httpOnly: true,
      maxAge: 3600,
      path: '/'
    });

alert('登录成功',user)
    return user;
  } else if (email === 'normaluser@example.com' && password === 'password') {
    // 模拟普通用户数据
    const user = {
      id: 2,
      name: 'Normal User',
      email: 'normaluser@example.com',
      role: 'normal-user',
      permissions: ['viewProfile', 'editProfile']
    };

    // 生成 JWT
    const token = jwt.sign(user, 'your-secret-key', { expiresIn: '1h' });

    // 设置 cookie
    setCookie(event, 'token', token, {
      httpOnly: true,
      maxAge: 3600,
      path: '/'
    });
    return user;
  }

  console.log('body:', body);
  throw createError({
    statusCode: 401,
    statusMessage: '认证失败，无效的凭证'
  });
});