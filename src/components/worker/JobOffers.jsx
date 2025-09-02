import React, { useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
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
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Rating,
  Divider,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Checkbox,
  Badge
} from '@mui/material'
import {
  Search,
  LocationOn,
  Work,
  Business,
  Star,
  Send,
  Phone,
  Email,
  Language,
  FilterList,
  Schedule,
  AttachMoney,
  Person,
  CalendarToday,
  AccessTime
} from '@mui/icons-material'

const JobOffers = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [location, setLocation] = useState('')
  const [jobType, setJobType] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedJob, setSelectedJob] = useState(null)
  const [applyDialogOpen, setApplyDialogOpen] = useState(false)
  const [applicationData, setApplicationData] = useState({
    message: '',
    hourlyRate: '',
    availableStartDate: '',
    skills: [],
    experience: ''
  })

  // Mock data - replace with actual API calls
  const jobOffers = [
    {
      id: 1,
      title: 'Electrician Needed for Residential Project',
      contractor: {
        name: 'ABC Construction Co.',
        rating: 4.5,
        reviewCount: 127,
        verified: true,
        avatar: 'ABC'
      },
      location: 'Downtown, City',
      jobType: 'Electrical',
      description: 'Looking for a skilled electrician for a residential renovation project. Experience with residential wiring, panel upgrades, and code compliance required.',
      requirements: ['Licensed Electrician', 'Residential Experience', 'Safety Training', 'Own Tools'],
      duration: '2-3 weeks',
      startDate: '2024-02-01',
      schedule: 'Monday-Friday, 8 AM - 5 PM',
      hourlyRate: '$35-45',
      estimatedHours: '80-120 hours',
      benefits: ['Overtime Available', 'Performance Bonus', 'Referral Bonus'],
      projectDetails: 'Kitchen and bathroom renovation, electrical panel upgrade, new lighting installation',
      urgent: true,
      postedDate: '2024-01-15T10:30:00Z'
    },
    {
      id: 2,
      title: 'General Laborer for Commercial Site',
      contractor: {
        name: 'Elite Electric Services',
        rating: 4.8,
        reviewCount: 89,
        verified: true,
        avatar: 'EES'
      },
      location: 'North District, City',
      jobType: 'General Labor',
      description: 'Seeking reliable general laborers for commercial construction site. Heavy lifting, equipment operation, and team work required.',
      requirements: ['Physical Fitness', 'Equipment Operation', 'Team Work', 'Safety Training'],
      duration: '3-4 months',
      startDate: '2024-02-15',
      schedule: 'Monday-Saturday, 7 AM - 4 PM',
      hourlyRate: '$18-22',
      estimatedHours: '400-500 hours',
      benefits: ['Health Insurance', 'Paid Time Off', 'Overtime Available'],
      projectDetails: 'Office building construction, foundation work, structural assembly',
      urgent: false,
      postedDate: '2024-01-18T14:20:00Z'
    },
    {
      id: 3,
      title: 'Plumber for Emergency Repairs',
      contractor: {
        name: 'Precision Plumbing',
        rating: 4.3,
        reviewCount: 156,
        verified: false,
        avatar: 'PP'
      },
      location: 'West Side, City',
      jobType: 'Plumbing',
      description: 'Emergency plumbing repairs needed. Must be available for on-call work and emergency response.',
      requirements: ['Licensed Plumber', 'Emergency Response', '24/7 Availability', 'Problem Solving'],
      duration: 'Ongoing',
      startDate: 'Immediate',
      schedule: 'On-call, Emergency Response',
      hourlyRate: '$40-55',
      estimatedHours: 'Variable',
      benefits: ['Emergency Pay', 'Flexible Schedule', 'Vehicle Allowance'],
      projectDetails: 'Emergency repairs, maintenance calls, new installations',
      urgent: true,
      postedDate: '2024-01-20T09:15:00Z'
    },
    {
      id: 4,
      title: 'Carpenter for Custom Woodwork',
      contractor: {
        name: 'Artisan Builders',
        rating: 4.7,
        reviewCount: 203,
        verified: true,
        avatar: 'AB'
      },
      location: 'East District, City',
      jobType: 'Carpentry',
      description: 'Skilled carpenter needed for custom woodwork and finish carpentry. Attention to detail and craftsmanship required.',
      requirements: ['Finish Carpentry', 'Custom Woodwork', 'Blueprint Reading', 'Attention to Detail'],
      duration: '6-8 weeks',
      startDate: '2024-02-10',
      schedule: 'Monday-Friday, 7 AM - 3 PM',
      hourlyRate: '$30-40',
      estimatedHours: '200-250 hours',
      benefits: ['Tool Allowance', 'Performance Bonus', 'Portfolio Building'],
      projectDetails: 'Custom cabinets, built-in furniture, architectural details',
      urgent: false,
      postedDate: '2024-01-22T16:45:00Z'
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

  const skillOptions = [
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
    'Insured'
  ]

  const filteredJobOffers = jobOffers.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.contractor.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesLocation = !location || job.location.toLowerCase().includes(location.toLowerCase())
    const matchesJobType = !jobType || job.jobType.toLowerCase().includes(jobType.toLowerCase())
    
    return matchesSearch && matchesLocation && matchesJobType
  })

  const handleApplyForJob = (job) => {
    setSelectedJob(job)
    setApplyDialogOpen(true)
  }

  const handleSubmitApplication = () => {
    // Here you would submit the application to your API
    console.log('Submitting job application:', {
      job: selectedJob,
      worker: applicationData
    })
    
    // Close dialog and reset form
    setApplyDialogOpen(false)
    setApplicationData({
      message: '',
      hourlyRate: '',
      availableStartDate: '',
      skills: [],
      experience: ''
    })
    
    // Show success message
    alert('Application submitted successfully! The contractor will review and contact you.')
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getDaysAgo = (dateString) => {
    const days = Math.floor((new Date() - new Date(dateString)) / (1000 * 60 * 60 * 24))
    if (days === 0) return 'Today'
    if (days === 1) return '1 day ago'
    return `${days} days ago`
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
        Browse Job Offers
      </Typography>

      {/* Search and Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                placeholder="Search jobs, skills, or contractors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOn />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Job Type</InputLabel>
                <Select
                  value={jobType}
                  label="Job Type"
                  onChange={(e) => setJobType(e.target.value)}
                >
                  <MenuItem value="">All Types</MenuItem>
                  {jobTypeOptions.map((type) => (
                    <MenuItem key={type} value={type}>{type}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<FilterList />}
                onClick={() => setShowFilters(!showFilters)}
              >
                Filters
              </Button>
            </Grid>
          </Grid>

          {showFilters && (
            <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid rgba(0,0,0,0.12)' }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    type="number"
                    placeholder="Min Hourly Rate"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    type="number"
                    placeholder="Max Hourly Rate"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Urgent Jobs Only"
                  />
                </Grid>
              </Grid>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Results */}
      <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
        {filteredJobOffers.length} job offers found
      </Typography>

      <Grid container spacing={3}>
        {filteredJobOffers.map((job) => (
          <Grid item xs={12} key={job.id}>
            <Card>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={8}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                      <Avatar
                        sx={{
                          width: 60,
                          height: 60,
                          mr: 2,
                          bgcolor: 'primary.main'
                        }}
                      >
                        {job.contractor.avatar}
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Typography variant="h6" sx={{ mr: 1 }}>
                            {job.title}
                          </Typography>
                          {job.urgent && (
                            <Chip
                              label="Urgent"
                              color="error"
                              size="small"
                              sx={{ mr: 1 }}
                            />
                          )}
                          <Chip
                            label={job.jobType}
                            color="primary"
                            size="small"
                            variant="outlined"
                          />
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Business color="action" sx={{ fontSize: 16, mr: 0.5 }} />
                          <Typography variant="body2" sx={{ mr: 2 }}>
                            {job.contractor.name}
                          </Typography>
                          <Rating value={job.contractor.rating} precision={0.1} size="small" readOnly />
                          <Typography variant="body2" sx={{ ml: 1 }}>
                            ({job.contractor.reviewCount} reviews)
                          </Typography>
                          {job.contractor.verified && (
                            <Chip label="Verified" color="success" size="small" sx={{ ml: 1 }} />
                          )}
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <LocationOn color="action" sx={{ fontSize: 16, mr: 0.5 }} />
                          <Typography variant="body2" color="text.secondary">
                            {job.location}
                          </Typography>
                        </Box>

                        <Typography variant="body2" sx={{ mb: 2 }}>
                          {job.description}
                        </Typography>

                        <Box sx={{ mb: 2 }}>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            Requirements:
                          </Typography>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {job.requirements.slice(0, 3).map((req) => (
                              <Chip key={req} label={req} size="small" variant="outlined" />
                            ))}
                            {job.requirements.length > 3 && (
                              <Chip label={`+${job.requirements.length - 3} more`} size="small" />
                            )}
                          </Box>
                        </Box>

                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Schedule color="action" sx={{ fontSize: 16, mr: 0.5 }} />
                            <Typography variant="body2">
                              {job.duration}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <CalendarToday color="action" sx={{ fontSize: 16, mr: 0.5 }} />
                            <Typography variant="body2">
                              Start: {formatDate(job.startDate)}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <AccessTime color="action" sx={{ fontSize: 16, mr: 0.5 }} />
                            <Typography variant="body2">
                              {job.schedule}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="h5" color="primary" gutterBottom>
                        {job.hourlyRate}/hr
                      </Typography>
                      
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Est. {job.estimatedHours}
                      </Typography>

                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          Benefits:
                        </Typography>
                        <Box sx={{ textAlign: 'left' }}>
                          {job.benefits.slice(0, 2).map((benefit) => (
                            <Typography key={benefit} variant="body2" color="text.secondary">
                              • {benefit}
                            </Typography>
                          ))}
                          {job.benefits.length > 2 && (
                            <Typography variant="body2" color="text.secondary">
                              • +{job.benefits.length - 2} more
                            </Typography>
                          )}
                        </Box>
                      </Box>
                      
                      <Button
                        variant="contained"
                        startIcon={<Send />}
                        fullWidth
                        sx={{ mb: 2 }}
                        onClick={() => handleApplyForJob(job)}
                      >
                        Apply Now
                      </Button>

                      <Typography variant="caption" color="text.secondary">
                        Posted {getDaysAgo(job.postedDate)}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Apply for Job Dialog */}
      <Dialog
        open={applyDialogOpen}
        onClose={() => setApplyDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Apply for: {selectedJob?.title}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Why are you interested in this job?"
                placeholder="Tell the contractor why you'd be perfect for this position..."
                value={applicationData.message}
                onChange={(e) => setApplicationData({ ...applicationData, message: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Your Hourly Rate"
                placeholder="30"
                value={applicationData.hourlyRate}
                onChange={(e) => setApplicationData({ ...applicationData, hourlyRate: e.target.value })}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="date"
                label="Available Start Date"
                value={applicationData.availableStartDate}
                onChange={(e) => setApplicationData({ ...applicationData, availableStartDate: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Relevant Experience"
                placeholder="Describe your experience related to this job..."
                value={applicationData.experience}
                onChange={(e) => setApplicationData({ ...applicationData, experience: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Your Skills</InputLabel>
                <Select
                  multiple
                  value={applicationData.skills}
                  label="Your Skills"
                  onChange={(e) => setApplicationData({ ...applicationData, skills: e.target.value })}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} size="small" />
                      ))}
                    </Box>
                  )}
                >
                  {skillOptions.map((skill) => (
                    <MenuItem key={skill} value={skill}>
                      {skill}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setApplyDialogOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmitApplication}
            variant="contained"
            disabled={!applicationData.message || !applicationData.hourlyRate}
          >
            Submit Application
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default JobOffers
