import React from 'react'
import { useNavigate } from 'react-router-dom'
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
  People,
  AttachMoney,
  Schedule,
  TrendingUp,
  Add,
  MoreVert,
  Work,
  CheckCircle,
  Warning,
  ArrowBack
} from '@mui/icons-material'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const DashboardOverview = ({ selectedProject }) => {
  const navigate = useNavigate()
  
  // Mock data - replace with actual API calls
  const stats = {
    totalWorkers: 24,
    activeProjects: 8,
    monthlyExpenses: 45600,
    monthlyRevenue: 89000,
    completionRate: 78
  }

  const recentActivities = [
    { id: 1, worker: 'Mike Johnson', action: 'Submitted expense report', time: '2 hours ago', type: 'expense' },
    { id: 2, worker: 'Sarah Wilson', action: 'Completed project milestone', time: '4 hours ago', type: 'milestone' },
    { id: 3, worker: 'Tom Davis', action: 'Requested time off', time: '1 day ago', type: 'request' },
    { id: 4, worker: 'Lisa Brown', action: 'Updated work hours', time: '1 day ago', type: 'hours' }
  ]

  const chartData = [
    { name: 'Jan', expenses: 42000, revenue: 78000 },
    { name: 'Feb', expenses: 38000, revenue: 82000 },
    { name: 'Mar', expenses: 45000, revenue: 85000 },
    { name: 'Apr', expenses: 45600, revenue: 89000 },
    { name: 'May', expenses: 41000, revenue: 92000 },
    { name: 'Jun', expenses: 48000, revenue: 95000 }
  ]

  const getStatusColor = (type) => {
    switch (type) {
      case 'expense': return 'primary'
      case 'milestone': return 'success'
      case 'request': return 'warning'
      case 'hours': return 'info'
      default: return 'default'
    }
  }

  const getStatusIcon = (type) => {
    switch (type) {
      case 'expense': return <AttachMoney />
      case 'milestone': return <CheckCircle />
      case 'request': return <Warning />
      case 'hours': return <Work />
      default: return <Work />
    }
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
          {selectedProject ? `${selectedProject.name} Dashboard` : 'Welcome back, John!'}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {selectedProject 
            ? `Manage your ${selectedProject.name} project details, team, and progress`
            : 'Here\'s what\'s happening with your projects today'
          }
        </Typography>
        {selectedProject && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Client: {selectedProject.client} • Budget: ${selectedProject.budget?.toLocaleString()} • Progress: {selectedProject.progress}%
          </Typography>
        )}
      </Box>

      {/* Key Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <CardContent sx={{ color: 'white' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {stats.totalWorkers}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Total Workers
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 56, height: 56 }}>
                  <People sx={{ fontSize: 28 }} />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
            <CardContent sx={{ color: 'white' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {stats.activeProjects}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Active Projects
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 56, height: 56 }}>
                  <Work sx={{ fontSize: 28 }} />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
            <CardContent sx={{ color: 'white' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    ${(stats.monthlyExpenses / 1000).toFixed(1)}k
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Monthly Expenses
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 56, height: 56 }}>
                  <AttachMoney sx={{ fontSize: 28 }} />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}>
            <CardContent sx={{ color: 'white' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    ${(stats.monthlyRevenue / 1000).toFixed(1)}k
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Monthly Revenue
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 56, height: 56 }}>
                  <TrendingUp sx={{ fontSize: 28 }} />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts and Quick Actions */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} lg={8}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6">Financial Overview</Typography>
                <Chip label="Last 6 Months" color="primary" size="small" />
              </Box>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="expenses" stroke="#f50057" strokeWidth={2} />
                  <Line type="monotone" dataKey="revenue" stroke="#4caf50" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Quick Actions</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  fullWidth
                  sx={{ justifyContent: 'flex-start', py: 1.5 }}
                >
                  Add New Worker
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<AttachMoney />}
                  fullWidth
                  sx={{ justifyContent: 'flex-start', py: 1.5 }}
                >
                  Record Expense
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Schedule />}
                  fullWidth
                  sx={{ justifyContent: 'flex-start', py: 1.5 }}
                >
                  Create Schedule
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Work />}
                  fullWidth
                  sx={{ justifyContent: 'flex-start', py: 1.5 }}
                >
                  New Project
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Add />}
                  fullWidth
                  sx={{ justifyContent: 'flex-start', py: 1.5 }}
                  onClick={() => window.location.href = '/contractor/jobs'}
                >
                  Post Job Offer
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Activities */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Recent Activities</Typography>
              <List>
                {recentActivities.map((activity) => (
                  <ListItem key={activity.id} sx={{ px: 0 }}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: `${getStatusColor(activity.type)}.light` }}>
                        {getStatusIcon(activity.type)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={activity.action}
                      secondary={`${activity.worker} • ${activity.time}`}
                    />
                    <IconButton size="small">
                      <MoreVert />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Project Completion</Typography>
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Overall Progress</Typography>
                  <Typography variant="body2" color="primary">
                    {stats.completionRate}%
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={stats.completionRate} 
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Downtown Project</Typography>
                    <Typography variant="body2" color="primary">85%</Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={85} sx={{ height: 6 }} />
                </Box>
                
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Residential Complex</Typography>
                    <Typography variant="body2" color="primary">72%</Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={72} sx={{ height: 6 }} />
                </Box>
                
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Office Building</Typography>
                    <Typography variant="body2" color="primary">63%</Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={63} sx={{ height: 6 }} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Job Offers and Applications */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Active Job Offers</Typography>
              <Box sx={{ textAlign: 'center', py: 3 }}>
                <Typography variant="h4" color="primary" gutterBottom>
                  3
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Job offers currently posted
                </Typography>
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<Add />}
                  onClick={() => window.location.href = '/contractor/jobs'}
                  sx={{ mt: 1 }}
                >
                  Post New Job
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Worker Applications</Typography>
              <Box sx={{ textAlign: 'center', py: 3 }}>
                <Typography variant="h4" color="warning.main" gutterBottom>
                  8
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Pending applications
                </Typography>
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<People />}
                  onClick={() => window.location.href = '/contractor/jobs'}
                  sx={{ mt: 1 }}
                >
                  Review Applications
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default DashboardOverview
