import React, { useState } from 'react'
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Chip,
  Rating,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  InputAdornment,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Badge
} from '@mui/material'
import {
  Search,
  FilterList,
  Chat,
  Favorite,
  FavoriteBorder,
  LocationOn,
  Business,
  Star,
  Phone,
  Email,
  Work,
  AttachMoney,
  Assignment
} from '@mui/icons-material'

const ContractorBrowse = () => {
  const [filters, setFilters] = useState({
    search: '',
    serviceType: '',
    region: '',
    priceRange: [0, 100000],
    rating: 0
  })
  const [selectedContractor, setSelectedContractor] = useState(null)
  const [showFilters, setShowFilters] = useState(false)
  const [favorites, setFavorites] = useState([1, 3])

  // Mock data - replace with actual API calls
  const contractors = [
    {
      id: 1,
      name: 'ABC Construction Co.',
      specialty: 'Interior Design & Renovation',
      rating: 4.8,
      reviews: 127,
      location: 'Downtown, City',
      priceRange: '$$$',
      minPrice: 5000,
      maxPrice: 50000,
      services: ['Interior Design', 'Kitchen Renovation', 'Bathroom Remodel', 'Home Addition'],
      experience: '15+ years',
      completedProjects: 234,
      responseTime: '2 hours',
      image: 'ABC',
      description: 'Premium construction company specializing in high-end interior renovations and custom home designs.',
      contact: {
        phone: '+1 (555) 123-4567',
        email: 'info@abcconstruction.com',
        website: 'www.abcconstruction.com'
      },
      recentReviews: [
        { user: 'John D.', rating: 5, comment: 'Excellent work on our kitchen renovation!', date: '2024-01-10' },
        { user: 'Sarah M.', rating: 5, comment: 'Professional team, great communication.', date: '2024-01-05' }
      ]
    },
    {
      id: 2,
      name: 'XYZ Renovations',
      specialty: 'Kitchen & Bathroom',
      rating: 4.6,
      reviews: 89,
      location: 'Midtown, City',
      priceRange: '$$',
      minPrice: 3000,
      maxPrice: 25000,
      services: ['Kitchen Remodel', 'Bathroom Renovation', 'Cabinet Installation', 'Tile Work'],
      experience: '8+ years',
      completedProjects: 156,
      responseTime: '4 hours',
      image: 'XYZ',
      description: 'Affordable kitchen and bathroom renovations with quality craftsmanship and competitive pricing.',
      contact: {
        phone: '+1 (555) 234-5678',
        email: 'contact@xyzrenovations.com',
        website: 'www.xyzrenovations.com'
      },
      recentReviews: [
        { user: 'Mike R.', rating: 4, comment: 'Good work, completed on time.', date: '2024-01-08' },
        { user: 'Lisa K.', rating: 5, comment: 'Very satisfied with our new kitchen!', date: '2024-01-02' }
      ]
    },
    {
      id: 3,
      name: 'Outdoor Specialists',
      specialty: 'Landscaping & Decks',
      rating: 4.9,
      reviews: 156,
      location: 'Suburbs, City',
      priceRange: '$$$',
      minPrice: 8000,
      maxPrice: 75000,
      services: ['Landscaping', 'Deck Construction', 'Patio Design', 'Outdoor Lighting'],
      experience: '20+ years',
      completedProjects: 312,
      responseTime: '1 hour',
      image: 'OS',
      description: 'Expert outdoor construction and landscaping services for residential and commercial properties.',
      contact: {
        phone: '+1 (555) 345-6789',
        email: 'info@outdoorspecialists.com',
        website: 'www.outdoorspecialists.com'
      },
      recentReviews: [
        { user: 'David L.', rating: 5, comment: 'Amazing deck transformation!', date: '2024-01-12' },
        { user: 'Emma W.', rating: 5, comment: 'Professional landscaping team.', date: '2024-01-07' }
      ]
    },
    {
      id: 4,
      name: 'Quick Fix Solutions',
      specialty: 'General Repairs & Maintenance',
      rating: 4.3,
      reviews: 67,
      location: 'Westside, City',
      priceRange: '$',
      minPrice: 100,
      maxPrice: 5000,
      services: ['Plumbing', 'Electrical', 'HVAC', 'General Repairs'],
      experience: '5+ years',
      completedProjects: 89,
      responseTime: '6 hours',
      image: 'QF',
      description: 'Fast and reliable repair services for urgent home maintenance needs.',
      contact: {
        phone: '+1 (555) 456-7890',
        email: 'service@quickfixsolutions.com',
        website: 'www.quickfixsolutions.com'
      },
      recentReviews: [
        { user: 'Tom B.', rating: 4, comment: 'Quick response, fixed our plumbing issue.', date: '2024-01-09' },
        { user: 'Rachel S.', rating: 4, comment: 'Affordable and efficient service.', date: '2024-01-03' }
      ]
    }
  ]

  const serviceTypes = ['Interior Design', 'Kitchen Renovation', 'Bathroom Remodel', 'Home Addition', 'Landscaping', 'Deck Construction', 'General Repairs', 'Plumbing', 'Electrical', 'HVAC']
  const regions = ['Downtown', 'Midtown', 'Suburbs', 'Westside', 'Eastside', 'Northside', 'Southside']

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const toggleFavorite = (contractorId) => {
    setFavorites(prev => 
      prev.includes(contractorId) 
        ? prev.filter(id => id !== contractorId)
        : [...prev, contractorId]
    )
  }

  const filteredContractors = contractors.filter(contractor => {
    const matchesSearch = contractor.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                         contractor.specialty.toLowerCase().includes(filters.search.toLowerCase())
    const matchesService = !filters.serviceType || contractor.services.includes(filters.serviceType)
    const matchesRegion = !filters.region || contractor.location.includes(filters.region)
    const matchesPrice = contractor.minPrice >= filters.priceRange[0] && contractor.maxPrice <= filters.priceRange[1]
    const matchesRating = contractor.rating >= filters.rating

    return matchesSearch && matchesService && matchesRegion && matchesPrice && matchesRating
  })

  const getPriceRangeColor = (range) => {
    switch (range) {
      case '$': return 'success'
      case '$$': return 'warning'
      case '$$$': return 'error'
      default: return 'default'
    }
  }

  const formatPriceRange = (min, max) => {
    if (max >= 1000) {
      return `$${(min/1000).toFixed(0)}k - $${(max/1000).toFixed(0)}k`
    }
    return `$${min.toLocaleString()} - $${max.toLocaleString()}`
  }

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
            Browse Contractors
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Find the perfect contractor for your project
          </Typography>
        </Box>
        <Button
          variant="outlined"
          startIcon={<FilterList />}
          onClick={() => setShowFilters(!showFilters)}
          sx={{ px: 3, py: 1.5 }}
        >
          {showFilters ? 'Hide' : 'Show'} Filters
        </Button>
      </Box>

      {/* Search and Filters */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Search contractors or services"
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Service Type</InputLabel>
                <Select
                  value={filters.serviceType}
                  label="Service Type"
                  onChange={(e) => handleFilterChange('serviceType', e.target.value)}
                >
                  <MenuItem value="">All Services</MenuItem>
                  {serviceTypes.map((service) => (
                    <MenuItem key={service} value={service}>{service}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Region</InputLabel>
                <Select
                  value={filters.region}
                  label="Region"
                  onChange={(e) => handleFilterChange('region', e.target.value)}
                >
                  <MenuItem value="">All Regions</MenuItem>
                  {regions.map((region) => (
                    <MenuItem key={region} value={region}>{region}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box>
                <Typography gutterBottom>Price Range: ${filters.priceRange[0].toLocaleString()} - ${filters.priceRange[1].toLocaleString()}</Typography>
                <Slider
                  value={filters.priceRange}
                  onChange={(event, newValue) => handleFilterChange('priceRange', newValue)}
                  valueLabelDisplay="auto"
                  min={0}
                  max={100000}
                  step={1000}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box>
                <Typography gutterBottom>Minimum Rating: {filters.rating}+</Typography>
                <Slider
                  value={filters.rating}
                  onChange={(event, newValue) => handleFilterChange('rating', newValue)}
                  valueLabelDisplay="auto"
                  min={0}
                  max={5}
                  step={0.5}
                  marks
                />
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Results Count */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" color="text.secondary">
          Found {filteredContractors.length} contractors
        </Typography>
      </Box>

      {/* Contractors Grid */}
      <Grid container spacing={3}>
        {filteredContractors.map((contractor) => (
          <Grid item xs={12} md={6} lg={4} key={contractor.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Avatar sx={{ width: 60, height: 60, bgcolor: 'primary.main', fontSize: '1.5rem' }}>
                    {contractor.image}
                  </Avatar>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton
                      size="small"
                      onClick={() => toggleFavorite(contractor.id)}
                      color={favorites.includes(contractor.id) ? 'error' : 'default'}
                    >
                      {favorites.includes(contractor.id) ? <Favorite /> : <FavoriteBorder />}
                    </IconButton>
                  </Box>
                </Box>

                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  {contractor.name}
                </Typography>

                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {contractor.specialty}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <Rating value={contractor.rating} size="small" readOnly />
                  <Typography variant="body2" color="text.secondary">
                    {contractor.rating} ({contractor.reviews} reviews)
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <LocationOn fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    {contractor.location}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <AttachMoney fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    {formatPriceRange(contractor.minPrice, contractor.maxPrice)}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <Work fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    {contractor.experience} • {contractor.completedProjects} projects
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                  {contractor.services.slice(0, 3).map((service, index) => (
                    <Chip
                      key={index}
                      label={service}
                      size="small"
                      variant="outlined"
                      color="primary"
                    />
                  ))}
                  {contractor.services.length > 3 && (
                    <Chip
                      label={`+${contractor.services.length - 3} more`}
                      size="small"
                      variant="outlined"
                    />
                  )}
                </Box>

                <Box sx={{ display: 'flex', gap: 1, mt: 'auto' }}>
                  <Button
                    variant="contained"
                    startIcon={<Chat />}
                    fullWidth
                    onClick={() => setSelectedContractor(contractor)}
                  >
                    View Details
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Contractor Detail Dialog */}
      <Dialog 
        open={!!selectedContractor} 
        onClose={() => setSelectedContractor(null)} 
        maxWidth="md" 
        fullWidth
      >
        {selectedContractor && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ width: 50, height: 50, bgcolor: 'primary.main' }}>
                  {selectedContractor.image}
                </Avatar>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    {selectedContractor.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedContractor.specialty}
                  </Typography>
                </Box>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>About</Typography>
                  <Typography variant="body2" paragraph>
                    {selectedContractor.description}
                  </Typography>
                  
                  <Typography variant="h6" gutterBottom>Services</Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                    {selectedContractor.services.map((service, index) => (
                      <Chip key={index} label={service} size="small" />
                    ))}
                  </Box>

                  <Typography variant="h6" gutterBottom>Contact</Typography>
                  <List dense>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemAvatar>
                        <Phone color="primary" />
                      </ListItemAvatar>
                      <ListItemText primary={selectedContractor.contact.phone} />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemAvatar>
                        <Email color="primary" />
                      </ListItemAvatar>
                      <ListItemText primary={selectedContractor.contact.email} />
                    </ListItem>
                  </List>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>Recent Reviews</Typography>
                  <List dense>
                    {selectedContractor.recentReviews.map((review, index) => (
                      <ListItem key={index} sx={{ px: 0 }}>
                        <ListItemAvatar>
                          <Rating value={review.rating} size="small" readOnly />
                        </ListItemAvatar>
                        <ListItemText
                          primary={review.comment}
                          secondary={`${review.user} • ${review.date}`}
                        />
                      </ListItem>
                    ))}
                  </List>

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="h6" gutterBottom>Quick Actions</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Button
                      variant="contained"
                      startIcon={<Chat />}
                      fullWidth
                    >
                      Start Chat
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<Assignment />}
                      fullWidth
                    >
                      Start Project
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<Phone />}
                      fullWidth
                    >
                      Call Now
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setSelectedContractor(null)}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  )
}

export default ContractorBrowse
