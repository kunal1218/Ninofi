import React, { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Box } from '@mui/material'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import LoginPage from './pages/LoginPage'
import CustomerDashboard from './pages/CustomerDashboard'
import ContractorDashboard from './pages/ContractorDashboard'
import WorkerDashboard from './pages/WorkerDashboard'
import ContractorOnboarding from './pages/ContractorOnboarding'
import ContractorVerification from './pages/ContractorVerification'
import WorkerOnboarding from './pages/WorkerOnboarding'
import WorkerVerification from './pages/WorkerVerification'
import LoadingScreen from './components/LoadingScreen'

const ProtectedRoute = ({ children, userType }) => {
  const { user, loading } = useAuth()
  
  if (loading) {
    return <LoadingScreen />
  }
  
  if (!user) {
    return <Navigate to="/login" replace />
  }
  
  if (user.userType !== userType) {
    return <Navigate to="/login" replace />
  }
  
  return children
}

const ContractorRoute = () => {
  const { user, loading } = useAuth()
  
  if (loading) {
    return <LoadingScreen />
  }
  
  if (!user) {
    return <Navigate to="/login" replace />
  }
  
  if (user.userType !== 'contractor') {
    return <Navigate to="/login" replace />
  }
  
  // Check if profile is completed
  if (!user.profileCompleted) {
    return <Navigate to="/contractor/onboarding" replace />
  }
  
  // Check if user is verified
  if (!user.isVerified) {
    return <Navigate to="/contractor/verification" replace />
  }
  
  return <ContractorDashboard />
}

const WorkerRoute = () => {
  const { user, loading } = useAuth()
  
  if (loading) {
    return <LoadingScreen />
  }
  
  if (!user) {
    return <Navigate to="/login" replace />
  }
  
  if (user.userType !== 'worker') {
    return <Navigate to="/login" replace />
  }
  
  // Check if profile is completed
  if (!user.profileCompleted) {
    return <Navigate to="/worker/onboarding" replace />
  }
  
  // Check if user is verified
  if (!user.isVerified) {
    return <Navigate to="/worker/verification" replace />
  }
  
  return <WorkerDashboard />
}

const AppRoutes = () => {
  const { user, loading } = useAuth()
  
  if (loading) {
    return <LoadingScreen />
  }
  
  return (
    <Routes>
      <Route path="/login" element={!user ? <LoginPage /> : <Navigate to={user.userType === 'customer' ? '/customer' : user.userType === 'contractor' ? '/contractor' : '/worker'} replace />} />
      
      {/* Contractor Routes */}
      <Route path="/contractor" element={<ContractorRoute />} />
      <Route path="/contractor/*" element={<ContractorRoute />} />
      <Route 
        path="/contractor/onboarding" 
        element={
          <ProtectedRoute userType="contractor">
            <ContractorOnboarding />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/contractor/verification" 
        element={
          <ProtectedRoute userType="contractor">
            <ContractorVerification />
          </ProtectedRoute>
        } 
      />
      
      {/* Worker Routes */}
      <Route path="/worker" element={<WorkerRoute />} />
      <Route path="/worker/*" element={<WorkerRoute />} />
      <Route 
        path="/worker/onboarding" 
        element={
          <ProtectedRoute userType="worker">
            <WorkerOnboarding />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/worker/verification" 
        element={
          <ProtectedRoute userType="worker">
            <WorkerVerification />
          </ProtectedRoute>
        } 
      />
      
      {/* Customer Routes */}
      <Route 
        path="/customer/*" 
        element={
          <ProtectedRoute userType="customer">
            <CustomerDashboard />
          </ProtectedRoute>
        } 
      />
      
      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

const App = () => {
  return (
    <AuthProvider>
      <Box sx={{ minHeight: '100vh' }}>
        <AppRoutes />
      </Box>
    </AuthProvider>
  )
}

export default App
