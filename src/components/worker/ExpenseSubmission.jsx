import React, { useState } from 'react'
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Fab,
  Tooltip,
  InputAdornment,
  Alert
} from '@mui/material'
import {
  Add,
  Edit,
  Delete,
  AttachMoney,
  Receipt,
  Upload,
  CheckCircle,
  Warning,
  Pending,
  Download
} from '@mui/icons-material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { format } from 'date-fns'

const ExpenseSubmission = () => {
  const [openDialog, setOpenDialog] = useState(false)
  const [editingExpense, setEditingExpense] = useState(null)
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: '',
    project: '',
    date: new Date(),
    receipt: '',
    notes: ''
  })

  // Mock data - replace with actual API calls
  const expenses = [
    {
      id: 1,
      description: 'Safety gloves',
      amount: 25.50,
      category: 'Safety Equipment',
      project: 'Downtown Project',
      date: new Date('2024-01-15'),
      receipt: 'REC-001',
      notes: 'Replacement safety gloves for concrete work',
      status: 'approved',
      submittedDate: new Date('2024-01-15')
    },
    {
      id: 2,
      description: 'Lunch during overtime',
      amount: 18.75,
      category: 'Meals',
      project: 'Residential Complex',
      date: new Date('2024-01-14'),
      receipt: 'REC-002',
      notes: 'Dinner during 2-hour overtime shift',
      status: 'pending',
      submittedDate: new Date('2024-01-14')
    },
    {
      id: 3,
      description: 'Tool replacement',
      amount: 45.00,
      category: 'Tools',
      project: 'Office Building',
      date: new Date('2024-01-13'),
      receipt: 'REC-003',
      notes: 'New hammer and chisel set',
      status: 'approved',
      submittedDate: new Date('2024-01-13')
    },
    {
      id: 4,
      description: 'Transportation to site',
      amount: 12.50,
      category: 'Transportation',
      project: 'Downtown Project',
      date: new Date('2024-01-12'),
      receipt: 'REC-004',
      notes: 'Bus fare to downtown project site',
      status: 'rejected',
      submittedDate: new Date('2024-01-12')
    }
  ]

  const categories = ['Safety Equipment', 'Tools', 'Meals', 'Transportation', 'Materials', 'Other']
  const projects = ['Downtown Project', 'Residential Complex', 'Office Building', 'General Operations']
  const statuses = ['pending', 'approved', 'rejected']

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0)
  const approvedExpenses = expenses.filter(exp => exp.status === 'approved').reduce((sum, exp) => sum + exp.amount, 0)
  const pendingExpenses = expenses.filter(exp => exp.status === 'pending').reduce((sum, exp) => sum + exp.amount, 0)
  const rejectedExpenses = expenses.filter(exp => exp.status === 'rejected').reduce((sum, exp) => sum + exp.amount, 0)

  const handleOpenDialog = (expense = null) => {
    if (expense) {
      setEditingExpense(expense)
      setFormData({
        description: expense.description,
        amount: expense.amount.toString(),
        category: expense.category,
        project: expense.project,
        date: expense.date,
        receipt: expense.receipt,
        notes: expense.notes
      })
    } else {
      setEditingExpense(null)
      setFormData({
        description: '',
        amount: '',
        category: '',
        project: '',
        date: new Date(),
        receipt: '',
        notes: ''
      })
    }
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setEditingExpense(null)
    setFormData({
      description: '',
      amount: '',
      category: '',
      project: '',
      date: new Date(),
      receipt: '',
      notes: ''
    })
  }

  const handleSubmit = () => {
    // Handle form submission - add/update expense
    console.log('Form data:', formData)
    handleCloseDialog()
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'success'
      case 'pending': return 'warning'
      case 'rejected': return 'error'
      default: return 'default'
    }
  }

  const getStatusLabel = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1)
  }

  const getCategoryColor = (category) => {
    const colors = {
      'Safety Equipment': 'primary',
      'Tools': 'secondary',
      'Meals': 'info',
      'Transportation': 'warning',
      'Materials': 'success',
      'Other': 'default'
    }
    return colors[category] || 'default'
  }

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
            Expense Submission
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Submit and track your work-related expenses
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
          sx={{ px: 3, py: 1.5 }}
        >
          Submit Expense
        </Button>
      </Box>

      {/* Expense Overview Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <CardContent sx={{ color: 'white' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    ${totalExpenses.toFixed(2)}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Total Submitted
                  </Typography>
                </Box>
                <AttachMoney sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
            <CardContent sx={{ color: 'white' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    ${approvedExpenses.toFixed(2)}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Approved
                  </Typography>
                </Box>
                <CheckCircle sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
            <CardContent sx={{ color: 'white' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    ${pendingExpenses.toFixed(2)}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Pending
                  </Typography>
                </Box>
                <Pending sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}>
            <CardContent sx={{ color: 'white' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {expenses.length}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Total Entries
                  </Typography>
                </Box>
                <Receipt sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Quick Actions */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button variant="outlined" startIcon={<Download />}>
              Download Receipts
            </Button>
            <Button variant="outlined" startIcon={<Upload />}>
              Bulk Upload
            </Button>
            <Button variant="outlined">
              View Guidelines
            </Button>
            <Button variant="outlined">
              Contact Support
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Expenses Table */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
            My Expense Records
          </Typography>
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Project</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Receipt</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {expenses.map((expense) => (
                  <TableRow key={expense.id} hover>
                    <TableCell>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          {expense.description}
                        </Typography>
                        {expense.notes && (
                          <Typography variant="body2" color="text.secondary">
                            {expense.notes}
                          </Typography>
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: 'error.main' }}>
                        -${expense.amount.toFixed(2)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={expense.category} 
                        size="small" 
                        color={getCategoryColor(expense.category)}
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {expense.project}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {format(expense.date, 'MMM dd, yyyy')}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="primary">
                        {expense.receipt}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={getStatusLabel(expense.status)} 
                        size="small" 
                        color={getStatusColor(expense.status)}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                        <Tooltip title="Edit">
                          <IconButton 
                            size="small" 
                            color="primary"
                            onClick={() => handleOpenDialog(expense)}
                            disabled={expense.status === 'approved'}
                          >
                            <Edit fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="View Receipt">
                          <IconButton size="small" color="info">
                            <Receipt fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Add/Edit Expense Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingExpense ? 'Edit Expense' : 'Submit New Expense'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                required
                placeholder="Brief description of the expense..."
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Amount ($)"
                type="number"
                value={formData.amount}
                onChange={(e) => handleInputChange('amount', e.target.value)}
                required
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={formData.category}
                  label="Category"
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  required
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>{category}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Project</InputLabel>
                <Select
                  value={formData.project}
                  label="Project"
                  onChange={(e) => handleInputChange('project', e.target.value)}
                  required
                >
                  {projects.map((project) => (
                    <MenuItem key={project} value={project}>{project}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Expense Date"
                  value={formData.date}
                  onChange={(newValue) => handleInputChange('date', newValue)}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Receipt Number"
                value={formData.receipt}
                onChange={(e) => handleInputChange('receipt', e.target.value)}
                required
                placeholder="Receipt or invoice number"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Notes"
                multiline
                rows={3}
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="Additional details about this expense..."
              />
            </Grid>
            <Grid item xs={12}>
              <Alert severity="info" sx={{ mt: 2 }}>
                <Typography variant="body2">
                  <strong>Note:</strong> Please ensure you have a valid receipt for all expenses. 
                  Expenses over $50 may require additional documentation.
                </Typography>
              </Alert>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingExpense ? 'Update' : 'Submit'} Expense
          </Button>
        </DialogActions>
      </Dialog>

      {/* Floating Action Button */}
      <Tooltip title="Submit New Expense" placement="left">
        <Fab
          color="primary"
          aria-label="add"
          onClick={() => handleOpenDialog()}
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            display: { xs: 'block', sm: 'none' }
          }}
        >
          <Add />
        </Fab>
      </Tooltip>
    </Box>
  )
}

export default ExpenseSubmission
