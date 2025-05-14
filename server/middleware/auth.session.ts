// server/middleware/auth.session.ts
export default defineEventHandler(async (event) => {
  // 检查cookie或session中是否有用户信息
  const user = event.context.session?.user;

  if (user) {
    // 将用户信息添加到event上下文中，供后续中间件和API使用
    event.context.user = user;
  }
  // if (!event.path.startsWith('/api/')) {
  //   setHeader(event, 'Content-Type', 'text/html');
  // }
  // return next(event);
});