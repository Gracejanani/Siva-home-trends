import React, { createContext, useContext, useState, useEffect } from 'react'

const AdminContext = createContext(null)

const ADMIN_EMAIL = 'gracejana123@gmail.com'
const ADMIN_PASS = 'Siva2026@'
const STORAGE_KEY = 'siva_admin_auth'

export function AdminProvider({ children }) {
  const [adminUser, setAdminUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (parsed?.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
          setAdminUser(parsed)
        } else {
          localStorage.removeItem(STORAGE_KEY)
        }
      }
    } catch (err) {
      console.error('Error reading admin session:', err)
      localStorage.removeItem(STORAGE_KEY)
    } finally {
      setLoading(false)
    }
  }, [])

  const adminLogin = (email, password) => {
    const cleanEmail = (email || '').trim().toLowerCase()
    const cleanPass = (password || '').trim()

    if (cleanEmail === ADMIN_EMAIL.toLowerCase() && cleanPass === ADMIN_PASS) {
      const user = {
        email: ADMIN_EMAIL,
        name: 'Siva Admin',
        role: 'Super Admin',
        loginTime: new Date().toISOString(),
      }
      setAdminUser(user)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
      return { success: true }
    } else {
      let errorMsg = 'Access Denied: Invalid credentials.'
      if (cleanEmail !== ADMIN_EMAIL.toLowerCase()) {
        errorMsg = 'Access Denied: Unauthorized email address. Only the authorized store owner can access the admin panel.'
      } else if (cleanPass !== ADMIN_PASS) {
        errorMsg = 'Incorrect password. Please verify and try again.'
      }
      return { success: false, error: errorMsg }
    }
  }

  const adminLogout = () => {
    setAdminUser(null)
    localStorage.removeItem(STORAGE_KEY)
  }

  return (
    <AdminContext.Provider
      value={{
        adminUser,
        isAdminAuthenticated: Boolean(adminUser),
        adminLogin,
        adminLogout,
        loading,
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider')
  }
  return context
}
