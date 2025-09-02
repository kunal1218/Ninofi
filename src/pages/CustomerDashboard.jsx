import React, { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemAvatar,
  IconButton,
  Avatar,
  Divider,
  Chip,
  Card,
  CardContent,
  Button,
  Grid,
  TextField,
  FormControl,
  Select,
  MenuItem,
  LinearProgress,
  Slider,
  Collapse
} from '@mui/material'
import {
  Menu as MenuIcon,
  Dashboard,
  Search,
  Chat,
  Assignment,
  Person,
  Logout,
  Notifications,
  ExpandMore,
  ExpandLess
} from '@mui/icons-material'
import { useAuth } from '../contexts/AuthContext'

const drawerWidth = 250

const CustomerDashboard = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/customer' },
    { text: 'Browse Contractors', icon: <Search />, path: '/customer/browse' },
    { text: 'My Projects', icon: <Assignment />, path: '/customer/projects' },
    { text: 'Chats', icon: <Chat />, path: '/customer/chats' },
    { text: 'My Profile', icon: <Person />, path: '/customer/profile' }
  ]

  const drawer = (
    <Box>
      <Box sx={{ p: 3, textAlign: 'center', borderBottom: '1px solid rgba(0,0,0,0.12)' }}>
        <Avatar
          sx={{
            width: 70,
            height: 70,
            mx: 'auto',
            mb: 2,
            background: 'linear-gradient(45deg, #4caf50, #8bc34a)',
            fontSize: '1.5rem'
          }}
        >
          {user?.name?.charAt(0) || 'C'}
        </Avatar>
        <Typography variant="h6" gutterBottom>
          {user?.name || 'Customer'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {user?.role || 'Homeowner'}
        </Typography>
        <Chip 
          label="Customer" 
          color="success" 
          size="small" 
          sx={{ mt: 1 }}
        />
      </Box>
      
      <List sx={{ pt: 2 }}>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => navigate(item.path)}
            sx={{
              mx: 1,
              mb: 0.5,
              borderRadius: 2,
              '&:hover': {
                backgroundColor: 'rgba(76, 175, 80, 0.08)',
              }
            }}
          >
            <ListItemIcon sx={{ color: 'success.main' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      
      <Divider sx={{ my: 2 }} />
      
      <List>
        <ListItem
          button
          onClick={handleLogout}
          sx={{
            mx: 1,
            borderRadius: 2,
            '&:hover': {
              backgroundColor: 'rgba(76, 175, 80, 0.08)',
            }
          }}
        >
          <ListItemIcon sx={{ color: 'success.main' }}>
            <Logout />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Box>
  )

  return (
    <Box sx={{ display: 'flex' }}>
      {/* App Bar */}
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          background: 'linear-gradient(45deg, #4caf50, #8bc34a)'
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Mavu Customer Dashboard
          </Typography>
          <IconButton color="inherit">
            <Notifications />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Navigation Drawer */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: 8
        }}
      >
        <Routes>
          <Route path="/" element={<DashboardOverview />} />
          <Route path="/browse" element={<BrowseContractors />} />
          <Route path="/projects" element={<MyProjects />} />
          <Route path="/chats" element={<ChatInterface />} />
          <Route path="/profile" element={<MyProfile />} />
        </Routes>
      </Box>
    </Box>
  )
}

