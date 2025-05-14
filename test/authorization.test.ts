// test/authorization.test.ts
import { describe, it, expect } from 'vitest'
import { useAuthorization } from 'nuxt-authorization'

describe('Authorization Tests', () => {
  it('should allow admin to manage users', () => {
    const { setUser, can } = useAuthorization()
    setUser({ role: 'super-admin' })
    
    expect(can('manageUsers')).toBe(true)
  })
  
  // it('should not allow guest to view profile', () => {
  //   const { setUser, can } = useAuthorization()
  //   setUser({ role: 'guest' })
    
  //   expect(can('viewProfile')).toBe(false)
  // })
})