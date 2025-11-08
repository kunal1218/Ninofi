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
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from '@mui/material'
import {
  Business,
  Person,
  Phone,
  Email,
  LocationOn,
  Work,
  Add as AddIcon,
  Delete as DeleteIcon,
  ArrowForward,
  ArrowBack,
  AccountBalance,
  Group
} from '@mui/icons-material'
import { useAuth } from '../contexts/AuthContext'

const steps = ['Choose Account Type', 'Business Information', 'Worker Information', 'Review & Submit']

const ContractorOnboarding = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [accountType, setAccountType] = useState('') // 'business' or 'worker'
  const [formData, setFormData] = useState({
    // Business Information
    businessName: '',
    businessType: '',
    phone: '',
    address: '',
    specialties: [],
    license: '',
    insurance: '',
    
    // Worker Information
    workers: [
      {
        name: '',
        role: '',
        phone: '',
        email: '',
        skills: [],
        hourlyRate: ''
      }
    ],
    
    // For joining as worker
    joiningBusinessId: '',
    joiningBusinessName: '',
    workerRole: '',
    workerSkills: [],
    workerHourlyRate: ''
  })

  const [errors, setErrors] = useState({})
  const { updateUserProfile, logout } = useAuth()
  const navigate = useNavigate()

  const businessTypes = [
    'General Contractor',
    'Electrical',
    'Plumbing',
    'HVAC',
    'Roofing',
    'Landscaping',
    'Painting',
    'Carpentry',
    'Other'
  ]

  const specialtyOptions = [
    'Residential',
    'Commercial',
    'Industrial',
    'Renovation',
    'New Construction',
    'Maintenance',
    'Emergency Services',
    'Green Building',
    'Historical Restoration'
  ]

  const workerRoles = [
    'Laborer',
    'Carpenter',
    'Electrician',
    'Plumber',
    'HVAC Technician',
    'Painter',
    'Roofer',
    'Mason',
    'Equipment Operator',
    'Supervisor',
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
    'Blueprint Reading'
  ]

  // Mock business data for demonstration
  const availableBusinesses = [
    { id: '1', name: 'ABC Construction Co.', type: 'General Contractor' },
    { id: '2', name: 'Elite Electrical Services', type: 'Electrical' },
    { id: '3', name: 'Premier Plumbing', type: 'Plumbing' },
    { id: '4', name: 'Cool Air HVAC', type: 'HVAC' }
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
      if (!accountType) newErrors.accountType = 'Please select an account type'
    }
    
    if (activeStep === 1) {
      if (accountType === 'business') {
        if (!formData.businessName) newErrors.businessName = 'Business name is required'
        if (!formData.businessType) newErrors.businessType = 'Business type is required'
        if (!formData.phone) newErrors.phone = 'Phone number is required'
        if (!formData.address) newErrors.address = 'Address is required'
        if (formData.specialties.length === 0) newErrors.specialties = 'At least one specialty is required'
      } else if (accountType === 'worker') {
        if (!formData.joiningBusinessId) newErrors.joiningBusinessId = 'Please select a business to join'
        if (!formData.workerRole) newErrors.workerRole = 'Worker role is required'
        if (!formData.phone) newErrors.phone = 'Phone number is required'
        if (!formData.address) newErrors.address = 'Address is required'
      }
    }
    
    if (activeStep === 2 && accountType === 'business') {
      formData.workers.forEach((worker, index) => {
        if (!worker.name) newErrors[`worker${index}Name`] = 'Worker name is required'
        if (!worker.role) newErrors[`worker${index}Role`] = 'Worker role is required'
        if (!worker.phone) newErrors[`worker${index}Phone`] = 'Worker phone is required'
      })
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (validateStep()) {
      try {
        if (accountType === 'business') {
          await updateUserProfile({
            businessName: formData.businessName,
            businessType: formData.businessType,
            phone: formData.phone,
            address: formData.address,
            specialties: formData.specialties,
            license: formData.license,
            insurance: formData.insurance,
            workers: formData.workers,
            accountType: 'business'
          })
        } else if (accountType === 'worker') {
          await updateUserProfile({
            joiningBusinessId: formData.joiningBusinessId,
            joiningBusinessName: formData.joiningBusinessName,
            workerRole: formData.workerRole,
            workerSkills: formData.workerSkills,
            workerHourlyRate: formData.workerHourlyRate,
            phone: formData.phone,
            address: formData.address,
            accountType: 'worker',
            pendingApproval: true
          })
        }
        navigate('/contractor/verification')
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

  const handleWorkerChange = (index, field, value) => {
    const updatedWorkers = [...formData.workers]
    updatedWorkers[index] = { ...updatedWorkers[index], [field]: value }
    setFormData(prev => ({ ...prev, workers: updatedWorkers }))
    
    const errorKey = `worker${index}${field.charAt(0).toUpperCase() + field.slice(1)}`
    if (errors[errorKey]) {
      setErrors(prev => ({ ...prev, [errorKey]: '' }))
    }
  }

  const addWorker = () => {
    setFormData(prev => ({
      ...prev,
      workers: [...prev.workers, {
        name: '',
        role: '',
        phone: '',
        email: '',
        skills: [],
        hourlyRate: ''
      }]
    }))
  }

  const removeWorker = (index) => {
    setFormData(prev => ({
      ...prev,
      workers: prev.workers.filter((_, i) => i !== index)
    }))
  }

  const renderAccountTypeChoice = () => (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
        Choose Your Account Type
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card 
            sx={{ 
              cursor: 'pointer',
              border: accountType === 'business' ? '2px solid #1976d2' : '1px solid #e0e0e0',
              '&:hover': { borderColor: '#1976d2' }
            }}
            onClick={() => setAccountType('business')}
          >
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
              <AccountBalance sx={{ fontSize: 60, color: '#1976d2', mb: 2 }} />
              <Typography variant="h5" gutterBottom>
                Create Business Account
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Start your own contracting business and manage your team of workers.
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Chip label="Business Owner" color="primary" />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card 
            sx={{ 
              cursor: 'pointer',
              border: accountType === 'worker' ? '2px solid #1976d2' : '1px solid #e0e0e0',
              '&:hover': { borderColor: '#1976d2' }
            }}
            onClick={() => setAccountType('worker')}
          >
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
              <Group sx={{ fontSize: 60, color: '#1976d2', mb: 2 }} />
              <Typography variant="h5" gutterBottom>
                Join as Contracting Worker
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Join an existing contracting company as a skilled worker.
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Chip label="Contracting Worker" color="primary" />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {errors.accountType && (
        <Typography color="error" sx={{ mt: 2, textAlign: 'center' }}>
          {errors.accountType}
        </Typography>
      )}
    </Box>
  )

  const renderBusinessInformation = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          <Business sx={{ mr: 1, verticalAlign: 'middle' }} />
          Business Information
        </Typography>
      </Grid>
      
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Business Name"
          value={formData.businessName}
          onChange={(e) => handleInputChange('businessName', e.target.value)}
          error={!!errors.businessName}
          helperText={errors.businessName}
          required
        />
      </Grid>
      
      <Grid item xs={12} md={6}>
        <FormControl fullWidth error={!!errors.businessType} required>
          <InputLabel>Business Type</InputLabel>
          <Select
            value={formData.businessType}
            onChange={(e) => handleInputChange('businessType', e.target.value)}
            label="Business Type"
          >
            {businessTypes.map((type) => (
              <MenuItem key={type} value={type}>{type}</MenuItem>
            ))}
          </Select>
          {errors.businessType && <FormHelperText>{errors.businessType}</FormHelperText>}
        </FormControl>
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
          label="Business Address"
          value={formData.address}
          onChange={(e) => handleInputChange('address', e.target.value)}
          error={!!errors.address}
          helperText={errors.address}
          required
        />
      </Grid>
      
      <Grid item xs={12}>
        <FormControl fullWidth error={!!errors.specialties} required>
          <InputLabel>Specialties</InputLabel>
          <Select
            multiple
            value={formData.specialties}
            onChange={(e) => handleInputChange('specialties', e.target.value)}
            input={<OutlinedInput label="Specialties" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            {specialtyOptions.map((specialty) => (
              <MenuItem key={specialty} value={specialty}>
                {specialty}
              </MenuItem>
            ))}
          </Select>
          {errors.specialties && <FormHelperText>{errors.specialties}</FormHelperText>}
        </FormControl>
      </Grid>
      
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="License Number (Optional)"
          value={formData.license}
          onChange={(e) => handleInputChange('license', e.target.value)}
        />
      </Grid>
      
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Insurance Number (Optional)"
          value={formData.insurance}
          onChange={(e) => handleInputChange('insurance', e.target.value)}
        />
      </Grid>
    </Grid>
  )

  const renderWorkerJoinInformation = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          <Person sx={{ mr: 1, verticalAlign: 'middle' }} />
          Join as Contracting Worker
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Select a business to join and provide your information. Your request will be sent to the business owner for approval.
        </Typography>
      </Grid>
      
      <Grid item xs={12}>
        <FormControl fullWidth error={!!errors.joiningBusinessId} required>
          <InputLabel>Select Business to Join</InputLabel>
          <Select
            value={formData.joiningBusinessId}
            onChange={(e) => {
              const business = availableBusinesses.find(b => b.id === e.target.value)
              handleInputChange('joiningBusinessId', e.target.value)
              handleInputChange('joiningBusinessName', business ? business.name : '')
            }}
            label="Select Business to Join"
          >
            {availableBusinesses.map((business) => (
              <MenuItem key={business.id} value={business.id}>
                {business.name} - {business.type}
              </MenuItem>
            ))}
          </Select>
          {errors.joiningBusinessId && <FormHelperText>{errors.joiningBusinessId}</FormHelperText>}
        </FormControl>
      </Grid>
      
      <Grid item xs={12} md={6}>
        <FormControl fullWidth error={!!errors.workerRole} required>
          <InputLabel>Your Role</InputLabel>
          <Select
            value={formData.workerRole}
            onChange={(e) => handleInputChange('workerRole', e.target.value)}
            label="Your Role"
          >
            {workerRoles.map((role) => (
              <MenuItem key={role} value={role}>{role}</MenuItem>
            ))}
          </Select>
          {errors.workerRole && <FormHelperText>{errors.workerRole}</FormHelperText>}
        </FormControl>
      </Grid>
      
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Hourly Rate (Optional)"
          value={formData.workerHourlyRate}
          onChange={(e) => handleInputChange('workerHourlyRate', e.target.value)}
          placeholder="$25.00"
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
          label="Address"
          value={formData.address}
          onChange={(e) => handleInputChange('address', e.target.value)}
          error={!!errors.address}
          helperText={errors.address}
          required
        />
      </Grid>
      
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel>Your Skills</InputLabel>
          <Select
            multiple
            value={formData.workerSkills}
            onChange={(e) => handleInputChange('workerSkills', e.target.value)}
            input={<OutlinedInput label="Your Skills" />}
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
        </FormControl>
      </Grid>
    </Grid>
  )

  const renderWorkerInformation = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        <Person sx={{ mr: 1, verticalAlign: 'middle' }} />
        Worker Information
      </Typography>
      
      {formData.workers.map((worker, index) => (
        <Card key={index} sx={{ mb: 2 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Worker {index + 1}</Typography>
              {formData.workers.length > 1 && (
                <IconButton 
                  color="error" 
                  onClick={() => removeWorker(index)}
                  size="small"
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </Box>
            
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  value={worker.name}
                  onChange={(e) => handleWorkerChange(index, 'name', e.target.value)}
                  error={!!errors[`worker${index}Name`]}
                  helperText={errors[`worker${index}Name`]}
                  required
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <FormControl fullWidth error={!!errors[`worker${index}Role`]} required>
                  <InputLabel>Role</InputLabel>
                  <Select
                    value={worker.role}
                    onChange={(e) => handleWorkerChange(index, 'role', e.target.value)}
                    label="Role"
                  >
                    {workerRoles.map((role) => (
                      <MenuItem key={role} value={role}>{role}</MenuItem>
                    ))}
                  </Select>
                  {errors[`worker${index}Role`] && <FormHelperText>{errors[`worker${index}Role`]}</FormHelperText>}
                </FormControl>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  value={worker.phone}
                  onChange={(e) => handleWorkerChange(index, 'phone', e.target.value)}
                  error={!!errors[`worker${index}Phone`]}
                  helperText={errors[`worker${index}Phone`]}
                  required
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email (Optional)"
                  value={worker.email}
                  onChange={(e) => handleWorkerChange(index, 'email', e.target.value)}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Hourly Rate (Optional)"
                  value={worker.hourlyRate}
                  onChange={(e) => handleWorkerChange(index, 'hourlyRate', e.target.value)}
                  placeholder="$25.00"
                />
              </Grid>
              
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Skills</InputLabel>
                  <Select
                    multiple
                    value={worker.skills}
                    onChange={(e) => handleWorkerChange(index, 'skills', e.target.value)}
                    input={<OutlinedInput label="Skills" />}
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
          </CardContent>
        </Card>
      ))}
      
      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={addWorker}
        sx={{ mt: 2 }}
      >
        Add Another Worker
      </Button>
    </Box>
  )

  const renderReview = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Review Your Information
      </Typography>
      
      {accountType === 'business' ? (
        <>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Business Information</Typography>
              <List dense>
                <ListItem>
                  <ListItemText 
                    primary="Business Name" 
                    secondary={formData.businessName} 
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Business Type" 
                    secondary={formData.businessType} 
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Phone" 
                    secondary={formData.phone} 
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Address" 
                    secondary={formData.address} 
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Specialties" 
                    secondary={formData.specialties.join(', ')} 
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Workers ({formData.workers.length})</Typography>
              {formData.workers.map((worker, index) => (
                <Box key={index} sx={{ mb: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {worker.name} - {worker.role}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Phone: {worker.phone}
                    {worker.email && ` | Email: ${worker.email}`}
                    {worker.hourlyRate && ` | Rate: ${worker.hourlyRate}`}
                  </Typography>
                  {worker.skills.length > 0 && (
                    <Box sx={{ mt: 1 }}>
                      {worker.skills.map((skill) => (
                        <Chip key={skill} label={skill} size="small" sx={{ mr: 0.5, mb: 0.5 }} />
                      ))}
                    </Box>
                  )}
                </Box>
              ))}
            </CardContent>
          </Card>
        </>
      ) : (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>Worker Information</Typography>
            <List dense>
              <ListItem>
                <ListItemText 
                  primary="Joining Business" 
                  secondary={formData.joiningBusinessName} 
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Your Role" 
                  secondary={formData.workerRole} 
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Phone" 
                  secondary={formData.phone} 
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Address" 
                  secondary={formData.address} 
                />
              </ListItem>
              {formData.workerHourlyRate && (
                <ListItem>
                  <ListItemText 
                    primary="Hourly Rate" 
                    secondary={formData.workerHourlyRate} 
                  />
                </ListItem>
              )}
              {formData.workerSkills.length > 0 && (
                <ListItem>
                  <ListItemText 
                    primary="Skills" 
                    secondary={formData.workerSkills.join(', ')} 
                  />
                </ListItem>
              )}
            </List>
            <Box sx={{ mt: 2, p: 2, bgcolor: 'info.light', borderRadius: 1 }}>
              <Typography variant="body2" color="info.contrastText">
                <strong>Note:</strong> Your request to join {formData.joiningBusinessName} will be sent to the business owner for approval. 
                You'll be notified once your request is approved or denied.
              </Typography>
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  )

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return renderAccountTypeChoice()
      case 1:
        if (accountType === 'business') {
          return renderBusinessInformation()
        } else if (accountType === 'worker') {
          return renderWorkerJoinInformation()
        }
        return null
      case 2:
        if (accountType === 'business') {
          return renderWorkerInformation()
        } else if (accountType === 'worker') {
          return renderReview()
        }
        return null
      case 3:
        if (accountType === 'business') {
          return renderReview()
        }
        return null
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
              Contractor Onboarding
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Complete your profile to start using Ninofi
            </Typography>
          </Box>

          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {accountType === 'business' ? (
              <>
                <Step>
                  <StepLabel>Choose Account Type</StepLabel>
                </Step>
                <Step>
                  <StepLabel>Business Information</StepLabel>
                </Step>
                <Step>
                  <StepLabel>Worker Information</StepLabel>
                </Step>
                <Step>
                  <StepLabel>Review & Submit</StepLabel>
                </Step>
              </>
            ) : accountType === 'worker' ? (
              <>
                <Step>
                  <StepLabel>Choose Account Type</StepLabel>
                </Step>
                <Step>
                  <StepLabel>Worker Information</StepLabel>
                </Step>
                <Step>
                  <StepLabel>Review & Submit</StepLabel>
                </Step>
              </>
            ) : (
              steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))
            )}
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
                  background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #1565c0, #1976d2)',
                  }
                }}
              >
                {activeStep === steps.length - 1 ? 
                  (accountType === 'worker' ? 'Submit Request for Approval' : 'Submit for Verification') 
                  : 'Next'}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}

export default ContractorOnboarding
