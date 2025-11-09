import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session on mount (client-side only)
    if (typeof window !== 'undefined') {
      try {
        const savedUser = localStorage.getItem('user')
        if (savedUser && savedUser.trim().length > 0) {
          try {
            setUser(JSON.parse(savedUser))
          } catch (parseError) {
            console.error('Failed to parse user data from localStorage:', parseError)
            // Clear invalid data
            localStorage.removeItem('user')
          }
        }
      } catch (error) {
        console.error('Error accessing localStorage:', error)
      }
    }
    setLoading(false)
  }, [])

  const login = (userData) => {
    setUser(userData)
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('user', JSON.stringify(userData))
      } catch (error) {
        console.error('Error saving user to localStorage:', error)
      }
    }
  }

  const logout = () => {
    setUser(null)
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('user')
      } catch (error) {
        console.error('Error removing user from localStorage:', error)
      }
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
