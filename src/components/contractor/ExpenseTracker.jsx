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
  Category,
  DateRange,
  Description,
  Receipt,
  FilterList,
  Download,
  TrendingUp,
  TrendingDown
} from '@mui/icons-material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { format } from 'date-fns'

const ExpenseTracker = () => {
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
      description: 'Concrete delivery',
      amount: 2500,
      category: 'Materials',
      project: 'Downtown Project',
      date: new Date('2024-01-15'),
      receipt: 'REC-001',
      notes: '50 cubic yards delivered',
      status: 'approved'
    },
    {
      id: 2,
      description: 'Safety equipment',
      amount: 850,
      category: 'Equipment',
      project: 'Residential Complex',
      date: new Date('2024-01-14'),
      receipt: 'REC-002',
      notes: 'Hard hats, vests, safety glasses',
      status: 'pending'
    },
    {
      id: 3,
      description: 'Worker overtime',
      amount: 1200,
      category: 'Labor',
      project: 'Office Building',
      date: new Date('2024-01-13'),
      receipt: 'REC-003',
      notes: 'Weekend work on foundation',
      status: 'approved'
    },
    {
      id: 4,
      description: 'Permit fees',
      amount: 500,
      category: 'Administrative',
      project: 'Downtown Project',
      date: new Date('2024-01-12'),
      receipt: 'REC-004',
      notes: 'Building permit renewal',
      status: 'approved'
    },
    {
      id: 5,
      description: 'Tool replacement',
      amount: 320,
      category: 'Equipment',
      project: 'Residential Complex',
      date: new Date('2024-01-11'),
      receipt: 'REC-005',
      notes: 'Power drill and saw blades',
      status: 'pending'
    }
  ]

  const categories = ['Materials', 'Labor', 'Equipment', 'Administrative', 'Transportation', 'Utilities', 'Other']
  const projects = ['Downtown Project', 'Residential Complex', 'Office Building', 'General Operations']
  const statuses = ['pending', 'approved', 'rejected']

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0)
  const approvedExpenses = expenses.filter(exp => exp.status === 'approved').reduce((sum, exp) => sum + exp.amount, 0)
  const pendingExpenses = expenses.filter(exp => exp.status === 'pending').reduce((sum, exp) => sum + exp.amount, 0)

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
      'Materials': 'primary',
      'Labor': 'secondary',
      'Equipment': 'info',
      'Administrative': 'warning',
      'Transportation': 'success',
      'Utilities': 'error',
      'Other': 'default'
    }
    return colors[category] || 'default'
  }

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
            Expense Tracker
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Monitor and manage project expenses, materials, and operational costs
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
          sx={{ px: 3, py: 1.5 }}
        >
          Add Expense
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
                    ${(totalExpenses / 1000).toFixed(1)}k
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Total Expenses
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
                    ${(approvedExpenses / 1000).toFixed(1)}k
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Approved
                  </Typography>
                </Box>
                <TrendingUp sx={{ fontSize: 40, opacity: 0.8 }} />
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
                    ${(pendingExpenses / 1000).toFixed(1)}k
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Pending
                  </Typography>
                </Box>
                <TrendingDown sx={{ fontSize: 40, opacity: 0.8 }} />
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

      {/* Filters and Actions */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Category</InputLabel>
                <Select label="Category" defaultValue="">
                  <MenuItem value="">All Categories</MenuItem>
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>{category}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel>Project</InputLabel>
                <Select label="Project" defaultValue="">
                  <MenuItem value="">All Projects</MenuItem>
                  {projects.map((project) => (
                    <MenuItem key={project} value={project}>{project}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Status</InputLabel>
                <Select label="Status" defaultValue="">
                  <MenuItem value="">All Status</MenuItem>
                  {statuses.map((status) => (
                    <MenuItem key={status} value={status}>{getStatusLabel(status)}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button variant="outlined" startIcon={<FilterList />}>
                Filter
              </Button>
              <Button variant="outlined" startIcon={<Download />}>
                Export
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Expenses Table */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
            Expense Records
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
                        -${expense.amount.toLocaleString()}
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
          {editingExpense ? 'Edit Expense' : 'Add New Expense'}
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
                  label="Date"
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
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingExpense ? 'Update' : 'Add'} Expense
          </Button>
        </DialogActions>
      </Dialog>

      {/* Floating Action Button */}
      <Tooltip title="Add New Expense" placement="left">
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

export default ExpenseTracker
