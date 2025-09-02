import React, { useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
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
  FormControlLabel,
  Checkbox,
  Tabs,
  Tab,
  Badge,
  Divider,
  Alert,
  Rating
} from '@mui/material'
import {
  Add,
  Work,
  Business,
  Person,
  CheckCircle,
  Cancel,
  Message,
  Phone,
  Email,
  LocationOn,
  Schedule,
  AttachMoney,
  CalendarToday,
  AccessTime,
  Edit,
  Delete
} from '@mui/icons-material'

const WorkerRequestManager = () => {
  const [selectedTab, setSelectedTab] = useState(0)
  const [createJobDialogOpen, setCreateJobDialogOpen] = useState(false)
  const [selectedApplication, setSelectedApplication] = useState(null)
  const [applicationDetailDialogOpen, setApplicationDetailDialogOpen] = useState(false)
  const [newJobData, setNewJobData] = useState({
    title: '',
    jobType: '',
    location: '',
    description: '',
    requirements: [],
    duration: '',
    startDate: '',
    schedule: '',
    hourlyRate: '',
    estimatedHours: '',
    benefits: [],
    projectDetails: '',
    urgent: false
  })

  // Mock data - replace with actual API calls
  const jobOffers = [
    {
      id: 1,
      title: 'Electrician Needed for Residential Project',
      jobType: 'Electrical',
      location: 'Downtown, City',
      status: 'active',
      applications: 8,
      urgent: true,
      postedDate: '2024-01-15T10:30:00Z'
    },
    {
      id: 2,
      title: 'General Laborer for Commercial Site',
      jobType: 'General Labor',
      location: 'North District, City',
      status: 'active',
      applications: 12,
      urgent: false,
      postedDate: '2024-01-18T14:20:00Z'
    },
    {
      id: 3,
      title: 'Plumber for Emergency Repairs',
      jobType: 'Plumbing',
      location: 'West Side, City',
      status: 'filled',
      applications: 5,
      urgent: true,
      postedDate: '2024-01-20T09:15:00Z'
    }
  ]

  const workerApplications = [
    {
      id: 1,
      jobTitle: 'Electrician Needed for Residential Project',
      workerName: 'John Smith',
      workerRole: 'Electrician',
      workerRating: 4.2,
      workerReviewCount: 45,
      workerSkills: ['Electrical', 'Safety Training', 'Blueprint Reading'],
      workerHourlyRate: 28,
      workerLocation: 'Downtown, City',
      workerPhone: '(555) 123-4567',
      workerEmail: 'john.smith@email.com',
      message: 'Hi! I\'m an experienced electrician looking for work opportunities. I have 5+ years of experience in residential and commercial electrical work. I\'m available to start immediately and can work flexible hours.',
      availableStartDate: '2024-01-20',
      experience: 'Licensed electrician with 5+ years in residential and commercial work. Experienced with panel upgrades, new installations, and code compliance.',
      skills: ['Licensed Electrician', 'Residential Experience', 'Safety Training'],
      status: 'pending', // 'pending', 'accepted', 'rejected'
      submittedAt: '2024-01-15T10:30:00Z',
      workerAvatar: 'JS'
    },
    {
      id: 2,
      jobTitle: 'General Laborer for Commercial Site',
      workerName: 'Sarah Johnson',
      workerRole: 'General Laborer',
      workerRating: 4.7,
      workerReviewCount: 89,
      workerSkills: ['General Labor', 'Equipment Operation', 'Team Work'],
      workerHourlyRate: 18,
      workerLocation: 'North District, City',
      workerPhone: '(555) 987-6543',
      workerEmail: 'sarah.johnson@email.com',
      message: 'Hardworking general laborer looking for steady work. I\'m physically fit, reliable, and can work long hours. I have experience with construction sites and can operate basic equipment.',
      availableStartDate: '2024-01-25',
      experience: '3 years of general labor experience on commercial construction sites. Operate forklifts, loaders, and other equipment.',
      skills: ['Physical Fitness', 'Equipment Operation', 'Team Work'],
      status: 'accepted',
      submittedAt: '2024-01-14T14:20:00Z',
      workerAvatar: 'SJ'
    }
  ]

  const jobTypeOptions = [
    'General Labor',
    'Electrical',
    'Plumbing',
    'HVAC',
    'Carpentry',
    'Masonry',
    'Roofing',
    'Painting',
    'Landscaping',
    'Demolition',
    'Welding',
    'Flooring'
  ]

  const requirementOptions = [
    'Safety Training',
    'OSHA Certified',
    'Blueprint Reading',
    'Equipment Operation',
    'Team Leadership',
    'Problem Solving',
    'Communication',
    'Time Management',
    'Licensed',
    'Bonded',
    'Insured',
    'Own Tools',
    'Vehicle Required'
  ]

  const benefitOptions = [
    'Health Insurance',
    'Paid Time Off',
    'Overtime Available',
    'Performance Bonus',
    'Referral Bonus',
    'Tool Allowance',
    'Vehicle Allowance',
    'Training Opportunities',
    'Flexible Schedule',
    'Emergency Pay'
  ]

  const pendingApplications = workerApplications.filter(app => app.status === 'pending')
  const acceptedApplications = workerApplications.filter(app => app.status === 'accepted')
  const rejectedApplications = workerApplications.filter(app => app.status === 'rejected')

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue)
  }

  const handleCreateJob = () => {
    setCreateJobDialogOpen(true)
  }

  const handleSubmitJob = () => {
    // Here you would submit the job offer to your API
    console.log('Creating new job offer:', newJobData)
    
    // Close dialog and reset form
    setCreateJobDialogOpen(false)
    setNewJobData({
      title: '',
      jobType: '',
      location: '',
      description: '',
      requirements: [],
      duration: '',
      startDate: '',
      schedule: '',
      hourlyRate: '',
      estimatedHours: '',
      benefits: [],
      projectDetails: '',
      urgent: false
    })
    
    // Show success message
    alert('Job offer created successfully! Workers can now apply.')
  }

  const handleViewApplication = (application) => {
    setSelectedApplication(application)
    setApplicationDetailDialogOpen(true)
  }

  const handleAcceptApplication = (applicationId) => {
    // Here you would make an API call to accept the application
    console.log('Accepting application:', applicationId)
    alert('Application accepted! The worker will be notified.')
  }

  const handleRejectApplication = (applicationId) => {
    // Here you would make an API call to reject the application
    console.log('Rejecting application:', applicationId)
    alert('Application rejected. The worker will be notified.')
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted': return 'success'
      case 'rejected': return 'error'
      default: return 'warning'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'accepted': return 'Accepted'
      case 'rejected': return 'Rejected'
      default: return 'Pending'
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Worker Request Manager
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleCreateJob}
        >
          Post Job Offer
        </Button>
      </Box>

      <Alert severity="info" sx={{ mb: 3 }}>
        Post job offers to attract qualified workers and manage their applications.
      </Alert>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={selectedTab} onChange={handleTabChange}>
          <Tab 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 0 }}>
                <Typography variant="body2" sx={{ mr: 1, flexShrink: 0 }}>
                  Job Offers
                </Typography>
                <Badge badgeContent={jobOffers.length} color="primary" />
              </Box>
            } 
          />
          <Tab 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 0 }}>
                <Typography variant="body2" sx={{ mr: 1, flexShrink: 0 }}>
                  Pending Applications
                </Typography>
                <Badge badgeContent={pendingApplications.length} color="warning" />
              </Box>
            } 
          />
          <Tab 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 0 }}>
                <Typography variant="body2" sx={{ mr: 1, flexShrink: 0 }}>
                  Accepted
                </Typography>
                <Badge badgeContent={acceptedApplications.length} color="success" />
              </Box>
            } 
          />
          <Tab 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 0 }}>
                <Typography variant="body2" sx={{ mr: 1, flexShrink: 0 }}>
                  Rejected
                </Typography>
                <Badge badgeContent={rejectedApplications.length} color="error" />
              </Box>
            } 
          />
        </Tabs>
      </Box>

      {/* Tab Content */}
      {selectedTab === 0 && (
        <Box>
          <Grid container spacing={3}>
            {jobOffers.map((job) => (
              <Grid item xs={12} md={6} key={job.id}>
                <Card>
                  <CardContent>
                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                        <Typography variant="h6" sx={{ flex: 1, mr: 2 }}>
                          {job.title}
                        </Typography>
                        <Box sx={{ textAlign: 'right', flexShrink: 0 }}>
                          <Typography variant="h6" color="primary">
                            {job.applications}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Applications
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Chip label={job.jobType} color="primary" size="small" variant="outlined" />
                        {job.urgent && (
                          <Chip label="Urgent" color="error" size="small" />
                        )}
                        <Chip 
                          label={job.status} 
                          color={job.status === 'filled' ? 'success' : 'primary'} 
                          size="small" 
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        <LocationOn sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'middle' }} />
                        {job.location}
                      </Typography>
                    </Box>
                    
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      Posted {formatDate(job.postedDate)}
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<Edit />}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<Delete />}
                        color="error"
                      >
                        Delete
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {selectedTab === 1 && (
        <Box>
          {pendingApplications.length === 0 ? (
            <Card>
              <CardContent sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="h6" color="text.secondary">
                  No pending applications
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Applications will appear here when workers apply to your job offers.
                </Typography>
              </CardContent>
            </Card>
          ) : (
            <List>
              {pendingApplications.map((application) => (
                <ListItem
                  key={application.id}
                  sx={{
                    mb: 2,
                    p: 0,
                    '&:hover': {
                      backgroundColor: 'rgba(0,0,0,0.02)',
                      borderRadius: 1
                    }
                  }}
                >
                  <Card sx={{ width: '100%' }}>
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={8}>
                          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                            <Avatar
                              sx={{
                                width: 50,
                                height: 50,
                                mr: 2,
                                bgcolor: 'primary.main'
                              }}
                            >
                              {application.workerAvatar}
                            </Avatar>
                            <Box sx={{ flex: 1 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <Typography variant="h6" sx={{ mr: 1 }}>
                                  {application.workerName}
                                </Typography>
                                <Chip
                                  label={application.workerRole}
                                  color="primary"
                                  size="small"
                                  variant="outlined"
                                />
                                <Chip
                                  label={getStatusText(application.status)}
                                  color={getStatusColor(application.status)}
                                  size="small"
                                  sx={{ ml: 1 }}
                                />
                              </Box>

                              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <Rating value={application.workerRating} precision={0.1} size="small" readOnly />
                                <Typography variant="body2" sx={{ ml: 1 }}>
                                  {application.workerRating} ({application.workerReviewCount} reviews)
                                </Typography>
                              </Box>

                              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <LocationOn color="action" sx={{ fontSize: 16, mr: 0.5 }} />
                                <Typography variant="body2" color="text.secondary">
                                  {application.workerLocation}
                                </Typography>
                              </Box>

                              <Typography variant="body2" sx={{ mb: 1 }}>
                                {application.message.length > 100 
                                  ? `${application.message.substring(0, 100)}...` 
                                  : application.message
                                }
                              </Typography>

                              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                {application.skills.slice(0, 3).map((skill) => (
                                  <Chip key={skill} label={skill} size="small" variant="outlined" />
                                ))}
                                {application.skills.length > 3 && (
                                  <Chip label={`+${application.skills.length - 3} more`} size="small" />
                                )}
                              </Box>
                            </Box>
                          </Box>
                        </Grid>

                        <Grid item xs={12} md={4}>
                          <Box sx={{ textAlign: 'right' }}>
                            <Typography variant="h6" color="primary" gutterBottom>
                              ${application.workerHourlyRate}/hr
                            </Typography>
                            
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                              Available: {formatDate(application.availableStartDate)}
                            </Typography>

                            <Typography variant="body2" color="text.secondary" gutterBottom>
                              Job: {application.jobTitle}
                            </Typography>

                            <Box sx={{ mt: 2 }}>
                              <Button
                                variant="outlined"
                                size="small"
                                startIcon={<Message />}
                                onClick={() => handleViewApplication(application)}
                                sx={{ mr: 1 }}
                              >
                                View Details
                              </Button>

                              <Button
                                variant="contained"
                                color="success"
                                size="small"
                                startIcon={<CheckCircle />}
                                onClick={() => handleAcceptApplication(application.id)}
                                sx={{ mr: 1 }}
                              >
                                Accept
                              </Button>
                              <Button
                                variant="contained"
                                color="error"
                                size="small"
                                startIcon={<Cancel />}
                                onClick={() => handleRejectApplication(application.id)}
                              >
                                Reject
                              </Button>
                            </Box>
                          </Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      )}

      {selectedTab === 2 && (
        <Box>
          {acceptedApplications.length === 0 ? (
            <Card>
              <CardContent sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="h6" color="text.secondary">
                  No accepted applications
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Accepted workers will appear here.
                </Typography>
              </CardContent>
            </Card>
          ) : (
            <List>
              {acceptedApplications.map((application) => (
                <ListItem
                  key={application.id}
                  sx={{
                    mb: 2,
                    p: 0,
                    '&:hover': {
                      backgroundColor: 'rgba(0,0,0,0.02)',
                      borderRadius: 1
                    }
                  }}
                >
                  <Card sx={{ width: '100%' }}>
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={8}>
                          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                            <Avatar
                              sx={{
                                width: 50,
                                height: 50,
                                mr: 2,
                                bgcolor: 'primary.main'
                              }}
                            >
                              {application.workerAvatar}
                            </Avatar>
                            <Box sx={{ flex: 1 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <Typography variant="h6" sx={{ mr: 1 }}>
                                  {application.workerName}
                                </Typography>
                                <Chip
                                  label={application.workerRole}
                                  color="primary"
                                  size="small"
                                  variant="outlined"
                                />
                                <Chip
                                  label={getStatusText(application.status)}
                                  color={getStatusColor(application.status)}
                                  size="small"
                                  sx={{ ml: 1 }}
                                />
                              </Box>

                              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <Rating value={application.workerRating} precision={0.1} size="small" readOnly />
                                <Typography variant="body2" sx={{ ml: 1 }}>
                                  {application.workerRating} ({application.workerReviewCount} reviews)
                                </Typography>
                              </Box>

                              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <LocationOn color="action" sx={{ fontSize: 16, mr: 0.5 }} />
                                <Typography variant="body2" color="text.secondary">
                                  {application.workerLocation}
                                </Typography>
                              </Box>

                              <Typography variant="body2" sx={{ mb: 1 }}>
                                {application.message.length > 100 
                                  ? `${application.message.substring(0, 100)}...` 
                                  : application.message
                                }
                              </Typography>

                              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                {application.skills.slice(0, 3).map((skill) => (
                                  <Chip key={skill} label={skill} size="small" variant="outlined" />
                                ))}
                                {application.skills.length > 3 && (
                                  <Chip label={`+${application.skills.length - 3} more`} size="small" />
                                )}
                              </Box>
                            </Box>
                          </Box>
                        </Grid>

                        <Grid item xs={12} md={4}>
                          <Box sx={{ textAlign: 'right' }}>
                            <Typography variant="h6" color="primary" gutterBottom>
                              ${application.workerHourlyRate}/hr
                            </Typography>
                            
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                              Available: {formatDate(application.availableStartDate)}
                            </Typography>

                            <Typography variant="body2" color="text.secondary" gutterBottom>
                              Job: {application.jobTitle}
                            </Typography>

                            <Box sx={{ mt: 2 }}>
                              <Button
                                variant="outlined"
                                size="small"
                                startIcon={<Message />}
                                onClick={() => handleViewApplication(application)}
                                sx={{ mr: 1 }}
                              >
                                View Details
                              </Button>
                            </Box>
                          </Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      )}

      {selectedTab === 3 && (
        <Box>
          {rejectedApplications.length === 0 ? (
            <Card>
              <CardContent sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="h6" color="text.secondary">
                  No rejected applications
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Rejected applications will appear here.
                </Typography>
              </CardContent>
            </Card>
          ) : (
            <List>
              {rejectedApplications.map((application) => (
                <ListItem
                  key={application.id}
                  sx={{
                    mb: 2,
                    p: 0,
                    '&:hover': {
                      backgroundColor: 'rgba(0,0,0,0.02)',
                      borderRadius: 1
                    }
                  }}
                >
                  <Card sx={{ width: '100%' }}>
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={8}>
                          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                            <Avatar
                              sx={{
                                width: 50,
                                height: 50,
                                mr: 2,
                                bgcolor: 'primary.main'
                              }}
                            >
                              {application.workerAvatar}
                            </Avatar>
                            <Box sx={{ flex: 1 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <Typography variant="h6" sx={{ mr: 1 }}>
                                  {application.workerName}
                                </Typography>
                                <Chip
                                  label={application.workerRole}
                                  color="primary"
                                  size="small"
                                  variant="outlined"
                                />
                                <Chip
                                  label={getStatusText(application.status)}
                                  color={getStatusColor(application.status)}
                                  size="small"
                                  sx={{ ml: 1 }}
                                />
                              </Box>

                              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <Rating value={application.workerRating} precision={0.1} size="small" readOnly />
                                <Typography variant="body2" sx={{ ml: 1 }}>
                                  {application.workerRating} ({application.workerReviewCount} reviews)
                                </Typography>
                              </Box>

                              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <LocationOn color="action" sx={{ fontSize: 16, mr: 0.5 }} />
                                <Typography variant="body2" color="text.secondary">
                                  {application.workerLocation}
                                </Typography>
                              </Box>

                              <Typography variant="body2" sx={{ mb: 1 }}>
                                {application.message.length > 100 
                                  ? `${application.message.substring(0, 100)}...` 
                                  : application.message
                                }
                              </Typography>

                              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                {application.skills.slice(0, 3).map((skill) => (
                                  <Chip key={skill} label={skill} size="small" variant="outlined" />
                                ))}
                                {application.skills.length > 3 && (
                                  <Chip label={`+${application.skills.length - 3} more`} size="small" />
                                )}
                              </Box>
                            </Box>
                          </Box>
                        </Grid>

                        <Grid item xs={12} md={4}>
                          <Box sx={{ textAlign: 'right' }}>
                            <Typography variant="h6" color="primary" gutterBottom>
                              ${application.workerHourlyRate}/hr
                            </Typography>
                            
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                              Available: {formatDate(application.availableStartDate)}
                            </Typography>

                            <Typography variant="body2" color="text.secondary" gutterBottom>
                              Job: {application.jobTitle}
                            </Typography>

                            <Box sx={{ mt: 2 }}>
                              <Button
                                variant="outlined"
                                size="small"
                                startIcon={<Message />}
                                onClick={() => handleViewApplication(application)}
                                sx={{ mr: 1 }}
                              >
                                View Details
                              </Button>
                            </Box>
                          </Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      )}

      {/* Create Job Offer Dialog */}
      <Dialog
        open={createJobDialogOpen}
        onClose={() => setCreateJobDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Post New Job Offer
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Job Title"
                placeholder="e.g., Electrician Needed for Residential Project"
                value={newJobData.title}
                onChange={(e) => setNewJobData({ ...newJobData, title: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Job Type</InputLabel>
                <Select
                  value={newJobData.jobType}
                  label="Job Type"
                  onChange={(e) => setNewJobData({ ...newJobData, jobType: e.target.value })}
                >
                  {jobTypeOptions.map((type) => (
                    <MenuItem key={type} value={type}>{type}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Location"
                placeholder="e.g., Downtown, City"
                value={newJobData.location}
                onChange={(e) => setNewJobData({ ...newJobData, location: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Job Description"
                placeholder="Describe the job requirements, responsibilities, and expectations..."
                value={newJobData.description}
                onChange={(e) => setNewJobData({ ...newJobData, description: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Requirements</InputLabel>
                <Select
                  multiple
                  value={newJobData.requirements}
                  label="Requirements"
                  onChange={(e) => setNewJobData({ ...newJobData, requirements: e.target.value })}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} size="small" />
                      ))}
                    </Box>
                  )}
                >
                  {requirementOptions.map((req) => (
                    <MenuItem key={req} value={req}>
                      {req}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Duration"
                placeholder="e.g., 2-3 weeks"
                value={newJobData.duration}
                onChange={(e) => setNewJobData({ ...newJobData, duration: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="date"
                label="Start Date"
                value={newJobData.startDate}
                onChange={(e) => setNewJobData({ ...newJobData, startDate: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Schedule"
                placeholder="e.g., Monday-Friday, 8 AM - 5 PM"
                value={newJobData.schedule}
                onChange={(e) => setNewJobData({ ...newJobData, schedule: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Hourly Rate"
                placeholder="e.g., $25-35"
                value={newJobData.hourlyRate}
                onChange={(e) => setNewJobData({ ...newJobData, hourlyRate: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Estimated Hours"
                placeholder="e.g., 80-120 hours"
                value={newJobData.estimatedHours}
                onChange={(e) => setNewJobData({ ...newJobData, estimatedHours: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={newJobData.urgent}
                    onChange={(e) => setNewJobData({ ...newJobData, urgent: e.target.checked })}
                  />
                }
                label="Mark as Urgent"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Benefits</InputLabel>
                <Select
                  multiple
                  value={newJobData.benefits}
                  label="Benefits"
                  onChange={(e) => setNewJobData({ ...newJobData, benefits: e.target.value })}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} size="small" />
                      ))}
                    </Box>
                  )}
                >
                  {benefitOptions.map((benefit) => (
                    <MenuItem key={benefit} value={benefit}>
                      {benefit}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Project Details"
                placeholder="Additional details about the project..."
                value={newJobData.projectDetails}
                onChange={(e) => setNewJobData({ ...newJobData, projectDetails: e.target.value })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateJobDialogOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmitJob}
            variant="contained"
            disabled={!newJobData.title || !newJobData.jobType || !newJobData.location}
          >
            Post Job Offer
          </Button>
        </DialogActions>
      </Dialog>

      {/* Application Detail Dialog */}
      <Dialog
        open={applicationDetailDialogOpen}
        onClose={() => setApplicationDetailDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        {selectedApplication && (
          <>
            <DialogTitle>
              Worker Application Details
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={3} sx={{ mt: 1 }}>
                <Grid item xs={12} md={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Avatar
                      sx={{
                        width: 80,
                        height: 80,
                        mx: 'auto',
                        mb: 2,
                        bgcolor: 'primary.main',
                        fontSize: '2rem'
                      }}
                    >
                      {selectedApplication.workerAvatar}
                    </Avatar>
                    <Typography variant="h6" gutterBottom>
                      {selectedApplication.workerName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {selectedApplication.workerRole}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                      <Rating value={selectedApplication.workerRating} precision={0.1} readOnly />
                      <Typography variant="body2" sx={{ ml: 1 }}>
                        {selectedApplication.workerRating} ({selectedApplication.workerReviewCount} reviews)
                      </Typography>
                    </Box>
                    <Chip
                      label={getStatusText(selectedApplication.status)}
                      color={getStatusColor(selectedApplication.status)}
                      sx={{ mb: 2 }}
                    />
                  </Box>
                </Grid>

                <Grid item xs={12} md={8}>
                  <Typography variant="h6" gutterBottom>
                    Contact Information
                  </Typography>
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Phone color="action" sx={{ mr: 1 }} />
                      <Typography variant="body2">
                        {selectedApplication.workerPhone}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Email color="action" sx={{ mr: 1 }} />
                      <Typography variant="body2">
                        {selectedApplication.workerEmail}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <LocationOn color="action" sx={{ mr: 1 }} />
                      <Typography variant="body2">
                        {selectedApplication.workerLocation}
                      </Typography>
                    </Box>
                  </Box>

                  <Typography variant="h6" gutterBottom>
                    Skills & Experience
                  </Typography>
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {selectedApplication.skills.map((skill) => (
                        <Chip key={skill} label={skill} size="small" />
                      ))}
                    </Box>
                  </Box>

                  <Typography variant="h6" gutterBottom>
                    Application Details
                  </Typography>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      {selectedApplication.message}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      <strong>Experience:</strong> {selectedApplication.experience}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" color="text.secondary">
                        Hourly Rate: <strong>${selectedApplication.workerHourlyRate}/hr</strong>
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Available: <strong>{formatDate(selectedApplication.availableStartDate)}</strong>
                      </Typography>
                    </Box>
                  </Box>

                  <Typography variant="body2" color="text.secondary">
                    Application submitted on {formatDate(selectedApplication.submittedAt)}
                  </Typography>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              {selectedApplication.status === 'pending' && (
                <>
                  <Button onClick={() => setApplicationDetailDialogOpen(false)}>
                    Close
                  </Button>
                  <Button
                    onClick={() => handleRejectApplication(selectedApplication.id)}
                    color="error"
                    variant="outlined"
                  >
                    Reject
                  </Button>
                  <Button
                    onClick={() => handleAcceptApplication(selectedApplication.id)}
                    color="success"
                    variant="contained"
                  >
                    Accept
                  </Button>
                </>
              )}
              {selectedApplication.status !== 'pending' && (
                <Button onClick={() => setApplicationDetailDialogOpen(false)}>
                  Close
                </Button>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  )
}

export default WorkerRequestManager
