// server/api/posts/[id].ts
export default defineEventHandler(async (event) => {
  const { can } = useAuthorization(event)
  
  if (!can('managePosts')) {
    throw createError({ statusCode: 403 })
  }
  
  // 继续处理请求
  return getPost(event.context.params.id)
})