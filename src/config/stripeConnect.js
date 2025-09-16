/**
 * Stripe Connect Configuration
 * 
 * This file contains all Stripe Connect related configuration and API setup.
 * Make sure to set your environment variables in .env file:
 * - REACT_APP_STRIPE_PUBLISHABLE_KEY
 * - REACT_APP_STRIPE_SECRET_KEY (for server-side operations)
 * - REACT_APP_API_URL (your backend API URL)
 */

import { loadConnect } from '@stripe/connect-js'

// Validate that required environment variables are present
const validateEnvironment = () => {
  const requiredVars = [
    'REACT_APP_STRIPE_PUBLISHABLE_KEY',
    'REACT_APP_API_URL'
  ]
  
  const missingVars = requiredVars.filter(varName => !process.env[varName])
  
  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(', ')}\n` +
      'Please add them to your .env file:\n' +
      'REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_...\n' +
      'REACT_APP_API_URL=http://localhost:3001/api'
    )
  }
}

// Validate environment on module load
try {
  validateEnvironment()
} catch (error) {
  console.error('Stripe Connect Configuration Error:', error.message)
  // In production, you might want to handle this differently
}

// Stripe Connect configuration
export const stripeConnectConfig = {
  // Publishable key for client-side operations
  publishableKey: process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY,
  
  // API URL for your backend (where server-side Stripe operations happen)
  apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
  
  // Stripe API version - using the latest as requested
  apiVersion: '2025-08-27.basil',
  
  // Application fee percentage (2.9% + 30¢ is common)
  applicationFeePercentage: 0.029,
  applicationFeeFixed: 30, // in cents
}

// Initialize Stripe Connect
export const stripeConnect = loadConnect({
  publishableKey: stripeConnectConfig.publishableKey,
  // Enable test mode - set to false for production
  testMode: true,
})

// Helper function to calculate application fee
export const calculateApplicationFee = (amountInCents) => {
  const percentageFee = Math.round(amountInCents * stripeConnectConfig.applicationFeePercentage)
  return percentageFee + stripeConnectConfig.applicationFeeFixed
}

// API endpoints for Stripe Connect operations
export const apiEndpoints = {
  // Create a new connected account
  createAccount: `${stripeConnectConfig.apiUrl}/stripe/accounts/create`,
  
  // Get account details and status
  getAccount: (accountId) => `${stripeConnectConfig.apiUrl}/stripe/accounts/${accountId}`,
  
  // Create account link for onboarding
  createAccountLink: `${stripeConnectConfig.apiUrl}/stripe/accounts/link`,
  
  // Product management
  createProduct: `${stripeConnectConfig.apiUrl}/stripe/products/create`,
  getProducts: (accountId) => `${stripeConnectConfig.apiUrl}/stripe/products/${accountId}`,
  
  // Payment processing
  createCheckoutSession: `${stripeConnectConfig.apiUrl}/stripe/checkout/create`,
  
  // Get checkout session details
  getCheckoutSession: (sessionId) => `${stripeConnectConfig.apiUrl}/stripe/checkout/${sessionId}`,
}

// Error handling helper
export const handleStripeError = (error) => {
  console.error('Stripe Error:', error)
  
  if (error.type === 'card_error') {
    return `Card error: ${error.message}`
  } else if (error.type === 'validation_error') {
    return `Validation error: ${error.message}`
  } else if (error.type === 'api_error') {
    return `API error: ${error.message}`
  } else {
    return `An unexpected error occurred: ${error.message}`
  }
}
