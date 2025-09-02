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
  Schedule,
  Receipt,
  Person,
  Work,
  Logout,
  Notifications,
  AttachMoney
} from '@mui/icons-material'
import { useAuth } from '../contexts/AuthContext'
import WorkerOverview from '../components/worker/WorkerOverview'
import WorkerSchedule from '../components/worker/WorkerSchedule'
import ExpenseSubmission from '../components/worker/ExpenseSubmission'
import WorkerProfile from '../components/worker/WorkerProfile'
import ApprovalStatus from '../components/worker/ApprovalStatus'
import JobOffers from '../components/worker/JobOffers'
import IncomeTracker from '../components/worker/IncomeTracker'

const drawerWidth = 250

const WorkerDashboard = () => {
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
    { text: 'Dashboard', icon: <Dashboard />, path: '/worker' },
    { text: 'Browse Jobs', icon: <Work />, path: '/worker/jobs' },
    { text: 'Income Tracker', icon: <AttachMoney />, path: '/worker/income' },
    { text: 'Approval Status', icon: <Notifications />, path: '/worker/approval' },
    { text: 'My Schedule', icon: <Schedule />, path: '/worker/schedule' },
    { text: 'Submit Expenses', icon: <Receipt />, path: '/worker/expenses' },
    { text: 'My Profile', icon: <Person />, path: '/worker/profile' }
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
            background: 'linear-gradient(45deg, #dc004e, #f50057)',
            fontSize: '1.5rem'
          }}
        >
          {user?.name?.charAt(0) || 'W'}
        </Avatar>
        <Typography variant="h6" gutterBottom>
          {user?.name || 'Worker'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {user?.role || 'Laborer'}
        </Typography>
        <Chip 
          label="Worker" 
          color="secondary" 
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
                backgroundColor: 'rgba(220, 0, 78, 0.08)',
              }
            }}
          >
            <ListItemIcon sx={{ color: 'secondary.main' }}>
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
              backgroundColor: 'rgba(220, 0, 78, 0.08)',
            }
          }}
        >
          <ListItemIcon sx={{ color: 'secondary.main' }}>
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
          background: 'linear-gradient(45deg, #dc004e, #f50057)'
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
            Mavu Worker Dashboard
          </Typography>
          <IconButton color="inherit" onClick={() => navigate('/worker/approval')}>
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
          <Route path="/" element={<WorkerOverview />} />
          <Route path="/jobs" element={<JobOffers />} />
          <Route path="/income" element={<IncomeTracker />} />
          <Route path="/approval" element={<ApprovalStatus />} />
          <Route path="/schedule" element={<WorkerSchedule />} />
          <Route path="/expenses" element={<ExpenseSubmission />} />
          <Route path="/profile" element={<WorkerProfile />} />
        </Routes>
      </Box>
    </Box>
  )
}

export default WorkerDashboard
