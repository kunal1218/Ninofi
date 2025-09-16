/**
 * Product Manager Component
 * 
 * This component allows connected accounts to create and manage their products.
 * It uses the Stripe-Account header to create products on the connected account.
 */

import React, { useState, useEffect } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Alert,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  Tooltip
} from '@mui/material'
import {
  Add,
  Edit,
  Delete,
  Visibility,
  AttachMoney,
  Inventory,
  Refresh
} from '@mui/icons-material'
import { useStripeConnect } from '../../contexts/StripeConnectContext'

const ProductManager = ({ accountId }) => {
  const { 
    createProduct, 
    getProducts, 
    products, 
    isLoadingProducts, 
    isLoading, 
    error, 
    clearError 
  } = useStripeConnect()
  
  const [openDialog, setOpenDialog] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    currency: 'usd',
    category: 'general'
  })
  const [validationErrors, setValidationErrors] = useState({})

  // Load products when component mounts or accountId changes
  useEffect(() => {
    if (accountId) {
      loadProducts()
    }
  }, [accountId])

  // Load products from API
  const loadProducts = async () => {
    try {
      await getProducts(accountId)
    } catch (err) {
      console.error('Failed to load products:', err)
    }
  }

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

  // Validate form data
  const validateForm = () => {
    const errors = {}
    
    if (!formData.name.trim()) {
      errors.name = 'Product name is required'
    }
    
    if (!formData.price || parseFloat(formData.price) <= 0) {
      errors.price = 'Valid price is required'
    }
    
    if (!formData.currency) {
      errors.currency = 'Currency is required'
    }
    
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
      // Convert price to cents (Stripe uses cents)
      const priceInCents = Math.round(parseFloat(formData.price) * 100)
      
      // Prepare product data for Stripe API
      const productData = {
        name: formData.name,
        description: formData.description || undefined,
        default_price_data: {
          unit_amount: priceInCents,
          currency: formData.currency,
        },
        // Add metadata for categorization
        metadata: {
          category: formData.category
        }
      }
      
      // Create product using the connected account
      await createProduct(productData, accountId)
      
      // Reset form and close dialog
      handleCloseDialog()
      
    } catch (err) {
      console.error('Failed to create product:', err)
    }
  }

  // Handle edit product
  const handleEdit = (product) => {
    setEditingProduct(product)
    
    // Extract price from default_price if available
    const price = product.default_price ? 
      (product.default_price.unit_amount / 100).toFixed(2) : 
      ''
    
    setFormData({
      name: product.name,
      description: product.description || '',
      price: price,
      currency: product.default_price?.currency || 'usd',
      category: product.metadata?.category || 'general'
    })
    
    setOpenDialog(true)
  }

  // Handle delete product (placeholder - Stripe doesn't allow deleting products)
  const handleDelete = (product) => {
    // Note: Stripe doesn't allow deleting products, only archiving
    // This would typically archive the product instead
    console.log('Delete product:', product.id)
    alert('Product deletion is not supported by Stripe. Products can only be archived.')
  }

  // Handle close dialog
  const handleCloseDialog = () => {
    setOpenDialog(false)
    setEditingProduct(null)
    setFormData({
      name: '',
      description: '',
      price: '',
      currency: 'usd',
      category: 'general'
    })
    setValidationErrors({})
    clearError()
  }

  // Format currency
  const formatCurrency = (amount, currency = 'usd') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase()
    }).format(amount / 100)
  }

  // Get status color for product
  const getStatusColor = (active) => {
    return active ? 'success' : 'default'
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6">
          Product Management
        </Typography>
        <Box>
          <Button
            startIcon={<Refresh />}
            onClick={loadProducts}
            disabled={isLoadingProducts}
            sx={{ mr: 2 }}
          >
            Refresh
          </Button>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setOpenDialog(true)}
          >
            Add Product
          </Button>
        </Box>
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={clearError}>
          {error}
        </Alert>
      )}

      {/* Products Table */}
      <Card>
        <CardContent>
          {isLoadingProducts ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
              <CircularProgress />
            </Box>
          ) : products.length === 0 ? (
            <Box sx={{ textAlign: 'center', p: 4 }}>
              <Inventory sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No Products Yet
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Create your first product to start selling
              </Typography>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => setOpenDialog(true)}
              >
                Add Product
              </Button>
            </Box>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Created</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id} hover>
                      <TableCell>
                        <Box>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                            {product.name}
                          </Typography>
                          {product.description && (
                            <Typography variant="body2" color="text.secondary">
                              {product.description}
                            </Typography>
                          )}
                        </Box>
                      </TableCell>
                      <TableCell>
                        {product.default_price ? (
                          <Typography variant="body2">
                            {formatCurrency(product.default_price.unit_amount, product.default_price.currency)}
                          </Typography>
                        ) : (
                          <Typography variant="body2" color="text.secondary">
                            No price set
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={product.metadata?.category || 'General'}
                          size="small"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={product.active ? 'Active' : 'Inactive'}
                          color={getStatusColor(product.active)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">
                          {new Date(product.created * 1000).toLocaleDateString()}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                          <Tooltip title="View Details">
                            <IconButton size="small">
                              <Visibility />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit Product">
                            <IconButton 
                              size="small" 
                              onClick={() => handleEdit(product)}
                            >
                              <Edit />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete Product">
                            <IconButton 
                              size="small" 
                              onClick={() => handleDelete(product)}
                            >
                              <Delete />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>

      {/* Product Form Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {editingProduct ? 'Edit Product' : 'Add New Product'}
        </DialogTitle>
        
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Product Name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                error={!!validationErrors.name}
                helperText={validationErrors.name}
                required
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                multiline
                rows={3}
                placeholder="Describe your product..."
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Price"
                type="number"
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                error={!!validationErrors.price}
                helperText={validationErrors.price}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                required
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={!!validationErrors.currency}>
                <InputLabel>Currency</InputLabel>
                <Select
                  value={formData.currency}
                  onChange={(e) => handleInputChange('currency', e.target.value)}
                  label="Currency"
                >
                  <MenuItem value="usd">USD - US Dollar</MenuItem>
                  <MenuItem value="eur">EUR - Euro</MenuItem>
                  <MenuItem value="gbp">GBP - British Pound</MenuItem>
                  <MenuItem value="cad">CAD - Canadian Dollar</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  label="Category"
                >
                  <MenuItem value="general">General</MenuItem>
                  <MenuItem value="services">Services</MenuItem>
                  <MenuItem value="digital">Digital Products</MenuItem>
                  <MenuItem value="physical">Physical Products</MenuItem>
                  <MenuItem value="subscription">Subscription</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleCloseDialog}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={isLoading}
            startIcon={isLoading ? <CircularProgress size={20} /> : null}
          >
            {editingProduct ? 'Update Product' : 'Create Product'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default ProductManager
