/**
 * Payment Management Component
 * 
 * This component handles payment processing for escrow milestones.
 * Features include:
 * - Payment request generation
 * - External payment links for homeowners without accounts
 * - Payment status tracking
 * - Homeowner confirmation requirements
 * - Payment history and receipts
 */

import React, { useState } from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Alert,
  IconButton,
  Tooltip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  LinearProgress
} from '@mui/material'
import {
  Payment,
  Send,
  CheckCircle,
  Schedule,
  Warning,
  Receipt,
  Link as LinkIcon,
  Email,
  Download,
  Visibility,
  AttachMoney,
  AccountBalance,
  CreditCard,
  History,
  Add
} from '@mui/icons-material'
import { format } from 'date-fns'

const PaymentManagement = ({ selectedHomeowner, selectedProject }) => {
  const [paymentRequests, setPaymentRequests] = useState([
    {
      id: 1,
      milestoneId: 1,
      milestoneTitle: 'Project Kickoff & Permits',
      amount: 5000,
      status: 'paid',
      requestDate: new Date('2024-01-15'),
      dueDate: new Date('2024-01-30'),
      paidDate: new Date('2024-01-28'),
      paymentMethod: 'credit_card',
      transactionId: 'txn_1234567890',
      homeownerConfirmed: true,
      paymentLink: 'https://pay.example.com/abc123',
      notes: 'Initial project payment for permits and setup'
    },
    {
      id: 2,
      milestoneId: 2,
      milestoneTitle: 'Foundation & Framing',
      amount: 15000,
      status: 'paid',
      requestDate: new Date('2024-02-01'),
      dueDate: new Date('2024-02-15'),
      paidDate: new Date('2024-02-12'),
      paymentMethod: 'bank_transfer',
      transactionId: 'txn_0987654321',
      homeownerConfirmed: true,
      paymentLink: 'https://pay.example.com/def456',
      notes: 'Foundation work completed successfully'
    },
    {
      id: 3,
      milestoneId: 3,
      milestoneTitle: 'Electrical & Plumbing',
      amount: 12000,
      status: 'pending_confirmation',
      requestDate: new Date('2024-02-20'),
      dueDate: new Date('2024-03-05'),
      paidDate: null,
      paymentMethod: null,
      transactionId: null,
      homeownerConfirmed: false,
      paymentLink: 'https://pay.example.com/ghi789',
      notes: 'Awaiting homeowner confirmation for milestone completion'
    },
    {
      id: 4,
      milestoneId: 4,
      milestoneTitle: 'Insulation & Drywall',
      amount: 8000,
      status: 'draft',
      requestDate: null,
      dueDate: new Date('2024-03-20'),
      paidDate: null,
      paymentMethod: null,
      transactionId: null,
      homeownerConfirmed: false,
      paymentLink: null,
      notes: ''
    }
  ])

  const [requestDialogOpen, setRequestDialogOpen] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [requestFormData, setRequestFormData] = useState({
    amount: '',
    dueDate: new Date(),
    notes: '',
    sendEmail: true,
    sendSMS: false
  })

  const handleCreatePaymentRequest = (milestoneId, milestoneTitle, amount) => {
    setRequestFormData({
      amount: amount.toString(),
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 2 weeks from now
      notes: '',
      sendEmail: true,
      sendSMS: false
    })
    setSelectedRequest({ milestoneId, milestoneTitle, amount })
    setRequestDialogOpen(true)
  }

  const handleSubmitPaymentRequest = () => {
    const newRequest = {
      id: Date.now(),
      milestoneId: selectedRequest.milestoneId,
      milestoneTitle: selectedRequest.milestoneTitle,
      amount: parseFloat(requestFormData.amount),
      status: 'pending_payment',
      requestDate: new Date(),
      dueDate: requestFormData.dueDate,
      paidDate: null,
      paymentMethod: null,
      transactionId: null,
      homeownerConfirmed: false,
      paymentLink: `https://pay.example.com/${Math.random().toString(36).substr(2, 9)}`,
      notes: requestFormData.notes
    }

    setPaymentRequests(prev => [...prev, newRequest])
    setRequestDialogOpen(false)
    setSelectedRequest(null)
    setRequestFormData({
      amount: '',
      dueDate: new Date(),
      notes: '',
      sendEmail: true,
      sendSMS: false
    })

    // Simulate sending notification
    console.log('Payment request sent to homeowner:', newRequest)
  }

  const handleResendPaymentLink = (request) => {
    console.log('Resending payment link:', request.paymentLink)
    // In a real app, this would trigger email/SMS
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'success'
      case 'pending_payment': return 'warning'
      case 'pending_confirmation': return 'info'
      case 'overdue': return 'error'
      case 'draft': return 'default'
      default: return 'default'
    }
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case 'paid': return 'Paid'
      case 'pending_payment': return 'Pending Payment'
      case 'pending_confirmation': return 'Pending Confirmation'
      case 'overdue': return 'Overdue'
      case 'draft': return 'Draft'
      default: return status
    }
  }

  const getPaymentMethodIcon = (method) => {
    switch (method) {
      case 'credit_card': return <CreditCard />
      case 'bank_transfer': return <AccountBalance />
      default: return <Payment />
    }
  }

  if (!selectedHomeowner) {
    return (
      <Card>
        <CardContent>
          <Alert severity="info">
            Please select a homeowner from the Homeowners tab to manage payments.
          </Alert>
        </CardContent>
      </Card>
    )
  }

  const totalAmount = paymentRequests.reduce((sum, req) => sum + req.amount, 0)
  const paidAmount = paymentRequests.filter(req => req.status === 'paid').reduce((sum, req) => sum + req.amount, 0)
  const pendingAmount = paymentRequests.filter(req => req.status === 'pending_payment' || req.status === 'pending_confirmation').reduce((sum, req) => sum + req.amount, 0)

  return (
    <Box>
      {/* Payment Summary */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Payment Overview - {selectedHomeowner.name}
          </Typography>
          
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" color="success.main" sx={{ fontWeight: 600 }}>
                  ${paidAmount.toLocaleString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Paid
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" color="warning.main" sx={{ fontWeight: 600 }}>
                  ${pendingAmount.toLocaleString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Pending
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" color="primary.main" sx={{ fontWeight: 600 }}>
                  ${totalAmount.toLocaleString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Project Value
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Payment Progress
            </Typography>
            <LinearProgress
              variant="determinate"
              value={(paidAmount / totalAmount) * 100}
              sx={{ height: 8, borderRadius: 4 }}
            />
            <Typography variant="caption" color="text.secondary">
              {Math.round((paidAmount / totalAmount) * 100)}% of total project value paid
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Payment Requests Table */}
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6">
              Payment Requests
            </Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => handleCreatePaymentRequest(null, 'Custom Payment', 0)}
            >
              Create Request
            </Button>
          </Box>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Milestone</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Request Date</TableCell>
                  <TableCell>Due Date</TableCell>
                  <TableCell>Payment Date</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paymentRequests.map((request) => (
                  <TableRow key={request.id} hover>
                    <TableCell>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          {request.milestoneTitle}
                        </Typography>
                        {request.notes && (
                          <Typography variant="caption" color="text.secondary">
                            {request.notes}
                          </Typography>
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6" color="primary.main">
                        ${request.amount.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={getStatusLabel(request.status)}
                        color={getStatusColor(request.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {request.requestDate ? format(request.requestDate, 'MMM dd, yyyy') : '-'}
                    </TableCell>
                    <TableCell>
                      {format(request.dueDate, 'MMM dd, yyyy')}
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {request.paidDate ? (
                          <>
                            {getPaymentMethodIcon(request.paymentMethod)}
                            <Box sx={{ ml: 1 }}>
                              <Typography variant="body2">
                                {format(request.paidDate, 'MMM dd, yyyy')}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {request.transactionId}
                              </Typography>
                            </Box>
                          </>
                        ) : (
                          <Typography variant="body2" color="text.secondary">
                            Not paid yet
                          </Typography>
                        )}
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        {request.status === 'pending_payment' && (
                          <Tooltip title="Resend Payment Link">
                            <IconButton
                              size="small"
                              onClick={() => handleResendPaymentLink(request)}
                            >
                              <Send />
                            </IconButton>
                          </Tooltip>
                        )}
                        {request.paymentLink && (
                          <Tooltip title="Copy Payment Link">
                            <IconButton
                              size="small"
                              onClick={() => navigator.clipboard.writeText(request.paymentLink)}
                            >
                              <LinkIcon />
                            </IconButton>
                          </Tooltip>
                        )}
                        {request.status === 'paid' && (
                          <Tooltip title="Download Receipt">
                            <IconButton size="small">
                              <Download />
                            </IconButton>
                          </Tooltip>
                        )}
                        <Tooltip title="View Details">
                          <IconButton size="small">
                            <Visibility />
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

      {/* Payment Request Dialog */}
      <Dialog 
        open={requestDialogOpen} 
        onClose={() => setRequestDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Create Payment Request
        </DialogTitle>
        <DialogContent>
          <Alert severity="info" sx={{ mb: 3 }}>
            {selectedHomeowner.hasAccount 
              ? 'The homeowner will be notified in their account and via email.'
              : 'A secure payment link will be sent to the homeowner\'s email address.'
            }
          </Alert>

          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                Milestone: {selectedRequest?.milestoneTitle}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Amount"
                type="number"
                value={requestFormData.amount}
                onChange={(e) => setRequestFormData(prev => ({ ...prev, amount: e.target.value }))}
                InputProps={{
                  startAdornment: <span>$</span>
                }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Due Date"
                type="date"
                value={requestFormData.dueDate.toISOString().split('T')[0]}
                onChange={(e) => setRequestFormData(prev => ({ ...prev, dueDate: new Date(e.target.value) }))}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Notes (Optional)"
                multiline
                rows={3}
                value={requestFormData.notes}
                onChange={(e) => setRequestFormData(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Add any additional information for the homeowner..."
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle2" gutterBottom>
              Notification Options
            </Typography>
            <List dense>
              <ListItem>
                <ListItemIcon>
                  <Email />
                </ListItemIcon>
                <ListItemText primary="Send email notification" />
                <Chip label="Always sent" color="primary" size="small" />
              </ListItem>
              {selectedHomeowner.phone && (
                <ListItem>
                  <ListItemIcon>
                    <Schedule />
                  </ListItemIcon>
                  <ListItemText primary="Send SMS reminder" />
                  <Chip label="Optional" variant="outlined" size="small" />
                </ListItem>
              )}
            </List>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRequestDialogOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmitPaymentRequest}
            disabled={!requestFormData.amount}
            startIcon={<Send />}
          >
            Send Payment Request
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default PaymentManagement
