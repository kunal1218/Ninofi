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
  Switch,
  FormControlLabel
} from '@mui/material'
import {
  Add,
  Edit,
  Delete,
  AttachMoney,
  Payment,
  Schedule,
  Work,
  CheckCircle,
  Warning,
  Download,
  Print,
  Send
} from '@mui/icons-material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { format } from 'date-fns'

const PayrollManager = () => {
  const [openDialog, setOpenDialog] = useState(false)
  const [editingPayroll, setEditingPayroll] = useState(null)
  const [formData, setFormData] = useState({
    workerId: '',
    payPeriod: '',
    hoursWorked: '',
    hourlyRate: '',
    overtimeHours: '',
    overtimeRate: '',
    deductions: '',
    notes: ''
  })

  // Mock data - replace with actual API calls
  const payrollRecords = [
    {
      id: 1,
      workerId: 1,
      workerName: 'Mike Johnson',
      workerRole: 'Foreman',
      payPeriod: '2024-01-01 to 2024-01-15',
      hoursWorked: 80,
      hourlyRate: 28,
      overtimeHours: 8,
      overtimeRate: 42,
      deductions: 120,
      grossPay: 2240,
      netPay: 2120,
      status: 'paid',
      paymentDate: new Date('2024-01-16')
    },
    {
      id: 2,
      workerId: 2,
      workerName: 'Sarah Wilson',
      workerRole: 'Carpenter',
      payPeriod: '2024-01-01 to 2024-01-15',
      hoursWorked: 76,
      hourlyRate: 24,
      overtimeHours: 4,
      overtimeRate: 36,
      deductions: 95,
      grossPay: 1824,
      netPay: 1729,
      status: 'pending',
      paymentDate: null
    },
    {
      id: 3,
      workerId: 3,
      workerName: 'Tom Davis',
      workerRole: 'Electrician',
      payPeriod: '2024-01-01 to 2024-01-15',
      hoursWorked: 72,
      hourlyRate: 32,
      overtimeHours: 0,
      overtimeRate: 48,
      deductions: 110,
      grossPay: 2304,
      netPay: 2194,
      status: 'paid',
      paymentDate: new Date('2024-01-16')
    },
    {
      id: 4,
      workerId: 4,
      workerName: 'Lisa Brown',
      workerRole: 'Plumber',
      payPeriod: '2024-01-01 to 2024-01-15',
      hoursWorked: 80,
      hourlyRate: 30,
      overtimeHours: 12,
      overtimeRate: 45,
      deductions: 105,
      grossPay: 2400,
      netPay: 2295,
      status: 'processing',
      paymentDate: null
    }
  ]

  const workers = [
    { id: 1, name: 'Mike Johnson', role: 'Foreman', hourlyRate: 28 },
    { id: 2, name: 'Sarah Wilson', role: 'Carpenter', hourlyRate: 24 },
    { id: 3, name: 'Tom Davis', role: 'Electrician', hourlyRate: 32 },
    { id: 4, name: 'Lisa Brown', role: 'Plumber', hourlyRate: 30 },
    { id: 5, name: 'James Miller', role: 'Laborer', hourlyRate: 18 }
  ]

  const payPeriods = [
    '2024-01-01 to 2024-01-15',
    '2024-01-16 to 2024-01-31',
    '2024-02-01 to 2024-02-15',
    '2024-02-16 to 2024-02-29'
  ]

  const totalGrossPay = payrollRecords.reduce((sum, record) => sum + record.grossPay, 0)
  const totalNetPay = payrollRecords.reduce((sum, record) => sum + record.netPay, 0)
  const totalDeductions = payrollRecords.reduce((sum, record) => sum + record.deductions, 0)
  const pendingPayments = payrollRecords.filter(record => record.status === 'pending').length

  const handleOpenDialog = (payroll = null) => {
    if (payroll) {
      setEditingPayroll(payroll)
      setFormData({
        workerId: payroll.workerId.toString(),
        payPeriod: payroll.payPeriod,
        hoursWorked: payroll.hoursWorked.toString(),
        hourlyRate: payroll.hourlyRate.toString(),
        overtimeHours: payroll.overtimeHours.toString(),
        overtimeRate: payroll.overtimeRate.toString(),
        deductions: payroll.deductions.toString(),
        notes: ''
      })
    } else {
      setEditingPayroll(null)
      setFormData({
        workerId: '',
        payPeriod: '',
        hoursWorked: '',
        hourlyRate: '',
        overtimeHours: '',
        overtimeRate: '',
        deductions: '',
        notes: ''
      })
    }
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setEditingPayroll(null)
    setFormData({
      workerId: '',
      payPeriod: '',
      hoursWorked: '',
      hourlyRate: '',
      overtimeHours: '',
      overtimeRate: '',
      deductions: '',
      notes: ''
    })
  }

  const handleSubmit = () => {
    // Handle form submission - add/update payroll record
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
      case 'paid': return 'success'
      case 'pending': return 'warning'
      case 'processing': return 'info'
      case 'overdue': return 'error'
      default: return 'default'
    }
  }

  const getStatusLabel = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1)
  }

  const calculatePay = (hours, rate, overtimeHours, overtimeRate, deductions) => {
    const regularPay = hours * rate
    const overtimePay = overtimeHours * overtimeRate
    const grossPay = regularPay + overtimePay
    const netPay = grossPay - deductions
    return { grossPay, netPay }
  }

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
            Payroll Manager
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage worker salaries, calculate pay, and process payments
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
          sx={{ px: 3, py: 1.5 }}
        >
          Add Payroll Record
        </Button>
      </Box>

      {/* Payroll Overview Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <CardContent sx={{ color: 'white' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    ${(totalGrossPay / 1000).toFixed(1)}k
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Total Gross Pay
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
                    ${(totalNetPay / 1000).toFixed(1)}k
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Total Net Pay
                  </Typography>
                </Box>
                <Payment sx={{ fontSize: 40, opacity: 0.8 }} />
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
                    ${(totalDeductions / 1000).toFixed(1)}k
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Total Deductions
                  </Typography>
                </Box>
                <Work sx={{ fontSize: 40, opacity: 0.8 }} />
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
                    {pendingPayments}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Pending Payments
                  </Typography>
                </Box>
                <Schedule sx={{ fontSize: 40, opacity: 0.8 }} />
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
              Export Payroll Report
            </Button>
            <Button variant="outlined" startIcon={<Print />}>
              Print Pay Stubs
            </Button>
            <Button variant="outlined" startIcon={<Send />}>
              Send Payment Notifications
            </Button>
            <Button variant="outlined" startIcon={<Schedule />}>
              Schedule Payments
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Payroll Records Table */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
            Payroll Records
          </Typography>
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Worker</TableCell>
                  <TableCell>Pay Period</TableCell>
                  <TableCell>Hours</TableCell>
                  <TableCell>Rate</TableCell>
                  <TableCell>Overtime</TableCell>
                  <TableCell>Deductions</TableCell>
                  <TableCell>Gross Pay</TableCell>
                  <TableCell>Net Pay</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {payrollRecords.map((record) => (
                  <TableRow key={record.id} hover>
                    <TableCell>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          {record.workerName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {record.workerRole}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {record.payPeriod}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {record.hoursWorked}h
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        ${record.hourlyRate}/h
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {record.overtimeHours}h @ ${record.overtimeRate}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="error.main">
                        -${record.deductions}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        ${record.grossPay}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: 'success.main' }}>
                        ${record.netPay}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={getStatusLabel(record.status)} 
                        size="small" 
                        color={getStatusColor(record.status)}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                        <Tooltip title="Edit">
                          <IconButton 
                            size="small" 
                            color="primary"
                            onClick={() => handleOpenDialog(record)}
                          >
                            <Edit fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Process Payment">
                          <IconButton 
                            size="small" 
                            color="success"
                            disabled={record.status === 'paid'}
                          >
                            <CheckCircle fontSize="small" />
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

      {/* Add/Edit Payroll Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingPayroll ? 'Edit Payroll Record' : 'Add New Payroll Record'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Worker</InputLabel>
                <Select
                  value={formData.workerId}
                  label="Worker"
                  onChange={(e) => handleInputChange('workerId', e.target.value)}
                  required
                >
                  {workers.map((worker) => (
                    <MenuItem key={worker.id} value={worker.id}>
                      {worker.name} - {worker.role}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Pay Period</InputLabel>
                <Select
                  value={formData.payPeriod}
                  label="Pay Period"
                  onChange={(e) => handleInputChange('payPeriod', e.target.value)}
                  required
                >
                  {payPeriods.map((period) => (
                    <MenuItem key={period} value={period}>{period}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Hours Worked"
                type="number"
                value={formData.hoursWorked}
                onChange={(e) => handleInputChange('hoursWorked', e.target.value)}
                required
                InputProps={{
                  endAdornment: <InputAdornment position="end">hours</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Hourly Rate ($)"
                type="number"
                value={formData.hourlyRate}
                onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
                required
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Overtime Hours"
                type="number"
                value={formData.overtimeHours}
                onChange={(e) => handleInputChange('overtimeHours', e.target.value)}
                InputProps={{
                  endAdornment: <InputAdornment position="end">hours</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Overtime Rate ($)"
                type="number"
                value={formData.overtimeRate}
                onChange={(e) => handleInputChange('overtimeRate', e.target.value)}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Deductions ($)"
                type="number"
                value={formData.deductions}
                onChange={(e) => handleInputChange('deductions', e.target.value)}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
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
                placeholder="Additional notes about this payroll record..."
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingPayroll ? 'Update' : 'Add'} Record
          </Button>
        </DialogActions>
      </Dialog>

      {/* Floating Action Button */}
      <Tooltip title="Add New Payroll Record" placement="left">
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

export default PayrollManager
