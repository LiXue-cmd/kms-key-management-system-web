// server/api/login.ts
import { createError, readBody, setCookie, send } from 'h3';
import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event) => {
  console.log('Request headers:', event.node.req.headers);
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

    const responseData = JSON.stringify(user);
    const responseOptions = {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      }
    };
    console.log('Response headers:', responseOptions.headers);
    return send(event, responseData, responseOptions);
  } catch (error) {
    const errorResponse = JSON.stringify({
      error: error.message || 'Internal Server Error',
    });
    const errorOptions = {
      statusCode: error.statusCode || 500,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    console.log('Error response headers:', errorOptions.headers);
    return send(event, errorResponse, errorOptions);
  }
});
function validateUser(email: string, password: string) {
  const users = {
    'admin@example.com': { id: 1, role: 'super-admin', password: 'adminpassword' },
    'normaluser@example.com': { id: 2, role: 'normal-user', password: 'normalpassword' }
  };
  return users[email]?.password === password? users[email] : null;
}