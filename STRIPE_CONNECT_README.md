# Stripe Connect Integration

This document provides a comprehensive guide for the Stripe Connect integration in your Ninofi contracting application.

## Overview

The Stripe Connect integration allows your application to:
- Create and manage connected accounts for contractors
- Onboard accounts to accept payments
- Create and manage products for connected accounts
- Process payments with Direct Charge and application fees
- Provide customer storefronts for purchasing products

## Features Implemented

### ✅ Account Management
- **Connected Account Creation**: Create Stripe Connect accounts with controller properties
- **Account Onboarding**: Complete onboarding flow using Stripe Account Links
- **Status Monitoring**: Real-time account status checking

### ✅ Product Management
- **Product Creation**: Create products on connected accounts using Stripe-Account header
- **Product Listing**: Display and manage products for each connected account
- **Category Management**: Organize products by categories

### ✅ Payment Processing
- **Direct Charge**: Process payments directly to connected accounts
- **Application Fees**: Collect platform fees on each transaction
- **Hosted Checkout**: Secure payment processing using Stripe Checkout

### ✅ Customer Experience
- **Storefront**: Customer-facing product catalog
- **Shopping Cart**: Add/remove products, quantity management
- **Payment Success**: Confirmation page with order details

## File Structure

```
src/
├── config/
│   └── stripeConnect.js          # Stripe Connect configuration
├── contexts/
│   └── StripeConnectContext.jsx  # React context for Stripe Connect
├── components/stripe/
│   ├── ConnectedAccountCreator.jsx  # Account creation form
│   ├── AccountOnboarding.jsx        # Onboarding flow
│   ├── ProductManager.jsx           # Product management
│   ├── CustomerStorefront.jsx       # Customer storefront
│   └── StripeConnectDashboard.jsx   # Main dashboard
├── pages/
│   └── PaymentSuccess.jsx           # Payment confirmation
└── api/
    └── stripeConnectAPI.js          # Backend API endpoints (template)
```

## Setup Instructions

### 1. Install Dependencies

```bash
npm install stripe@13.4.0 @stripe/connect-js@1.0.0 @stripe/react-connect-js@1.0.0
```

### 2. Environment Variables

Create a `.env` file in your project root:

```env
# Stripe Configuration
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
REACT_APP_STRIPE_SECRET_KEY=sk_test_your_secret_key_here
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_FRONTEND_URL=http://localhost:3000
```

### 3. Backend Implementation

You need to implement the backend API endpoints. See `src/api/stripeConnectAPI.js` for the complete implementation template.

**Key Backend Requirements:**
- Node.js/Express server (or your preferred backend)
- Stripe SDK installed: `npm install stripe`
- Environment variables for Stripe secret key
- CORS enabled for frontend communication

### 4. Stripe Dashboard Setup

1. **Create Stripe Account**: Sign up at https://dashboard.stripe.com
2. **Get API Keys**: Copy your publishable and secret keys
3. **Enable Connect**: Enable Stripe Connect in your dashboard
4. **Set Webhooks**: Configure webhooks for account updates (optional)

## API Endpoints Required

Your backend must implement these endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/stripe/accounts/create` | Create connected account |
| GET | `/api/stripe/accounts/:id` | Get account status |
| POST | `/api/stripe/accounts/link` | Create onboarding link |
| POST | `/api/stripe/products/create` | Create product |
| GET | `/api/stripe/products/:accountId` | Get products |
| POST | `/api/stripe/checkout/create` | Create checkout session |
| GET | `/api/stripe/checkout/:sessionId` | Get session details |

## Usage Guide

### 1. Access the Dashboard

Navigate to `/stripe-connect` in your application to access the Stripe Connect dashboard.

### 2. Create Connected Account

1. Click "Create Account" in the Accounts tab
2. Fill in the required information:
   - Email and country
   - Business type (individual/company)
   - Personal or business details
   - Address information
3. Submit the form to create the account

### 3. Complete Onboarding

1. Select the created account
2. Go to the Onboarding tab
3. Click "Complete Onboarding" to start the Stripe onboarding process
4. Complete all required steps in the Stripe interface
5. Return to your application to verify status

### 4. Manage Products

1. Select an onboarded account
2. Go to the Products tab
3. Click "Add Product" to create new products
4. Fill in product details (name, description, price, category)
5. Products will be available in the storefront

### 5. Customer Storefront

1. Go to the Storefront tab
2. Browse available products
3. Add products to cart
4. Proceed to checkout
5. Complete payment through Stripe Checkout

## Key Features Explained

### Controller Properties

The integration uses Stripe's controller properties as specified:

```javascript
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
}
```

### Direct Charge with Application Fees

Payments are processed using Direct Charge with application fees:

```javascript
stripe.checkout.sessions.create({
  line_items: [...],
  payment_intent_data: {
    application_fee_amount: 123 // Platform fee in cents
  },
  mode: 'payment',
  success_url: '...',
  cancel_url: '...'
}, {
  stripeAccount: accountId // Connected account header
})
```

### Stripe-Account Header

All operations on connected accounts use the Stripe-Account header:

```javascript
// Example for product creation
stripe.products.create(productData, {
  stripeAccount: accountId
})
```

## Error Handling

The integration includes comprehensive error handling:

- **Validation Errors**: Form validation with user-friendly messages
- **API Errors**: Stripe API error handling with fallback messages
- **Network Errors**: Connection error handling and retry mechanisms
- **User Feedback**: Loading states and success/error notifications

## Security Considerations

1. **API Keys**: Never expose secret keys in frontend code
2. **HTTPS**: Always use HTTPS in production
3. **Webhooks**: Implement webhook verification for production
4. **Validation**: Validate all user inputs on both frontend and backend
5. **Rate Limiting**: Implement rate limiting on API endpoints

## Testing

### Test Mode
- Use Stripe test mode for development
- Test with Stripe test cards: https://stripe.com/docs/testing
- Use test account IDs for development

### Test Cards
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- 3D Secure: `4000 0025 0000 3155`

## Production Deployment

1. **Switch to Live Mode**: Update API keys to live keys
2. **Webhook Setup**: Configure production webhooks
3. **Domain Verification**: Verify your domain in Stripe dashboard
4. **SSL Certificate**: Ensure HTTPS is enabled
5. **Monitoring**: Set up error monitoring and logging

## Troubleshooting

### Common Issues

1. **"Missing required fields"**: Check that all required form fields are filled
2. **"Account not found"**: Ensure the account ID is correct and account exists
3. **"Payment failed"**: Check Stripe dashboard for detailed error messages
4. **"CORS error"**: Ensure backend has CORS enabled for your frontend domain

### Debug Mode

Enable debug mode by adding to your environment variables:
```env
REACT_APP_DEBUG_STRIPE=true
```

## Support

- **Stripe Documentation**: https://stripe.com/docs/connect
- **Stripe Support**: https://support.stripe.com
- **API Reference**: https://stripe.com/docs/api

## License

This integration is part of the Ninofi contracting application and follows the same license terms.
