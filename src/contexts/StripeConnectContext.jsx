/**
 * Stripe Connect Context
 * 
 * This context provides Stripe Connect functionality throughout the application.
 * It manages connected accounts, products, and payment processing.
 */

import React, { createContext, useContext, useState, useCallback } from 'react'
import { stripeConnectConfig, apiEndpoints, handleStripeError } from '../config/stripeConnect'

const StripeConnectContext = createContext()

export const useStripeConnect = () => {
  const context = useContext(StripeConnectContext)
  if (!context) {
    throw new Error('useStripeConnect must be used within a StripeConnectProvider')
  }
  return context
}

export const StripeConnectProvider = ({ children }) => {
  // State for connected accounts
  const [connectedAccounts, setConnectedAccounts] = useState([])
  const [currentAccount, setCurrentAccount] = useState(null)
  const [accountStatus, setAccountStatus] = useState(null)
  
  // State for products
  const [products, setProducts] = useState([])
  const [isLoadingProducts, setIsLoadingProducts] = useState(false)
  
  // State for loading and errors
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // Clear error state
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  // Create a new connected account
  const createConnectedAccount = useCallback(async (accountData) => {
    setIsLoading(true)
    setError(null)
    
    try {
      const response = await fetch(apiEndpoints.createAccount, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(accountData),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to create connected account')
      }
      
      const account = await response.json()
      
      // Add to connected accounts list
      setConnectedAccounts(prev => [...prev, account])
      setCurrentAccount(account)
      
      return account
    } catch (err) {
      const errorMessage = handleStripeError(err)
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Get account details and status
  const getAccountStatus = useCallback(async (accountId) => {
    setIsLoading(true)
    setError(null)
    
    try {
      const response = await fetch(apiEndpoints.getAccount(accountId), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to get account status')
      }
      
      const account = await response.json()
      setAccountStatus(account)
      return account
    } catch (err) {
      const errorMessage = handleStripeError(err)
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Create account link for onboarding
  const createAccountLink = useCallback(async (accountId) => {
    setIsLoading(true)
    setError(null)
    
    try {
      const response = await fetch(apiEndpoints.createAccountLink, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accountId }),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to create account link')
      }
      
      const { url } = await response.json()
      return url
    } catch (err) {
      const errorMessage = handleStripeError(err)
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Create a product
  const createProduct = useCallback(async (productData, accountId) => {
    setIsLoading(true)
    setError(null)
    
    try {
      const response = await fetch(apiEndpoints.createProduct, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...productData,
          accountId,
        }),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to create product')
      }
      
      const product = await response.json()
      
      // Add to products list
      setProducts(prev => [...prev, product])
      
      return product
    } catch (err) {
      const errorMessage = handleStripeError(err)
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Get products for a connected account
  const getProducts = useCallback(async (accountId) => {
    setIsLoadingProducts(true)
    setError(null)
    
    try {
      const response = await fetch(apiEndpoints.getProducts(accountId), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to get products')
      }
      
      const productsData = await response.json()
      setProducts(productsData)
      
      return productsData
    } catch (err) {
      const errorMessage = handleStripeError(err)
      setError(errorMessage)
      throw err
    } finally {
      setIsLoadingProducts(false)
    }
  }, [])

  // Create checkout session
  const createCheckoutSession = useCallback(async (checkoutData) => {
    setIsLoading(true)
    setError(null)
    
    try {
      const response = await fetch(apiEndpoints.createCheckoutSession, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(checkoutData),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to create checkout session')
      }
      
      const session = await response.json()
      return session
    } catch (err) {
      const errorMessage = handleStripeError(err)
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Get checkout session details
  const getCheckoutSession = useCallback(async (sessionId) => {
    setIsLoading(true)
    setError(null)
    
    try {
      const response = await fetch(apiEndpoints.getCheckoutSession(sessionId), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to get checkout session')
      }
      
      const session = await response.json()
      return session
    } catch (err) {
      const errorMessage = handleStripeError(err)
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const value = {
    // State
    connectedAccounts,
    currentAccount,
    accountStatus,
    products,
    isLoadingProducts,
    isLoading,
    error,
    
    // Actions
    createConnectedAccount,
    getAccountStatus,
    createAccountLink,
    createProduct,
    getProducts,
    createCheckoutSession,
    getCheckoutSession,
    clearError,
    setCurrentAccount,
  }

  return (
    <StripeConnectContext.Provider value={value}>
      {children}
    </StripeConnectContext.Provider>
  )
}
