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

  // 从 API 获取用户信息
  const user = await fetch('/api/user')
  console.log('user', user)
  // 设置用户角色和权限
  setUser(user)
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