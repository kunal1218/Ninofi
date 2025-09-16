/**
 * Stripe Connect API Endpoints
 * 
 * This file contains all the backend API endpoints for Stripe Connect operations.
 * These endpoints should be implemented on your backend server.
 * 
 * IMPORTANT: This is a template showing the expected API structure.
 * You need to implement these endpoints on your backend server using your preferred
 * technology (Node.js, Python, Ruby, etc.).
 */

// Example implementation for Node.js/Express
// You would typically put this in your backend server

/**
 * POST /api/stripe/accounts/create
 * Creates a new Stripe Connect account
 * 
 * Expected request body:
 * {
 *   "email": "user@example.com",
 *   "country": "US",
 *   "businessType": "individual",
 *   "businessName": "My Business",
 *   "firstName": "John",
 *   "lastName": "Doe",
 *   "address": {
 *     "line1": "123 Main St",
 *     "city": "New York",
 *     "state": "NY",
 *     "postalCode": "10001",
 *     "country": "US"
 *   }
 * }
 * 
 * Expected response:
 * {
 *   "id": "acct_1234567890",
 *   "email": "user@example.com",
 *   "details_submitted": false,
 *   "charges_enabled": false,
 *   "payouts_enabled": false,
 *   "created": 1234567890
 * }
 */
const createConnectedAccount = async (req, res) => {
  try {
    const { email, country, businessType, businessName, firstName, lastName, address } = req.body

    // Validate required fields
    if (!email || !country || !businessType) {
      return res.status(400).json({ 
        error: 'Missing required fields: email, country, businessType' 
      })
    }

    // Create account using Stripe API with controller properties
    const account = await stripe.accounts.create({
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
      email,
      country,
      type: businessType,
      business_profile: businessName ? {
        name: businessName,
        mcc: '1520' // General contractors
      } : undefined,
      individual: {
        first_name: firstName,
        last_name: lastName,
        email,
        address
      },
      company: businessType === 'company' ? {
        name: businessName,
        address
      } : undefined,
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true }
      },
      settings: {
        payouts: {
          schedule: {
            interval: 'daily'
          }
        }
      }
    })

    res.json(account)
  } catch (error) {
    console.error('Error creating connected account:', error)
    res.status(500).json({ 
      error: 'Failed to create connected account',
      message: error.message 
    })
  }
}

/**
 * GET /api/stripe/accounts/:accountId
 * Retrieves account details and status
 * 
 * Expected response:
 * {
 *   "id": "acct_1234567890",
 *   "email": "user@example.com",
 *   "details_submitted": true,
 *   "charges_enabled": true,
 *   "payouts_enabled": true,
 *   "business_profile": {
 *     "name": "My Business"
 *   },
 *   "created": 1234567890
 * }
 */
const getAccount = async (req, res) => {
  try {
    const { accountId } = req.params

    if (!accountId) {
      return res.status(400).json({ error: 'Account ID is required' })
    }

    // Retrieve account from Stripe API
    const account = await stripe.accounts.retrieve(accountId)

    res.json(account)
  } catch (error) {
    console.error('Error retrieving account:', error)
    res.status(500).json({ 
      error: 'Failed to retrieve account',
      message: error.message 
    })
  }
}

/**
 * POST /api/stripe/accounts/link
 * Creates an account link for onboarding
 * 
 * Expected request body:
 * {
 *   "accountId": "acct_1234567890"
 * }
 * 
 * Expected response:
 * {
 *   "url": "https://connect.stripe.com/setup/c/acct_1234567890/..."
 * }
 */
const createAccountLink = async (req, res) => {
  try {
    const { accountId } = req.body

    if (!accountId) {
      return res.status(400).json({ error: 'Account ID is required' })
    }

    // Create account link for onboarding
    const accountLink = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: `${process.env.FRONTEND_URL}/stripe-connect?refresh=true`,
      return_url: `${process.env.FRONTEND_URL}/stripe-connect?return=true`,
      type: 'account_onboarding'
    })

    res.json({ url: accountLink.url })
  } catch (error) {
    console.error('Error creating account link:', error)
    res.status(500).json({ 
      error: 'Failed to create account link',
      message: error.message 
    })
  }
}

/**
 * POST /api/stripe/products/create
 * Creates a product on a connected account
 * 
 * Expected request body:
 * {
 *   "name": "My Product",
 *   "description": "Product description",
 *   "price": 2999, // in cents
 *   "currency": "usd",
 *   "accountId": "acct_1234567890"
 * }
 * 
 * Expected response:
 * {
 *   "id": "prod_1234567890",
 *   "name": "My Product",
 *   "description": "Product description",
 *   "active": true,
 *   "default_price": {
 *     "id": "price_1234567890",
 *     "unit_amount": 2999,
 *     "currency": "usd"
 *   },
 *   "created": 1234567890
 * }
 */
