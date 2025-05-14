export default defineEventHandler(async () => {

  const user = {
    "id": 1,
    "name": "Admin User",
    "email": "admin@example.com",
    "role": "admin",
    "permissions": ["manageUsers", "managePosts", "accessDashboard"],
    "avatar": "https://example.com/avatar.jpg",
    "phone": "1234567890"
  }
  console.log('[user]', user)

  return user
})