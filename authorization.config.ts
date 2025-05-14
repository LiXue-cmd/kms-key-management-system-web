// authorization.config.ts
// 权限定义文件
export default defineAuthorizationConfig({
  roles: {
    'super-admin': ['manageUsers', 'managePosts', 'accessDashboard', 'manageAllSettings'],
    'normal-user': ['viewProfile', 'editProfile']
  },
  
  // 自定义权限验证函数
  permissions: {
    isOwner: ({ user, resource }) => user.id === resource.userId,
    canEditPost: ({ user, post }) => 
      user.role === 'super-admin' || (user.role === 'editor' && post.status !== 'published')
  }
})