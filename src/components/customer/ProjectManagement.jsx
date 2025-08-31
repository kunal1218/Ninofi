import React, { useState } from 'react'
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Chip,
  LinearProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot
} from '@mui/material'
import {
  Add,
  Chat,
  Assignment,
  CheckCircle,
  Schedule,
  AttachMoney,
  LocationOn,
  Work,
  Edit,
  Delete,
  Message,
  Phone,
  Email,
  Business
} from '@mui/icons-material'

const ProjectManagement = () => {
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    contractor: '',
    budget: '',
    startDate: '',
    endDate: '',
    serviceType: ''
  })

  // Mock data - replace with actual API calls
  const projects = [
    {
      id: 1,
      name: 'Kitchen Renovation',
      description: 'Complete kitchen remodel with new cabinets, countertops, and appliances',
      contractor: 'ABC Construction Co.',
      contractorId: 1,
      status: 'In Progress',
      budget: 15000,
      spent: 9750,
      startDate: '2024-01-01',
      endDate: '2024-03-15',
      serviceType: 'Kitchen Renovation',
      location: '123 Main St, Downtown',
      progress: 65,
      milestones: [
        { id: 1, name: 'Demolition Complete', status: 'completed', date: '2024-01-05' },
        { id: 2, name: 'Plumbing & Electrical', status: 'completed', date: '2024-01-20' },
        { id: 3, name: 'Cabinets Installation', status: 'in_progress', date: '2024-02-01' },
        { id: 4, name: 'Countertops & Appliances', status: 'pending', date: '2024-02-15' },
        { id: 5, name: 'Final Inspection', status: 'pending', date: '2024-03-10' }
      ],
      recentUpdates: [
        { id: 1, message: 'Cabinets arrived and installation started', date: '2024-02-01', contractor: true },
        { id: 2, message: 'Plumbing inspection passed', date: '2024-01-25', contractor: true },
        { id: 3, message: 'When will the cabinets be installed?', date: '2024-01-28', contractor: false }
      ]
    },
    {
      id: 2,
      name: 'Bathroom Remodel',
      description: 'Master bathroom renovation with new fixtures and tile work',
      contractor: 'XYZ Renovations',
      contractorId: 2,
      status: 'Completed',
      budget: 8000,
      spent: 8000,
      startDate: '2023-11-15',
      endDate: '2023-12-30',
      serviceType: 'Bathroom Remodel',
      location: '123 Main St, Downtown',
      progress: 100,
      milestones: [
        { id: 1, name: 'Demolition', status: 'completed', date: '2023-11-20' },
        { id: 2, name: 'Plumbing', status: 'completed', date: '2023-12-05' },
        { id: 3, name: 'Tile Installation', status: 'completed', date: '2023-12-20' },
        { id: 4, name: 'Fixtures & Final', status: 'completed', date: '2023-12-30' }
      ],
      recentUpdates: [
        { id: 1, message: 'Project completed successfully!', date: '2023-12-30', contractor: true },
        { id: 2, message: 'Final inspection scheduled', date: '2023-12-28', contractor: true }
      ]
    },
    {
      id: 3,
      name: 'Deck Construction',
      description: 'New outdoor deck with composite materials and railings',
      contractor: 'Outdoor Specialists',
      contractorId: 3,
      status: 'Planning',
      budget: 12000,
      spent: 0,
      startDate: '2024-02-01',
      endDate: '2024-04-15',
      serviceType: 'Deck Construction',
      location: '123 Main St, Downtown',
      progress: 20,
      milestones: [
        { id: 1, name: 'Design Approval', status: 'completed', date: '2024-01-15' },
        { id: 2, name: 'Permit Application', status: 'in_progress', date: '2024-01-20' },
        { id: 3, name: 'Material Order', status: 'pending', date: '2024-02-01' },
        { id: 4, name: 'Construction Start', status: 'pending', date: '2024-02-15' }
      ],
      recentUpdates: [
        { id: 1, message: 'Permit application submitted', date: '2024-01-20', contractor: true },
        { id: 2, message: 'Design looks great!', date: '2024-01-15', contractor: false }
      ]
    }
  ]

  const contractors = [
    { id: 1, name: 'ABC Construction Co.', specialty: 'Interior Design & Renovation' },
    { id: 2, name: 'XYZ Renovations', specialty: 'Kitchen & Bathroom' },
    { id: 3, name: 'Outdoor Specialists', specialty: 'Landscaping & Decks' }
  ]

  const serviceTypes = ['Interior Design', 'Kitchen Renovation', 'Bathroom Remodel', 'Home Addition', 'Landscaping', 'Deck Construction', 'General Repairs', 'Plumbing', 'Electrical', 'HVAC']

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Progress': return 'primary'
      case 'Completed': return 'success'
      case 'Planning': return 'warning'
      case 'On Hold': return 'error'
      default: return 'default'
    }
  }

  const getMilestoneStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'success'
      case 'in_progress': return 'primary'
      case 'pending': return 'default'
      default: return 'default'
    }
  }

  const handleOpenDialog = (project = null) => {
    if (project) {
      setSelectedProject(project)
      setFormData({
        name: project.name,
        description: project.description,
        contractor: project.contractorId.toString(),
        budget: project.budget.toString(),
        startDate: project.startDate,
        endDate: project.endDate,
        serviceType: project.serviceType
      })
    } else {
      setSelectedProject(null)
      setFormData({
        name: '',
        description: '',
        contractor: '',
        budget: '',
        startDate: '',
        endDate: '',
        serviceType: ''
      })
    }
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setSelectedProject(null)
    setFormData({
      name: '',
      description: '',
      contractor: '',
      budget: '',
      startDate: '',
      endDate: '',
      serviceType: ''
    })
  }

  const handleSubmit = () => {
    // Handle form submission - add/update project
    console.log('Form data:', formData)
    handleCloseDialog()
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
            My Projects
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your ongoing and completed projects
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
          sx={{ px: 3, py: 1.5 }}
        >
          Start New Project
        </Button>
      </Box>

      {/* Project Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="primary" sx={{ fontWeight: 700 }}>
                {projects.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Projects
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="success.main" sx={{ fontWeight: 700 }}>
                {projects.filter(p => p.status === 'Completed').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Completed
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="warning.main" sx={{ fontWeight: 700 }}>
                {projects.filter(p => p.status === 'In Progress').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                In Progress
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="info.main" sx={{ fontWeight: 700 }}>
                ${projects.reduce((sum, p) => sum + p.spent, 0).toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Spent
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Projects Grid */}
      <Grid container spacing={3}>
        {projects.map((project) => (
          <Grid item xs={12} lg={6} key={project.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                      {project.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {project.description}
                    </Typography>
                  </Box>
                  <Chip 
                    label={project.status} 
                    color={getStatusColor(project.status)}
                    size="small"
                  />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <Business fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    {project.contractor}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <LocationOn fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    {project.location}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <AttachMoney fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    Budget: ${project.budget.toLocaleString()} • Spent: ${project.spent.toLocaleString()}
                  </Typography>
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Progress</Typography>
                    <Typography variant="body2" color="primary">
                      {project.progress}%
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={project.progress} 
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>

                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Button
                    variant="outlined"
                    startIcon={<Chat />}
                    size="small"
                  >
                    Chat
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<Assignment />}
                    size="small"
                    onClick={() => setSelectedProject(project)}
                  >
                    View Details
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<Edit />}
                    size="small"
                    onClick={() => handleOpenDialog(project)}
                  >
                    Edit
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Project Detail Dialog */}
      <Dialog 
        open={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
        maxWidth="lg" 
        fullWidth
      >
        {selectedProject && (
          <>
            <DialogTitle>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                {selectedProject.name}
              </Typography>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>Project Details</Typography>
                  <Typography variant="body2" paragraph>
                    {selectedProject.description}
                  </Typography>
                  
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" gutterBottom>Contractor</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {selectedProject.contractor}
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" gutterBottom>Location</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {selectedProject.location}
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" gutterBottom>Budget & Timeline</Typography>
                    <Typography variant="body2" color="text.secondary">
                      ${selectedProject.budget.toLocaleString()} • {selectedProject.startDate} to {selectedProject.endDate}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                      variant="contained"
                      startIcon={<Chat />}
                      fullWidth
                    >
                      Start Chat
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<Phone />}
                      fullWidth
                    >
                      Call Contractor
                    </Button>
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>Milestones</Typography>
                  <Timeline>
                    {selectedProject.milestones.map((milestone, index) => (
                      <TimelineItem key={milestone.id}>
                        <TimelineSeparator>
                          <TimelineDot color={getMilestoneStatusColor(milestone.status)} />
                          {index < selectedProject.milestones.length - 1 && <TimelineConnector />}
                        </TimelineSeparator>
                        <TimelineContent>
                          <Typography variant="subtitle2">
                            {milestone.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {milestone.date}
                          </Typography>
                        </TimelineContent>
                      </TimelineItem>
                    ))}
                  </Timeline>

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="h6" gutterBottom>Recent Updates</Typography>
                  <List dense>
                    {selectedProject.recentUpdates.map((update) => (
                      <ListItem key={update.id} sx={{ px: 0 }}>
                        <ListItemAvatar>
                          <Avatar 
                            sx={{ 
                              width: 32, 
                              height: 32, 
                              bgcolor: update.contractor ? 'primary.main' : 'success.main',
                              fontSize: '0.8rem'
                            }}
                          >
                            {update.contractor ? 'C' : 'U'}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={update.message}
                          secondary={update.date}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setSelectedProject(null)}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Add/Edit Project Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedProject ? 'Edit Project' : 'Start New Project'}
        </DialogTitle>
        <DialogContent>
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
                multiline
                rows={3}
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Contractor</InputLabel>
                <Select
                  value={formData.contractor}
                  label="Contractor"
                  onChange={(e) => handleInputChange('contractor', e.target.value)}
                  required
                >
                  {contractors.map((contractor) => (
                    <MenuItem key={contractor.id} value={contractor.id}>
                      {contractor.name} - {contractor.specialty}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Service Type</InputLabel>
                <Select
                  value={formData.serviceType}
                  label="Service Type"
                  onChange={(e) => handleInputChange('serviceType', e.target.value)}
                  required
                >
                  {serviceTypes.map((service) => (
                    <MenuItem key={service} value={service}>{service}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Budget ($)"
                type="number"
                value={formData.budget}
                onChange={(e) => handleInputChange('budget', e.target.value)}
                required
                InputProps={{
                  startAdornment: '$',
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Start Date"
                type="date"
                value={formData.startDate}
                onChange={(e) => handleInputChange('startDate', e.target.value)}
                required
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="End Date"
                type="date"
                value={formData.endDate}
                onChange={(e) => handleInputChange('endDate', e.target.value)}
                required
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {selectedProject ? 'Update' : 'Start'} Project
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default ProjectManagement
