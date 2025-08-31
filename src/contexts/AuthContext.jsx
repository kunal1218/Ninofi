import React, { createContext, useContext, useState, useEffect } from 'react'
import toast from 'react-hot-toast'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing user session
    const savedUser = localStorage.getItem('mavu_user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        localStorage.removeItem('mavu_user')
      }
    }
    setLoading(false)
  }, [])

  const login = async (email, password, userType) => {
    try {
      // Simulate API call - replace with actual authentication
      if (email && password) {
        const userData = {
          id: Date.now().toString(),
          email,
          userType,
          name: userType === 'contractor' ? 'John Contractor' : 'Mike Worker',
          company: userType === 'contractor' ? 'ABC Construction Co.' : null,
          role: userType === 'contractor' ? 'Owner' : 'Laborer'
        }
        
        setUser(userData)
        localStorage.setItem('mavu_user', JSON.stringify(userData))
        toast.success(`Welcome back, ${userData.name}!`)
        return true
      } else {
        throw new Error('Please enter valid credentials')
      }
    } catch (error) {
      toast.error(error.message || 'Login failed')
      return false
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('mavu_user')
    toast.success('Logged out successfully')
  }

  const value = {
    user,
    loading,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
