/**
 * Project Payments Component
 * 
 * This component handles payment processing for project checkpoints.
 * It's project-specific and tied to the homeowner relationship.
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
  CreditCard
} from '@mui/icons-material'
import { format } from 'date-fns'

const ProjectPayments = ({ project, checkpoints }) => {
  const [requestDialogOpen, setRequestDialogOpen] = useState(false)
  const [selectedCheckpoint, setSelectedCheckpoint] = useState(null)

  // Generate payment data from checkpoints
  const paymentRequests = checkpoints.map(checkpoint => ({
    id: checkpoint.id,
    checkpointId: checkpoint.id,
    checkpointTitle: checkpoint.title,
    amount: checkpoint.amount,
    status: checkpoint.paymentReleased ? 'paid' : 
            (checkpoint.status === 'completed' && checkpoint.homeownerApproved) ? 'ready_for_payment' :
            checkpoint.status === 'completed' ? 'pending_approval' : 'not_ready',
    requestDate: checkpoint.status === 'completed' ? checkpoint.completedDate : null,
    dueDate: checkpoint.dueDate,
    paidDate: checkpoint.paymentReleased ? new Date() : null,
    paymentMethod: checkpoint.paymentReleased ? 'credit_card' : null,
    transactionId: checkpoint.paymentReleased ? `txn_${checkpoint.id}_${Date.now()}` : null,
    homeownerConfirmed: checkpoint.homeownerApproved,
    paymentLink: checkpoint.status === 'completed' ? `https://pay.example.com/${checkpoint.id}` : null
  }))

  const handleRequestPayment = (checkpoint) => {
    setSelectedCheckpoint(checkpoint)
    setRequestDialogOpen(true)
  }

  const handleSendPaymentRequest = () => {
    console.log('Payment request sent for checkpoint:', selectedCheckpoint.title)
    
    // Simulate sending payment request
    const paymentLink = `https://pay.example.com/${selectedCheckpoint.id}`
    
    if (project.homeowner.hasAccount) {
      alert(`Payment request sent to ${project.homeowner.name} via in-app notification for $${selectedCheckpoint.amount.toLocaleString()}`)
    } else {
      alert(`Payment link sent to ${project.homeowner.email}: ${paymentLink}`)
    }
    
    setRequestDialogOpen(false)
    setSelectedCheckpoint(null)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'success'
      case 'ready_for_payment': return 'primary'
      case 'pending_approval': return 'warning'
      case 'not_ready': return 'default'
      default: return 'default'
    }
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case 'paid': return 'Paid'
      case 'ready_for_payment': return 'Ready for Payment'
      case 'pending_approval': return 'Awaiting Approval'
      case 'not_ready': return 'Not Ready'
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

  const totalAmount = paymentRequests.reduce((sum, req) => sum + req.amount, 0)
  const paidAmount = paymentRequests.filter(req => req.status === 'paid').reduce((sum, req) => sum + req.amount, 0)
  const readyAmount = paymentRequests.filter(req => req.status === 'ready_for_payment').reduce((sum, req) => sum + req.amount, 0)

  return (
    <Box>
      {/* Payment Summary */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Payment Overview - {project.name}
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
                <Typography variant="h4" color="primary.main" sx={{ fontWeight: 600 }}>
                  ${readyAmount.toLocaleString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Ready for Payment
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" color="info.main" sx={{ fontWeight: 600 }}>
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
          <Typography variant="h6" gutterBottom>
            Checkpoint Payments
          </Typography>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Checkpoint</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Due Date</TableCell>
                  <TableCell>Payment Date</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paymentRequests.map((request) => (
                  <TableRow key={request.id} hover>
                    <TableCell>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {request.checkpointTitle}
                      </Typography>
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
                              {request.transactionId && (
                                <Typography variant="caption" color="text.secondary">
                                  {request.transactionId}
                                </Typography>
                              )}
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
                        {request.status === 'ready_for_payment' && (
                          <Tooltip title="Request Payment">
                            <Button
                              size="small"
                              variant="contained"
                              startIcon={<Send />}
                              onClick={() => handleRequestPayment(request)}
                            >
                              Request Payment
                            </Button>
                          </Tooltip>
                        )}
                        {request.status === 'pending_approval' && (
                          <Tooltip title="Awaiting homeowner approval">
                            <IconButton size="small" disabled>
                              <Schedule />
                            </IconButton>
                          </Tooltip>
                        )}
                        {request.paymentLink && request.status !== 'paid' && (
                          <Tooltip title="Copy Payment Link">
                            <IconButton
                              size="small"
                              onClick={() => {
                                navigator.clipboard.writeText(request.paymentLink)
                                alert('Payment link copied to clipboard!')
                              }}
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
          Request Payment
        </DialogTitle>
        <DialogContent>
          {selectedCheckpoint && (
            <>
              <Alert severity="info" sx={{ mb: 3 }}>
                {project.homeowner.hasAccount 
                  ? 'The homeowner will be notified in their account and via email.'
                  : 'A secure payment link will be sent to the homeowner\'s email address.'
                }
              </Alert>

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    {selectedCheckpoint.checkpointTitle}
                  </Typography>
                  <Typography variant="h4" color="primary.main" gutterBottom>
                    ${selectedCheckpoint.amount.toLocaleString()}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Homeowner:</strong> {project.homeowner.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Email:</strong> {project.homeowner.email}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Due Date:</strong> {format(selectedCheckpoint.dueDate, 'MMM dd, yyyy')}
                  </Typography>
                </Grid>
              </Grid>

              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Payment Method
                </Typography>
                <Alert severity="success">
                  <Typography variant="body2">
                    {project.homeowner.hasAccount 
                      ? 'Homeowner can pay directly through their account'
                      : 'Secure payment link will allow credit card or bank transfer'
                    }
                  </Typography>
                </Alert>
              </Box>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRequestDialogOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSendPaymentRequest}
            startIcon={<Send />}
          >
            Send Payment Request
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default ProjectPayments
