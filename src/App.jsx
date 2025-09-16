import React, { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Box } from '@mui/material'
import { AuthProvider, useAuth } from './contexts/AuthContext'
// import { StripeConnectProvider } from './contexts/StripeConnectContext'
import LoginPage from './pages/LoginPage'
import CustomerDashboard from './pages/CustomerDashboard'
import ContractorDashboard from './pages/ContractorDashboard'
import ProjectSelection from './pages/ProjectSelection'
import WorkerDashboard from './pages/WorkerDashboard'
import ContractorOnboarding from './pages/ContractorOnboarding'
import ContractorVerification from './pages/ContractorVerification'
import WorkerOnboarding from './pages/WorkerOnboarding'
import WorkerVerification from './pages/WorkerVerification'
// import PaymentSuccess from './pages/PaymentSuccess'

import LoadingScreen from './components/LoadingScreen'
// import StripeConnectDashboard from './components/stripe/StripeConnectDashboard'
// import CustomerStorefront from './components/stripe/CustomerStorefront'

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
  
  // Redirect to project selection first
  return <Navigate to="/contractor/projects" replace />
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
      <Route 
        path="/contractor/projects" 
        element={
          <ProtectedRoute userType="contractor">
            <ProjectSelection />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/contractor/dashboard" 
        element={
          <ProtectedRoute userType="contractor">
            <ContractorDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/contractor/dashboard/*" 
        element={
          <ProtectedRoute userType="contractor">
            <ContractorDashboard />
          </ProtectedRoute>
        } 
      />
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
      
      {/* Stripe Connect Routes - DISABLED */}
      {/* <Route 
        path="/stripe-connect" 
        element={
          <StripeConnectProvider>
            <StripeConnectDashboard />
          </StripeConnectProvider>
        } 
      />
      
      <Route 
        path="/payment-success" 
        element={
          <StripeConnectProvider>
            <PaymentSuccess />
          </StripeConnectProvider>
        } 
      />
      
      <Route 
        path="/storefront/:accountId" 
        element={
          <StripeConnectProvider>
            <CustomerStorefront />
          </StripeConnectProvider>
        } 
      /> */}

      
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