// Dashboard Overview Component
const DashboardOverview = () => {
  const navigate = useNavigate()
  
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
        Welcome back, Sarah! 👋
      </Typography>
      
      {/* Metrics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            cursor: 'pointer', 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
            '&:hover': { 
              transform: 'translateY(-8px)', 
              boxShadow: '0 16px 48px rgba(102, 126, 234, 0.4)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            },
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
          onClick={() => navigate('/projects')}>
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'white', mb: 1 }}>3</Typography>
              <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}>Total Projects</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            cursor: 'pointer', 
            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            color: 'white',
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(79, 172, 254, 0.3)',
            '&:hover': { 
              transform: 'translateY(-8px)', 
              boxShadow: '0 16px 48px rgba(79, 172, 254, 0.4)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            },
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
          onClick={() => navigate('/projects')}>
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'white', mb: 1 }}>1</Typography>
              <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}>Active Projects</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            cursor: 'pointer', 
            background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
            color: 'white',
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(250, 112, 154, 0.3)',
            '&:hover': { 
              transform: 'translateY(-8px)', 
              boxShadow: '0 16px 48px rgba(250, 112, 154, 0.4)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            },
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
          onClick={() => navigate('/browse')}>
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'white', mb: 1 }}>5</Typography>
              <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}>Saved Contractors</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            cursor: 'pointer', 
            background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
            color: 'white',
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(168, 237, 234, 0.3)',
            '&:hover': { 
              transform: 'translateY(-8px)', 
              boxShadow: '0 16px 48px rgba(168, 237, 234, 0.4)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            },
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
          onClick={() => navigate('/projects')}>
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'white', mb: 1 }}>$25,000</Typography>
              <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}>Total Spent</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Quick Actions */}
      <Card sx={{ mb: 4, borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
        <CardContent sx={{ py: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ mb: 3, fontWeight: 600, color: 'text.primary' }}>Quick Actions</Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button 
              variant="contained" 
              startIcon={<Search />} 
              onClick={() => navigate('/browse')}
              sx={{ 
                borderRadius: 2, 
                px: 3, 
                py: 1.5, 
                textTransform: 'none',
                fontWeight: 600,
                boxShadow: '0 4px 14px rgba(76, 175, 80, 0.3)',
                '&:hover': { boxShadow: '0 6px 20px rgba(76, 175, 80, 0.4)' }
              }}
            >
              Find New Contractor
            </Button>
            <Button 
              variant="outlined" 
              startIcon={<Assignment />} 
              onClick={() => navigate('/projects')}
              sx={{ 
                borderRadius: 2, 
                px: 3, 
                py: 1.5, 
                textTransform: 'none',
                fontWeight: 600,
                borderWidth: 2
              }}
            >
              Start New Project
            </Button>
            <Button 
              variant="outlined" 
              startIcon={<Chat />} 
              onClick={() => navigate('/chats')}
              sx={{ 
                borderRadius: 2, 
                px: 3, 
                py: 1.5, 
                textTransform: 'none',
                fontWeight: 600,
                borderWidth: 2
              }}
            >
              View Messages
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Recent Projects */}
      <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
        <CardContent sx={{ py: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>Recent Projects</Typography>
          <List sx={{ p: 0 }}>
            <ListItem 
              sx={{ 
                cursor: 'pointer', 
                borderRadius: 2,
                mb: 1,
                '&:hover': { 
                  bgcolor: 'action.hover',
                  transform: 'translateX(4px)',
                  transition: 'all 0.2s ease'
                },
                transition: 'all 0.2s ease'
              }}
              onClick={() => navigate('/projects')}
            >
              <ListItemText
                primary={
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                    Kitchen Renovation
                  </Typography>
                }
                secondary={
                  <Typography variant="body2" color="text.secondary">
                    ABC Construction Co. • In Progress
                  </Typography>
                }
              />
              <Chip 
                label="$15,000" 
                size="small" 
                sx={{ 
                  fontWeight: 600,
                  bgcolor: 'primary.main',
                  color: 'white'
                }} 
              />
            </ListItem>
            <ListItem 
              sx={{ 
                cursor: 'pointer', 
                borderRadius: 2,
                '&:hover': { 
                  bgcolor: 'action.hover',
                  transform: 'translateX(4px)',
                  transition: 'all 0.2s ease'
                },
                transition: 'all 0.2s ease'
              }}
              onClick={() => navigate('/projects')}
            >
              <ListItemText
                primary={
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                    Bathroom Remodel
                  </Typography>
                }
                secondary={
                  <Typography variant="body2" color="text.secondary">
                    XYZ Renovations • Completed
                  </Typography>
                }
              />
              <Chip 
                label="$8,000" 
                size="small" 
                color="success" 
                sx={{ fontWeight: 600 }} 
              />
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </Box>
  )
}

// Browse Contractors Component
const BrowseContractors = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedWorkType, setSelectedWorkType] = useState('all')
  const [selectedRegion, setSelectedRegion] = useState('all')
  const [priceRange, setPriceRange] = useState([0, 3])
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)

  const contractors = [
    { id: 1, name: 'ABC Construction Co.', specialty: 'Interior Design & Renovation', rating: 4.8, reviews: 127, priceRange: '$$$', location: 'Downtown', image: 'ABC' },
    { id: 2, name: 'XYZ Renovations', specialty: 'Kitchen & Bathroom', rating: 4.6, reviews: 89, priceRange: '$$', location: 'Midtown', image: 'XYZ' },
    { id: 3, name: 'Outdoor Specialists', specialty: 'Landscaping & Decks', rating: 4.9, reviews: 156, priceRange: '$$$', location: 'Suburbs', image: 'OS' },
    { id: 4, name: 'Elite Plumbing', specialty: 'Plumbing & Repairs', rating: 4.7, reviews: 203, priceRange: '$$', location: 'Downtown', image: 'EP' },
    { id: 5, name: 'Modern Electric', specialty: 'Electrical Services', rating: 4.5, reviews: 167, priceRange: '$$$', location: 'Midtown', image: 'ME' },
    { id: 6, name: 'Green Thumb Landscaping', specialty: 'Garden & Landscape Design', rating: 4.8, reviews: 134, priceRange: '$$', location: 'Suburbs', image: 'GT' }
  ]

  const workTypes = ['all', 'Interior Design', 'Renovation', 'Kitchen', 'Bathroom', 'Landscaping', 'Plumbing', 'Electrical', 'Painting']
  const regions = ['all', 'Downtown', 'Midtown', 'Suburbs']
  const priceRanges = ['$', '$$', '$$$', '$$$$']
  
  // Convert slider values to price range strings
  const getPriceRangeLabel = (value) => {
    return priceRanges[value] || 'All'
  }

  const filteredContractors = contractors.filter(contractor => {
    const matchesSearch = contractor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contractor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesWorkType = selectedWorkType === 'all' || contractor.specialty.includes(selectedWorkType)
    const matchesRegion = selectedRegion === 'all' || contractor.location === selectedRegion
    
    // Check if contractor's price range falls within the selected range
    const contractorPriceIndex = priceRanges.indexOf(contractor.priceRange)
    const matchesPriceRange = contractorPriceIndex >= priceRange[0] && contractorPriceIndex <= priceRange[1]
    
    return matchesSearch && matchesWorkType && matchesRegion && matchesPriceRange
  })

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
        Browse Contractors 🔍
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Find the perfect contractor for your project
      </Typography>
      
      {/* Search and Filters */}
      <Card sx={{ mb: 4, borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
        <CardContent sx={{ py: 2 }}>
          <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
            Search & Filters
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600, color: 'text.secondary' }}>Search</Typography>
              <TextField
                fullWidth
                placeholder="Search by name or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '&:hover fieldset': { borderColor: 'primary.main' }
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600, color: 'text.secondary' }}>Work Type</Typography>
              <FormControl fullWidth>
                <Select
                  value={selectedWorkType}
                  onChange={(e) => setSelectedWorkType(e.target.value)}
                  sx={{
                    borderRadius: 2,
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(0, 0, 0, 0.23)'
                    }
                  }}
                >
                  {workTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type === 'all' ? 'All Types' : type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600, color: 'text.secondary' }}>Region</Typography>
              <FormControl fullWidth>
                <Select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  sx={{
                    borderRadius: 2,
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(0, 0, 0, 0.23)'
                    }
                  }}
                >
                  {regions.map((region) => (
                    <MenuItem key={region} value={region}>
                      {region === 'all' ? 'All Regions' : region}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          
          {/* Advanced Filters Toggle */}
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="text"
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              endIcon={showAdvancedFilters ? <ExpandLess /> : <ExpandMore />}
              size="small"
              sx={{
                textTransform: 'none',
                fontWeight: 500,
                color: 'text.secondary',
                fontSize: '0.875rem',
                '&:hover': {
                  backgroundColor: 'action.hover',
                  color: 'text.primary'
                },
                transition: 'all 0.2s ease'
              }}
            >
              {showAdvancedFilters ? 'Hide Advanced Filters' : 'Advanced Filters'}
            </Button>
          </Box>
          
          {/* Advanced Filters - Collapsible */}
          <Collapse in={showAdvancedFilters}>
            <Box sx={{ mt: 4 }}>
              <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600, color: 'text.secondary', mb: 2 }}>
                Price Range: {getPriceRangeLabel(priceRange[0])} - {getPriceRangeLabel(priceRange[1])}
              </Typography>
              <Box sx={{ px: 3, py: 2, bgcolor: 'grey.50', borderRadius: 2, border: '1px solid', borderColor: 'grey.200' }}>
                <Slider
                  value={priceRange}
                  onChange={(event, newValue) => setPriceRange(newValue)}
                  valueLabelDisplay="auto"
                  min={0}
                  max={3}
                  step={1}
                  marks={[
                    { value: 0, label: '$' },
                    { value: 1, label: '$$' },
                    { value: 2, label: '$$$' },
                    { value: 3, label: '$$$$' }
                  ]}
                  sx={{
                    '& .MuiSlider-markLabel': {
                      fontSize: '1rem',
                      fontWeight: 600,
                      color: 'text.primary'
                    },
                    '& .MuiSlider-thumb': {
                      height: 24,
                      width: 24,
                      backgroundColor: 'primary.main',
                      border: '3px solid white',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                      '&:hover': {
                        height: 28,
                        width: 28,
                        boxShadow: '0 6px 16px rgba(0,0,0,0.4)'
                      }
                    },
                    '& .MuiSlider-track': {
                      backgroundColor: 'primary.main',
                      height: 6,
                      borderRadius: 3
                    },
                    '& .MuiSlider-rail': {
                      backgroundColor: 'grey.300',
                      height: 6,
                      borderRadius: 3
                    }
                  }}
                />
              </Box>
            </Box>
          </Collapse>
          
          {/* Clear Filters Button */}
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              onClick={() => {
                setSearchTerm('')
                setSelectedWorkType('all')
                setSelectedRegion('all')
                setPriceRange([0, 3])
                setShowAdvancedFilters(false)
              }}
              sx={{
                borderRadius: 2,
                px: 3,
                py: 1,
                textTransform: 'none',
                fontWeight: 600,
                borderWidth: 2
              }}
            >
              Clear All Filters
            </Button>
          </Box>
        </CardContent>
      </Card>
      
      {/* Contractors Grid */}
      <Grid container spacing={3}>
        {filteredContractors.map((contractor) => (
          <Grid item xs={12} sm={6} md={4} key={contractor.id}>
            <Card sx={{ 
              borderRadius: 3, 
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              '&:hover': { 
                transform: 'translateY(-8px)', 
                boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              },
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer'
            }}>
              <CardContent sx={{ py: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Avatar sx={{ 
                    width: 64, 
                    height: 64, 
                    mr: 3, 
                    bgcolor: 'success.main', 
                    fontSize: '1.5rem',
                    fontWeight: 600,
                    boxShadow: '0 4px 12px rgba(76, 175, 80, 0.3)'
                  }}>
                    {contractor.image}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'text.primary' }}>
                      {contractor.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.4 }}>
                      {contractor.specialty}
                    </Typography>
                  </Box>
                </Box>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                  📍 {contractor.location}
                </Typography>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Chip 
                    label={contractor.priceRange} 
                    color="primary" 
                    sx={{ 
                      fontWeight: 600,
                      px: 2
                    }} 
                  />
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                      ⭐ {contractor.rating}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      ({contractor.reviews} reviews)
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

// My Projects Component
const MyProjects = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
        My Projects 📋
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Manage your ongoing and completed projects
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ 
            borderRadius: 3, 
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            borderColor: 'primary.main',
            borderWidth: 2,
            '&:hover': { 
              transform: 'translateY(-4px)', 
              boxShadow: '0 8px 25px rgba(25, 118, 210, 0.15)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            },
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }}>
            <CardContent sx={{ py: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>Kitchen Renovation</Typography>
                <Chip label="In Progress" color="warning" size="small" sx={{ fontWeight: 600 }} />
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                🏗️ ABC Construction Co. • Started: Jan 15, 2024
              </Typography>
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>Progress</Typography>
                  <Typography variant="body2" color="primary" sx={{ fontWeight: 600 }}>65%</Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={65} 
                  sx={{ 
                    height: 8, 
                    borderRadius: 4,
                    bgcolor: 'grey.200',
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 4,
                      background: 'linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)'
                    }
                  }} 
                />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  💰 Budget: $15,000
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button 
                  variant="outlined" 
                  size="small" 
                  startIcon={<Chat />}
                  sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}
                >
                  Chat
                </Button>
                <Button 
                  variant="contained" 
                  size="small" 
                  startIcon={<Assignment />}
                  sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}
                >
                  View Details
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ 
            borderRadius: 3, 
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            borderColor: 'success.main',
            borderWidth: 2,
            '&:hover': { 
              transform: 'translateY(-4px)', 
              boxShadow: '0 8px 25px rgba(76, 175, 80, 0.15)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            },
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }}>
            <CardContent sx={{ py: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>Bathroom Remodel</Typography>
                <Chip label="Completed" color="success" size="small" sx={{ fontWeight: 600 }} />
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                🏗️ XYZ Renovations • Started: Dec 1, 2023
              </Typography>
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>Progress</Typography>
                  <Typography variant="body2" color="success" sx={{ fontWeight: 600 }}>100%</Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={100} 
                  sx={{ 
                    height: 8, 
                    borderRadius: 4,
                    bgcolor: 'grey.200',
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 4,
                      background: 'linear-gradient(90deg, #4caf50 0%, #8bc34a 100%)'
                    }
                  }} 
                />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  💰 Budget: $8,000
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button 
                  variant="outlined" 
                  size="small" 
                  startIcon={<Chat />}
                  sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}
                >
                  Chat
                </Button>
                <Button 
                  variant="contained" 
                  size="small" 
                  startIcon={<Assignment />}
                  sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}
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

