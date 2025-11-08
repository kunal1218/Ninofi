/**
 * Project Selection Page
 * 
 * This is the first page contractors see when they log in.
 * It's a dedicated page showing only the project directory.
 * After selecting a project, they get access to the full dashboard.
 */

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Avatar,
  Container,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import {
  Logout,
  Settings,
  AccountCircle
} from '@mui/icons-material'
import { useAuth } from '../contexts/AuthContext'
import ProjectDirectory from '../components/contractor/ProjectDirectory'

const ProjectSelection = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
    handleMenuClose()
  }

  const handleProjectSelect = (project) => {
    console.log('Project selected:', project)
    // Navigate to the full contractor dashboard with the selected project
    navigate('/contractor/dashboard', { 
      state: { selectedProject: project }
    })
  }

  const handleCreateProject = (projectData) => {
    // Handle project creation
    console.log('Creating project:', projectData)
    // In a real app, you would make an API call here
    // After creating, you could automatically select the new project
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      {/* Top Navigation Bar */}
      <AppBar 
        position="static" 
        sx={{ 
          background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
            Ninofi - Project Selection
          </Typography>
          
          {/* User Info */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ textAlign: 'right', display: { xs: 'none', sm: 'block' } }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                {user?.name || 'Contractor'}
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.8 }}>
                {user?.company || 'Construction Company'}
              </Typography>
            </Box>
            
            <IconButton
              size="large"
              aria-label="account menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenuOpen}
              color="inherit"
            >
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  background: 'rgba(255,255,255,0.2)',
                  fontSize: '1.2rem'
                }}
              >
                {user?.name?.charAt(0) || 'C'}
              </Avatar>
            </IconButton>
            
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose}>
                <ListItemIcon>
                  <AccountCircle fontSize="small" />
                </ListItemIcon>
                <ListItemText>Profile</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                <ListItemText>Settings</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                <ListItemText>Logout</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 700, color: 'text.primary' }}>
            Welcome back, {user?.name?.split(' ')[0] || 'Contractor'}! 👋
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
            Select a project to start managing your team, expenses, and schedules
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Choose from your existing projects or create a new one to get started
          </Typography>
        </Box>

        {/* Project Directory Component */}
        <ProjectDirectory 
          onProjectSelect={handleProjectSelect}
          onCreateProject={handleCreateProject}
        />
      </Container>

      {/* Footer */}
      <Box 
        component="footer" 
        sx={{ 
          mt: 'auto', 
          py: 3, 
          textAlign: 'center',
          borderTop: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper'
        }}
      >
        <Typography variant="body2" color="text.secondary">
          © 2024 Ninofi Contracting Platform. All rights reserved.
        </Typography>
      </Box>
    </Box>
  )
}

export default ProjectSelection
