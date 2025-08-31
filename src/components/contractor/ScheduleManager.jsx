import React, { useState } from 'react'
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
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
  Tooltip,
  InputAdornment,
  Switch,
  FormControlLabel,
  Badge
} from '@mui/material'
import {
  Add,
  Edit,
  Delete,
  Schedule,
  Work,
  Person,
  LocationOn,
  AccessTime,
  CheckCircle,
  Warning,
  CalendarToday,
  ViewWeek,
  ViewDay
} from '@mui/icons-material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { format, addDays, startOfWeek, endOfWeek } from 'date-fns'

const ScheduleManager = () => {
  const [openDialog, setOpenDialog] = useState(false)
  const [editingSchedule, setEditingSchedule] = useState(null)
  const [viewMode, setViewMode] = useState('week') // week, day, month
  const [formData, setFormData] = useState({
    workerId: '',
    project: '',
    startDate: new Date(),
    endDate: new Date(),
    startTime: '08:00',
    endTime: '17:00',
    role: '',
    notes: ''
  })

  // Mock data - replace with actual API calls
  const schedules = [
    {
      id: 1,
      workerId: 1,
      workerName: 'Mike Johnson',
      workerRole: 'Foreman',
      project: 'Downtown Project',
      startDate: new Date('2024-01-15'),
      endDate: new Date('2024-01-19'),
      startTime: '07:00',
      endTime: '18:00',
      role: 'Site Supervision',
      notes: 'Foundation work and concrete pouring',
      status: 'confirmed'
    },
    {
      id: 2,
      workerId: 2,
      workerName: 'Sarah Wilson',
      workerRole: 'Carpenter',
      project: 'Residential Complex',
      startDate: new Date('2024-01-15'),
      endDate: new Date('2024-01-17'),
      startTime: '08:00',
      endTime: '16:00',
      role: 'Framing',
      notes: 'Wall framing and roof trusses',
      status: 'confirmed'
    },
    {
      id: 3,
      workerId: 3,
      workerName: 'Tom Davis',
      workerRole: 'Electrician',
      project: 'Office Building',
      startDate: new Date('2024-01-16'),
      endDate: new Date('2024-01-18'),
      startTime: '09:00',
      endTime: '17:00',
      role: 'Electrical Rough-in',
      notes: 'Install electrical boxes and conduit',
      status: 'pending'
    },
    {
      id: 4,
      workerId: 4,
      workerName: 'Lisa Brown',
      workerRole: 'Plumber',
      project: 'Downtown Project',
      startDate: new Date('2024-01-17'),
      endDate: new Date('2024-01-19'),
      startTime: '08:00',
      endTime: '16:00',
      role: 'Plumbing Installation',
      notes: 'Main water line and drainage',
      status: 'confirmed'
    }
  ]

  const workers = [
    { id: 1, name: 'Mike Johnson', role: 'Foreman' },
    { id: 2, name: 'Sarah Wilson', role: 'Carpenter' },
    { id: 3, name: 'Tom Davis', role: 'Electrician' },
    { id: 4, name: 'Lisa Brown', role: 'Plumber' },
    { id: 5, name: 'James Miller', role: 'Laborer' }
  ]

  const projects = ['Downtown Project', 'Residential Complex', 'Office Building', 'General Operations']
  const roles = ['Site Supervision', 'Framing', 'Electrical', 'Plumbing', 'Masonry', 'Painting', 'General Labor']
  const statuses = ['confirmed', 'pending', 'cancelled', 'completed']

  const totalSchedules = schedules.length
  const confirmedSchedules = schedules.filter(s => s.status === 'confirmed').length
  const pendingSchedules = schedules.filter(s => s.status === 'pending').length
  const activeWorkers = new Set(schedules.filter(s => s.status === 'confirmed').map(s => s.workerId)).size

  const handleOpenDialog = (schedule = null) => {
    if (schedule) {
      setEditingSchedule(schedule)
      setFormData({
        workerId: schedule.workerId.toString(),
        project: schedule.project,
        startDate: schedule.startDate,
        endDate: schedule.endDate,
        startTime: schedule.startTime,
        endTime: schedule.endTime,
        role: schedule.role,
        notes: schedule.notes
      })
    } else {
      setEditingSchedule(null)
      setFormData({
        workerId: '',
        project: '',
        startDate: new Date(),
        endDate: new Date(),
        startTime: '08:00',
        endTime: '17:00',
        role: '',
        notes: ''
      })
    }
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setEditingSchedule(null)
    setFormData({
      workerId: '',
      project: '',
      startDate: new Date(),
      endDate: new Date(),
      startTime: '08:00',
      endTime: '17:00',
      role: '',
      notes: ''
    })
  }

  const handleSubmit = () => {
    // Handle form submission - add/update schedule
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
      case 'confirmed': return 'success'
      case 'pending': return 'warning'
      case 'cancelled': return 'error'
      case 'completed': return 'info'
      default: return 'default'
    }
  }

  const getStatusLabel = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1)
  }

  const getProjectColor = (project) => {
    const colors = {
      'Downtown Project': 'primary',
      'Residential Complex': 'secondary',
      'Office Building': 'info',
      'General Operations': 'warning'
    }
    return colors[project] || 'default'
  }

  const formatDateRange = (startDate, endDate) => {
    if (startDate.toDateString() === endDate.toDateString()) {
      return format(startDate, 'MMM dd, yyyy')
    }
    return `${format(startDate, 'MMM dd')} - ${format(endDate, 'MMM dd, yyyy')}`
  }

  const getWeekDays = () => {
    const start = startOfWeek(new Date(), { weekStartsOn: 1 })
    const days = []
    for (let i = 0; i < 7; i++) {
      days.push(addDays(start, i))
    }
    return days
  }

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
            Schedule Manager
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage worker schedules, project timelines, and resource allocation
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
          sx={{ px: 3, py: 1.5 }}
        >
          Add Schedule
        </Button>
      </Box>

      {/* Schedule Overview Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <CardContent sx={{ color: 'white' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {totalSchedules}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Total Schedules
                  </Typography>
                </Box>
                <Schedule sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
            <CardContent sx={{ color: 'white' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {confirmedSchedules}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Confirmed
                  </Typography>
                </Box>
                <CheckCircle sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
            <CardContent sx={{ color: 'white' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {pendingSchedules}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Pending
                  </Typography>
                </Box>
                <Warning sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}>
            <CardContent sx={{ color: 'white' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {activeWorkers}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Active Workers
                  </Typography>
                </Box>
                <Person sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* View Mode Toggle */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Schedule View</Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant={viewMode === 'week' ? 'contained' : 'outlined'}
                startIcon={<ViewWeek />}
                onClick={() => setViewMode('week')}
                size="small"
              >
                Week
              </Button>
              <Button
                variant={viewMode === 'day' ? 'contained' : 'outlined'}
                startIcon={<ViewDay />}
                onClick={() => setViewMode('day')}
                size="small"
              >
                Day
              </Button>
              <Button
                variant={viewMode === 'month' ? 'contained' : 'outlined'}
                startIcon={<CalendarToday />}
                onClick={() => setViewMode('month')}
                size="small"
              >
                Month
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Weekly Schedule View */}
      {viewMode === 'week' && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
              This Week's Schedule
            </Typography>
            <Grid container spacing={2}>
              {getWeekDays().map((day, index) => (
                <Grid item xs={12} sm={6} md={1.7} key={index}>
                  <Box sx={{ textAlign: 'center', p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                      {format(day, 'EEE')}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {format(day, 'MMM dd')}
                    </Typography>
                    {schedules
                      .filter(s => s.startDate <= day && s.endDate >= day)
                      .map(schedule => (
                        <Chip
                          key={schedule.id}
                          label={schedule.workerName}
                          size="small"
                          color={getProjectColor(schedule.project)}
                          sx={{ mb: 0.5, fontSize: '0.7rem' }}
                        />
                      ))}
                  </Box>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* Schedules Table */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
            All Schedules
          </Typography>
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Worker</TableCell>
                  <TableCell>Project</TableCell>
                  <TableCell>Date Range</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {schedules.map((schedule) => (
                  <TableRow key={schedule.id} hover>
                    <TableCell>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          {schedule.workerName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {schedule.workerRole}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={schedule.project} 
                        size="small" 
                        color={getProjectColor(schedule.project)}
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {formatDateRange(schedule.startDate, schedule.endDate)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {schedule.startTime} - {schedule.endTime}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {schedule.role}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={getStatusLabel(schedule.status)} 
                        size="small" 
                        color={getStatusColor(schedule.status)}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                        <Tooltip title="Edit">
                          <IconButton 
                            size="small" 
                            color="primary"
                            onClick={() => handleOpenDialog(schedule)}
                          >
                            <Edit fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="View Details">
                          <IconButton size="small" color="info">
                            <Work fontSize="small" />
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

      {/* Add/Edit Schedule Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingSchedule ? 'Edit Schedule' : 'Add New Schedule'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Worker</InputLabel>
                <Select
                  value={formData.workerId}
                  label="Worker"
                  onChange={(e) => handleInputChange('workerId', e.target.value)}
                  required
                >
                  {workers.map((worker) => (
                    <MenuItem key={worker.id} value={worker.id}>
                      {worker.name} - {worker.role}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Project</InputLabel>
                <Select
                  value={formData.project}
                  label="Project"
                  onChange={(e) => handleInputChange('project', e.target.value)}
                  required
                >
                  {projects.map((project) => (
                    <MenuItem key={project} value={project}>{project}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Start Date"
                  value={formData.startDate}
                  onChange={(newValue) => handleInputChange('startDate', newValue)}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="End Date"
                  value={formData.endDate}
                  onChange={(newValue) => handleInputChange('endDate', newValue)}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Start Time"
                type="time"
                value={formData.startTime}
                onChange={(e) => handleInputChange('startTime', e.target.value)}
                required
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="End Time"
                type="time"
                value={formData.endTime}
                onChange={(e) => handleInputChange('endTime', e.target.value)}
                required
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Role/Assignment</InputLabel>
                <Select
                  value={formData.role}
                  label="Role/Assignment"
                  onChange={(e) => handleInputChange('role', e.target.value)}
                  required
                >
                  {roles.map((role) => (
                    <MenuItem key={role} value={role}>{role}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Notes"
                multiline
                rows={3}
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="Additional details about this schedule..."
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingSchedule ? 'Update' : 'Add'} Schedule
          </Button>
        </DialogActions>
      </Dialog>

      {/* Floating Action Button */}
      <Tooltip title="Add New Schedule" placement="left">
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

export default ScheduleManager
