export default defineEventHandler(async () => {
  
  const user = {
    id: 1,
    name: 'John Doe',
    role: 'admin'
  }
  console.log('[user]', user)

  return user
})