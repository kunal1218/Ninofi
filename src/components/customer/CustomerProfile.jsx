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
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material'
import {
  Edit,
  Save,
  Cancel,
  Person,
  Email,
  Phone,
  LocationOn,
  Business,
  Assignment,
  Star,
  Chat,
  Notifications,
  Security,
  Payment
} from '@mui/icons-material'

const CustomerProfile = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [openPreferences, setOpenPreferences] = useState(false)
  const [profileData, setProfileData] = useState({
    firstName: 'Sarah',
    lastName: 'Customer',
    email: 'sarah.customer@email.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street',
    city: 'Downtown',
    state: 'CA',
    zipCode: '90210',
    preferences: {
      notifications: true,
      emailUpdates: true,
      smsUpdates: false,
      marketingEmails: false
    },
    serviceInterests: ['Interior Design', 'Kitchen Renovation', 'Bathroom Remodel'],
    budgetRange: '$$',
    preferredRegions: ['Downtown', 'Midtown']
  })

  const [editData, setEditData] = useState({ ...profileData })

  // Mock data - replace with actual API calls
  const recentActivity = [
    {
      id: 1,
      type: 'Project Started',
      description: 'Started new project: Kitchen Renovation',
      date: '2024-01-01',
      icon: <Assignment color="primary" />
    },
    {
      id: 2,
      type: 'Contractor Contacted',
      description: 'Contacted ABC Construction Co.',
      date: '2023-12-28',
      icon: <Chat color="success" />
    },
    {
      id: 3,
      type: 'Review Submitted',
      description: 'Submitted review for XYZ Renovations',
      date: '2023-12-20',
      icon: <Star color="warning" />
    },
    {
      id: 4,
      type: 'Project Completed',
      description: 'Bathroom Remodel project completed',
      date: '2023-12-15',
      icon: <Assignment color="success" />
    }
  ]

  const savedContractors = [
    {
      id: 1,
      name: 'ABC Construction Co.',
      specialty: 'Interior Design & Renovation',
      rating: 4.8,
      lastContact: '2024-01-15'
    },
    {
      id: 2,
      name: 'XYZ Renovations',
      specialty: 'Kitchen & Bathroom',
      rating: 4.6,
      lastContact: '2023-12-30'
    },
    {
      id: 3,
      name: 'Outdoor Specialists',
      specialty: 'Landscaping & Decks',
      rating: 4.9,
      lastContact: '2024-01-10'
    }
  ]

  const handleEdit = () => {
    setEditData({ ...profileData })
    setIsEditing(true)
  }

  const handleSave = () => {
    setProfileData({ ...editData })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditData({ ...profileData })
    setIsEditing(false)
  }

  const handleInputChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handlePreferenceChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [field]: value
      }
    }))
  }

  const getBudgetColor = (range) => {
    switch (range) {
      case '$': return 'success'
      case '$$': return 'warning'
      case '$$$': return 'error'
      default: return 'default'
    }
  }

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
            My Profile
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your personal information and preferences
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<Notifications />}
            onClick={() => setOpenPreferences(true)}
          >
            Preferences
          </Button>
          {!isEditing ? (
            <Button
              variant="contained"
              startIcon={<Edit />}
              onClick={handleEdit}
            >
              Edit Profile
            </Button>
          ) : (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="contained"
                startIcon={<Save />}
                onClick={handleSave}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                startIcon={<Cancel />}
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </Box>
          )}
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Profile Information */}
        <Grid item xs={12} lg={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                Personal Information
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    value={isEditing ? editData.firstName : profileData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    disabled={!isEditing}
                    InputProps={{
                      startAdornment: <Person sx={{ mr: 1, color: 'action.active' }} />
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    value={isEditing ? editData.lastName : profileData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    disabled={!isEditing}
                    InputProps={{
                      startAdornment: <Person sx={{ mr: 1, color: 'action.active' }} />
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={isEditing ? editData.email : profileData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    disabled={!isEditing}
                    InputProps={{
                      startAdornment: <Email sx={{ mr: 1, color: 'action.active' }} />
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone"
                    value={isEditing ? editData.phone : profileData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    disabled={!isEditing}
                    InputProps={{
                      startAdornment: <Phone sx={{ mr: 1, color: 'action.active' }} />
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Address"
                    value={isEditing ? editData.address : profileData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    disabled={!isEditing}
                    InputProps={{
                      startAdornment: <LocationOn sx={{ mr: 1, color: 'action.active' }} />
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="City"
                    value={isEditing ? editData.city : profileData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="State"
                    value={isEditing ? editData.state : profileData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="ZIP Code"
                    value={isEditing ? editData.zipCode : profileData.zipCode}
                    onChange={(e) => handleInputChange('zipCode', e.target.value)}
                    disabled={!isEditing}
                  />
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                Service Preferences
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Budget Range</InputLabel>
                    <Select
                      value={isEditing ? editData.budgetRange : profileData.budgetRange}
                      label="Budget Range"
                      onChange={(e) => handleInputChange('budgetRange', e.target.value)}
                      disabled={!isEditing}
                    >
                      <MenuItem value="$">$ (Under $5,000)</MenuItem>
                      <MenuItem value="$$">$$ ($5,000 - $25,000)</MenuItem>
                      <MenuItem value="$$$">$$$ (Over $25,000)</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box>
                    <Typography variant="body2" gutterBottom>Service Interests</Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      {profileData.serviceInterests.map((service, index) => (
                        <Chip
                          key={index}
                          label={service}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                      ))}
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box>
                    <Typography variant="body2" gutterBottom>Preferred Regions</Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      {profileData.preferredRegions.map((region, index) => (
                        <Chip
                          key={index}
                          label={region}
                          size="small"
                          color="success"
                          variant="outlined"
                        />
                      ))}
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Profile Summary & Quick Actions */}
        <Grid item xs={12} lg={4}>
          <Card sx={{ mb: 3 }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  mx: 'auto',
                  mb: 2,
                  background: 'linear-gradient(45deg, #4caf50, #8bc34a)',
                  fontSize: '2.5rem'
                }}
              >
                {profileData.firstName.charAt(0)}
              </Avatar>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                {profileData.firstName} {profileData.lastName}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Customer since 2023
              </Typography>
              <Chip 
                label={`Budget: ${profileData.budgetRange}`} 
                color={getBudgetColor(profileData.budgetRange)}
                sx={{ mt: 1 }}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<Assignment />}
                  fullWidth
                >
                  Start New Project
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Chat />}
                  fullWidth
                >
                  View Messages
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Star />}
                  fullWidth
                >
                  Write Reviews
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Security />}
                  fullWidth
                >
                  Security Settings
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Payment />}
                  fullWidth
                >
                  Payment Methods
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Activity & Saved Contractors */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} lg={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                Recent Activity
              </Typography>
              <List>
                {recentActivity.map((activity) => (
                  <ListItem key={activity.id} sx={{ px: 0 }}>
                    <ListItemAvatar>
                      {activity.icon}
                    </ListItemAvatar>
                    <ListItemText
                      primary={activity.type}
                      secondary={activity.description}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {activity.date}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                Saved Contractors
              </Typography>
              <List>
                {savedContractors.map((contractor) => (
                  <ListItem key={contractor.id} sx={{ px: 0 }}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        {contractor.name.charAt(0)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={contractor.name}
                      secondary={contractor.specialty}
                    />
                    <Box sx={{ textAlign: 'right' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                        <Star sx={{ fontSize: 16, color: 'warning.main' }} />
                        <Typography variant="body2">
                          {contractor.rating}
                        </Typography>
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        Last: {contractor.lastContact}
                      </Typography>
                    </Box>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Preferences Dialog */}
      <Dialog open={openPreferences} onClose={() => setOpenPreferences(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Notification Preferences</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Push Notifications</InputLabel>
                  <Select
                    value={editData.preferences.notifications}
                    label="Push Notifications"
                    onChange={(e) => handlePreferenceChange('notifications', e.target.value)}
                  >
                    <MenuItem value={true}>Enabled</MenuItem>
                    <MenuItem value={false}>Disabled</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Email Updates</InputLabel>
                  <Select
                    value={editData.preferences.emailUpdates}
                    label="Email Updates"
                    onChange={(e) => handlePreferenceChange('emailUpdates', e.target.value)}
                  >
                    <MenuItem value={true}>Enabled</MenuItem>
                    <MenuItem value={false}>Disabled</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>SMS Updates</InputLabel>
                  <Select
                    value={editData.preferences.smsUpdates}
                    label="SMS Updates"
                    onChange={(e) => handlePreferenceChange('smsUpdates', e.target.value)}
                  >
                    <MenuItem value={true}>Enabled</MenuItem>
                    <MenuItem value={false}>Disabled</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Marketing Emails</InputLabel>
                  <Select
                    value={editData.preferences.marketingEmails}
                    label="Marketing Emails"
                    onChange={(e) => handlePreferenceChange('marketingEmails', e.target.value)}
                  >
                    <MenuItem value={true}>Enabled</MenuItem>
                    <MenuItem value={false}>Disabled</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPreferences(false)}>Cancel</Button>
          <Button 
            onClick={() => {
              setProfileData({ ...editData })
              setOpenPreferences(false)
            }} 
            variant="contained"
          >
            Save Preferences
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default CustomerProfile
