// server/api/login.ts
import { createError, readBody, setCookie, send } from 'h3';
import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event) => {
  try {
    const { email, password } = await readBody(event);
    const user = validateUser(email, password);
    
    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: '认证失败，无效的凭证',
      });
    }

    const token = jwt.sign(user, 'your-secret-key', { expiresIn: '1h' });
    setCookie(event, 'token', token, { httpOnly: true, maxAge: 3600 });

    // ✅ 使用完整的 send 函数形式
    return send(event, JSON.stringify(user), {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    // ✅ 确保错误响应也是 JSON
    return send(event, JSON.stringify({
      error: error.message || 'Internal Server Error',
    }), {
      statusCode: error.statusCode || 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
});
function validateUser(email: string, password: string) {
  const users = {
    'admin@example.com': { id: 1, role: 'super-admin' },
    'normaluser@example.com': { id: 2, role: 'normal-user' }
  };
  return users[email]?.password === password? users[email] : null;
}