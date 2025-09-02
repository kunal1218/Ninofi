import React, { useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Alert
} from '@mui/material'
import {
  Person,
  CheckCircle,
  Cancel,
  Work,
  Phone,
  LocationOn,
  AttachMoney
} from '@mui/icons-material'
import { useAuth } from '../../contexts/AuthContext'

const WorkerApprovalRequests = () => {
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const { approveWorkerRequest, rejectWorkerRequest } = useAuth()

  // Mock data for pending worker requests
  const [pendingRequests, setPendingRequests] = useState([
    {
      id: '1',
      workerName: 'John Smith',
      role: 'Electrician',
      phone: '+1 (555) 123-4567',
      address: '123 Main St, City, State',
      skills: ['Electrical', 'Safety Training', 'Blueprint Reading'],
      hourlyRate: '$28.00',
      requestedAt: '2024-01-15T10:30:00Z',
      businessName: 'ABC Construction Co.'
    },
    {
      id: '2',
      workerName: 'Sarah Johnson',
      role: 'Carpenter',
      phone: '+1 (555) 987-6543',
      address: '456 Oak Ave, City, State',
      skills: ['Framing', 'Flooring', 'Safety Training'],
      hourlyRate: '$25.00',
      requestedAt: '2024-01-14T14:20:00Z',
      businessName: 'ABC Construction Co.'
    }
  ])

  const handleApprove = (requestId) => {
    approveWorkerRequest(requestId)
    setPendingRequests(prev => prev.filter(req => req.id !== requestId))
    setDialogOpen(false)
  }

  const handleReject = (requestId) => {
    rejectWorkerRequest(requestId)
    setPendingRequests(prev => prev.filter(req => req.id !== requestId))
    setDialogOpen(false)
  }

  const openRequestDetails = (request) => {
    setSelectedRequest(request)
    setDialogOpen(true)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (pendingRequests.length === 0) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="info">
          No pending worker approval requests at this time.
        </Alert>
      </Box>
    )
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Pending Worker Approval Requests
      </Typography>

      <Grid container spacing={3}>
        {pendingRequests.map((request) => (
          <Grid item xs={12} md={6} key={request.id}>
            <Card 
              sx={{ 
                cursor: 'pointer',
                '&:hover': { boxShadow: 4 }
              }}
              onClick={() => openRequestDetails(request)}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                    <Person />
                  </Avatar>
                  <Box>
                    <Typography variant="h6">{request.workerName}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {request.role}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Phone sx={{ fontSize: 16, mr: 1 }} />
                    {request.phone}
                  </Typography>
                  <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <LocationOn sx={{ fontSize: 16, mr: 1 }} />
                    {request.address}
                  </Typography>
                  <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                    <AttachMoney sx={{ fontSize: 16, mr: 1 }} />
                    {request.hourlyRate}/hr
                  </Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Skills:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {request.skills.map((skill) => (
                      <Chip key={skill} label={skill} size="small" />
                    ))}
                  </Box>
                </Box>

                <Typography variant="caption" color="text.secondary">
                  Requested: {formatDate(request.requestedAt)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Request Details Dialog */}
      <Dialog 
        open={dialogOpen} 
        onClose={() => setDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        {selectedRequest && (
          <>
            <DialogTitle>
              Worker Request Details
            </DialogTitle>
            <DialogContent>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  {selectedRequest.workerName}
                </Typography>
                <Typography variant="body1" color="text.secondary" gutterBottom>
                  {selectedRequest.role}
                </Typography>
              </Box>

              <List>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <Phone />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary="Phone" 
                    secondary={selectedRequest.phone} 
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <LocationOn />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary="Address" 
                    secondary={selectedRequest.address} 
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <AttachMoney />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary="Hourly Rate" 
                    secondary={selectedRequest.hourlyRate} 
                  />
                </ListItem>
              </List>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle1" gutterBottom>
                Skills & Experience
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                {selectedRequest.skills.map((skill) => (
                  <Chip key={skill} label={skill} color="primary" variant="outlined" />
                ))}
              </Box>

              <Typography variant="caption" color="text.secondary">
                Request submitted on {formatDate(selectedRequest.requestedAt)}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button 
                onClick={() => setDialogOpen(false)}
                color="inherit"
              >
                Cancel
              </Button>
              <Button 
                onClick={() => handleReject(selectedRequest.id)}
                startIcon={<Cancel />}
                color="error"
                variant="outlined"
              >
                Reject
              </Button>
              <Button 
                onClick={() => handleApprove(selectedRequest.id)}
                startIcon={<CheckCircle />}
                color="success"
                variant="contained"
              >
                Approve
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  )
}

export default WorkerApprovalRequests