// Chat Interface Component
const ChatInterface = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
        Chat with Contractors 💬
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Communicate with your contractors
      </Typography>
      
      <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
        <CardContent sx={{ py: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ mb: 3, fontWeight: 600, color: 'text.primary' }}>Recent Conversations</Typography>
          <List sx={{ p: 0 }}>
            <ListItem sx={{ 
              borderRadius: 2, 
              mb: 1,
              '&:hover': { 
                bgcolor: 'action.hover',
                transform: 'translateX(4px)',
                transition: 'all 0.2s ease'
              },
              transition: 'all 0.2s ease',
              cursor: 'pointer'
            }}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40 }}>
                  ABC
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                    ABC Construction Co.
                  </Typography>
                }
                secondary={
                  <Typography variant="body2" color="text.secondary">
                    Kitchen renovation updates
                  </Typography>
                }
              />
              <Chip 
                label="2 new" 
                color="primary" 
                size="small" 
                sx={{ fontWeight: 600, bgcolor: 'primary.main' }}
              />
            </ListItem>
            <ListItem sx={{ 
              borderRadius: 2,
              '&:hover': { 
                bgcolor: 'action.hover',
                transform: 'translateX(4px)',
                transition: 'all 0.2s ease'
              },
              transition: 'all 0.2s ease',
              cursor: 'pointer'
            }}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: 'success.main', width: 40, height: 40 }}>
                  XYZ
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                    XYZ Renovations
                  </Typography>
                }
                secondary={
                  <Typography variant="body2" color="text.secondary">
                    Bathroom project completed
                  </Typography>
                }
              />
            </ListItem>
          </List>
          <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
            <Button 
              variant="contained" 
              startIcon={<Chat />}
              sx={{ 
                borderRadius: 2, 
                px: 3, 
                py: 1.5, 
                textTransform: 'none',
                fontWeight: 600,
                boxShadow: '0 4px 14px rgba(76, 175, 80, 0.3)',
                '&:hover': { boxShadow: '0 6px 20px rgba(76, 175, 80, 0.4)' }
              }}
            >
              Start New Chat
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

