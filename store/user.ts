// store/user.ts
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as any | null,
    isAuthenticated: false
  }),
  
  actions: {
    async login(credentials: { email: string; password: string }) {
      // 模拟登录请求
      const response = await $fetch('/api/auth/login', {
        method: 'POST',
        body: credentials
      })
      
      this.user = response.user
      this.isAuthenticated = true
      
      // 存储用户信息到本地存储
      localStorage.setItem('user', JSON.stringify(response.user))
      
      return response
    },
    
    logout() {
      this.user = null
      this.isAuthenticated = false
      localStorage.removeItem('user')
    },
    
    async fetchUser() {
      try {
        const user = JSON.parse(localStorage.getItem('user') || 'null')
        if (user) {
          this.user = user
          this.isAuthenticated = true
        }
      } catch (error) {
        console.error('Failed to fetch user', error)
      }
    }
  }
})