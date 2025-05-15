// server/middleware/auth.session.ts
export default defineEventHandler(async (event) => {
  // 从session中获取用户信息
  const user = event.context.session?.user;

  if (user) {
    // 将用户信息添加到event上下文中，供后续中间件和API使用
    event.context.user = user;
  }
  
  // 注意：不要在这里设置Content-Type，让具体的API处理函数决定响应格式
  
  // 不需要调用next，直接返回
});