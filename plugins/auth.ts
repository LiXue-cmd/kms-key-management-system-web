// plugins/auth.ts
// 与认证系统集成
// import { defineNuxtPlugin } from '#app';
// import { useAuthorization } from '../composables/useAuthorization';
// import { defineNuxtPlugin } from '#app/nuxt';
// import useAuthorization from 'nuxt-authorization'
// console.log('useAuthorization',useAuthorization)
// plugins/auth.ts
// import { useState } from '#app'

// export default defineNuxtPlugin(async (nuxtApp) => {
//   const userState = useState('user', () => null)
//   const auth = useAuthorization()
//   console.log('Authorization methods:', auth)
//   // 获取用户数据
//   // const user = await fetchUser()
//   const user = {
//     id: '1',
//     name: 'Demo User',
//     email: 'demo@gmail.com'
//   }
//   // 设置用户
//   userState.value = user
// })
export default defineNuxtPlugin(async (nuxtApp) => {
  const { setUser } = useAuthorization()

  try {
    // 发送请求
    const response = await fetch('/api/user')
    
    // 检查 HTTP 状态码
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    // 解析 JSON 数据
    const user = await response.json()
    console.log('user', user)
    
    // 设置用户角色和权限
    setUser(user)
  } catch (error) {
    console.error('获取用户信息失败:', error)
    // 可以在这里设置默认用户状态或执行其他操作
  }
})

// export default defineNuxtPlugin({
//   name: 'authorization-resolver',
//   parallel: true,
//   setup() {
//     return {
//       provide: {
//         authorization: {
//           resolveClientUser: () => {
//             console.log('123')
//             // Your logic to retrieve the user from the client
//           },
//         },
//       },
//     }
//   },
// })