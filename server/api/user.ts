// server/api/user.ts
// import { createError } from 'h3';

// export default defineEventHandler(async (event) => {
//   // 从会话中获取用户信息，这里需要根据实际情况实现会话管理
//   const user = event.context.session?.user;

//   if (!user) {
//     throw createError({
//       statusCode: 401,
//       statusMessage: '未认证，无法获取用户信息'
//     });
//   }

//   // 定义超级管理员和普通用户的权限
//   const superAdminPermissions = ['manageUsers', 'managePosts', 'accessDashboard', 'manageAllSettings'];
//   const normalUserPermissions = ['viewProfile', 'editProfile'];

//   // 根据用户角色设置权限
//   let permissions = [];
//   if (user.role === 'super-admin') {
//     permissions = superAdminPermissions;
//   } else if (user.role === 'normal-user') {
//     permissions = normalUserPermissions;
//   }

//   // 返回包含角色和权限的用户信息
//   return {
//     ...user,
//     permissions
//   };
// });
// server/api/user.ts
import { defineEventHandler } from 'h3';
import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event) => {
  const authorization = getHeader(event, 'Authorization');
  if (!authorization) {
    throw createError({
      statusCode: 401,
      statusMessage: '未提供授权信息'
    });
  }

  const token = authorization.replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, 'your-secret-key');
    return decoded;
  } catch (error) {
    throw createError({
      statusCode: 401,
      statusMessage: '无效的授权信息'
    });
  }
});