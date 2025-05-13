// authorization.config.ts
// 权限定义文件
export default defineAuthorizationConfig({
  roles: {
    admin: ['manageUsers', 'managePosts', 'accessDashboard'],
    editor: ['managePosts'],
    user: ['viewProfile', 'editProfile'],
    guest: []
  },
  
  // 自定义权限验证函数
  permissions: {
    isOwner: ({ user, resource }) => user.id === resource.userId,
    canEditPost: ({ user, post }) => 
      user.role === 'admin' || (user.role === 'editor' && post.status !== 'published')
  }
})