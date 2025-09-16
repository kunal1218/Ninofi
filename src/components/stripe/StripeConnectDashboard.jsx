/**
 * Stripe Connect Dashboard Component
 * 
 * This is the main dashboard that integrates all Stripe Connect functionality.
 * It provides a complete flow for account creation, onboarding, product management,
 * and customer storefront access.
 */

import React, { useState, useEffect } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Tabs,
  Tab,
  Grid,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material'
import {
  AccountBalance,
  Store,
  ShoppingCart,
  Add,
  CheckCircle,
  Warning,
  Business,
  Payment,
  Inventory
} from '@mui/icons-material'
import { useStripeConnect } from '../../contexts/StripeConnectContext'
import ConnectedAccountCreator from './ConnectedAccountCreator'
import AccountOnboarding from './AccountOnboarding'
import ProductManager from './ProductManager'
import CustomerStorefront from './CustomerStorefront'

const StripeConnectDashboard = () => {
  const { 
    connectedAccounts, 
    currentAccount, 
    setCurrentAccount,
    isLoading,
    error,
    clearError
  } = useStripeConnect()
  
  const [activeTab, setActiveTab] = useState(0)
  const [showAccountCreator, setShowAccountCreator] = useState(false)
  const [selectedAccountId, setSelectedAccountId] = useState(null)

  // Set default account when accounts are loaded
  useEffect(() => {
    if (connectedAccounts.length > 0 && !currentAccount) {
      setCurrentAccount(connectedAccounts[0])
      setSelectedAccountId(connectedAccounts[0].id)
    }
  }, [connectedAccounts, currentAccount, setCurrentAccount])

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  // Handle account selection
  const handleAccountSelect = (account) => {
    setCurrentAccount(account)
    setSelectedAccountId(account.id)
  }

  // Handle account creation
  const handleAccountCreated = (account) => {
    setCurrentAccount(account)
    setSelectedAccountId(account.id)
    setShowAccountCreator(false)
    setActiveTab(1) // Switch to onboarding tab
  }

  // Handle onboarding completion
  const handleOnboardingComplete = (account) => {
    setCurrentAccount(account)
    setActiveTab(2) // Switch to product management tab
  }

  // Get account status color
  const getAccountStatusColor = (account) => {
    if (account.details_submitted && account.charges_enabled && account.payouts_enabled) {
      return 'success'
    } else if (account.details_submitted) {
      return 'warning'
    } else {
      return 'default'
    }
  }

  // Get account status text
  const getAccountStatusText = (account) => {
    if (account.details_submitted && account.charges_enabled && account.payouts_enabled) {
      return 'Fully Onboarded'
    } else if (account.details_submitted) {
      return 'Partially Onboarded'
    } else {
      return 'Not Onboarded'
    }
  }

  // Tab content components
  const tabContent = [
    // Account Management Tab
    {
      label: 'Accounts',
      icon: <AccountBalance />,
      content: (
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6">
              Connected Accounts
            </Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setShowAccountCreator(true)}
            >
              Create Account
            </Button>
          </Box>

          {connectedAccounts.length === 0 ? (
            <Card>
              <CardContent>
                <Box sx={{ textAlign: 'center', p: 4 }}>
                  <Business sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    No Connected Accounts
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Create your first Stripe Connect account to start accepting payments
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => setShowAccountCreator(true)}
                  >
                    Create Account
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ) : (
            <Grid container spacing={2}>
              {connectedAccounts.map((account) => (
                <Grid item xs={12} sm={6} md={4} key={account.id}>
                  <Card 
                    sx={{ 
                      cursor: 'pointer',
                      border: selectedAccountId === account.id ? 2 : 1,
                      borderColor: selectedAccountId === account.id ? 'primary.main' : 'divider'
                    }}
                    onClick={() => handleAccountSelect(account)}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <AccountBalance sx={{ mr: 1, color: 'primary.main' }} />
                        <Typography variant="h6">
                          {account.business_profile?.name || account.email}
                        </Typography>
                      </Box>
                      
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {account.email}
                      </Typography>
                      
                      <Chip
                        label={getAccountStatusText(account)}
                        color={getAccountStatusColor(account)}
                        size="small"
                        sx={{ mb: 2 }}
                      />
                      
                      <List dense>
                        <ListItem sx={{ px: 0 }}>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <CheckCircle 
                              color={account.details_submitted ? 'success' : 'disabled'} 
                              fontSize="small" 
                            />
                          </ListItemIcon>
                          <ListItemText 
                            primary="Details Submitted" 
                            primaryTypographyProps={{ variant: 'body2' }}
                          />
                        </ListItem>
                        <ListItem sx={{ px: 0 }}>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <Payment 
                              color={account.charges_enabled ? 'success' : 'disabled'} 
                              fontSize="small" 
                            />
                          </ListItemIcon>
                          <ListItemText 
                            primary="Payments Enabled" 
                            primaryTypographyProps={{ variant: 'body2' }}
                          />
                        </ListItem>
                        <ListItem sx={{ px: 0 }}>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <Business 
                              color={account.payouts_enabled ? 'success' : 'disabled'} 
                              fontSize="small" 
                            />
                          </ListItemIcon>
                          <ListItemText 
                            primary="Payouts Enabled" 
                            primaryTypographyProps={{ variant: 'body2' }}
                          />
                        </ListItem>
                      </List>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      )
    },
    
    // Onboarding Tab
    {
      label: 'Onboarding',
      icon: <CheckCircle />,
      content: selectedAccountId ? (
        <AccountOnboarding 
          accountId={selectedAccountId}
          onOnboardingComplete={handleOnboardingComplete}
        />
      ) : (
        <Card>
          <CardContent>
            <Alert severity="info">
              Please select an account from the Accounts tab to view onboarding status.
            </Alert>
          </CardContent>
        </Card>
      )
    },
    
    // Product Management Tab
    {
      label: 'Products',
      icon: <Inventory />,
      content: selectedAccountId ? (
        <ProductManager accountId={selectedAccountId} />
      ) : (
        <Card>
          <CardContent>
            <Alert severity="info">
              Please select an account from the Accounts tab to manage products.
            </Alert>
          </CardContent>
        </Card>
      )
    },
    
    // Customer Storefront Tab
    {
      label: 'Storefront',
      icon: <Store />,
      content: selectedAccountId ? (
        <CustomerStorefront accountId={selectedAccountId} />
      ) : (
        <Card>
          <CardContent>
            <Alert severity="info">
              Please select an account from the Accounts tab to view the storefront.
            </Alert>
          </CardContent>
        </Card>
      )
    }
  ]

  if (isLoading && connectedAccounts.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Stripe Connect Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage connected accounts, products, and customer storefronts
        </Typography>
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={clearError}>
          {error}
        </Alert>
      )}

      {/* Tabs */}
      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={handleTabChange}>
            {tabContent.map((tab, index) => (
              <Tab
                key={index}
                label={tab.label}
                icon={tab.icon}
                iconPosition="start"
              />
            ))}
          </Tabs>
        </Box>
        
        <CardContent>
          {tabContent[activeTab].content}
        </CardContent>
      </Card>

      {/* Account Creator Dialog */}
      <Dialog
        open={showAccountCreator}
        onClose={() => setShowAccountCreator(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Create New Connected Account
        </DialogTitle>
        <DialogContent>
          <ConnectedAccountCreator
            onAccountCreated={handleAccountCreated}
            onClose={() => setShowAccountCreator(false)}
          />
        </DialogContent>
      </Dialog>
    </Box>
  )
}

export default StripeConnectDashboard
