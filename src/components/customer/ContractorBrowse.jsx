import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Grid,
  Rating,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  IconButton,
  InputAdornment
} from '@mui/material';
import {
  Search,
  LocationOn,
  Business,
  AttachMoney,
  Star,
  Phone,
  Email,
  Message,
  Close
} from '@mui/icons-material';

// Mock data for local contractors
const mockContractors = [
  {
    id: 1,
    name: "ABC Construction Co.",
    workType: "construction",
    region: "downtown",
    priceRange: "high",
    rating: 4.8,
    reviewCount: 127,
    hourlyRate: 85,
    description: "Specializing in commercial and residential construction projects. Licensed and insured with 15+ years of experience.",
    services: ["New Construction", "Renovations", "Structural Work", "Project Management"],
    contact: {
      phone: "(555) 123-4567",
      email: "info@abcconstruction.com"
    },
    availability: "Available in 2 weeks",
    image: "🏗️"
  },
  {
    id: 2,
    name: "PlumbPro Services",
    workType: "plumbing",
    region: "westside",
    priceRange: "medium",
    rating: 4.6,
    reviewCount: 89,
    hourlyRate: 65,
    description: "Professional plumbing services for residential and commercial properties. Emergency services available 24/7.",
    services: ["Pipe Installation", "Leak Repair", "Drain Cleaning", "Water Heater Installation"],
    contact: {
      phone: "(555) 234-5678",
      email: "service@plumbpro.com"
    },
    availability: "Available next week",
    image: "🔧"
  },
  {
    id: 3,
    name: "Elite Electric",
    workType: "electrical",
    region: "eastside",
    priceRange: "high",
    rating: 4.9,
    reviewCount: 156,
    hourlyRate: 90,
    description: "Certified electricians providing top-quality electrical work for homes and businesses.",
    services: ["Wiring", "Panel Upgrades", "Lighting Installation", "Safety Inspections"],
    contact: {
      phone: "(555) 345-6789",
      email: "info@eliteelectric.com"
    },
    availability: "Available in 1 week",
    image: "⚡"
  },
  {
    id: 4,
    name: "Green Thumb Landscaping",
    workType: "landscaping",
    region: "northside",
    priceRange: "medium",
    rating: 4.4,
    reviewCount: 73,
    hourlyRate: 55,
    description: "Creating beautiful outdoor spaces with sustainable landscaping practices and native plants.",
    services: ["Garden Design", "Lawn Maintenance", "Tree Planting", "Irrigation Systems"],
    contact: {
      phone: "(555) 456-7890",
      email: "hello@greenthumb.com"
    },
    availability: "Available this week",
    image: "🌿"
  },
  {
    id: 5,
    name: "Interior Design Studio",
    workType: "interior-design",
    region: "downtown",
    priceRange: "high",
    rating: 4.7,
    reviewCount: 94,
    hourlyRate: 120,
    description: "Full-service interior design studio specializing in modern and contemporary home transformations.",
    services: ["Space Planning", "Color Consultation", "Furniture Selection", "Project Coordination"],
    contact: {
      phone: "(555) 567-8901",
      email: "design@interiorstudio.com"
    },
    availability: "Available in 3 weeks",
    image: "🎨"
  },
  {
    id: 6,
    name: "Quick Fix Handyman",
    workType: "handyman",
    region: "southside",
    priceRange: "low",
    rating: 4.2,
    reviewCount: 67,
    hourlyRate: 45,
    description: "Reliable handyman services for all your home repair and maintenance needs.",
    services: ["Minor Repairs", "Installation", "Maintenance", "Small Projects"],
    contact: {
      phone: "(555) 678-9012",
      email: "service@quickfix.com"
    },
    availability: "Available today",
    image: "🔨"
  },
  {
    id: 7,
    name: "Roof Masters",
    workType: "roofing",
    region: "westside",
    priceRange: "high",
    rating: 4.5,
    reviewCount: 112,
    hourlyRate: 75,
    description: "Expert roofing contractors with decades of experience in residential and commercial roofing.",
    services: ["Roof Installation", "Repairs", "Maintenance", "Inspections"],
    contact: {
      phone: "(555) 789-0123",
      email: "info@roofmasters.com"
    },
    availability: "Available in 2 weeks",
    image: "🏠"
  },
  {
    id: 8,
    name: "HVAC Solutions",
    workType: "hvac",
    region: "eastside",
    priceRange: "medium",
    rating: 4.3,
    reviewCount: 81,
    hourlyRate: 70,
    description: "Professional HVAC services including installation, repair, and maintenance of heating and cooling systems.",
    services: ["AC Installation", "Heating Repair", "Maintenance", "Emergency Service"],
    contact: {
      phone: "(555) 890-1234",
      email: "service@hvac-solutions.com"
    },
    availability: "Available next week",
    image: "❄️"
  }
];

