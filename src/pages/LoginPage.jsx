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
  Lock
} from '@mui/icons-material'
import { useAuth } from '../contexts/AuthContext'

const LoginPage = () => {
  const [userType, setUserType] = useState('customer')
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
      <Container maxWidth="sm">
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
                background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                fontSize: '2rem'
              }}
            >
              M
            </Avatar>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
              Welcome to Mavu
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Your comprehensive contracting management solution
            </Typography>
          </Box>

          {/* User Type Selection */}
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              I am a:
            </Typography>
            <ToggleButtonGroup
              value={userType}
              exclusive
              onChange={handleUserTypeChange}
              sx={{
                '& .MuiToggleButton-root': {
                  px: 4,
                  py: 2,
                  borderRadius: 2,
                  '&.Mui-selected': {
                    background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                    color: 'white',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #1565c0, #1976d2)',
                    }
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
          <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
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
                py: 1.5,
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
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Don't have an account? Try our demo:
            </Typography>
            <Button
              variant="outlined"
              onClick={handleDemoLogin}
              disabled={loading}
              sx={{ borderRadius: 2 }}
            >
              Demo Login
            </Button>
          </Box>

          {/* Features Preview */}
          <Box sx={{ mt: 4, p: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>
              {userType === 'contractor' ? 'Contractor Features:' : 'Worker Features:'}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
              {userType === 'customer' 
                ? 'Browse contractors, compare services, and start projects'
                : userType === 'contractor' 
                ? 'Manage teams, track expenses, handle payroll, and schedule workers'
                : 'View schedule, track hours, submit expenses, and manage profile'
              }
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}

export default LoginPage
