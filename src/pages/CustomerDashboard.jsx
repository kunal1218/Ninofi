import React, { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Avatar,
  Divider,
  Chip
} from '@mui/material'
import {
  Menu as MenuIcon,
  Dashboard,
  Search,
  Chat,
  Assignment,
  Person,
  Logout,
  Notifications,
  Home,
  Business
} from '@mui/icons-material'
import { useAuth } from '../contexts/AuthContext'
import CustomerOverview from '../components/customer/CustomerOverview'
import ContractorBrowse from '../components/customer/ContractorBrowse'
import ProjectManagement from '../components/customer/ProjectManagement'
import CustomerProfile from '../components/customer/CustomerProfile'

const drawerWidth = 250

const CustomerDashboard = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/customer' },
    { text: 'Browse Contractors', icon: <Search />, path: '/customer/browse' },
    { text: 'My Projects', icon: <Assignment />, path: '/customer/projects' },
    { text: 'Chats', icon: <Chat />, path: '/customer/chats' },
    { text: 'My Profile', icon: <Person />, path: '/customer/profile' }
  ]

  const drawer = (
    <Box>
      <Box sx={{ p: 3, textAlign: 'center', borderBottom: '1px solid rgba(0,0,0,0.12)' }}>
        <Avatar
          sx={{
            width: 70,
            height: 70,
            mx: 'auto',
            mb: 2,
            background: 'linear-gradient(45deg, #4caf50, #8bc34a)',
            fontSize: '1.5rem'
          }}
        >
          {user?.name?.charAt(0) || 'C'}
        </Avatar>
        <Typography variant="h6" gutterBottom>
          {user?.name || 'Customer'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {user?.role || 'Homeowner'}
        </Typography>
        <Chip 
          label="Customer" 
          color="success" 
          size="small" 
          sx={{ mt: 1 }}
        />
      </Box>
      
      <List sx={{ pt: 2 }}>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => navigate(item.path)}
            sx={{
              mx: 1,
              mb: 0.5,
              borderRadius: 2,
              '&:hover': {
                backgroundColor: 'rgba(76, 175, 80, 0.08)',
              }
            }}
          >
            <ListItemIcon sx={{ color: 'success.main' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      
      <Divider sx={{ my: 2 }} />
      
      <List>
        <ListItem
          button
          onClick={handleLogout}
          sx={{
            mx: 1,
            borderRadius: 2,
            '&:hover': {
              backgroundColor: 'rgba(76, 175, 80, 0.08)',
            }
          }}
        >
          <ListItemIcon sx={{ color: 'success.main' }}>
            <Logout />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Box>
  )

  return (
    <Box sx={{ display: 'flex' }}>
      {/* App Bar */}
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          background: 'linear-gradient(45deg, #4caf50, #8bc34a)'
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Mavu Customer Dashboard
          </Typography>
          <IconButton color="inherit">
            <Notifications />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Navigation Drawer */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: 8
        }}
      >
        <Routes>
          <Route path="/" element={<CustomerOverview />} />
          <Route path="/browse" element={<ContractorBrowse />} />
          <Route path="/projects" element={<ProjectManagement />} />
          <Route path="/chats" element={<div>Chats Page</div>} />
          <Route path="/profile" element={<CustomerProfile />} />
        </Routes>
      </Box>
    </Box>
  )
}

export default CustomerDashboard
