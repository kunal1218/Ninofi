import React, { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Box } from '@mui/material'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import LoginPage from './pages/LoginPage'
import CustomerDashboard from './pages/CustomerDashboard'
import ContractorDashboard from './pages/ContractorDashboard'
import WorkerDashboard from './pages/WorkerDashboard'
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

const AppRoutes = () => {
  const { user, loading } = useAuth()
  
  if (loading) {
    return <LoadingScreen />
  }
  
  return (
    <Routes>
      <Route path="/login" element={!user ? <LoginPage /> : <Navigate to={user.userType === 'customer' ? '/customer' : user.userType === 'contractor' ? '/contractor' : '/worker'} replace />} />
      <Route 
        path="/contractor/*" 
        element={
          <ProtectedRoute userType="contractor">
            <ContractorDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/worker/*" 
        element={
          <ProtectedRoute userType="worker">
            <WorkerDashboard />
          </ProtectedRoute>
        } 
      />
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
