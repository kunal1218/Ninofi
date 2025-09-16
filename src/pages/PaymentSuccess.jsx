/**
 * Payment Success Page
 * 
 * This page is shown after a successful payment through Stripe Checkout.
 * It retrieves the checkout session details and displays confirmation.
 */

import React, { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Alert,
  CircularProgress,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material'
import {
  CheckCircle,
  Receipt,
  Home,
  ShoppingCart,
  Error as ErrorIcon
} from '@mui/icons-material'
import { useStripeConnect } from '../contexts/StripeConnectContext'

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { getCheckoutSession, isLoading, error } = useStripeConnect()
  
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  // Get session ID from URL parameters
  const sessionId = searchParams.get('session_id')

  useEffect(() => {
    if (sessionId) {
      loadSessionDetails()
    } else {
      setLoading(false)
    }
  }, [sessionId])

  // Load checkout session details
  const loadSessionDetails = async () => {
    try {
      const sessionData = await getCheckoutSession(sessionId)
      setSession(sessionData)
    } catch (err) {
      console.error('Failed to load session details:', err)
    } finally {
      setLoading(false)
    }
  }

  // Format currency
  const formatCurrency = (amount, currency = 'usd') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase()
    }).format(amount / 100)
  }

  // Handle navigation
  const handleGoHome = () => {
    navigate('/')
  }

  const handleGoToStore = () => {
    // Navigate back to storefront - you might want to store the account ID
    navigate('/stripe-connect')
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
        <Alert severity="error" icon={<ErrorIcon />}>
          <Typography variant="h6" gutterBottom>
            Payment Error
          </Typography>
          <Typography variant="body2">
            {error}
          </Typography>
        </Alert>
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Button variant="contained" onClick={handleGoHome}>
            Go Home
          </Button>
        </Box>
      </Box>
    )
  }

  if (!sessionId) {
    return (
      <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
        <Alert severity="warning">
          <Typography variant="h6" gutterBottom>
            Invalid Payment Session
          </Typography>
          <Typography variant="body2">
            No payment session found. Please try again.
          </Typography>
        </Alert>
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Button variant="contained" onClick={handleGoHome}>
            Go Home
          </Button>
        </Box>
      </Box>
    )
  }

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Card>
        <CardContent>
          {/* Success Header */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <CheckCircle sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
            <Typography variant="h4" gutterBottom>
              Payment Successful!
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Thank you for your purchase. Your payment has been processed successfully.
            </Typography>
          </Box>

          {/* Payment Details */}
          {session && (
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                Payment Details
              </Typography>
              
              <List>
                <ListItem>
                  <ListItemIcon>
                    <Receipt />
                  </ListItemIcon>
                  <ListItemText
                    primary="Order ID"
                    secondary={session.id}
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle />
                  </ListItemIcon>
                  <ListItemText
                    primary="Status"
                    secondary={
                      <Chip
                        label={session.payment_status === 'paid' ? 'Paid' : session.payment_status}
                        color={session.payment_status === 'paid' ? 'success' : 'default'}
                        size="small"
                      />
                    }
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <Receipt />
                  </ListItemIcon>
                  <ListItemText
                    primary="Total Amount"
                    secondary={formatCurrency(session.amount_total, session.currency)}
                  />
                </ListItem>
                
                {session.customer_email && (
                  <ListItem>
                    <ListItemIcon>
                      <Receipt />
                    </ListItemIcon>
                    <ListItemText
                      primary="Email"
                      secondary={session.customer_email}
                    />
                  </ListItem>
                )}
              </List>
            </Box>
          )}

          {/* Next Steps */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              What's Next?
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              • You will receive a confirmation email shortly
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              • The merchant will process your order
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              • You can track your order status in your account
            </Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button
              variant="outlined"
              startIcon={<Home />}
              onClick={handleGoHome}
            >
              Go Home
            </Button>
            <Button
              variant="contained"
              startIcon={<ShoppingCart />}
              onClick={handleGoToStore}
            >
              Continue Shopping
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

export default PaymentSuccess
