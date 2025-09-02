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
          name: userType === 'customer' ? 'Sarah Customer' : userType === 'contractor' ? 'John Contractor' : 'Mike Worker',
          company: userType === 'contractor' ? 'ABC Construction Co.' : null,
          role: userType === 'customer' ? 'Homeowner' : userType === 'contractor' ? 'Owner' : 'Laborer',
          // Onboarding status
          profileCompleted: userType === 'customer' ? true : false, // Customers don't need onboarding
          isVerified: userType === 'customer' ? true : false,
          // Profile information (will be filled during onboarding)
          phone: '',
          address: '',
          skills: [],
          experience: '',
          license: '',
          insurance: '',
          references: [],
          // For contractors
          businessName: '',
          businessType: '',
          specialties: [],
          // For workers
          workerType: '',
          hourlyRate: '',
          availability: []
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

  const updateUserProfile = (profileData) => {
    const updatedUser = { ...user, ...profileData, profileCompleted: true }
    setUser(updatedUser)
    localStorage.setItem('mavu_user', JSON.stringify(updatedUser))
    
    if (profileData.pendingApproval) {
      toast.success('Request submitted successfully! Waiting for business approval.')
    } else {
      toast.success('Profile updated successfully!')
    }
  }

  const approveWorkerRequest = (workerId) => {
    // This would typically make an API call to approve the worker
    toast.success('Worker request approved!')
  }

  const rejectWorkerRequest = (workerId) => {
    // This would typically make an API call to reject the worker
    toast.error('Worker request rejected!')
  }

  const verifyUser = () => {
    const updatedUser = { ...user, isVerified: true }
    setUser(updatedUser)
    localStorage.setItem('mavu_user', JSON.stringify(updatedUser))
    toast.success('Account verified successfully!')
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
    logout,
    updateUserProfile,
    verifyUser,
    approveWorkerRequest,
    rejectWorkerRequest
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
