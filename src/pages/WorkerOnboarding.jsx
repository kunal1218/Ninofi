import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  OutlinedInput,
  FormHelperText,
  Card,
  CardContent,
  FormControlLabel,
  Checkbox,
  Slider,
  FormGroup
} from '@mui/material'
import {
  Person,
  Phone,
  Email,
  LocationOn,
  Work,
  School,
  Schedule,
  ArrowForward,
  ArrowBack
} from '@mui/icons-material'
import { useAuth } from '../contexts/AuthContext'

const steps = ['Personal Information', 'Skills & Experience', 'Availability & Preferences', 'Review & Submit']

const WorkerOnboarding = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    dateOfBirth: '',
    
    // Skills & Experience
    workerType: '',
    skills: [],
    experience: '',
    education: '',
    certifications: [],
    hourlyRate: '',
    
    // Availability & Preferences
    availability: {
      monday: { morning: false, afternoon: false, evening: false },
      tuesday: { morning: false, afternoon: false, evening: false },
      wednesday: { morning: false, afternoon: false, evening: false },
      thursday: { morning: false, afternoon: false, evening: false },
      friday: { morning: false, afternoon: false, evening: false },
      saturday: { morning: false, afternoon: false, evening: false },
      sunday: { morning: false, afternoon: false, evening: false }
    },
    travelDistance: 25,
    preferredWorkTypes: []
  })

  const [errors, setErrors] = useState({})
  const { updateUserProfile, logout } = useAuth()
  const navigate = useNavigate()

  const workerTypes = [
    'Laborer',
    'Carpenter',
    'Electrician',
    'Plumber',
    'HVAC Technician',
    'Painter',
    'Roofer',
    'Mason',
    'Equipment Operator',
    'Welder',
    'Flooring Installer',
    'Drywall Installer',
    'Landscaper',
    'General Helper',
    'Other'
  ]

  const skillOptions = [
    'Framing',
    'Electrical',
    'Plumbing',
    'HVAC',
    'Roofing',
    'Painting',
    'Flooring',
    'Concrete',
    'Welding',
    'Equipment Operation',
    'Safety Training',
    'Blueprint Reading',
    'Drywall Installation',
    'Tile Installation',
    'Cabinetry',
    'Landscaping',
    'Demolition',
    'Cleanup'
  ]

  const certificationOptions = [
    'OSHA Safety Certification',
    'First Aid/CPR',
    'Forklift Operator',
    'Scaffold Safety',
    'Fall Protection',
    'Electrical License',
    'Plumbing License',
    'HVAC Certification',
    'Welding Certification',
    'Crane Operator License'
  ]

  const workTypeOptions = [
    'Residential',
    'Commercial',
    'Industrial',
    'Renovation',
    'New Construction',
    'Maintenance',
    'Emergency Services',
    'Green Building'
  ]

  const handleNext = () => {
    if (validateStep()) {
      setActiveStep((prevStep) => prevStep + 1)
    }
  }

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1)
  }

  const handleBackToLogin = () => {
    logout()
    navigate('/login')
  }

  const validateStep = () => {
    const newErrors = {}
    
    if (activeStep === 0) {
      if (!formData.firstName) newErrors.firstName = 'First name is required'
      if (!formData.lastName) newErrors.lastName = 'Last name is required'
      if (!formData.phone) newErrors.phone = 'Phone number is required'
      if (!formData.email) newErrors.email = 'Email is required'
      if (!formData.address) newErrors.address = 'Address is required'
    }
    
    if (activeStep === 1) {
      if (!formData.workerType) newErrors.workerType = 'Worker type is required'
      if (formData.skills.length === 0) newErrors.skills = 'At least one skill is required'
      if (!formData.hourlyRate) newErrors.hourlyRate = 'Hourly rate is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (validateStep()) {
      try {
        await updateUserProfile({
          name: `${formData.firstName} ${formData.lastName}`,
          phone: formData.phone,
          email: formData.email,
          address: formData.address,
          workerType: formData.workerType,
          skills: formData.skills,
          experience: formData.experience,
          education: formData.education,
          certifications: formData.certifications,
          hourlyRate: formData.hourlyRate,
          availability: formData.availability,
          travelDistance: formData.travelDistance,
          preferredWorkTypes: formData.preferredWorkTypes
        })
        navigate('/worker/verification')
      } catch (error) {
        console.error('Error updating profile:', error)
      }
    }
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleAvailabilityChange = (day, timeSlot, checked) => {
    setFormData(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        [day]: {
          ...prev.availability[day],
          [timeSlot]: checked
        }
      }
    }))
  }

  const renderPersonalInformation = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          <Person sx={{ mr: 1, verticalAlign: 'middle' }} />
          Personal Information
        </Typography>
      </Grid>
      
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="First Name"
          value={formData.firstName}
          onChange={(e) => handleInputChange('firstName', e.target.value)}
          error={!!errors.firstName}
          helperText={errors.firstName}
          required
        />
      </Grid>
      
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Last Name"
          value={formData.lastName}
          onChange={(e) => handleInputChange('lastName', e.target.value)}
          error={!!errors.lastName}
          helperText={errors.lastName}
          required
        />
      </Grid>
      
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Phone Number"
          value={formData.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          error={!!errors.phone}
          helperText={errors.phone}
          required
        />
      </Grid>
      
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Email Address"
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
          required
        />
      </Grid>
      
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Address"
          value={formData.address}
          onChange={(e) => handleInputChange('address', e.target.value)}
          error={!!errors.address}
          helperText={errors.address}
          required
        />
      </Grid>
      
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Date of Birth"
          type="date"
          value={formData.dateOfBirth}
          onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
    </Grid>
  )

  const renderSkillsAndExperience = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          <Work sx={{ mr: 1, verticalAlign: 'middle' }} />
          Skills & Experience
        </Typography>
      </Grid>
      
      <Grid item xs={12} md={6}>
        <FormControl fullWidth error={!!errors.workerType} required>
          <InputLabel>Primary Work Type</InputLabel>
          <Select
            value={formData.workerType}
            onChange={(e) => handleInputChange('workerType', e.target.value)}
            label="Primary Work Type"
          >
            {workerTypes.map((type) => (
              <MenuItem key={type} value={type}>{type}</MenuItem>
            ))}
          </Select>
          {errors.workerType && <FormHelperText>{errors.workerType}</FormHelperText>}
        </FormControl>
      </Grid>
      
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Hourly Rate ($)"
          value={formData.hourlyRate}
          onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
          error={!!errors.hourlyRate}
          helperText={errors.hourlyRate}
          placeholder="25.00"
          required
        />
      </Grid>
      
      <Grid item xs={12}>
        <FormControl fullWidth error={!!errors.skills} required>
          <InputLabel>Skills</InputLabel>
          <Select
            multiple
            value={formData.skills}
            onChange={(e) => handleInputChange('skills', e.target.value)}
            input={<OutlinedInput label="Skills" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
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
          {errors.skills && <FormHelperText>{errors.skills}</FormHelperText>}
        </FormControl>
      </Grid>
      
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Experience (Years)"
          value={formData.experience}
          onChange={(e) => handleInputChange('experience', e.target.value)}
          placeholder="e.g., 5 years in construction"
        />
      </Grid>
      
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Education"
          value={formData.education}
          onChange={(e) => handleInputChange('education', e.target.value)}
          placeholder="e.g., High School Diploma, Trade School, etc."
        />
      </Grid>
      
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel>Certifications</InputLabel>
          <Select
            multiple
            value={formData.certifications}
            onChange={(e) => handleInputChange('certifications', e.target.value)}
            input={<OutlinedInput label="Certifications" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            {certificationOptions.map((cert) => (
              <MenuItem key={cert} value={cert}>
                {cert}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  )

  const renderAvailability = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          <Schedule sx={{ mr: 1, verticalAlign: 'middle' }} />
          Availability & Preferences
        </Typography>
      </Grid>
      
      <Grid item xs={12}>
        <Typography variant="subtitle1" gutterBottom>
          Weekly Availability
        </Typography>
        <Card>
          <CardContent>
            {Object.entries(formData.availability).map(([day, timeSlots]) => (
              <Box key={day} sx={{ mb: 2 }}>
                <Typography variant="subtitle2" sx={{ textTransform: 'capitalize', mb: 1 }}>
                  {day}
                </Typography>
                <FormGroup row>
                  {Object.entries(timeSlots).map(([timeSlot, checked]) => (
                    <FormControlLabel
                      key={timeSlot}
                      control={
                        <Checkbox
                          checked={checked}
                          onChange={(e) => handleAvailabilityChange(day, timeSlot, e.target.checked)}
                        />
                      }
                      label={timeSlot.charAt(0).toUpperCase() + timeSlot.slice(1)}
                      sx={{ mr: 2 }}
                    />
                  ))}
                </FormGroup>
              </Box>
            ))}
          </CardContent>
        </Card>
      </Grid>
      
      <Grid item xs={12}>
        <Typography variant="subtitle1" gutterBottom>
          Maximum Travel Distance: {formData.travelDistance} miles
        </Typography>
        <Slider
          value={formData.travelDistance}
          onChange={(e, value) => handleInputChange('travelDistance', value)}
          min={5}
          max={100}
          step={5}
          marks
          valueLabelDisplay="auto"
        />
      </Grid>
      
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel>Preferred Work Types</InputLabel>
          <Select
            multiple
            value={formData.preferredWorkTypes}
            onChange={(e) => handleInputChange('preferredWorkTypes', e.target.value)}
            input={<OutlinedInput label="Preferred Work Types" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            {workTypeOptions.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  )

  const renderReview = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Review Your Information
      </Typography>
      
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Personal Information</Typography>
          <Typography variant="body1">
            <strong>Name:</strong> {formData.firstName} {formData.lastName}
          </Typography>
          <Typography variant="body1">
            <strong>Phone:</strong> {formData.phone}
          </Typography>
          <Typography variant="body1">
            <strong>Email:</strong> {formData.email}
          </Typography>
          <Typography variant="body1">
            <strong>Address:</strong> {formData.address}
          </Typography>
        </CardContent>
      </Card>
      
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Skills & Experience</Typography>
          <Typography variant="body1">
            <strong>Work Type:</strong> {formData.workerType}
          </Typography>
          <Typography variant="body1">
            <strong>Hourly Rate:</strong> ${formData.hourlyRate}
          </Typography>
          <Typography variant="body1">
            <strong>Skills:</strong> {formData.skills.join(', ')}
          </Typography>
          {formData.experience && (
            <Typography variant="body1">
              <strong>Experience:</strong> {formData.experience}
            </Typography>
          )}
          {formData.certifications.length > 0 && (
            <Typography variant="body1">
              <strong>Certifications:</strong> {formData.certifications.join(', ')}
            </Typography>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>Availability & Preferences</Typography>
          <Typography variant="body1">
            <strong>Travel Distance:</strong> {formData.travelDistance} miles
          </Typography>
          {formData.preferredWorkTypes.length > 0 && (
            <Typography variant="body1">
              <strong>Preferred Work Types:</strong> {formData.preferredWorkTypes.join(', ')}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  )

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return renderPersonalInformation()
      case 1:
        return renderSkillsAndExperience()
      case 2:
        return renderAvailability()
      case 3:
        return renderReview()
      default:
        return 'Unknown step'
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        py: 4
      }}
    >
      <Container maxWidth="md">
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
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
              Worker Onboarding
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Complete your profile to start finding work
            </Typography>
          </Box>

          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Box sx={{ mb: 4 }}>
            {getStepContent(activeStep)}
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              onClick={handleBackToLogin}
              startIcon={<ArrowBack />}
              variant="outlined"
            >
              Back to Login
            </Button>
            
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                startIcon={<ArrowBack />}
              >
                Previous Step
              </Button>
            
              <Button
                variant="contained"
                onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
                endIcon={activeStep === steps.length - 1 ? null : <ArrowForward />}
                sx={{
                  background: 'linear-gradient(45deg, #dc004e, #f50057)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #c51162, #dc004e)',
                  }
                }}
              >
                {activeStep === steps.length - 1 ? 'Submit for Verification' : 'Next'}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}

export default WorkerOnboarding