// My Profile Component
const MyProfile = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
        My Profile 👤
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Manage your personal information and preferences
      </Typography>
      
      <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
        <CardContent sx={{ py: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Avatar sx={{ 
              width: 80, 
              height: 80, 
              mr: 3, 
              bgcolor: 'primary.main',
              fontSize: '2rem',
              fontWeight: 600,
              boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)'
            }}>
              SC
            </Avatar>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 600, color: 'text.primary', mb: 1 }}>
                Sarah Customer
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Premium Customer
              </Typography>
            </Box>
          </Box>
          
          <Typography variant="h6" gutterBottom sx={{ mb: 3, fontWeight: 600, color: 'text.primary' }}>Personal Information</Typography>
          
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6}>
              <Box sx={{ 
                p: 2, 
                borderRadius: 2, 
                bgcolor: 'grey.50',
                border: '1px solid',
                borderColor: 'grey.200'
              }}>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase' }}>
                  Full Name
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.primary' }}>
                  Sarah Customer
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ 
                p: 2, 
                borderRadius: 2, 
                bgcolor: 'grey.50',
                border: '1px solid',
                borderColor: 'grey.200'
              }}>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase' }}>
                  Email Address
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.primary' }}>
                  sarah.customer@email.com
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ 
                p: 2, 
                borderRadius: 2, 
                bgcolor: 'grey.50',
                border: '1px solid',
                borderColor: 'grey.200'
              }}>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase' }}>
                  Phone Number
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.primary' }}>
                  +1 (555) 123-4567
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ 
                p: 2, 
                borderRadius: 2, 
                bgcolor: 'grey.50',
                border: '1px solid',
                borderColor: 'grey.200'
              }}>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase' }}>
                  Location
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.primary' }}>
                  Downtown, City
                </Typography>
              </Box>
            </Grid>
          </Grid>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3, p: 2, bgcolor: 'info.50', borderRadius: 2, border: '1px solid', borderColor: 'info.200' }}>
            📍 123 Main Street, Downtown, City
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button 
              variant="contained" 
              startIcon={<Person />}
              sx={{ 
                borderRadius: 2, 
                px: 3, 
                py: 1.5, 
                textTransform: 'none',
                fontWeight: 600,
                boxShadow: '0 4px 14px rgba(25, 118, 210, 0.3)',
                '&:hover': { boxShadow: '0 6px 20px rgba(25, 118, 210, 0.4)' }
              }}
            >
              Edit Profile
            </Button>
            <Button 
              variant="outlined" 
              startIcon={<Assignment />}
              sx={{ 
                borderRadius: 2, 
                px: 3, 
                py: 1.5, 
                textTransform: 'none',
                fontWeight: 600,
                borderWidth: 2
              }}
            >
              View Projects
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

export default CustomerDashboard
