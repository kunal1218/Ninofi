/**
 * Project Directory Component
 * 
 * This is the first screen contractors see when they log in.
 * It allows them to select an existing project or create a new one.
 */

import React, { useState } from 'react'
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Chip,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Alert,
  LinearProgress
} from '@mui/material'
import {
  Add,
  MoreVert,
  Edit,
  Delete,
  Visibility,
  Work,
  CalendarToday,
  AttachMoney,
  People,
  TrendingUp,
  CheckCircle,
  Schedule,
  Warning
} from '@mui/icons-material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { format } from 'date-fns'
import HomeownerLinking from './HomeownerLinking'

const ProjectDirectory = ({ onProjectSelect, onCreateProject }) => {
  const [openDialog, setOpenDialog] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedProject, setSelectedProject] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    client: '',
    startDate: new Date(),
    endDate: null,
    budget: '',
    status: 'planning',
    homeowner: null,
    homeownerEmail: '',
    homeownerName: '',
    homeownerPhone: ''
  })

  // Mock data - replace with actual API calls
  const projects = [
    {
      id: 1,
      name: 'Downtown Office Complex',
      description: 'Construction of a 15-story office building in downtown area',
      client: 'ABC Development Corp',
      startDate: new Date('2024-01-15'),
      endDate: new Date('2024-12-31'),
      budget: 2500000,
      status: 'active',
      progress: 65,
      teamSize: 12,
      location: '123 Main St, Downtown',
      homeowner: {
        id: 1,
        name: 'Sarah Johnson',
        email: 'sarah.j@email.com',
        hasAccount: true
      }
    },
    {
      id: 2,
      name: 'Residential Subdivision',
      description: 'Development of 50 single-family homes',
      client: 'Home Builders Inc',
      startDate: new Date('2024-03-01'),
      endDate: new Date('2024-11-30'),
      budget: 1800000,
      status: 'planning',
      progress: 15,
      teamSize: 8,
      location: '456 Oak Avenue, Suburbs',
      homeowner: {
        id: 2,
        name: 'Mike Wilson',
        email: 'mike.w@email.com',
        hasAccount: false
      }
    },
    {
      id: 3,
      name: 'Shopping Center Renovation',
      description: 'Complete renovation of existing shopping center',
      client: 'Retail Properties LLC',
      startDate: new Date('2023-11-01'),
      endDate: new Date('2024-06-30'),
      budget: 950000,
      status: 'completed',
      progress: 100,
      teamSize: 6,
      location: '789 Commerce Blvd, Midtown',
      homeowner: null // No homeowner linked yet
    },
    {
      id: 4,
      name: 'Industrial Warehouse',
      description: 'Construction of 100,000 sq ft warehouse facility',
      client: 'Logistics Solutions',
      startDate: new Date('2024-02-15'),
      endDate: new Date('2024-09-15'),
      budget: 3200000,
      status: 'active',
      progress: 40,
      teamSize: 15,
      location: '321 Industrial Way, Port District',
      homeowner: {
        id: 3,
        name: 'David Chen',
        email: 'david.chen@email.com',
        hasAccount: true
      }
    }
  ]

  const handleOpenDialog = (project = null) => {
    if (project) {
      setEditingProject(project)
      setFormData({
        name: project.name,
        description: project.description,
        client: project.client,
        startDate: project.startDate,
        endDate: project.endDate,
        budget: project.budget.toString(),
        status: project.status
      })
    } else {
      setEditingProject(null)
      setFormData({
        name: '',
        description: '',
        client: '',
        startDate: new Date(),
        endDate: null,
        budget: '',
        status: 'planning',
        homeowner: null,
        homeownerEmail: '',
        homeownerName: '',
        homeownerPhone: ''
      })
    }
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setEditingProject(null)
    setFormData({
      name: '',
      description: '',
      client: '',
      startDate: new Date(),
      endDate: null,
      budget: '',
      status: 'planning',
      homeowner: null,
      homeownerEmail: '',
      homeownerName: '',
      homeownerPhone: ''
    })
  }

  const handleHomeownerLinked = (homeownerData) => {
    setFormData(prev => ({
      ...prev,
      homeowner: homeownerData.homeowner,
      homeownerEmail: homeownerData.homeowner.email,
      homeownerName: homeownerData.homeowner.name,
      homeownerPhone: homeownerData.homeowner.phone || ''
    }))
  }

  const handleSubmit = () => {
    // Handle form submission - create or update project
    console.log('Project data:', formData)
    onCreateProject?.(formData)
    handleCloseDialog()
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleMenuOpen = (event, project) => {
    setAnchorEl(event.currentTarget)
    setSelectedProject(project)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedProject(null)
  }

  const handleProjectSelect = (project) => {
    onProjectSelect?.(project)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'success'
      case 'planning': return 'warning'
      case 'completed': return 'info'
      case 'on-hold': return 'error'
      default: return 'default'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <TrendingUp />
      case 'planning': return <Schedule />
      case 'completed': return <CheckCircle />
      case 'on-hold': return <Warning />
      default: return <Work />
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Project Directory
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Select a project to manage or create a new one
        </Typography>
      </Box>

      {/* Projects Grid */}
      <Grid container spacing={3}>
        {projects.map((project) => (
          <Grid item xs={12} sm={6} md={4} key={project.id}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4
                }
              }}
              onClick={() => handleProjectSelect(project)}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                {/* Project Header */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
                    {project.name}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleMenuOpen(e, project)
                    }}
                  >
                    <MoreVert />
                  </IconButton>
                </Box>

                {/* Project Description */}
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {project.description}
                </Typography>

                {/* Client */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ width: 24, height: 24, mr: 1, fontSize: '0.75rem' }}>
                    {project.client.charAt(0)}
                  </Avatar>
                  <Typography variant="body2" color="text.secondary">
                    {project.client}
                  </Typography>
                </Box>

                {/* Homeowner */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  {project.homeowner ? (
                    <>
                      <Avatar sx={{ width: 24, height: 24, mr: 1, fontSize: '0.75rem', bgcolor: 'secondary.main' }}>
                        {project.homeowner.name.charAt(0)}
                      </Avatar>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          {project.homeowner.name}
                        </Typography>
                      </Box>
                      <Chip
                        label={project.homeowner.hasAccount ? 'Account' : 'Invited'}
                        color={project.homeowner.hasAccount ? 'success' : 'warning'}
                        size="small"
                        sx={{ fontSize: '0.6rem', height: 20 }}
                      />
                    </>
                  ) : (
                    <>
                      <Avatar sx={{ width: 24, height: 24, mr: 1, fontSize: '0.75rem', bgcolor: 'grey.400' }}>
                        ?
                      </Avatar>
                      <Typography variant="body2" color="text.secondary">
                        No homeowner linked
                      </Typography>
                    </>
                  )}
                </Box>

                {/* Status and Progress */}
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Chip
                      icon={getStatusIcon(project.status)}
                      label={project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                      color={getStatusColor(project.status)}
                      size="small"
                    />
                    <Typography variant="body2" color="text.secondary">
                      {project.progress}% Complete
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={project.progress} 
                    sx={{ height: 6, borderRadius: 3 }}
                  />
                </Box>

                {/* Project Details */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    <AttachMoney sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'middle' }} />
                    Budget
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {formatCurrency(project.budget)}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    <People sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'middle' }} />
                    Team
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {project.teamSize} members
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    <CalendarToday sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'middle' }} />
                    End Date
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {format(project.endDate, 'MMM dd, yyyy')}
                  </Typography>
                </Box>
              </CardContent>

              <CardActions sx={{ p: 2, pt: 0 }}>
                <Button
                  size="small"
                  variant="contained"
                  fullWidth
                  startIcon={<Visibility />}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleProjectSelect(project)
                  }}
                >
                  Open Project
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Floating Action Button */}
      <Fab
        color="primary"
        aria-label="add project"
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
        }}
        onClick={() => handleOpenDialog()}
      >
        <Add />
      </Fab>

      {/* Project Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => {
          handleProjectSelect(selectedProject)
          handleMenuClose()
        }}>
          <ListItemIcon>
            <Visibility />
          </ListItemIcon>
          <ListItemText>View Project</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => {
          handleOpenDialog(selectedProject)
          handleMenuClose()
        }}>
          <ListItemIcon>
            <Edit />
          </ListItemIcon>
          <ListItemText>Edit Project</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => {
          console.log('Delete project:', selectedProject?.id)
          handleMenuClose()
        }}>
          <ListItemIcon>
            <Delete />
          </ListItemIcon>
          <ListItemText>Delete Project</ListItemText>
        </MenuItem>
      </Menu>

      {/* Create/Edit Project Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {editingProject ? 'Edit Project' : 'Create New Project'}
        </DialogTitle>
        
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Project Name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  multiline
                  rows={3}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Client"
                  value={formData.client}
                  onChange={(e) => handleInputChange('client', e.target.value)}
                  required
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Budget"
                  type="number"
                  value={formData.budget}
                  onChange={(e) => handleInputChange('budget', e.target.value)}
                  InputProps={{
                    startAdornment: <AttachMoney />
                  }}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="Start Date"
                  value={formData.startDate}
                  onChange={(date) => handleInputChange('startDate', date)}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="End Date"
                  value={formData.endDate}
                  onChange={(date) => handleInputChange('endDate', date)}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </Grid>
              
              {/* Homeowner Linking Section */}
              <Grid item xs={12}>
                <Box sx={{ mt: 3, pt: 3, borderTop: '1px solid', borderColor: 'divider' }}>
                  <HomeownerLinking
                    onHomeownerLinked={handleHomeownerLinked}
                    selectedHomeowner={formData.homeowner}
                  />
                </Box>
              </Grid>
            </Grid>
          </LocalizationProvider>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleCloseDialog}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
          >
            {editingProject ? 'Update Project' : 'Create Project'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default ProjectDirectory
