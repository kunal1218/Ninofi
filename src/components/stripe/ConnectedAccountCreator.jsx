/**
 * Connected Account Creator Component
 * 
 * This component allows users to create a new Stripe Connect account.
 * It uses the controller properties as specified in the requirements.
 */

import React, { useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Chip
} from '@mui/material'
import {
  AccountBalance,
  Business,
  Person,
  CheckCircle,
  Error as ErrorIcon
} from '@mui/icons-material'
import { useStripeConnect } from '../../contexts/StripeConnectContext'

const ConnectedAccountCreator = ({ onAccountCreated, onClose }) => {
  const { createConnectedAccount, isLoading, error, clearError } = useStripeConnect()
  
  // Form state
  const [activeStep, setActiveStep] = useState(0)
  const [formData, setFormData] = useState({
    // Basic account information
    email: '',
    country: 'US',
    businessType: 'individual', // individual, company, non_profit, government_entity
    
    // Business information (for company accounts)
    businessName: '',
    businessUrl: '',
    
    // Individual information
    firstName: '',
    lastName: '',
    phone: '',
    
    // Address information
    address: {
      line1: '',
      line2: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'US'
    }
  })

  // Validation state
  const [validationErrors, setValidationErrors] = useState({})

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Clear validation error for this field
    if (validationErrors[field]) {
      setValidationErrors(prev => ({
        ...prev,
        [field]: null
      }))
    }
  }

  // Handle nested object changes (like address)
  const handleNestedInputChange = (parentField, field, value) => {
    setFormData(prev => ({
      ...prev,
      [parentField]: {
        ...prev[parentField],
        [field]: value
      }
    }))
    
    // Clear validation error for this field
    const errorKey = `${parentField}.${field}`
    if (validationErrors[errorKey]) {
      setValidationErrors(prev => ({
        ...prev,
        [errorKey]: null
      }))
    }
  }

  // Validate form data
  const validateForm = () => {
    const errors = {}
    
    // Required fields validation
    if (!formData.email) errors.email = 'Email is required'
    if (!formData.country) errors.country = 'Country is required'
    if (!formData.businessType) errors.businessType = 'Business type is required'
    
    // Business-specific validation
    if (formData.businessType === 'company') {
      if (!formData.businessName) errors.businessName = 'Business name is required'
    }
    
    // Individual-specific validation
    if (formData.businessType === 'individual') {
      if (!formData.firstName) errors.firstName = 'First name is required'
      if (!formData.lastName) errors.lastName = 'Last name is required'
    }
    
    // Address validation
    if (!formData.address.line1) errors['address.line1'] = 'Address line 1 is required'
    if (!formData.address.city) errors['address.city'] = 'City is required'
    if (!formData.address.state) errors['address.state'] = 'State is required'
    if (!formData.address.postalCode) errors['address.postalCode'] = 'Postal code is required'
    
    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Handle form submission
  const handleSubmit = async () => {
    clearError()
    
    if (!validateForm()) {
      return
    }
    
    try {
      // Prepare account data according to Stripe Connect requirements
      const accountData = {
        // Use controller properties as specified
        controller: {
          // Platform controls fee collection - connected account pays fees
          fees: {
            payer: 'account'
          },
          // Stripe handles payment disputes and losses
          losses: {
            payments: 'stripe'
          },
          // Connected account gets full access to Stripe dashboard
          stripe_dashboard: {
            type: 'full'
          }
        },
        
        // Basic account information
        email: formData.email,
        country: formData.country,
        type: formData.businessType,
        
        // Business information
        business_profile: {
          name: formData.businessName,
          url: formData.businessUrl,
          mcc: '1520' // General contractors - you can customize this
        },
        
        // Individual information
        individual: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address
        },
        
        // Company information (if applicable)
        company: formData.businessType === 'company' ? {
          name: formData.businessName,
          address: formData.address
        } : undefined,
        
        // Capabilities - what the account can do
        capabilities: {
          card_payments: { requested: true },
          transfers: { requested: true }
        },
        
        // Settings
        settings: {
          payouts: {
            schedule: {
              interval: 'daily'
            }
          }
        }
      }
      
      // Create the connected account
      const account = await createConnectedAccount(accountData)
      
      // Call the callback with the created account
      onAccountCreated?.(account)
      
      // Reset form
      setActiveStep(0)
      setFormData({
        email: '',
        country: 'US',
        businessType: 'individual',
        businessName: '',
        businessUrl: '',
        firstName: '',
        lastName: '',
        phone: '',
        address: {
          line1: '',
          line2: '',
          city: '',
          state: '',
          postalCode: '',
          country: 'US'
        }
      })
      
    } catch (err) {
      console.error('Failed to create connected account:', err)
    }
  }

  // Handle step navigation
  const handleNext = () => {
    if (activeStep === 0) {
      // Validate basic info
      const errors = {}
      if (!formData.email) errors.email = 'Email is required'
      if (!formData.country) errors.country = 'Country is required'
      if (!formData.businessType) errors.businessType = 'Business type is required'
      
      setValidationErrors(errors)
      if (Object.keys(errors).length === 0) {
        setActiveStep(1)
      }
    } else if (activeStep === 1) {
      // Validate business/individual info
      const errors = {}
      if (formData.businessType === 'company' && !formData.businessName) {
        errors.businessName = 'Business name is required'
      }
      if (formData.businessType === 'individual') {
        if (!formData.firstName) errors.firstName = 'First name is required'
        if (!formData.lastName) errors.lastName = 'Last name is required'
      }
      
      setValidationErrors(errors)
      if (Object.keys(errors).length === 0) {
        setActiveStep(2)
      }
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    setActiveStep(prev => prev - 1)
  }

  const steps = [
    {
      label: 'Basic Information',
      description: 'Enter your email and business type'
    },
    {
      label: formData.businessType === 'company' ? 'Business Information' : 'Personal Information',
      description: formData.businessType === 'company' 
        ? 'Enter your business details'
        : 'Enter your personal details'
    },
    {
      label: 'Address Information',
      description: 'Enter your business address'
    }
  ]

  return (
    <Card sx={{ maxWidth: 600, mx: 'auto' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <AccountBalance sx={{ mr: 2, color: 'primary.main' }} />
          <Typography variant="h5" component="h2">
            Create Stripe Connect Account
          </Typography>
        </Box>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Set up your Stripe Connect account to start accepting payments. 
          This will create a connected account with full dashboard access.
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={clearError}>
            {error}
          </Alert>
        )}

        <Stepper activeStep={activeStep} orientation="vertical">
          {/* Step 1: Basic Information */}
          <Step>
            <StepLabel>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Business sx={{ mr: 1 }} />
                {steps[0].label}
              </Box>
            </StepLabel>
            <StepContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    error={!!validationErrors.email}
                    helperText={validationErrors.email}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={!!validationErrors.country}>
                    <InputLabel>Country</InputLabel>
                    <Select
                      value={formData.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                      label="Country"
                    >
                      <MenuItem value="US">United States</MenuItem>
                      <MenuItem value="CA">Canada</MenuItem>
                      <MenuItem value="GB">United Kingdom</MenuItem>
                      <MenuItem value="AU">Australia</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={!!validationErrors.businessType}>
                    <InputLabel>Business Type</InputLabel>
                    <Select
                      value={formData.businessType}
                      onChange={(e) => handleInputChange('businessType', e.target.value)}
                      label="Business Type"
                    >
                      <MenuItem value="individual">Individual</MenuItem>
                      <MenuItem value="company">Company</MenuItem>
                      <MenuItem value="non_profit">Non-profit</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </StepContent>
          </Step>

          {/* Step 2: Business/Personal Information */}
          <Step>
            <StepLabel>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {formData.businessType === 'company' ? <Business /> : <Person />}
                <Box sx={{ ml: 1 }}>{steps[1].label}</Box>
              </Box>
            </StepLabel>
            <StepContent>
              <Grid container spacing={2}>
                {formData.businessType === 'company' ? (
                  <>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Business Name"
                        value={formData.businessName}
                        onChange={(e) => handleInputChange('businessName', e.target.value)}
                        error={!!validationErrors.businessName}
                        helperText={validationErrors.businessName}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Business Website (optional)"
                        value={formData.businessUrl}
                        onChange={(e) => handleInputChange('businessUrl', e.target.value)}
                        placeholder="https://example.com"
                      />
                    </Grid>
                  </>
                ) : (
                  <>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="First Name"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        error={!!validationErrors.firstName}
                        helperText={validationErrors.firstName}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Last Name"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        error={!!validationErrors.lastName}
                        helperText={validationErrors.lastName}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Phone Number (optional)"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="+1 (555) 123-4567"
                      />
                    </Grid>
                  </>
                )}
              </Grid>
            </StepContent>
          </Step>

          {/* Step 3: Address Information */}
          <Step>
            <StepLabel>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccountBalance sx={{ mr: 1 }} />
                {steps[2].label}
              </Box>
            </StepLabel>
            <StepContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Address Line 1"
                    value={formData.address.line1}
                    onChange={(e) => handleNestedInputChange('address', 'line1', e.target.value)}
                    error={!!validationErrors['address.line1']}
                    helperText={validationErrors['address.line1']}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Address Line 2 (optional)"
                    value={formData.address.line2}
                    onChange={(e) => handleNestedInputChange('address', 'line2', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="City"
                    value={formData.address.city}
                    onChange={(e) => handleNestedInputChange('address', 'city', e.target.value)}
                    error={!!validationErrors['address.city']}
                    helperText={validationErrors['address.city']}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    label="State"
                    value={formData.address.state}
                    onChange={(e) => handleNestedInputChange('address', 'state', e.target.value)}
                    error={!!validationErrors['address.state']}
                    helperText={validationErrors['address.state']}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    label="Postal Code"
                    value={formData.address.postalCode}
                    onChange={(e) => handleNestedInputChange('address', 'postalCode', e.target.value)}
                    error={!!validationErrors['address.postalCode']}
                    helperText={validationErrors['address.postalCode']}
                    required
                  />
                </Grid>
              </Grid>
            </StepContent>
          </Step>
        </Stepper>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
          >
            Back
          </Button>
          
          <Box>
            <Button
              onClick={onClose}
              sx={{ mr: 2 }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={isLoading}
              startIcon={isLoading ? <CircularProgress size={20} /> : null}
            >
              {activeStep === steps.length - 1 ? 'Create Account' : 'Next'}
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default ConnectedAccountCreator
