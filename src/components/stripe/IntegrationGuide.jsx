/**
 * Integration Guide Component
 * 
 * This component provides a quick guide for using the Stripe Connect integration.
 * It can be used as a help section or onboarding guide.
 */

import React, { useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid
} from '@mui/material'
import {
  AccountBalance,
  CheckCircle,
  Store,
  Payment,
  Code,
  Settings,
  ExpandMore,
  PlayArrow,
  Info
} from '@mui/icons-material'

const IntegrationGuide = () => {
  const [expandedStep, setExpandedStep] = useState(0)

  const steps = [
    {
      title: 'Setup & Configuration',
      description: 'Configure your Stripe Connect integration',
      icon: <Settings />,
      content: (
        <Box>
          <Typography variant="h6" gutterBottom>
            1. Install Dependencies
          </Typography>
          <Box sx={{ bgcolor: 'grey.100', p: 2, borderRadius: 1, mb: 2 }}>
            <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace' }}>
{`npm install stripe@13.4.0 @stripe/connect-js@1.0.0 @stripe/react-connect-js@1.0.0`}
            </Typography>
          </Box>

          <Typography variant="h6" gutterBottom>
            2. Environment Variables
          </Typography>
          <Box sx={{ bgcolor: 'grey.100', p: 2, borderRadius: 1, mb: 2 }}>
            <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace' }}>
{`REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_...
REACT_APP_STRIPE_SECRET_KEY=sk_test_...
REACT_APP_API_URL=http://localhost:3001/api`}
            </Typography>
          </Box>

          <Typography variant="h6" gutterBottom>
            3. Backend Implementation
          </Typography>
          <Typography variant="body2" paragraph>
            Implement the API endpoints in <code>src/api/stripeConnectAPI.js</code> on your backend server.
          </Typography>
        </Box>
      )
    },
    {
      title: 'Create Connected Account',
      description: 'Set up a new Stripe Connect account',
      icon: <AccountBalance />,
      content: (
        <Box>
          <Typography variant="h6" gutterBottom>
            Account Creation Process
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
              <ListItemText 
                primary="Basic Information" 
                secondary="Email, country, and business type"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
              <ListItemText 
                primary="Business Details" 
                secondary="Company or individual information"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
              <ListItemText 
                primary="Address Information" 
                secondary="Complete business address"
              />
            </ListItem>
          </List>

          <Alert severity="info" sx={{ mt: 2 }}>
            <Typography variant="body2">
              <strong>Controller Properties:</strong> The integration uses Stripe's controller properties
              to ensure platform controls fee collection and connected accounts get full dashboard access.
            </Typography>
          </Alert>
        </Box>
      )
    },
    {
      title: 'Complete Onboarding',
      description: 'Onboard the account to accept payments',
      icon: <CheckCircle />,
      content: (
        <Box>
          <Typography variant="h6" gutterBottom>
            Onboarding Requirements
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" color="primary">
                    Details Submitted
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Complete business information and verification
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" color="primary">
                    Payments Enabled
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Complete payment setup to accept charges
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" color="primary">
                    Payouts Enabled
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Complete payout setup to receive funds
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Alert severity="warning" sx={{ mt: 2 }}>
            <Typography variant="body2">
              <strong>Important:</strong> All three requirements must be completed before
              the account can process payments.
            </Typography>
          </Alert>
        </Box>
      )
    },
    {
      title: 'Manage Products',
      description: 'Create and manage products for the storefront',
      icon: <Store />,
      content: (
        <Box>
          <Typography variant="h6" gutterBottom>
            Product Management Features
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
              <ListItemText 
                primary="Product Creation" 
                secondary="Name, description, price, and category"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
              <ListItemText 
                primary="Price Management" 
                secondary="Set prices in multiple currencies"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
              <ListItemText 
                primary="Category Organization" 
                secondary="Organize products by type"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
              <ListItemText 
                primary="Status Management" 
                secondary="Activate/deactivate products"
              />
            </ListItem>
          </List>

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            Stripe-Account Header Usage
          </Typography>
          <Box sx={{ bgcolor: 'grey.100', p: 2, borderRadius: 1 }}>
            <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace' }}>
{`stripe.products.create(productData, {
  stripeAccount: accountId // Connected account header
})`}
            </Typography>
          </Box>
        </Box>
      )
    },
    {
      title: 'Customer Storefront',
      description: 'Enable customers to purchase products',
      icon: <Payment />,
      content: (
        <Box>
          <Typography variant="h6" gutterBottom>
            Storefront Features
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
              <ListItemText 
                primary="Product Catalog" 
                secondary="Display all available products"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
              <ListItemText 
                primary="Shopping Cart" 
                secondary="Add/remove products and manage quantities"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
              <ListItemText 
                primary="Secure Checkout" 
                secondary="Stripe Checkout with Direct Charge"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
              <ListItemText 
                primary="Application Fees" 
                secondary="Platform monetization on each transaction"
              />
            </ListItem>
          </List>

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            Direct Charge Implementation
          </Typography>
          <Box sx={{ bgcolor: 'grey.100', p: 2, borderRadius: 1 }}>
            <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace' }}>
{`stripe.checkout.sessions.create({
  line_items: [...],
  payment_intent_data: {
    application_fee_amount: 123 // Platform fee
  },
  mode: 'payment'
}, {
  stripeAccount: accountId // Direct Charge
})`}
            </Typography>
          </Box>
        </Box>
      )
    }
  ]

  const handleStepChange = (step) => {
    setExpandedStep(step)
  }

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Code sx={{ mr: 2, color: 'primary.main' }} />
          <Typography variant="h5">
            Stripe Connect Integration Guide
          </Typography>
        </Box>

        <Typography variant="body1" color="text.secondary" paragraph>
          This guide will walk you through setting up and using the Stripe Connect integration
          in your Mavu contracting application.
        </Typography>

        <Stepper activeStep={expandedStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={index}>
              <StepLabel
                icon={step.icon}
                onClick={() => handleStepChange(index)}
                sx={{ cursor: 'pointer' }}
              >
                <Box>
                  <Typography variant="h6">{step.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {step.description}
                  </Typography>
                </Box>
              </StepLabel>
              <StepContent>
                {step.content}
                <Box sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                    onClick={() => handleStepChange(index + 1)}
                    disabled={index === steps.length - 1}
                    startIcon={<PlayArrow />}
                    sx={{ mr: 1 }}
                  >
                    {index === steps.length - 1 ? 'Complete' : 'Next Step'}
                  </Button>
                  {index > 0 && (
                    <Button onClick={() => handleStepChange(index - 1)}>
                      Previous
                    </Button>
                  )}
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>
          Quick Start
        </Typography>
        <Typography variant="body2" paragraph>
          To get started quickly:
        </Typography>
        <List dense>
          <ListItem>
            <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
            <ListItemText primary="1. Set up your environment variables" />
          </ListItem>
          <ListItem>
            <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
            <ListItemText primary="2. Implement the backend API endpoints" />
          </ListItem>
          <ListItem>
            <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
            <ListItemText primary="3. Navigate to /stripe-connect in your app" />
          </ListItem>
          <ListItem>
            <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
            <ListItemText primary="4. Create your first connected account" />
          </ListItem>
        </List>

        <Alert severity="info" sx={{ mt: 2 }}>
          <Typography variant="body2">
            <strong>Need Help?</strong> Check the complete documentation in 
            <code> STRIPE_CONNECT_README.md</code> for detailed setup instructions.
          </Typography>
        </Alert>
      </CardContent>
    </Card>
  )
}

export default IntegrationGuide
