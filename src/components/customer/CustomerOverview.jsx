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
  Rating,
  IconButton
} from '@mui/material'
import {
  Search,
  Chat,
  Assignment,
  Star,
  LocationOn,
  Business,
  Add,
  TrendingUp,
  ArrowForward
} from '@mui/icons-material'

const CustomerOverview = () => {
  const navigate = useNavigate()
  
  // Mock data - replace with actual API calls
  const customerData = {
    name: 'Sarah Customer',
    location: 'Downtown, City',
    totalProjects: 3,
    activeProjects: 1,
    savedContractors: 5,
    totalSpent: 25000
  }

  const recentProjects = [
    {
      id: 1,
      name: 'Kitchen Renovation',
      contractor: 'ABC Construction Co.',
      status: 'In Progress',
      budget: 15000,
      progress: 65,
      startDate: '2024-01-01'
    },
    {
      id: 2,
      name: 'Bathroom Remodel',
      contractor: 'XYZ Renovations',
      status: 'Completed',
      budget: 8000,
      progress: 100,
      startDate: '2023-11-15'
    },
    {
      id: 3,
      name: 'Deck Construction',
      contractor: 'Outdoor Specialists',
      status: 'Planning',
      budget: 12000,
      progress: 20,
      startDate: '2024-02-01'
    }
  ]

  const savedContractors = [
    {
      id: 1,
      name: 'ABC Construction Co.',
      specialty: 'Interior Design & Renovation',
      rating: 4.8,
      reviews: 127,
      location: 'Downtown',
      priceRange: '$$$',
      image: 'ABC'
    },
    {
      id: 2,
      name: 'XYZ Renovations',
      specialty: 'Kitchen & Bathroom',
      rating: 4.6,
      reviews: 89,
      location: 'Midtown',
      priceRange: '$$',
      image: 'XYZ'
    },
    {
      id: 3,
      name: 'Outdoor Specialists',
      specialty: 'Landscaping & Decks',
      rating: 4.9,
      reviews: 156,
      location: 'Suburbs',
      priceRange: '$$$',
      image: 'OS'
    }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Progress': return 'primary'
      case 'Completed': return 'success'
      case 'Planning': return 'warning'
      case 'On Hold': return 'error'
      default: return 'default'
    }
  }

  const getPriceRangeColor = (range) => {
    switch (range) {
      case '$': return 'success'
      case '$$': return 'warning'
      case '$$$': return 'error'
      default: return 'default'
    }
  }

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
          Welcome back, {customerData.name}!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Find the perfect contractor for your next project
        </Typography>
      </Box>

      {/* Customer Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            sx={{ 
              background: 'linear-gradient(135deg, #4caf50, #8bc34a)',
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 8
              }
            }}
            onClick={() => navigate('/customer/projects')}
          >
            <CardContent sx={{ color: 'white' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {customerData.totalProjects}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Total Projects
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.7, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    Click to view <ArrowForward sx={{ fontSize: 12 }} />
                  </Typography>
                </Box>
                <Assignment sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            sx={{ 
              background: 'linear-gradient(135deg, #2196f3, #03a9f4)',
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 8
              }
            }}
            onClick={() => navigate('/customer/projects')}
          >
            <CardContent sx={{ color: 'white' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {customerData.activeProjects}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Active Projects
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.7, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    Click to view <ArrowForward sx={{ fontSize: 12 }} />
                  </Typography>
                </Box>
                <TrendingUp sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            sx={{ 
              background: 'linear-gradient(135deg, #ff9800, #ffc107)',
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 8
              }
            }}
            onClick={() => navigate('/customer/browse')}
          >
            <CardContent sx={{ color: 'white' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {customerData.savedContractors}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Saved Contractors
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.7, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    Click to view <ArrowForward sx={{ fontSize: 12 }} />
                  </Typography>
                </Box>
                <Business sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            sx={{ 
              background: 'linear-gradient(135deg, #9c27b0, #e91e63)',
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 8
              }
            }}
            onClick={() => navigate('/customer/projects')}
          >
            <CardContent sx={{ color: 'white' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    ${(customerData.totalSpent / 1000).toFixed(1)}k
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Total Spent
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.7, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    Click to view <ArrowForward sx={{ fontSize: 12 }} />
                  </Typography>
                </Box>
                <Assignment sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Hint text */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
          💡 Click on any metric card above to view more details
        </Typography>
      </Box>

      {/* Quick Actions */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
            Quick Actions
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              startIcon={<Search />}
              sx={{ px: 3, py: 1.5 }}
              onClick={() => navigate('/customer/browse')}
            >
              Find New Contractor
            </Button>
            <Button
              variant="outlined"
              startIcon={<Add />}
              sx={{ px: 3, py: 1.5 }}
              onClick={() => navigate('/customer/projects')}
            >
              Start New Project
            </Button>
            <Button
              variant="outlined"
              startIcon={<Chat />}
              sx={{ px: 3, py: 1.5 }}
              onClick={() => navigate('/customer/chats')}
            >
              View Messages
            </Button>
            <Button
              variant="outlined"
              startIcon={<Assignment />}
              sx={{ px: 3, py: 1.5 }}
              onClick={() => navigate('/customer/projects')}
            >
              Project History
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Recent Projects and Saved Contractors */}
      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                Recent Projects
              </Typography>
              <List>
                {recentProjects.map((project) => (
                  <ListItem 
                    key={project.id} 
                    sx={{ 
                      px: 0, 
                      cursor: 'pointer',
                      '&:hover': { bgcolor: 'action.hover' }
                    }}
                    onClick={() => navigate('/customer/projects')}
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        <Assignment />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={project.name}
                      secondary={`${project.contractor} • Budget: $${project.budget.toLocaleString()}`}
                    />
                    <Box sx={{ textAlign: 'right' }}>
                      <Chip 
                        label={project.status} 
                        size="small" 
                        color={getStatusColor(project.status)}
                        sx={{ mb: 1 }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        {project.progress}% Complete
                      </Typography>
                    </Box>
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
                  <ListItem 
                    key={contractor.id} 
                    sx={{ 
                      px: 0, 
                      cursor: 'pointer',
                      '&:hover': { bgcolor: 'action.hover' }
                    }}
                    onClick={() => navigate('/customer/browse')}
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'success.main' }}>
                        {contractor.image}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={contractor.name}
                      secondary={
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            {contractor.specialty}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                            <Rating value={contractor.rating} size="small" readOnly />
                            <Typography variant="body2" color="text.secondary">
                              ({contractor.reviews})
                            </Typography>
                          </Box>
                        </Box>
                      }
                    />
                    <Box sx={{ textAlign: 'right' }}>
                      <Chip 
                        label={contractor.priceRange} 
                        size="small" 
                        color={getPriceRangeColor(contractor.priceRange)}
                        sx={{ mb: 1 }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        {contractor.location}
                      </Typography>
                    </Box>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default CustomerOverview
