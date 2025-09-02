import React from 'react'
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Chip,
  LinearProgress,
  IconButton
} from '@mui/material'
import {
  Schedule,
  Work,
  AttachMoney,
  TrendingUp,
  CheckCircle,
  Warning,
  Notifications,
  CalendarToday,
  AccessTime
} from '@mui/icons-material'
import { format } from 'date-fns'

const WorkerOverview = () => {
  // Mock data - replace with actual API calls
  const workerData = {
    name: 'Mike Worker',
    role: 'Laborer',
    hourlyRate: 18,
    totalHours: 156,
    overtimeHours: 12,
    totalPay: 3024,
    projects: ['Downtown Project', 'Residential Complex'],
    status: 'active'
  }

  const todaySchedule = {
    project: 'Downtown Project',
    startTime: '08:00',
    endTime: '17:00',
    role: 'General Labor',
    location: '123 Main St, Downtown',
    status: 'confirmed'
  }

  const recentActivities = [
    { id: 1, action: 'Clock in', time: '08:00 AM', status: 'completed' },
    { id: 2, action: 'Break start', time: '12:00 PM', status: 'completed' },
    { id: 3, action: 'Break end', time: '12:30 PM', status: 'completed' },
    { id: 4, action: 'Clock out', time: '17:00 PM', status: 'pending' }
  ]

  const weeklyHours = [
    { day: 'Mon', hours: 8, overtime: 1 },
    { day: 'Tue', hours: 8, overtime: 0 },
    { day: 'Wed', hours: 8, overtime: 2 },
    { day: 'Thu', hours: 8, overtime: 0 },
    { day: 'Fri', hours: 8, overtime: 1 },
    { day: 'Sat', hours: 4, overtime: 0 },
    { day: 'Sun', hours: 0, overtime: 0 }
  ]

  const totalWeeklyHours = weeklyHours.reduce((sum, day) => sum + day.hours + day.overtime, 0)
  const totalWeeklyOvertime = weeklyHours.reduce((sum, day) => sum + day.overtime, 0)

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
          Welcome back, {workerData.name}!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Here's your work summary for today
        </Typography>
      </Box>

      {/* Worker Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <CardContent sx={{ color: 'white' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {workerData.totalHours}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Total Hours
                  </Typography>
                </Box>
                <AccessTime sx={{ fontSize: 40, opacity: 0.8 }} />
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
                    {workerData.overtimeHours}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Overtime Hours
                  </Typography>
                </Box>
                <TrendingUp sx={{ fontSize: 40, opacity: 0.8 }} />
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
                    ${workerData.hourlyRate}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Hourly Rate
                  </Typography>
                </Box>
                <AttachMoney sx={{ fontSize: 40, opacity: 0.8 }} />
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
                    ${workerData.totalPay}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Total Pay
                  </Typography>
                </Box>
                <Work sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Today's Schedule */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} lg={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                Today's Schedule
              </Typography>
              <Box sx={{ p: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    {todaySchedule.project}
                  </Typography>
                  <Chip 
                    label={todaySchedule.status} 
                    color="success" 
                    size="small"
                  />
                </Box>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <AccessTime color="action" />
                      <Typography variant="body2">
                        {todaySchedule.startTime} - {todaySchedule.endTime}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Work color="action" />
                      <Typography variant="body2">
                        {todaySchedule.role}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CalendarToday color="action" />
                      <Typography variant="body2">
                        {todaySchedule.location}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ textAlign: 'right' }}>
                      <Button variant="contained" color="primary" sx={{ mb: 1 }}>
                        Clock In
                      </Button>
                      <Button variant="outlined" color="secondary">
                        View Details
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                Quick Actions
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<Schedule />}
                  fullWidth
                  sx={{ justifyContent: 'flex-start', py: 1.5 }}
                >
                  View Full Schedule
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<AttachMoney />}
                  fullWidth
                  sx={{ justifyContent: 'flex-start', py: 1.5 }}
                >
                  Submit Expense
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<AttachMoney />}
                  fullWidth
                  sx={{ justifyContent: 'flex-start', py: 1.5 }}
                  onClick={() => window.location.href = '/worker/income'}
                >
                  View Income
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Work />}
                  fullWidth
                  sx={{ justifyContent: 'flex-start', py: 1.5 }}
                >
                  Update Hours
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Work />}
                  fullWidth
                  sx={{ justifyContent: 'flex-start', py: 1.5 }}
                  onClick={() => window.location.href = '/worker/jobs'}
                >
                  Browse Job Offers
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Notifications />}
                  fullWidth
                  sx={{ justifyContent: 'flex-start', py: 1.5 }}
                >
                  Request Time Off
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Weekly Hours, Recent Activities, Job Opportunities, and Income Summary */}
      <Grid container spacing={3} sx={{ mt: 0 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                This Week's Hours
              </Typography>
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Total Hours</Typography>
                  <Typography variant="body2" color="primary">
                    {totalWeeklyHours}h
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={(totalWeeklyHours / 40) * 100} 
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {weeklyHours.map((day, index) => (
                  <Box key={index}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">{day.day}</Typography>
                      <Typography variant="body2" color="primary">
                        {day.hours}h {day.overtime > 0 && `+${day.overtime}h OT`}
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={(day.hours / 8) * 100} 
                      sx={{ height: 6 }}
                    />
                  </Box>
                ))}
              </Box>
              
              <Box sx={{ mt: 3, p: 2, bgcolor: 'primary.light', borderRadius: 1, color: 'white' }}>
                <Typography variant="body2" sx={{ textAlign: 'center' }}>
                  Weekly Total: {totalWeeklyHours}h ({totalWeeklyOvertime}h overtime)
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                Recent Activities
              </Typography>
              <List>
                {recentActivities.map((activity) => (
                  <ListItem key={activity.id} sx={{ px: 0 }}>
                    <ListItemAvatar>
                      <Avatar 
                        sx={{ 
                          bgcolor: activity.status === 'completed' ? 'success.main' : 'warning.main',
                          width: 32,
                          height: 32
                        }}
                      >
                        {activity.status === 'completed' ? <CheckCircle /> : <Warning />}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={activity.action}
                      secondary={activity.time}
                    />
                    <Chip 
                      label={activity.status} 
                      size="small" 
                      color={activity.status === 'completed' ? 'success' : 'warning'}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Job Opportunities */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                Job Opportunities
              </Typography>
              <Box sx={{ textAlign: 'center', py: 2 }}>
                <Typography variant="h4" color="primary" gutterBottom>
                  12
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Available job offers
                </Typography>
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<Work />}
                  onClick={() => window.location.href = '/worker/jobs'}
                  sx={{ mt: 1 }}
                >
                  Browse Jobs
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Income Summary */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                This Month's Income
              </Typography>
              <Box sx={{ textAlign: 'center', py: 2 }}>
                <Typography variant="h4" color="success.main" gutterBottom>
                  $2,840
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Net earnings this month
                </Typography>
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<AttachMoney />}
                  onClick={() => window.location.href = '/worker/income'}
                  sx={{ mt: 1 }}
                >
                  View Details
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default WorkerOverview