const workTypes = [
  { value: "construction", label: "Construction" },
  { value: "plumbing", label: "Plumbing" },
  { value: "electrical", label: "Electrical" },
  { value: "landscaping", label: "Landscaping" },
  { value: "interior-design", label: "Interior Design" },
  { value: "handyman", label: "Handyman" },
  { value: "roofing", label: "Roofing" },
  { value: "hvac", label: "HVAC" }
];

const regions = [
  { value: "downtown", label: "Downtown" },
  { value: "westside", label: "Westside" },
  { value: "eastside", label: "Eastside" },
  { value: "northside", label: "Northside" },
  { value: "southside", label: "Southside" }
];

const priceRanges = [
  { value: "low", label: "Budget ($40-60/hr)", min: 40, max: 60 },
  { value: "medium", label: "Standard ($60-80/hr)", min: 60, max: 80 },
  { value: "high", label: "Premium ($80+/hr)", min: 80, max: 200 }
];

const ContractorBrowse = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWorkType, setSelectedWorkType] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [priceRange, setPriceRange] = useState([40, 200]);
  const [selectedContractor, setSelectedContractor] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredContractors = useMemo(() => {
    return mockContractors.filter(contractor => {
      const matchesSearch = contractor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           contractor.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesWorkType = !selectedWorkType || contractor.workType === selectedWorkType;
      
      const matchesRegion = !selectedRegion || contractor.region === selectedRegion;
      
      const matchesPriceRange = !selectedPriceRange || contractor.priceRange === selectedPriceRange;
      
      const matchesPriceSlider = contractor.hourlyRate >= priceRange[0] && contractor.hourlyRate <= priceRange[1];
      
      return matchesSearch && matchesWorkType && matchesRegion && matchesPriceRange && matchesPriceSlider;
    });
  }, [searchTerm, selectedWorkType, selectedRegion, selectedPriceRange, priceRange]);

  const handleContractorClick = (contractor) => {
    setSelectedContractor(contractor);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedContractor(null);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedWorkType('');
    setSelectedRegion('');
    setSelectedPriceRange('');
    setPriceRange([40, 200]);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
        Browse Local Contractors
      </Typography>
      
      {/* Search and Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={3}>
            {/* Search Bar */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search contractors by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            
            {/* Work Type Filter */}
            <Grid item xs={12} md={2}>
              <FormControl fullWidth>
                <InputLabel>Work Type</InputLabel>
                <Select
                  value={selectedWorkType}
                  label="Work Type"
                  onChange={(e) => setSelectedWorkType(e.target.value)}
                >
                  <MenuItem value="">All Types</MenuItem>
                  {workTypes.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            {/* Region Filter */}
            <Grid item xs={12} md={2}>
              <FormControl fullWidth>
                <InputLabel>Region</InputLabel>
                <Select
                  value={selectedRegion}
                  label="Region"
                  onChange={(e) => setSelectedRegion(e.target.value)}
                >
                  <MenuItem value="">All Regions</MenuItem>
                  {regions.map((region) => (
                    <MenuItem key={region.value} value={region.value}>
                      {region.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            {/* Price Range Filter */}
            <Grid item xs={12} md={2}>
              <FormControl fullWidth>
                <InputLabel>Price Range</InputLabel>
                <Select
                  value={selectedPriceRange}
                  label="Price Range"
                  onChange={(e) => setSelectedPriceRange(e.target.value)}
                >
                  <MenuItem value="">All Prices</MenuItem>
                  {priceRanges.map((range) => (
                    <MenuItem key={range.value} value={range.value}>
                      {range.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          
          {/* Price Slider */}
          <Box sx={{ mt: 3 }}>
            <Typography gutterBottom>
              Hourly Rate: ${priceRange[0]} - ${priceRange[1]}
            </Typography>
            <Slider
              value={priceRange}
              onChange={(event, newValue) => setPriceRange(newValue)}
              valueLabelDisplay="auto"
              min={40}
              max={200}
              step={5}
            />
          </Box>
          
          {/* Clear Filters Button */}
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              {filteredContractors.length} contractors found
            </Typography>
            <Button variant="outlined" onClick={clearFilters}>
              Clear All Filters
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Contractors Grid */}
      <Grid container spacing={3}>
        {filteredContractors.map((contractor) => (
          <Grid item xs={12} sm={6} md={4} key={contractor.id}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                cursor: 'pointer',
                '&:hover': { boxShadow: 4 }
              }}
              onClick={() => handleContractorClick(contractor)}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ mr: 2, fontSize: '2rem', width: 60, height: 60 }}>
                    {contractor.image}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      {contractor.name}
                    </Typography>
                    <Chip 
                      label={workTypes.find(t => t.value === contractor.workType)?.label}
                      size="small"
                      color="primary"
                      sx={{ mb: 1 }}
                    />
                  </Box>
                </Box>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {contractor.description.substring(0, 100)}...
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Rating value={contractor.rating} precision={0.1} size="small" readOnly />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    {contractor.rating} ({contractor.reviewCount} reviews)
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <LocationOn fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    {regions.find(r => r.value === contractor.region)?.label}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <AttachMoney fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    ${contractor.hourlyRate}/hr
                  </Typography>
                </Box>
              </CardContent>
              
              <CardActions>
                <Button 
                  size="small" 
                  startIcon={<Message />}
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle chat functionality
                  }}
                >
                  Message
                </Button>
                <Button 
                  size="small" 
                  variant="outlined"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle project start
                  }}
                >
                  Start Project
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Contractor Detail Dialog */}
      <Dialog 
        open={dialogOpen} 
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        {selectedContractor && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ mr: 2, fontSize: '2rem', width: 80, height: 80 }}>
                    {selectedContractor.image}
                  </Avatar>
                  <Box>
                    <Typography variant="h5">{selectedContractor.name}</Typography>
                    <Chip 
                      label={workTypes.find(t => t.value === selectedContractor.workType)?.label}
                      color="primary"
                      sx={{ mt: 1 }}
                    />
                  </Box>
                </Box>
                <IconButton onClick={handleCloseDialog}>
                  <Close />
                </IconButton>
              </Box>
            </DialogTitle>
            
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                  <Typography variant="h6" gutterBottom>About</Typography>
                  <Typography variant="body1" paragraph>
                    {selectedContractor.description}
                  </Typography>
                  
                  <Typography variant="h6" gutterBottom>Services</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    {selectedContractor.services.map((service, index) => (
                      <Chip key={index} label={service} variant="outlined" />
                    ))}
                  </Box>
                  
                  <Typography variant="h6" gutterBottom>Reviews</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Rating value={selectedContractor.rating} precision={0.1} readOnly />
                    <Typography variant="body1" sx={{ ml: 1 }}>
                      {selectedContractor.rating} out of 5
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Based on {selectedContractor.reviewCount} reviews
                  </Typography>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>Contact Information</Typography>
                      
                      <List>
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar sx={{ bgcolor: 'primary.main' }}>
                              <Phone />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary="Phone"
                            secondary={selectedContractor.contact.phone}
                          />
                        </ListItem>
                        
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar sx={{ bgcolor: 'success.main' }}>
                              <Email />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary="Email"
                            secondary={selectedContractor.contact.email}
                          />
                        </ListItem>
                      </List>
                      
                      <Divider sx={{ my: 2 }} />
                      
                      <Typography variant="h6" gutterBottom>Project Details</Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        <strong>Hourly Rate:</strong> ${selectedContractor.hourlyRate}/hr
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        <strong>Availability:</strong> {selectedContractor.availability}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Region:</strong> {regions.find(r => r.value === selectedContractor.region)?.label}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </DialogContent>
            
            <DialogActions sx={{ p: 3 }}>
              <Button variant="outlined" onClick={handleCloseDialog}>
                Close
              </Button>
              <Button 
                variant="contained" 
                startIcon={<Message />}
                onClick={() => {
                  // Handle chat functionality
                  handleCloseDialog();
                }}
              >
                Start Chat
              </Button>
              <Button 
                variant="contained" 
                color="success"
                onClick={() => {
                  // Handle project start
                  handleCloseDialog();
                }}
              >
                Start Project
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default ContractorBrowse;
