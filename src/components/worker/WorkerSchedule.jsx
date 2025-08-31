import React, { useState } from 'react'
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip
} from '@mui/material'
import {
  Schedule,
  Work,
  LocationOn,
  AccessTime,
  CheckCircle,
  Warning,
  CalendarToday,
  ViewWeek,
  ViewDay,
  NavigateBefore,
  NavigateNext
} from '@mui/icons-material'
import { format, addDays, startOfWeek, endOfWeek, isSameDay, isToday } from 'date-fns'

const WorkerSchedule = () => {
  const [viewMode, setViewMode] = useState('week')
  const [currentDate, setCurrentDate] = useState(new Date())

  // Mock data - replace with actual API calls
  const schedules = [
    {
      id: 1,
      project: 'Downtown Project',
      startDate: new Date('2024-01-15'),
      endDate: new Date('2024-01-19'),
      startTime: '08:00',
      endTime: '17:00',
      role: 'General Labor',
      location: '123 Main St, Downtown',
      status: 'confirmed',
      notes: 'Foundation work and concrete pouring'
    },
    {
      id: 2,
      project: 'Residential Complex',
      startDate: new Date('2024-01-22'),
      endDate: new Date('2024-01-26'),
      startTime: '07:00',
      endTime: '16:00',
      role: 'General Labor',
      location: '456 Oak Ave, Suburbs',
      status: 'confirmed',
      notes: 'Site preparation and excavation'
    },
    {
      id: 3,
      project: 'Office Building',
      startDate: new Date('2024-01-29'),
      endDate: new Date('2024-02-02'),
      startTime: '09:00',
      endTime: '18:00',
      role: 'General Labor',
      location: '789 Business Blvd, Downtown',
      status: 'pending',
      notes: 'Interior finishing work'
    }
  ]

  const handleViewModeChange = (event, newViewMode) => {
    if (newViewMode !== null) {
      setViewMode(newViewMode)
    }
  }

  const handleDateNavigation = (direction) => {
    if (viewMode === 'week') {
      setCurrentDate(prev => addDays(prev, direction * 7))
    } else if (viewMode === 'day') {
      setCurrentDate(prev => addDays(prev, direction))
    }
  }

  const getWeekDays = () => {
    const start = startOfWeek(currentDate, { weekStartsOn: 1 })
    const days = []
    for (let i = 0; i < 7; i++) {
      days.push(addDays(start, i))
    }
    return days
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

  const getSchedulesForDate = (date) => {
    return schedules.filter(schedule => 
      schedule.startDate <= date && schedule.endDate >= date
    )
  }

  const formatDateRange = (startDate, endDate) => {
    if (startDate.toDateString() === endDate.toDateString()) {
      return format(startDate, 'MMM dd, yyyy')
    }
    return `${format(startDate, 'MMM dd')} - ${format(endDate, 'MMM dd, yyyy')}`
  }

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
            My Schedule
          </Typography>
          <Typography variant="body1" color="text.secondary">
            View your work assignments and project schedules
          </Typography>
        </Box>
        <Button
          variant="outlined"
          startIcon={<CalendarToday />}
          sx={{ px: 3, py: 1.5 }}
        >
          Request Changes
        </Button>
      </Box>

      {/* View Mode Toggle and Navigation */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Schedule View</Typography>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <ToggleButtonGroup
                value={viewMode}
                exclusive
                onChange={handleViewModeChange}
                size="small"
              >
                <ToggleButton value="week">
                  <ViewWeek sx={{ mr: 1 }} />
                  Week
                </ToggleButton>
                <ToggleButton value="day">
                  <ViewDay sx={{ mr: 1 }} />
                  Day
                </ToggleButton>
              </ToggleButtonGroup>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton onClick={() => handleDateNavigation(-1)}>
                  <NavigateBefore />
                </IconButton>
                <Typography variant="body2" sx={{ minWidth: 120, textAlign: 'center' }}>
                  {viewMode === 'week' 
                    ? `${format(startOfWeek(currentDate, { weekStartsOn: 1 }), 'MMM dd')} - ${format(endOfWeek(currentDate, { weekStartsOn: 1 }), 'MMM dd, yyyy')}`
                    : format(currentDate, 'MMM dd, yyyy')
                  }
                </Typography>
                <IconButton onClick={() => handleDateNavigation(1)}>
                  <NavigateNext />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Weekly Schedule View */}
      {viewMode === 'week' && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
              Weekly Schedule
            </Typography>
            <Grid container spacing={2}>
              {getWeekDays().map((day, index) => (
                <Grid item xs={12} sm={6} md={1.7} key={index}>
                  <Box 
                    sx={{ 
                      textAlign: 'center', 
                      p: 2, 
                      border: '1px solid #e0e0e0', 
                      borderRadius: 1,
                      bgcolor: isToday(day) ? 'primary.light' : 'transparent',
                      color: isToday(day) ? 'white' : 'inherit'
                    }}
                  >
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                      {format(day, 'EEE')}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2, opacity: isToday(day) ? 0.9 : 0.7 }}>
                      {format(day, 'MMM dd')}
                    </Typography>
                    {getSchedulesForDate(day).map(schedule => (
                      <Box key={schedule.id} sx={{ mb: 1 }}>
                        <Chip
                          label={schedule.project}
                          size="small"
                          color={getProjectColor(schedule.project)}
                          sx={{ 
                            mb: 0.5, 
                            fontSize: '0.7rem',
                            bgcolor: isToday(day) ? 'rgba(255,255,255,0.2)' : undefined,
                            color: isToday(day) ? 'white' : undefined
                          }}
                        />
                        <Typography variant="caption" display="block" sx={{ opacity: 0.8 }}>
                          {schedule.startTime} - {schedule.endTime}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* Daily Schedule View */}
      {viewMode === 'day' && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
              {format(currentDate, 'EEEE, MMMM dd, yyyy')}
            </Typography>
            {getSchedulesForDate(currentDate).length > 0 ? (
              <Grid container spacing={2}>
                {getSchedulesForDate(currentDate).map(schedule => (
                  <Grid item xs={12} key={schedule.id}>
                    <Box sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {schedule.project}
                        </Typography>
                        <Chip 
                          label={getStatusLabel(schedule.status)} 
                          color={getStatusColor(schedule.status)}
                          size="small"
                        />
                      </Box>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <AccessTime color="action" />
                            <Typography variant="body2">
                              {schedule.startTime} - {schedule.endTime}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <Work color="action" />
                            <Typography variant="body2">
                              {schedule.role}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <LocationOn color="action" />
                            <Typography variant="body2">
                              {schedule.location}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            {schedule.notes}
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <Button variant="contained" color="primary" size="small">
                              Clock In
                            </Button>
                            <Button variant="outlined" color="secondary" size="small">
                              View Details
                            </Button>
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Schedule sx={{ fontSize: 60, color: 'grey.400', mb: 2 }} />
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  No scheduled work
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  You have no assignments scheduled for this day.
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      )}

      {/* All Schedules Table */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
            All Scheduled Assignments
          </Typography>
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Project</TableCell>
                  <TableCell>Date Range</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Location</TableCell>
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
                          {schedule.project}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {schedule.notes}
                        </Typography>
                      </Box>
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
                      <Typography variant="body2" color="text.secondary">
                        {schedule.location}
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
                        <Tooltip title="View Details">
                          <IconButton size="small" color="info">
                            <Work fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Request Changes">
                          <IconButton size="small" color="warning">
                            <Schedule fontSize="small" />
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
    </Box>
  )
}

export default WorkerSchedule
