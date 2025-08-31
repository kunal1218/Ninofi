import React, { useState } from 'react'
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
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
  Fab,
  Tooltip
} from '@mui/material'
import {
  Add,
  Edit,
  Delete,
  Phone,
  Email,
  Work,
  LocationOn,
  MoreVert
} from '@mui/icons-material'

const TeamManagement = () => {
  const [openDialog, setOpenDialog] = useState(false)
  const [editingWorker, setEditingWorker] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    hourlyRate: '',
    location: '',
    status: 'active'
  })

  // Mock data - replace with actual API calls
  const workers = [
    {
      id: 1,
      name: 'Mike Johnson',
      email: 'mike.johnson@email.com',
      phone: '+1 (555) 123-4567',
      role: 'Foreman',
      hourlyRate: 28,
      location: 'Downtown Project',
      status: 'active',
      avatar: 'MJ'
    },
    {
      id: 2,
      name: 'Sarah Wilson',
      email: 'sarah.wilson@email.com',
      phone: '+1 (555) 234-5678',
      role: 'Carpenter',
      hourlyRate: 24,
      location: 'Residential Complex',
      status: 'active',
      avatar: 'SW'
    },
    {
      id: 3,
      name: 'Tom Davis',
      email: 'tom.davis@email.com',
      phone: '+1 (555) 345-6789',
      role: 'Electrician',
      hourlyRate: 32,
      location: 'Office Building',
      status: 'on_leave',
      avatar: 'TD'
    },
    {
      id: 4,
      name: 'Lisa Brown',
      email: 'lisa.brown@email.com',
      phone: '+1 (555) 456-7890',
      role: 'Plumber',
      hourlyRate: 30,
      location: 'Downtown Project',
      status: 'active',
      avatar: 'LB'
    },
    {
      id: 5,
      name: 'James Miller',
      email: 'james.miller@email.com',
      phone: '+1 (555) 567-8901',
      role: 'Laborer',
      hourlyRate: 18,
      location: 'Residential Complex',
      status: 'inactive',
      avatar: 'JM'
    }
  ]

  const roles = ['Foreman', 'Carpenter', 'Electrician', 'Plumber', 'Laborer', 'Mason', 'Painter']
  const statuses = ['active', 'inactive', 'on_leave', 'terminated']

  const handleOpenDialog = (worker = null) => {
    if (worker) {
      setEditingWorker(worker)
      setFormData({
        name: worker.name,
        email: worker.email,
        phone: worker.phone,
        role: worker.role,
        hourlyRate: worker.hourlyRate.toString(),
        location: worker.location,
        status: worker.status
      })
    } else {
      setEditingWorker(null)
      setFormData({
        name: '',
        email: '',
        phone: '',
        role: '',
        hourlyRate: '',
        location: '',
        status: 'active'
      })
    }
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setEditingWorker(null)
    setFormData({
      name: '',
      email: '',
      phone: '',
      role: '',
      hourlyRate: '',
      location: '',
      status: 'active'
    })
  }

  const handleSubmit = () => {
    // Handle form submission - add/update worker
    console.log('Form data:', formData)
    handleCloseDialog()
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'success'
      case 'inactive': return 'default'
      case 'on_leave': return 'warning'
      case 'terminated': return 'error'
      default: return 'default'
    }
  }

  const getStatusLabel = (status) => {
    return status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())
  }

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
            Team Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your workforce, roles, and team structure
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
          sx={{ px: 3, py: 1.5 }}
        >
          Add Worker
        </Button>
      </Box>

      {/* Team Overview Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="primary" sx={{ fontWeight: 700 }}>
                {workers.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Workers
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="success.main" sx={{ fontWeight: 700 }}>
                {workers.filter(w => w.status === 'active').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Active Workers
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="warning.main" sx={{ fontWeight: 700 }}>
                {workers.filter(w => w.status === 'on_leave').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                On Leave
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="info.main" sx={{ fontWeight: 700 }}>
                ${workers.reduce((sum, w) => sum + w.hourlyRate, 0).toFixed(0)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Hourly Rate
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Workers Table */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
            Worker Directory
          </Typography>
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Worker</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Hourly Rate</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Contact</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {workers.map((worker) => (
                  <TableRow key={worker.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ bgcolor: 'primary.main' }}>
                          {worker.avatar}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                            {worker.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {worker.email}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={worker.role} 
                        size="small" 
                        color="primary" 
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        ${worker.hourlyRate}/hr
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {worker.location}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={getStatusLabel(worker.status)} 
                        size="small" 
                        color={getStatusColor(worker.status)}
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title="Call">
                          <IconButton size="small" color="primary">
                            <Phone fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Email">
                          <IconButton size="small" color="primary">
                            <Email fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                        <Tooltip title="Edit">
                          <IconButton 
                            size="small" 
                            color="primary"
                            onClick={() => handleOpenDialog(worker)}
                          >
                            <Edit fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="More">
                          <IconButton size="small">
                            <MoreVert fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Add/Edit Worker Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingWorker ? 'Edit Worker' : 'Add New Worker'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Full Name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Role</InputLabel>
                <Select
                  value={formData.role}
                  label="Role"
                  onChange={(e) => handleInputChange('role', e.target.value)}
                  required
                >
                  {roles.map((role) => (
                    <MenuItem key={role} value={role}>{role}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Hourly Rate ($)"
                type="number"
                value={formData.hourlyRate}
                onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Location/Project"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={formData.status}
                  label="Status"
                  onChange={(e) => handleInputChange('status', e.target.value)}
                >
                  {statuses.map((status) => (
                    <MenuItem key={status} value={status}>
                      {getStatusLabel(status)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingWorker ? 'Update' : 'Add'} Worker
          </Button>
        </DialogActions>
      </Dialog>

      {/* Floating Action Button */}
      <Tooltip title="Add New Worker" placement="left">
        <Fab
          color="primary"
          aria-label="add"
          onClick={() => handleOpenDialog()}
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            display: { xs: 'block', sm: 'none' }
          }}
        >
          <Add />
        </Fab>
      </Tooltip>
    </Box>
  )
}

export default TeamManagement
