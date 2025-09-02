import React from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  LinearProgress,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material'
import {
  Pending,
  CheckCircle,
  Cancel,
  Business,
  Person,
  Work,
  Phone,
  LocationOn
} from '@mui/icons-material'
import { useAuth } from '../../contexts/AuthContext'

const ApprovalStatus = () => {
  const { user } = useAuth()

  // Mock approval status - in real app this would come from API
  const approvalStatus = {
    status: 'pending', // 'pending', 'approved', 'rejected'
    businessName: 'ABC Construction Co.',
    businessType: 'General Contractor',
    submittedAt: '2024-01-15T10:30:00Z',
    estimatedResponseTime: '2-3 business days',
    workerRole: 'Electrician',
    workerSkills: ['Electrical', 'Safety Training', 'Blueprint Reading'],
    workerHourlyRate: '$28.00'
  }

  const getStatusIcon = () => {
    switch (approvalStatus.status) {
      case 'approved':
        return <CheckCircle color="success" />
      case 'rejected':
        return <Cancel color="error" />
      default:
        return <Pending color="warning" />
    }
  }

  const getStatusColor = () => {
    switch (approvalStatus.status) {
      case 'approved':
        return 'success'
      case 'rejected':
        return 'error'
      default:
        return 'warning'
    }
  }

  const getStatusText = () => {
    switch (approvalStatus.status) {
      case 'approved':
        return 'Approved'
      case 'rejected':
        return 'Rejected'
      default:
        return 'Pending Approval'
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Approval Status
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            {getStatusIcon()}
            <Typography variant="h6" sx={{ ml: 1 }}>
              {getStatusText()}
            </Typography>
            <Chip 
              label={getStatusText()} 
              color={getStatusColor()} 
              sx={{ ml: 2 }}
            />
          </Box>

          {approvalStatus.status === 'pending' && (
            <>
              <LinearProgress 
                variant="indeterminate" 
                sx={{ mb: 2 }}
              />
              <Alert severity="info" sx={{ mb: 2 }}>
                Your request is currently under review by {approvalStatus.businessName}. 
                Estimated response time: {approvalStatus.estimatedResponseTime}
              </Alert>
            </>
          )}

          {approvalStatus.status === 'approved' && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Congratulations! Your request has been approved. You can now access the business dashboard and start working.
            </Alert>
          )}

          {approvalStatus.status === 'rejected' && (
            <Alert severity="error" sx={{ mb: 2 }}>
              Your request has been rejected. You may contact the business owner for more information or apply to another business.
            </Alert>
          )}

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" gutterBottom>
            Request Details
          </Typography>

          <List>
            <ListItem>
              <ListItemIcon>
                <Business />
              </ListItemIcon>
              <ListItemText 
                primary="Business Name" 
                secondary={approvalStatus.businessName} 
              />
            </ListItem>
            
            <ListItem>
              <ListItemIcon>
                <Work />
              </ListItemIcon>
              <ListItemText 
                primary="Business Type" 
                secondary={approvalStatus.businessType} 
              />
            </ListItem>
            
            <ListItem>
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText 
                primary="Your Role" 
                secondary={approvalStatus.workerRole} 
              />
            </ListItem>
            
            <ListItem>
              <ListItemIcon>
                <Phone />
              </ListItemIcon>
              <ListItemText 
                primary="Your Phone" 
                secondary={user?.phone || 'Not provided'} 
              />
            </ListItem>
            
            <ListItem>
              <ListItemIcon>
                <LocationOn />
              </ListItemIcon>
              <ListItemText 
                primary="Your Address" 
                secondary={user?.address || 'Not provided'} 
              />
            </ListItem>
          </List>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" gutterBottom>
            Your Skills & Rate
          </Typography>

          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Skills:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {approvalStatus.workerSkills.map((skill) => (
                <Chip key={skill} label={skill} size="small" />
              ))}
            </Box>
          </Box>

          <Typography variant="body2" color="text.secondary">
            Hourly Rate: {approvalStatus.workerHourlyRate}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="body2" color="text.secondary">
            Request submitted on {formatDate(approvalStatus.submittedAt)}
          </Typography>
        </CardContent>
      </Card>

      {approvalStatus.status === 'pending' && (
        <Alert severity="info">
          <Typography variant="body2">
            <strong>What happens next?</strong><br />
            • The business owner will review your application<br />
            • You'll receive a notification once a decision is made<br />
            • If approved, you'll gain access to the business dashboard<br />
            • If rejected, you can apply to other businesses
          </Typography>
        </Alert>
      )}
    </Box>
  )
}

export default ApprovalStatus
