import React, { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
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
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Badge
} from '@mui/material'
import {
  Menu as MenuIcon,
  Dashboard,
  People,
  AttachMoney,
  Schedule,
  Assessment,
  Settings,
  Logout,
  Business,
  TrendingUp,
  Work,
  Notifications,
  Home,
  AccountBalance,
  Folder
} from '@mui/icons-material'
import { useAuth } from '../contexts/AuthContext'
import TeamManagement from '../components/contractor/TeamManagement'
import ExpenseTracker from '../components/contractor/ExpenseTracker'
import PayrollManager from '../components/contractor/PayrollManager'
import ScheduleManager from '../components/contractor/ScheduleManager'
import DashboardOverview from '../components/contractor/DashboardOverview'
import WorkerApprovalRequests from '../components/contractor/WorkerApprovalRequests'
import WorkerRequestManager from '../components/contractor/WorkerRequestManager'
import ProjectDirectory from '../components/contractor/ProjectDirectory'
import ProjectTimeline from '../components/contractor/ProjectTimeline'
import ProjectDocuments from '../components/contractor/ProjectDocuments'
import { ProjectProvider } from '../contexts/ProjectContext'

const drawerWidth = 280

const ContractorDashboard = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  // Get selected project from navigation state
  useEffect(() => {
    console.log('Location state:', location.state)
    if (location.state?.selectedProject) {
      console.log('Setting selected project:', location.state.selectedProject)
      setSelectedProject(location.state.selectedProject)
    }
  }, [location.state])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleBackToProjects = () => {
    navigate('/contractor/projects')
  }

  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/contractor/dashboard' },
    { text: 'Back to Projects', icon: <Business />, path: '/contractor/projects', isSpecial: true },
    { text: 'Project Timeline', icon: <Home />, path: '/contractor/dashboard/timeline' },
    { text: 'Documents', icon: <Folder />, path: '/contractor/dashboard/documents' },
    { text: 'Team Management', icon: <People />, path: '/contractor/dashboard/team' },
    { text: 'Worker Requests', icon: <Notifications />, path: '/contractor/dashboard/requests' },
    { text: 'Job Offers', icon: <Work />, path: '/contractor/dashboard/jobs' },
    { text: 'Expense Tracker', icon: <AttachMoney />, path: '/contractor/dashboard/expenses' },
    { text: 'Payroll Manager', icon: <Work />, path: '/contractor/dashboard/payroll' },
    { text: 'Schedule Manager', icon: <Schedule />, path: '/contractor/dashboard/schedule' },
    { text: 'Reports', icon: <Assessment />, path: '/contractor/dashboard/reports' },
    { text: 'Settings', icon: <Settings />, path: '/contractor/dashboard/settings' }
  ]

  const drawer = (
    <Box>
      <Box sx={{ p: 3, textAlign: 'center', borderBottom: '1px solid rgba(0,0,0,0.12)' }}>
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
          {user?.name?.charAt(0) || 'C'}
        </Avatar>
        <Typography variant="h6" gutterBottom>
          {user?.name || 'Contractor'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {user?.company || 'Construction Company'}
        </Typography>
        {selectedProject && (
          <Chip 
            label={selectedProject.name}
            color="secondary" 
            size="small" 
            sx={{ mt: 1, mb: 1 }}
          />
        )}
        <Chip 
          label="Contractor" 
          color="primary" 
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
                backgroundColor: item.isSpecial ? 'rgba(220, 0, 78, 0.08)' : 'rgba(25, 118, 210, 0.08)',
              }
            }}
          >
            <ListItemIcon sx={{ color: item.isSpecial ? 'secondary.main' : 'primary.main' }}>
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
          background: 'linear-gradient(45deg, #1976d2, #42a5f5)'
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
            {selectedProject ? `${selectedProject.name} - Dashboard` : 'Ninofi Contractor Dashboard'}
          </Typography>
          <IconButton color="inherit" onClick={() => navigate('/contractor/dashboard/requests')}>
            <Badge badgeContent={2} color="error">
              <Notifications />
            </Badge>
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
          <Route path="/" element={<DashboardOverview selectedProject={selectedProject} />} />
          <Route path="/timeline" element={
            <ProjectProvider projectId={selectedProject?.id} initial={{ homeowner: selectedProject?.homeowner }}>
              <ProjectTimeline selectedProject={selectedProject} />
            </ProjectProvider>
          } />
          <Route path="/documents" element={
            <ProjectProvider projectId={selectedProject?.id} initial={{ homeowner: selectedProject?.homeowner }}>
              <ProjectDocuments selectedProject={selectedProject} />
            </ProjectProvider>
          } />
          <Route path="/team" element={<TeamManagement selectedProject={selectedProject} />} />
          <Route path="/requests" element={<WorkerApprovalRequests selectedProject={selectedProject} />} />
          <Route path="/jobs" element={<WorkerRequestManager selectedProject={selectedProject} />} />
          <Route path="/expenses" element={<ExpenseTracker selectedProject={selectedProject} />} />
          <Route path="/payroll" element={<PayrollManager selectedProject={selectedProject} />} />
          <Route path="/schedule" element={<ScheduleManager selectedProject={selectedProject} />} />
          <Route path="/reports" element={<div>Reports Page - {selectedProject?.name}</div>} />
          <Route path="/settings" element={<div>Settings Page</div>} />
        </Routes>
      </Box>
    </Box>
  )
}

export default ContractorDashboard
