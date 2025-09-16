/**
 * Customer Storefront Component
 * 
 * This component displays products from a connected account and allows customers
 * to purchase them using Stripe Checkout with Direct Charge and application fees.
 * 
 * Note: In production, you should use a more user-friendly identifier than account ID
 * in the URL (like a custom domain or slug).
 */

import React, { useState, useEffect } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Chip,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  InputAdornment,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper
} from '@mui/material'
import {
  ShoppingCart,
  AttachMoney,
  Inventory,
  CheckCircle,
  Error as ErrorIcon,
  Add,
  Remove,
  Payment
} from '@mui/icons-material'
import { useStripeConnect } from '../../contexts/StripeConnectContext'
import { calculateApplicationFee } from '../../config/stripeConnect'

const CustomerStorefront = ({ accountId }) => {
  const { 
    getProducts, 
    createCheckoutSession, 
    products, 
    isLoadingProducts, 
    isLoading, 
    error, 
    clearError 
  } = useStripeConnect()
  
  const [cart, setCart] = useState([])
  const [checkoutDialogOpen, setCheckoutDialogOpen] = useState(false)
  const [customerInfo, setCustomerInfo] = useState({
    email: '',
    name: ''
  })
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)

  // Load products when component mounts
  useEffect(() => {
    if (accountId) {
      loadProducts()
    }
  }, [accountId])

  // Load products from the connected account
  const loadProducts = async () => {
    try {
      await getProducts(accountId)
    } catch (err) {
      console.error('Failed to load products:', err)
    }
  }

  // Add product to cart
  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id)
    
    if (existingItem) {
      setCart(prev => prev.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      setCart(prev => [...prev, { ...product, quantity: 1 }])
    }
  }

  // Remove product from cart
  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId))
  }

  // Update product quantity in cart
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    
    setCart(prev => prev.map(item =>
      item.id === productId
        ? { ...item, quantity }
        : item
    ))
  }

  // Calculate cart total
  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const price = item.default_price?.unit_amount || 0
      return total + (price * item.quantity)
    }, 0)
  }

  // Calculate application fee
  const getApplicationFee = () => {
    const total = getCartTotal()
    return calculateApplicationFee(total)
  }

  // Calculate grand total (including application fee)
  const getGrandTotal = () => {
    return getCartTotal() + getApplicationFee()
  }

  // Format currency
  const formatCurrency = (amount, currency = 'usd') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase()
    }).format(amount / 100)
  }

  // Handle checkout
  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert('Your cart is empty')
      return
    }

    if (!customerInfo.email || !customerInfo.name) {
      alert('Please provide your email and name')
      return
    }

    setIsProcessingPayment(true)
    clearError()

    try {
      // Prepare line items for Stripe Checkout
      const lineItems = cart.map(item => ({
        price_data: {
          currency: item.default_price?.currency || 'usd',
          product_data: {
            name: item.name,
            description: item.description,
            metadata: {
              product_id: item.id
            }
          },
          unit_amount: item.default_price?.unit_amount || 0
        },
        quantity: item.quantity
      }))

      // Create checkout session with Direct Charge and application fee
      const checkoutData = {
        accountId, // Connected account ID
        line_items: lineItems,
        payment_intent_data: {
          // Application fee for platform monetization
          application_fee_amount: getApplicationFee()
        },
        mode: 'payment',
        success_url: `${window.location.origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${window.location.origin}/storefront/${accountId}`,
        customer_email: customerInfo.email,
        customer_creation: 'always',
        metadata: {
          customer_name: customerInfo.name,
          platform: 'mavu-contracting'
        }
      }

      const session = await createCheckoutSession(checkoutData)
      
      // Redirect to Stripe Checkout
      window.location.href = session.url
      
    } catch (err) {
      console.error('Checkout failed:', err)
    } finally {
      setIsProcessingPayment(false)
    }
  }

  // Handle customer info change
  const handleCustomerInfoChange = (field, value) => {
    setCustomerInfo(prev => ({
      ...prev,
      [field]: value
    }))
  }

  if (isLoadingProducts) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Alert severity="error" onClose={clearError}>
        {error}
      </Alert>
    )
  }

  if (!products || products.length === 0) {
    return (
      <Card>
        <CardContent>
          <Box sx={{ textAlign: 'center', p: 4 }}>
            <Inventory sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No Products Available
            </Typography>
            <Typography variant="body2" color="text.secondary">
              This store doesn't have any products yet.
            </Typography>
          </Box>
        </CardContent>
      </Card>
    )
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          Store
        </Typography>
        <Button
          variant="contained"
          startIcon={<ShoppingCart />}
          onClick={() => setCheckoutDialogOpen(true)}
          disabled={cart.length === 0}
        >
          Cart ({cart.length})
        </Button>
      </Box>

      {/* Products Grid */}
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {product.name}
                </Typography>
                
                {product.description && (
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {product.description}
                  </Typography>
                )}
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <AttachMoney sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="h6" color="primary">
                    {product.default_price ? 
                      formatCurrency(product.default_price.unit_amount, product.default_price.currency) :
                      'Price not set'
                    }
                  </Typography>
                </Box>
                
                {product.metadata?.category && (
                  <Chip
                    label={product.metadata.category}
                    size="small"
                    variant="outlined"
                    sx={{ mb: 2 }}
                  />
                )}
                
                <Chip
                  label={product.active ? 'Available' : 'Unavailable'}
                  color={product.active ? 'success' : 'default'}
                  size="small"
                  sx={{ mb: 2 }}
                />
              </CardContent>
              
              <Box sx={{ p: 2, pt: 0 }}>
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<Add />}
                  onClick={() => addToCart(product)}
                  disabled={!product.active || !product.default_price}
                >
                  Add to Cart
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Checkout Dialog */}
      <Dialog 
        open={checkoutDialogOpen} 
        onClose={() => setCheckoutDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ShoppingCart sx={{ mr: 2 }} />
            Checkout
          </Box>
        </DialogTitle>
        
        <DialogContent>
          {/* Customer Information */}
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Customer Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Full Name"
                value={customerInfo.name}
                onChange={(e) => handleCustomerInfoChange('name', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={customerInfo.email}
                onChange={(e) => handleCustomerInfoChange('email', e.target.value)}
                required
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          {/* Cart Items */}
          <Typography variant="h6" gutterBottom>
            Order Summary
          </Typography>
          
          {cart.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              Your cart is empty
            </Typography>
          ) : (
            <List dense>
              {cart.map((item) => (
                <ListItem key={item.id}>
                  <ListItemIcon>
                    <Inventory />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.name}
                    secondary={`${formatCurrency(item.default_price?.unit_amount || 0, item.default_price?.currency)} each`}
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Button
                      size="small"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Remove />
                    </Button>
                    <Typography variant="body2" sx={{ minWidth: 20, textAlign: 'center' }}>
                      {item.quantity}
                    </Typography>
                    <Button
                      size="small"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Add />
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Remove />
                    </Button>
                  </Box>
                </ListItem>
              ))}
            </List>
          )}

          {/* Order Total */}
          {cart.length > 0 && (
            <Paper sx={{ p: 2, mt: 2, bgcolor: 'grey.50' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Subtotal:</Typography>
                <Typography variant="body2">{formatCurrency(getCartTotal())}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Platform Fee:</Typography>
                <Typography variant="body2">{formatCurrency(getApplicationFee())}</Typography>
              </Box>
              <Divider sx={{ my: 1 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6">Total:</Typography>
                <Typography variant="h6">{formatCurrency(getGrandTotal())}</Typography>
              </Box>
            </Paper>
          )}
        </DialogContent>
        
        <DialogActions>
          <Button onClick={() => setCheckoutDialogOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleCheckout}
            disabled={cart.length === 0 || isProcessingPayment}
            startIcon={isProcessingPayment ? <CircularProgress size={20} /> : <Payment />}
          >
            {isProcessingPayment ? 'Processing...' : 'Proceed to Payment'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default CustomerStorefront
