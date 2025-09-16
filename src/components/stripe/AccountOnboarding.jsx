/**
 * Account Onboarding Component
 * 
 * This component handles the Stripe Connect account onboarding process.
 * It shows the current account status and allows users to complete onboarding.
 */

import React, { useState, useEffect } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Alert,
  CircularProgress,
  Chip,
  Grid,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material'
import {
  CheckCircle,
  Error as ErrorIcon,
  Warning,
  Info,
  Launch,
  Refresh,
  AccountBalance,
  Payment,
  Business
} from '@mui/icons-material'
import { useStripeConnect } from '../../contexts/StripeConnectContext'

const AccountOnboarding = ({ accountId, onOnboardingComplete }) => {
  const { 
    getAccountStatus, 
    createAccountLink, 
    accountStatus, 
    isLoading, 
    error, 
    clearError 
  } = useStripeConnect()
  
  const [isCreatingLink, setIsCreatingLink] = useState(false)
  const [onboardingUrl, setOnboardingUrl] = useState(null)

  // Load account status on component mount
  useEffect(() => {
    if (accountId) {
      loadAccountStatus()
    }
  }, [accountId])

  // Load account status from API
  const loadAccountStatus = async () => {
    try {
      await getAccountStatus(accountId)
    } catch (err) {
      console.error('Failed to load account status:', err)
    }
  }

  // Create account link for onboarding
  const handleStartOnboarding = async () => {
    setIsCreatingLink(true)
    clearError()
    
    try {
      const url = await createAccountLink(accountId)
      setOnboardingUrl(url)
      
      // Open onboarding in new window
      window.open(url, '_blank', 'width=800,height=600')
    } catch (err) {
      console.error('Failed to create account link:', err)
    } finally {
      setIsCreatingLink(false)
    }
  }

  // Refresh account status
  const handleRefreshStatus = () => {
    loadAccountStatus()
  }

  // Get status color based on account status
  const getStatusColor = (status) => {
    switch (status) {
      case 'complete':
        return 'success'
      case 'pending':
        return 'warning'
      case 'restricted':
        return 'error'
      default:
        return 'default'
    }
  }

  // Get status icon based on account status
  const getStatusIcon = (status) => {
    switch (status) {
      case 'complete':
        return <CheckCircle />
      case 'pending':
        return <Warning />
      case 'restricted':
        return <ErrorIcon />
      default:
        return <Info />
    }
  }

  // Get onboarding progress percentage
  const getOnboardingProgress = () => {
    if (!accountStatus) return 0
    
    const { details_submitted, charges_enabled, payouts_enabled } = accountStatus
    
    let progress = 0
    if (details_submitted) progress += 33
    if (charges_enabled) progress += 33
    if (payouts_enabled) progress += 34
    
    return progress
  }

  // Get onboarding requirements
  const getOnboardingRequirements = () => {
    if (!accountStatus) return []
    
    const requirements = []
    
    if (!accountStatus.details_submitted) {
      requirements.push({
        id: 'details',
        label: 'Submit business details',
        description: 'Complete your business information and verification',
        completed: false
      })
    }
    
    if (!accountStatus.charges_enabled) {
      requirements.push({
        id: 'charges',
        label: 'Enable payments',
        description: 'Complete payment setup to accept charges',
        completed: false
      })
    }
    
    if (!accountStatus.payouts_enabled) {
      requirements.push({
        id: 'payouts',
        label: 'Enable payouts',
        description: 'Complete payout setup to receive funds',
        completed: false
      })
    }
    
    return requirements
  }

  // Check if onboarding is complete
  const isOnboardingComplete = () => {
    return accountStatus && 
           accountStatus.details_submitted && 
           accountStatus.charges_enabled && 
           accountStatus.payouts_enabled
  }

  // Handle onboarding completion
  useEffect(() => {
    if (isOnboardingComplete() && onOnboardingComplete) {
      onOnboardingComplete(accountStatus)
    }
  }, [accountStatus, onOnboardingComplete])

  if (isLoading && !accountStatus) {
    return (
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress />
          </Box>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent>
          <Alert severity="error" action={
            <Button color="inherit" size="small" onClick={handleRefreshStatus}>
              Retry
            </Button>
          }>
            {error}
          </Alert>
        </CardContent>
      </Card>
    )
  }

  if (!accountStatus) {
    return (
      <Card>
        <CardContent>
          <Alert severity="info">
            No account found. Please create a connected account first.
          </Alert>
        </CardContent>
      </Card>
    )
  }

  const progress = getOnboardingProgress()
  const requirements = getOnboardingRequirements()
  const isComplete = isOnboardingComplete()

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <AccountBalance sx={{ mr: 2, color: 'primary.main' }} />
          <Typography variant="h6">
            Account Onboarding
          </Typography>
          <Box sx={{ ml: 'auto' }}>
            <Button
              startIcon={<Refresh />}
              onClick={handleRefreshStatus}
              disabled={isLoading}
              size="small"
            >
              Refresh
            </Button>
          </Box>
        </Box>

        {/* Account Status */}
        <Box sx={{ mb: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">
                Account Status
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <Chip
                  icon={getStatusIcon(accountStatus.details_submitted ? 'complete' : 'pending')}
                  label={accountStatus.details_submitted ? 'Complete' : 'Pending'}
                  color={getStatusColor(accountStatus.details_submitted ? 'complete' : 'pending')}
                  size="small"
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">
                Progress
              </Typography>
              <Box sx={{ mt: 1 }}>
                <LinearProgress 
                  variant="determinate" 
                  value={progress} 
                  sx={{ mb: 1 }}
                />
                <Typography variant="caption" color="text.secondary">
                  {progress}% Complete
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Capabilities Status */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" gutterBottom>
            Account Capabilities
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Payment sx={{ mr: 1, color: accountStatus.charges_enabled ? 'success.main' : 'text.secondary' }} />
                <Typography variant="body2">
                  {accountStatus.charges_enabled ? 'Payments Enabled' : 'Payments Disabled'}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Business sx={{ mr: 1, color: accountStatus.payouts_enabled ? 'success.main' : 'text.secondary' }} />
                <Typography variant="body2">
                  {accountStatus.payouts_enabled ? 'Payouts Enabled' : 'Payouts Disabled'}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CheckCircle sx={{ mr: 1, color: accountStatus.details_submitted ? 'success.main' : 'text.secondary' }} />
                <Typography variant="body2">
                  {accountStatus.details_submitted ? 'Details Submitted' : 'Details Pending'}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Onboarding Requirements */}
        {requirements.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" gutterBottom>
              Onboarding Requirements
            </Typography>
            <List dense>
              {requirements.map((requirement, index) => (
                <React.Fragment key={requirement.id}>
                  <ListItem>
                    <ListItemIcon>
                      <Warning color="warning" />
                    </ListItemIcon>
                    <ListItemText
                      primary={requirement.label}
                      secondary={requirement.description}
                    />
                  </ListItem>
                  {index < requirements.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Box>
        )}

        {/* Success Message */}
        {isComplete && (
          <Alert severity="success" sx={{ mb: 3 }}>
            <Typography variant="body2">
              <strong>Congratulations!</strong> Your Stripe Connect account is fully set up and ready to accept payments.
            </Typography>
          </Alert>
        )}

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          {!isComplete ? (
            <Button
              variant="contained"
              startIcon={isCreatingLink ? <CircularProgress size={20} /> : <Launch />}
              onClick={handleStartOnboarding}
              disabled={isCreatingLink || isLoading}
              size="large"
            >
              {isCreatingLink ? 'Creating Link...' : 'Complete Onboarding'}
            </Button>
          ) : (
            <Button
              variant="outlined"
              startIcon={<CheckCircle />}
              disabled
            >
              Onboarding Complete
            </Button>
          )}
        </Box>

        {/* Onboarding URL Info */}
        {onboardingUrl && (
          <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Onboarding link created. If the window didn't open automatically, 
              <Button
                size="small"
                onClick={() => window.open(onboardingUrl, '_blank')}
                sx={{ ml: 1 }}
              >
                click here to open
              </Button>
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  )
}

export default AccountOnboarding
