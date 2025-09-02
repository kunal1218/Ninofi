import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Paper,
  Button,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Avatar
} from '@mui/material'
import {
  Business,
  Person,
  Work,
  AdminPanelSettings
} from '@mui/icons-material'

const AdminSelect = () => {
  const navigate = useNavigate()

  const handleDashboardSelect = (userType) => {
    // Set user type in localStorage for the selected dashboard
    const currentUser = JSON.parse(localStorage.getItem('mavu_user') || '{}')
    const updatedUser = { ...currentUser, userType }
    localStorage.setItem('mavu_user', JSON.stringify(updatedUser))
    
    // Navigate to selected dashboard
    navigate(`/${userType}`)
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                mx: 'auto',
                mb: 2,
                background: 'linear-gradient(45deg, #ff9800, #f57c00)',
                fontSize: '2rem'
              }}
            >
              <AdminPanelSettings />
            </Avatar>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
              Admin Dashboard Selection
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Choose which dashboard to view and test
            </Typography>
          </Box>

          {/* Dashboard Options */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card 
                sx={{ 
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 8
                  }
                }}
                onClick={() => handleDashboardSelect('customer')}
              >
                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                  <Avatar
                    sx={{
                      width: 60,
                      height: 60,
                      mx: 'auto',
                      mb: 2,
                      background: 'linear-gradient(45deg, #4caf50, #66bb6a)'
                    }}
                  >
                    <Person />
                  </Avatar>
                  <Typography variant="h6" gutterBottom>
                    Customer Dashboard
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Browse contractors, compare services, and start projects
                  </Typography>
                  <Button
                    variant="contained"
                    color="success"
                    fullWidth
                  >
                    View Customer Dashboard
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card 
                sx={{ 
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 8
                  }
                }}
                onClick={() => handleDashboardSelect('contractor')}
              >
                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                  <Avatar
                    sx={{
                      width: 60,
                      height: 60,
                      mx: 'auto',
                      mb: 2,
                      background: 'linear-gradient(45deg, #1976d2, #42a5f5)'
                    }}
                  >
                    <Business />
                  </Avatar>
                  <Typography variant="h6" gutterBottom>
                    Contractor Dashboard
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Manage teams, track expenses, handle payroll, and schedule workers
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    View Contractor Dashboard
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card 
                sx={{ 
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 8
                  }
                }}
                onClick={() => handleDashboardSelect('worker')}
              >
                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                  <Avatar
                    sx={{
                      width: 60,
                      height: 60,
                      mx: 'auto',
                      mb: 2,
                      background: 'linear-gradient(45deg, #ff9800, #ffb74d)'
                    }}
                  >
                    <Work />
                  </Avatar>
                  <Typography variant="h6" gutterBottom>
                    Worker Dashboard
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    View schedule, track hours, submit expenses, and manage profile
                  </Typography>
                  <Button
                    variant="contained"
                    color="warning"
                    fullWidth
                  >
                    View Worker Dashboard
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Warning */}
          <Box sx={{ mt: 4, p: 3, bgcolor: 'warning.light', borderRadius: 2, border: '1px solid #ff9800' }}>
            <Typography variant="body2" color="warning.dark" sx={{ textAlign: 'center', fontWeight: 500 }}>
              ⚠️ TEMPORARY ADMIN ACCESS - REMOVE BEFORE PRODUCTION ⚠️
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}

export default AdminSelect
