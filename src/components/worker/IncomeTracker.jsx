import React, { useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tabs,
  Tab,
  Button,
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
  LinearProgress,
  Avatar,
  Divider,
  Alert,
  Box as MuiBox
} from '@mui/material'
import {
  AttachMoney,
  TrendingUp,
  Work,
  Schedule,
  Receipt,
  Download,
  Visibility,
  CalendarToday,
  AccessTime,
  AccountBalance,
  Payment,
  TrendingDown
} from '@mui/icons-material'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'

const IncomeTracker = () => {
  const [selectedTab, setSelectedTab] = useState(0)
  const [selectedPeriod, setSelectedPeriod] = useState('month')
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  const [paymentDetailDialogOpen, setPaymentDetailDialogOpen] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState(null)

  // Mock data - replace with actual API calls
  const incomeData = {
    currentPeriod: {
      totalEarnings: 2840,
      hoursWorked: 76,
      hourlyRate: 25,
      overtimeHours: 12,
      overtimeRate: 37.5,
      bonuses: 200,
      deductions: 320,
      netIncome: 2720
    },
    previousPeriod: {
      totalEarnings: 2650,
      hoursWorked: 72,
      hourlyRate: 25,
      overtimeHours: 8,
      overtimeRate: 37.5,
      bonuses: 150,
      deductions: 310,
      netIncome: 2490
    }
  }

  const monthlyData = [
    { month: 'Jan', earnings: 2800, hours: 75, overtime: 10 },
    { month: 'Feb', earnings: 2650, hours: 72, overtime: 8 },
    { month: 'Mar', earnings: 3100, hours: 80, overtime: 15 },
    { month: 'Apr', earnings: 2840, hours: 76, overtime: 12 },
    { month: 'May', earnings: 2950, hours: 78, overtime: 13 },
    { month: 'Jun', earnings: 3200, hours: 82, overtime: 16 }
  ]

  const paymentHistory = [
    {
      id: 1,
      date: '2024-01-15',
      period: 'Jan 1-15, 2024',
      contractor: 'ABC Construction Co.',
      project: 'Downtown Renovation',
      hours: 38,
      overtimeHours: 6,
      regularPay: 950,
      overtimePay: 225,
      bonus: 100,
      deductions: 160,
      netPay: 1115,
      status: 'paid',
      paymentMethod: 'Direct Deposit'
    },
    {
      id: 2,
      date: '2024-01-01',
      period: 'Dec 16-31, 2023',
      contractor: 'ABC Construction Co.',
      project: 'Downtown Renovation',
      hours: 40,
      overtimeHours: 8,
      regularPay: 1000,
      overtimePay: 300,
      bonus: 0,
      deductions: 160,
      netPay: 1140,
      status: 'paid',
      paymentMethod: 'Direct Deposit'
    },
    {
      id: 3,
      date: '2024-01-15',
      period: 'Jan 1-15, 2024',
      contractor: 'Elite Electric Services',
      project: 'Commercial Wiring',
      hours: 20,
      overtimeHours: 0,
      regularPay: 500,
      overtimePay: 0,
      bonus: 50,
      deductions: 80,
      netPay: 470,
      status: 'paid',
      paymentMethod: 'Check'
    },
    {
      id: 4,
      date: '2024-01-01',
      period: 'Dec 16-31, 2023',
      contractor: 'Elite Electric Services',
      project: 'Commercial Wiring',
      hours: 22,
      overtimeHours: 2,
      regularPay: 550,
      overtimePay: 75,
      bonus: 0,
      deductions: 88,
      netPay: 537,
      status: 'paid',
      paymentMethod: 'Check'
    }
  ]

  const earningsBreakdown = [
    { name: 'Regular Hours', value: incomeData.currentPeriod.totalEarnings - (incomeData.currentPeriod.overtimeHours * incomeData.currentPeriod.overtimeRate) - incomeData.currentPeriod.bonuses, color: '#1976d2' },
    { name: 'Overtime', value: incomeData.currentPeriod.overtimeHours * incomeData.currentPeriod.overtimeRate, color: '#ff9800' },
    { name: 'Bonuses', value: incomeData.currentPeriod.bonuses, color: '#4caf50' }
  ]

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue)
  }

  const handleViewPaymentDetails = (payment) => {
    setSelectedPayment(payment)
    setPaymentDetailDialogOpen(true)
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'success'
      case 'pending': return 'warning'
      case 'processing': return 'info'
      default: return 'default'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'paid': return 'Paid'
      case 'pending': return 'Pending'
      case 'processing': return 'Processing'
      default: return status
    }
  }

  const calculateYTD = () => {
    return monthlyData.reduce((total, month) => total + month.earnings, 0)
  }

  const calculateTotalHours = () => {
    return monthlyData.reduce((total, month) => total + month.hours + month.overtime, 0)
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
        Income & Salary Tracker
      </Typography>

      {/* Period Selector */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Period</InputLabel>
                <Select
                  value={selectedPeriod}
                  label="Period"
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                >
                  <MenuItem value="week">This Week</MenuItem>
                  <MenuItem value="month">This Month</MenuItem>
                  <MenuItem value="quarter">This Quarter</MenuItem>
                  <MenuItem value="year">This Year</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Month</InputLabel>
                <Select
                  value={selectedMonth}
                  label="Month"
                  onChange={(e) => setSelectedMonth(e.target.value)}
                >
                  {Array.from({ length: 12 }, (_, i) => (
                    <MenuItem key={i} value={i}>
                      {new Date(2024, i).toLocaleDateString('en-US', { month: 'long' })}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Year</InputLabel>
                <Select
                  value={selectedYear}
                  label="Year"
                  onChange={(e) => setSelectedYear(e.target.value)}
                >
                  {Array.from({ length: 5 }, (_, i) => (
                    <MenuItem key={2024 - i} value={2024 - i}>
                      {2024 - i}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={selectedTab} onChange={handleTabChange}>
          <Tab label="Overview" />
          <Tab label="Payment History" />
          <Tab label="Analytics" />
          <Tab label="Documents" />
        </Tabs>
      </Box>

      {/* Tab Content */}
      {selectedTab === 0 && (
        <Box>
          {/* Current Period Summary */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={3}>
              <Card sx={{ height: '100%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                <CardContent sx={{ color: 'white' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant="h4" sx={{ fontWeight: 700 }}>
                        {formatCurrency(incomeData.currentPeriod.netIncome)}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        Net Income
                      </Typography>
                    </Box>
                    <AttachMoney sx={{ fontSize: 40, opacity: 0.8 }} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={3}>
              <Card sx={{ height: '100%', background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
                <CardContent sx={{ color: 'white' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant="h4" sx={{ fontWeight: 700 }}>
                        {formatCurrency(incomeData.currentPeriod.totalEarnings)}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        Gross Earnings
                      </Typography>
                    </Box>
                    <TrendingUp sx={{ fontSize: 40, opacity: 0.8 }} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={3}>
              <Card sx={{ height: '100%', background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
                <CardContent sx={{ color: 'white' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant="h4" sx={{ fontWeight: 700 }}>
                        {incomeData.currentPeriod.hours + incomeData.currentPeriod.overtimeHours}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        Total Hours
                      </Typography>
                    </Box>
                    <Schedule sx={{ fontSize: 40, opacity: 0.8 }} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={3}>
              <Card sx={{ height: '100%', background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}>
                <CardContent sx={{ color: 'white' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant="h4" sx={{ fontWeight: 700 }}>
                        {formatCurrency(incomeData.currentPeriod.hourlyRate)}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        Hourly Rate
                      </Typography>
                    </Box>
                    <Work sx={{ fontSize: 40, opacity: 0.8 }} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Earnings Breakdown */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Earnings Breakdown
                  </Typography>
                  <Box sx={{ height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={earningsBreakdown}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {earningsBreakdown.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => formatCurrency(value)} />
                      </PieChart>
                    </ResponsiveContainer>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Monthly Earnings Trend
                  </Typography>
                  <Box sx={{ height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value) => formatCurrency(value)} />
                        <Line type="monotone" dataKey="earnings" stroke="#1976d2" strokeWidth={3} />
                      </LineChart>
                    </ResponsiveContainer>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Detailed Breakdown */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Current Period Details
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2">Regular Hours ({incomeData.currentPeriod.hours}h)</Typography>
                      <Typography variant="body2" color="primary">
                        {formatCurrency(incomeData.currentPeriod.hours * incomeData.currentPeriod.hourlyRate)}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2">Overtime Hours ({incomeData.currentPeriod.overtimeHours}h)</Typography>
                      <Typography variant="body2" color="primary">
                        {formatCurrency(incomeData.currentPeriod.overtimeHours * incomeData.currentPeriod.overtimeRate)}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2">Bonuses</Typography>
                      <Typography variant="body2" color="success.main">
                        +{formatCurrency(incomeData.currentPeriod.bonuses)}
                      </Typography>
                    </Box>
                    <Divider />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" fontWeight="bold">Total Earnings</Typography>
                      <Typography variant="body2" fontWeight="bold" color="primary">
                        {formatCurrency(incomeData.currentPeriod.totalEarnings)}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2">Deductions (Taxes, Insurance)</Typography>
                      <Typography variant="body2" color="error.main">
                        -{formatCurrency(incomeData.currentPeriod.deductions)}
                      </Typography>
                    </Box>
                    <Divider />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="h6" fontWeight="bold">Net Income</Typography>
                      <Typography variant="h6" fontWeight="bold" color="success.main">
                        {formatCurrency(incomeData.currentPeriod.netIncome)}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Year-to-Date Summary
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2">Total Earnings</Typography>
                      <Typography variant="body2" color="primary">
                        {formatCurrency(calculateYTD())}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2">Total Hours</Typography>
                      <Typography variant="body2" color="primary">
                        {calculateTotalHours()}h
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2">Average Monthly</Typography>
                      <Typography variant="body2" color="primary">
                        {formatCurrency(calculateYTD() / 6)}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2">Average Hourly</Typography>
                      <Typography variant="body2" color="primary">
                        {formatCurrency(calculateYTD() / calculateTotalHours())}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}

      {selectedTab === 1 && (
        <Box>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Payment History
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Period</TableCell>
                      <TableCell>Contractor</TableCell>
                      <TableCell>Project</TableCell>
                      <TableCell>Hours</TableCell>
                      <TableCell>Regular Pay</TableCell>
                      <TableCell>Overtime</TableCell>
                      <TableCell>Bonus</TableCell>
                      <TableCell>Net Pay</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paymentHistory.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell>{formatDate(payment.date)}</TableCell>
                        <TableCell>{payment.period}</TableCell>
                        <TableCell>{payment.contractor}</TableCell>
                        <TableCell>{payment.project}</TableCell>
                        <TableCell>
                          {payment.hours}h
                          {payment.overtimeHours > 0 && (
                            <Typography variant="caption" display="block" color="text.secondary">
                              +{payment.overtimeHours}h OT
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell>{formatCurrency(payment.regularPay)}</TableCell>
                        <TableCell>{formatCurrency(payment.overtimePay)}</TableCell>
                        <TableCell>{formatCurrency(payment.bonus)}</TableCell>
                        <TableCell>
                          <Typography variant="body2" fontWeight="bold">
                            {formatCurrency(payment.netPay)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={getStatusText(payment.status)}
                            color={getStatusColor(payment.status)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <IconButton
                            size="small"
                            onClick={() => handleViewPaymentDetails(payment)}
                          >
                            <Visibility />
                          </IconButton>
                          <IconButton size="small">
                            <Download />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Box>
      )}

      {selectedTab === 2 && (
        <Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Earnings vs Hours
                  </Typography>
                  <Box sx={{ height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip formatter={(value, name) => [name === 'earnings' ? formatCurrency(value) : `${value}h`, name === 'earnings' ? 'Earnings' : 'Hours']} />
                        <Bar yAxisId="left" dataKey="earnings" fill="#1976d2" name="Earnings" />
                        <Bar yAxisId="right" dataKey="hours" fill="#ff9800" name="Hours" />
                      </BarChart>
                    </ResponsiveContainer>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Overtime Analysis
                  </Typography>
                  <Box sx={{ height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value) => `${value}h`} />
                        <Bar dataKey="overtime" fill="#f44336" />
                      </BarChart>
                    </ResponsiveContainer>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}

      {selectedTab === 3 && (
        <Box>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Income Documents
              </Typography>
              <Alert severity="info" sx={{ mb: 3 }}>
                Download your income statements, tax documents, and payment receipts.
              </Alert>
              
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Card variant="outlined">
                    <CardContent sx={{ textAlign: 'center', py: 3 }}>
                      <Receipt sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                      <Typography variant="h6" gutterBottom>
                        Pay Stubs
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        Download your detailed pay stubs
                      </Typography>
                      <Button variant="outlined" startIcon={<Download />}>
                        Download All
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Card variant="outlined">
                    <CardContent sx={{ textAlign: 'center', py: 3 }}>
                      <AccountBalance sx={{ fontSize: 40, color: 'success.main', mb: 2 }} />
                      <Typography variant="h6" gutterBottom>
                        Tax Documents
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        W-2s, 1099s, and tax summaries
                      </Typography>
                      <Button variant="outlined" startIcon={<Download />}>
                        Download All
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Card variant="outlined">
                    <CardContent sx={{ textAlign: 'center', py: 3 }}>
                      <Payment sx={{ fontSize: 40, color: 'warning.main', mb: 2 }} />
                      <Typography variant="h6" gutterBottom>
                        Payment History
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        Complete payment records
                      </Typography>
                      <Button variant="outlined" startIcon={<Download />}>
                        Download All
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      )}

      {/* Payment Detail Dialog */}
      <Dialog
        open={paymentDetailDialogOpen}
        onClose={() => setPaymentDetailDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        {selectedPayment && (
          <>
            <DialogTitle>
              Payment Details - {selectedPayment.period}
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={3} sx={{ mt: 1 }}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    Payment Information
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2">Payment Date:</Typography>
                      <Typography variant="body2">{formatDate(selectedPayment.date)}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2">Contractor:</Typography>
                      <Typography variant="body2">{selectedPayment.contractor}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2">Project:</Typography>
                      <Typography variant="body2">{selectedPayment.project}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2">Payment Method:</Typography>
                      <Typography variant="body2">{selectedPayment.paymentMethod}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2">Status:</Typography>
                      <Chip
                        label={getStatusText(selectedPayment.status)}
                        color={getStatusColor(selectedPayment.status)}
                        size="small"
                      />
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    Earnings Breakdown
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2">Regular Hours ({selectedPayment.hours}h):</Typography>
                      <Typography variant="body2" color="primary">
                        {formatCurrency(selectedPayment.regularPay)}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2">Overtime Hours ({selectedPayment.overtimeHours}h):</Typography>
                      <Typography variant="body2" color="primary">
                        {formatCurrency(selectedPayment.overtimePay)}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2">Bonus:</Typography>
                      <Typography variant="body2" color="success.main">
                        +{formatCurrency(selectedPayment.bonus)}
                      </Typography>
                    </Box>
                    <Divider />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" fontWeight="bold">Gross Pay:</Typography>
                      <Typography variant="body2" fontWeight="bold" color="primary">
                        {formatCurrency(selectedPayment.regularPay + selectedPayment.overtimePay + selectedPayment.bonus)}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2">Deductions:</Typography>
                      <Typography variant="body2" color="error.main">
                        -{formatCurrency(selectedPayment.deductions)}
                      </Typography>
                    </Box>
                    <Divider />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="h6" fontWeight="bold">Net Pay:</Typography>
                      <Typography variant="h6" fontWeight="bold" color="success.main">
                        {formatCurrency(selectedPayment.netPay)}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setPaymentDetailDialogOpen(false)}>
                Close
              </Button>
              <Button variant="contained" startIcon={<Download />}>
                Download Receipt
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  )
}

export default IncomeTracker
