import React, { useState } from 'react'
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material'
import {
  Edit,
  Save,
  Cancel,
  Person,
  Work,
  LocationOn,
  Phone,
  Email,
  CalendarToday,
  Security,
  Notifications,
  Settings,
  CheckCircle,
  Warning
} from '@mui/icons-material'
import { useAuth } from '../../contexts/AuthContext'

const WorkerProfile = () => {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const [formData, setFormData] = useState({
    firstName: 'Mike',
    lastName: 'Worker',
    email: 'mike.worker@email.com',
    phone: '+1 (555) 123-4567',
    address: '123 Worker St, City, State 12345',
    emergencyContact: 'Jane Worker',
    emergencyPhone: '+1 (555) 987-6543',
    skills: ['General Labor', 'Concrete Work', 'Site Cleanup'],
    certifications: ['OSHA Safety', 'First Aid'],
    startDate: '2023-06-15',
    hourlyRate: 18,
    preferredShifts: 'Day',
    availability: 'Full-time'
  })

  const [originalData] = useState({ ...formData })

  // Mock data - replace with actual API calls
  const workHistory = [
    {
      id: 1,
      project: 'Downtown Project',
      role: 'General Labor',
      startDate: '2024-01-01',
      endDate: '2024-01-15',
      hours: 120,
      status: 'completed'
    },
    {
      id: 2,
      project: 'Residential Complex',
      role: 'General Labor',
      startDate: '2023-12-01',
      endDate: '2023-12-31',
      hours: 160,
      status: 'completed'
    },
    {
      id: 3,
      project: 'Office Building',
      role: 'General Labor',
      startDate: '2023-11-01',
      endDate: '2023-11-30',
      hours: 140,
      status: 'completed'
    }
  ]

  const recentPayments = [
    {
      id: 1,
      period: '2024-01-01 to 2024-01-15',
      hours: 80,
      overtime: 8,
      grossPay: 1584,
      netPay: 1420,
      status: 'paid',
      date: '2024-01-16'
    },
    {
      id: 2,
      period: '2023-12-16 to 2023-12-31',
      hours: 76,
      overtime: 4,
      grossPay: 1440,
      netPay: 1290,
      status: 'paid',
      date: '2023-12-31'
    }
  ]

  const skills = ['General Labor', 'Concrete Work', 'Site Cleanup', 'Equipment Operation', 'Safety Procedures']
  const certifications = ['OSHA Safety', 'First Aid', 'CPR', 'Forklift Operation', 'Scaffold Safety']
  const shiftPreferences = ['Day', 'Night', 'Swing', 'Flexible']
  const availabilityOptions = ['Full-time', 'Part-time', 'Seasonal', 'On-call']

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    // Handle save - update profile
    console.log('Saving profile:', formData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData({ ...originalData })
    setIsEditing(false)
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleOpenDialog = () => {
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'success'
      case 'active': return 'primary'
      case 'paid': return 'success'
      case 'pending': return 'warning'
      default: return 'default'
    }
  }

  const getStatusLabel = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1)
  }

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
            My Profile
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your personal information and work preferences
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {!isEditing ? (
            <Button
              variant="contained"
              startIcon={<Edit />}
              onClick={handleEdit}
              sx={{ px: 3, py: 1.5 }}
            >
              Edit Profile
            </Button>
          ) : (
            <>
              <Button
                variant="contained"
                startIcon={<Save />}
                onClick={handleSave}
                sx={{ px: 3, py: 1.5 }}
              >
                Save Changes
              </Button>
              <Button
                variant="outlined"
                startIcon={<Cancel />}
                onClick={handleCancel}
                sx={{ px: 3, py: 1.5 }}
              >
                Cancel
              </Button>
            </>
          )}
        </Box>
      </Box>

      {/* Profile Header */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Avatar
              sx={{
                width: 100,
                height: 100,
                fontSize: '2.5rem',
                background: 'linear-gradient(45deg, #dc004e, #f50057)'
              }}
            >
              {user?.name?.charAt(0) || 'W'}
            </Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
                {formData.firstName} {formData.lastName}
              </Typography>
              <Typography variant="h6" color="primary" gutterBottom>
                {user?.role || 'Laborer'}
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Chip label="Active" color="success" size="small" />
                <Chip label="Full-time" color="primary" size="small" />
                <Chip label="OSHA Certified" color="info" size="small" />
              </Box>
            </Box>
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="h5" color="primary" sx={{ fontWeight: 700 }}>
                ${formData.hourlyRate}/hr
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Hourly Rate
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Profile Information */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Person color="primary" />
                Personal Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    disabled={!isEditing}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    disabled={!isEditing}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    disabled={!isEditing}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    disabled={!isEditing}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    disabled={!isEditing}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Emergency Contact"
                    value={formData.emergencyContact}
                    onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                    disabled={!isEditing}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Emergency Phone"
                    value={formData.emergencyPhone}
                    onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
                    disabled={!isEditing}
                    size="small"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Work color="primary" />
                Work Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Start Date"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                    disabled={!isEditing}
                    size="small"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Hourly Rate"
                    type="number"
                    value={formData.hourlyRate}
                    onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
                    disabled={!isEditing}
                    size="small"
                    InputProps={{
                      startAdornment: '$',
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Preferred Shifts</InputLabel>
                    <Select
                      value={formData.preferredShifts}
                      label="Preferred Shifts"
                      onChange={(e) => handleInputChange('preferredShifts', e.target.value)}
                      disabled={!isEditing}
                    >
                      {shiftPreferences.map((shift) => (
                        <MenuItem key={shift} value={shift}>{shift}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Availability</InputLabel>
                    <Select
                      value={formData.availability}
                      label="Availability"
                      onChange={(e) => handleInputChange('availability', e.target.value)}
                      disabled={!isEditing}
                    >
                      {availabilityOptions.map((option) => (
                        <MenuItem key={option} value={option}>{option}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" gutterBottom>
                    Skills
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {formData.skills.map((skill, index) => (
                      <Chip
                        key={index}
                        label={skill}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" gutterBottom>
                    Certifications
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {formData.certifications.map((cert, index) => (
                      <Chip
                        key={index}
                        label={cert}
                        size="small"
                        color="success"
                        variant="outlined"
                        icon={<CheckCircle />}
                      />
                    ))}
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Work History and Recent Payments */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                Recent Work History
              </Typography>
              <List>
                {workHistory.map((work) => (
                  <ListItem key={work.id} sx={{ px: 0 }}>
                    <ListItemIcon>
                      <Work color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={work.project}
                      secondary={`${work.role} • ${work.startDate} to ${work.endDate} • ${work.hours}h`}
                    />
                    <Chip 
                      label={getStatusLabel(work.status)} 
                      size="small" 
                      color={getStatusColor(work.status)}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                Recent Payments
              </Typography>
              <List>
                {recentPayments.map((payment) => (
                  <ListItem key={payment.id} sx={{ px: 0 }}>
                    <ListItemIcon>
                      <CheckCircle color="success" />
                    </ListItemIcon>
                    <ListItemText
                      primary={`${payment.period}`}
                      secondary={`${payment.hours}h + ${payment.overtime}h OT • Net: $${payment.netPay}`}
                    />
                    <Chip 
                      label={getStatusLabel(payment.status)} 
                      size="small" 
                      color={getStatusColor(payment.status)}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Settings Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Account Settings</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Manage your account preferences and security settings.
          </Typography>
          <List>
            <ListItem button>
              <ListItemIcon>
                <Security />
              </ListItemIcon>
              <ListItemText primary="Change Password" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <Notifications />
              </ListItemIcon>
              <ListItemText primary="Notification Preferences" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText primary="Privacy Settings" />
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default WorkerProfile
