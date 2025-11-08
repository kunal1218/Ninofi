import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Container,
  Avatar,
  InputAdornment,
  IconButton
} from '@mui/material'
import {
  Business,
  Person,
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Schedule,
  MonetizationOn,
  CheckCircle
} from '@mui/icons-material'
import { useAuth } from '../contexts/AuthContext'

const LoginPage = () => {
  const [userType, setUserType] = useState('customer') // Default to customer
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleUserTypeChange = (event, newUserType) => {
    if (newUserType !== null) {
      setUserType(newUserType)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    const success = await login(email, password, userType)
    if (success) {
      navigate(userType === 'customer' ? '/customer' : userType === 'contractor' ? '/contractor' : '/worker')
    }
    setLoading(false)
  }

  const handleDemoLogin = async () => {
    setLoading(true)
    const demoEmail = userType === 'customer' ? 'customer@demo.com' : userType === 'contractor' ? 'contractor@demo.com' : 'worker@demo.com'
    const success = await login(demoEmail, 'demo123', userType)
    if (success) {
      navigate(userType === 'customer' ? '/customer' : userType === 'contractor' ? '/contractor' : '/worker')
    }
    setLoading(false)
  }

  const featureDetails = {
    customer: [
      { icon: <CheckCircle sx={{ color: '#1976d2' }} />, text: 'Browse vetted contractors' },
      { icon: <MonetizationOn sx={{ color: '#009688' }} />, text: 'Track proposals & budgets' }
    ],
    contractor: [
      { icon: <MonetizationOn sx={{ color: '#ff9800' }} />, text: 'Monitor payroll & expenses' },
      { icon: <Schedule sx={{ color: '#ab47bc' }} />, text: 'Coordinate worker schedules' }
    ],
    worker: [
      { icon: <CheckCircle sx={{ color: '#4caf50' }} />, text: 'Log hours & submit expenses' },
      { icon: <Schedule sx={{ color: '#5c6bc0' }} />, text: 'Stay aligned with shifts' }
    ]
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        height: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 1.5
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          py: { xs: 1.5, md: 2 }
        }}
      >
        <Paper
          elevation={24}
          sx={{
            width: '100%',
            maxWidth: 520,
            p: { xs: 2.5, sm: 3.5 },
            borderRadius: 3,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            maxHeight: '86vh'
          }}
        >
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 2.5 }}>
            <Avatar
              sx={{
                width: 64,
                height: 64,
                mx: 'auto',
                mb: 1.5,
                background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                fontSize: '2rem'
              }}
            >
              N
            </Avatar>
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 700,
                fontSize: { xs: '1.9rem', sm: '2.1rem' },
                lineHeight: 1.25,
                fontVariantLigatures: 'none',
                fontFeatureSettings: '"liga" 0, "clig" 0',
              }}
            >
              Welcome to Ninofi
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Your comprehensive contracting management solution
            </Typography>
          </Box>

          {/* User Type Selection */}
          <Box sx={{ mb: 2.5, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              I am a:
            </Typography>
            <ToggleButtonGroup
              value={userType}
              exclusive
              onChange={handleUserTypeChange}
              sx={{
                mt: 1,
                width: '100%',
                display: 'flex',
                gap: 1,
                flexWrap: 'wrap',
                justifyContent: 'center',
                '& .MuiToggleButtonGroup-middleButton, & .MuiToggleButtonGroup-firstButton, & .MuiToggleButtonGroup-lastButton': {
                  border: 'none'
                },
                '& .MuiToggleButton-root': {
                  px: 2.5,
                  py: 1.2,
                  borderRadius: 999,
                  border: '1px solid rgba(0,0,0,0.12)',
                  fontWeight: 600,
                  minWidth: { xs: '100%', sm: 140 },
                  '&.Mui-selected': {
                    background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                    color: 'white',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #1565c0, #1976d2)',
                    }
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(25,118,210,0.08)'
                  }
                }
              }}
            >
              <ToggleButton value="customer">
                <Person sx={{ mr: 1 }} />
                Customer
              </ToggleButton>
              <ToggleButton value="contractor">
                <Business sx={{ mr: 1 }} />
                Contractor
              </ToggleButton>
              <ToggleButton value="worker">
                <Person sx={{ mr: 1 }} />
                Worker
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          {/* Login Form */}
          <Box component="form" onSubmit={handleSubmit} sx={{ mb: 2 }}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />
            
            <TextField
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{
                py: 1.1,
                borderRadius: 2,
                background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #1565c0, #1976d2)',
                }
              }}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
          </Box>

          {/* Demo Login */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary" gutterBottom sx={{ fontSize: '0.9rem' }}>
              Don't have an account? Try our demo:
            </Typography>
            <Button
              variant="outlined"
              onClick={handleDemoLogin}
              disabled={loading}
              sx={{ borderRadius: 2 }}
            >
              Demo Login {userType && `(${userType.charAt(0).toUpperCase() + userType.slice(1)})`}
            </Button>
            {!userType && (
              <Typography variant="caption" color="warning.main" sx={{ display: 'block', mt: 1 }}>
                Please select a user type above first
              </Typography>
            )}
          </Box>



          {/* Features Preview */}
          <Box sx={{ mt: 2.5, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
            <Typography variant="subtitle1" gutterBottom sx={{ textAlign: 'center', fontWeight: 600 }}>
              {userType === 'customer'
                ? 'Customer Features'
                : userType === 'contractor'
                ? 'Contractor Features'
                : 'Worker Features'}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mb: 1.5, fontSize: '0.9rem' }}>
              {userType === 'customer' 
                ? 'Browse contractors, compare services, and start projects'
                : userType === 'contractor' 
                ? 'Manage teams, track expenses, handle payroll, and schedule workers'
                : 'View schedule, track hours, submit expenses, and manage profile'
              }
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                gap: 1.5
              }}
            >
              {featureDetails[userType].map((detail) => (
                <Box
                  key={detail.text}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: 'rgba(255,255,255,0.9)'
                  }}
                >
                  {detail.icon}
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {detail.text}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}

export default LoginPage
