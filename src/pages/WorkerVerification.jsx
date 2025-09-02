import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Container,
  Paper,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Chip,
  Alert
} from '@mui/material'
import {
  CheckCircle,
  Pending,
  Person,
  Phone,
  Email,
  LocationOn,
  Work,
  Schedule,
  Dashboard
} from '@mui/icons-material'
import { useAuth } from '../contexts/AuthContext'

const WorkerVerification = () => {
  const [verificationStatus, setVerificationStatus] = useState('pending')
  const [timeElapsed, setTimeElapsed] = useState(0)
  const { user, verifyUser } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    // Simulate verification process
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1)
      
      // Simulate verification completion after 5 seconds
      if (timeElapsed >= 5 && verificationStatus === 'pending') {
        setVerificationStatus('completed')
        verifyUser()
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [timeElapsed, verificationStatus, verifyUser])

  const handleGoToDashboard = () => {
    navigate('/worker')
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getStatusIcon = () => {
    switch (verificationStatus) {
      case 'completed':
        return <CheckCircle sx={{ fontSize: 60, color: 'success.main' }} />
      case 'pending':
        return <Pending sx={{ fontSize: 60, color: 'warning.main' }} />
      default:
        return <Pending sx={{ fontSize: 60, color: 'warning.main' }} />
    }
  }

  const getStatusText = () => {
    switch (verificationStatus) {
      case 'completed':
        return 'Verification Complete!'
      case 'pending':
        return 'Verification in Progress...'
      default:
        return 'Verification in Progress...'
    }
  }

  const getStatusDescription = () => {
    switch (verificationStatus) {
      case 'completed':
        return 'Your account has been successfully verified. You can now access your dashboard and start finding work opportunities.'
      case 'pending':
        return 'We are currently reviewing your personal information, skills, and experience. This usually takes a few minutes.'
      default:
        return 'We are currently reviewing your information.'
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        py: 4
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={24}
          sx={{
            p: 4,
            borderRadius: 3,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
              Account Verification
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Please wait while we verify your information
            </Typography>
          </Box>

          <Box sx={{ textAlign: 'center', mb: 4 }}>
            {verificationStatus === 'pending' ? (
              <CircularProgress size={80} sx={{ mb: 2 }} />
            ) : (
              getStatusIcon()
            )}
            
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              {getStatusText()}
            </Typography>
            
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              {getStatusDescription()}
            </Typography>

            {verificationStatus === 'pending' && (
              <Typography variant="body2" color="text.secondary">
                Time elapsed: {formatTime(timeElapsed)}
              </Typography>
            )}
          </Box>

          {verificationStatus === 'completed' && (
            <Alert severity="success" sx={{ mb: 3 }}>
              Your account has been verified successfully! You can now access all features of Mavu and start finding work opportunities.
            </Alert>
          )}

          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <Person sx={{ mr: 1, verticalAlign: 'middle' }} />
                Submitted Information
              </Typography>
              
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <Person color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Full Name" 
                    secondary={user?.name || 'N/A'} 
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <Work color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Work Type" 
                    secondary={user?.workerType || 'N/A'} 
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <Phone color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Phone" 
                    secondary={user?.phone || 'N/A'} 
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <Email color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Email" 
                    secondary={user?.email || 'N/A'} 
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <LocationOn color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Address" 
                    secondary={user?.address || 'N/A'} 
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <Schedule color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Hourly Rate" 
                    secondary={user?.hourlyRate ? `$${user.hourlyRate}` : 'N/A'} 
                  />
                </ListItem>
              </List>

              {user?.skills && user.skills.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Skills:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {user.skills.map((skill) => (
                      <Chip key={skill} label={skill} size="small" />
                    ))}
                  </Box>
                </Box>
              )}

              {user?.certifications && user.certifications.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Certifications:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {user.certifications.map((cert) => (
                      <Chip key={cert} label={cert} size="small" color="secondary" />
                    ))}
                  </Box>
                </Box>
              )}
            </CardContent>
          </Card>

          {verificationStatus === 'completed' ? (
            <Box sx={{ textAlign: 'center' }}>
              <Button
                variant="contained"
                size="large"
                onClick={handleGoToDashboard}
                startIcon={<Dashboard />}
                sx={{
                  py: 1.5,
                  px: 4,
                  borderRadius: 2,
                  background: 'linear-gradient(45deg, #dc004e, #f50057)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #c51162, #dc004e)',
                  }
                }}
              >
                Go to Dashboard
              </Button>
            </Box>
          ) : (
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                What happens next?
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle color="success" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Identity Verification" 
                    secondary="We verify your personal information and contact details" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle color="success" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Skills Assessment" 
                    secondary="We review your skills, experience, and certifications" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle color="success" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Account Activation" 
                    secondary="Your profile becomes visible to contractors looking for workers" 
                  />
                </ListItem>
              </List>
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  )
}

export default WorkerVerification