const createProduct = async (req, res) => {
  try {
    const { name, description, price, currency, accountId } = req.body

    if (!name || !price || !currency || !accountId) {
      return res.status(400).json({ 
        error: 'Missing required fields: name, price, currency, accountId' 
      })
    }

    // Create product on the connected account using Stripe-Account header
    const product = await stripe.products.create({
      name,
      description,
      default_price_data: {
        unit_amount: price,
        currency
      }
    }, {
      stripeAccount: accountId // This sets the Stripe-Account header
    })

    res.json(product)
  } catch (error) {
    console.error('Error creating product:', error)
    res.status(500).json({ 
      error: 'Failed to create product',
      message: error.message 
    })
  }
}

/**
 * GET /api/stripe/products/:accountId
 * Retrieves products for a connected account
 * 
 * Expected response:
 * {
 *   "data": [
 *     {
 *       "id": "prod_1234567890",
 *       "name": "My Product",
 *       "description": "Product description",
 *       "active": true,
 *       "default_price": {
 *         "id": "price_1234567890",
 *         "unit_amount": 2999,
 *         "currency": "usd"
 *       },
 *       "created": 1234567890
 *     }
 *   ]
 * }
 */
const getProducts = async (req, res) => {
  try {
    const { accountId } = req.params

    if (!accountId) {
      return res.status(400).json({ error: 'Account ID is required' })
    }

    // Retrieve products from the connected account using Stripe-Account header
    const products = await stripe.products.list({
      limit: 100
    }, {
      stripeAccount: accountId // This sets the Stripe-Account header
    })

    res.json(products.data)
  } catch (error) {
    console.error('Error retrieving products:', error)
    res.status(500).json({ 
      error: 'Failed to retrieve products',
      message: error.message 
    })
  }
}

/**
 * POST /api/stripe/checkout/create
 * Creates a checkout session with Direct Charge and application fee
 * 
 * Expected request body:
 * {
 *   "accountId": "acct_1234567890",
 *   "line_items": [
 *     {
 *       "price_data": {
 *         "currency": "usd",
 *         "product_data": {
 *           "name": "My Product"
 *         },
 *         "unit_amount": 2999
 *       },
 *       "quantity": 1
 *     }
 *   ],
 *   "payment_intent_data": {
 *     "application_fee_amount": 123
 *   },
 *   "success_url": "https://example.com/success",
 *   "cancel_url": "https://example.com/cancel",
 *   "customer_email": "customer@example.com"
 * }
 * 
 * Expected response:
 * {
 *   "id": "cs_1234567890",
 *   "url": "https://checkout.stripe.com/pay/cs_1234567890"
 * }
 */
const createCheckoutSession = async (req, res) => {
  try {
    const { 
      accountId, 
      line_items, 
      payment_intent_data, 
      success_url, 
      cancel_url, 
      customer_email,
      metadata 
    } = req.body

    if (!accountId || !line_items || !success_url || !cancel_url) {
      return res.status(400).json({ 
        error: 'Missing required fields: accountId, line_items, success_url, cancel_url' 
      })
    }

    // Create checkout session with Direct Charge and application fee
    const session = await stripe.checkout.sessions.create({
      line_items,
      payment_intent_data,
      mode: 'payment',
      success_url,
      cancel_url,
      customer_email,
      metadata
    }, {
      stripeAccount: accountId // This sets the Stripe-Account header for Direct Charge
    })

    res.json(session)
  } catch (error) {
    console.error('Error creating checkout session:', error)
    res.status(500).json({ 
      error: 'Failed to create checkout session',
      message: error.message 
    })
  }
}

/**
 * GET /api/stripe/checkout/:sessionId
 * Retrieves checkout session details
 * 
 * Expected response:
 * {
 *   "id": "cs_1234567890",
 *   "payment_status": "paid",
 *   "amount_total": 2999,
 *   "currency": "usd",
 *   "customer_email": "customer@example.com",
 *   "status": "complete"
 * }
 */
const getCheckoutSession = async (req, res) => {
  try {
    const { sessionId } = req.params

    if (!sessionId) {
      return res.status(400).json({ error: 'Session ID is required' })
    }

    // Retrieve checkout session from Stripe API
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    res.json(session)
  } catch (error) {
    console.error('Error retrieving checkout session:', error)
    res.status(500).json({ 
      error: 'Failed to retrieve checkout session',
      message: error.message 
    })
  }
}

// Export all functions for use in your Express routes
module.exports = {
  createConnectedAccount,
  getAccount,
  createAccountLink,
  createProduct,
  getProducts,
  createCheckoutSession,
  getCheckoutSession
}

// Example Express route setup:
/*
const express = require('express')
const router = express.Router()
const {
  createConnectedAccount,
  getAccount,
  createAccountLink,
  createProduct,
  getProducts,
  createCheckoutSession,
  getCheckoutSession
} = require('./stripeConnectAPI')

// Routes
router.post('/stripe/accounts/create', createConnectedAccount)
router.get('/stripe/accounts/:accountId', getAccount)
router.post('/stripe/accounts/link', createAccountLink)
router.post('/stripe/products/create', createProduct)
router.get('/stripe/products/:accountId', getProducts)
router.post('/stripe/checkout/create', createCheckoutSession)
router.get('/stripe/checkout/:sessionId', getCheckoutSession)

module.exports = router
*/
