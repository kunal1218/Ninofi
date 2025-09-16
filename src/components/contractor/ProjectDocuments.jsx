/**
 * Project Documents Component
 * 
 * This component manages all documents relevant to a specific project.
 * Features include document categorization, filtering, and homeowner sharing.
 */

import React, { useState } from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  Alert,
  Tabs,
  Tab,
  Avatar,
  LinearProgress,
  Paper,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Tooltip,
  Badge
} from '@mui/material'
import {
  Folder,
  Search,
  FilterList,
  Upload,
  Person,
  Timeline,
  Image,
  Receipt,
  Description,
  AttachMoney,
  Gavel,
  Business,
  Visibility,
  Download,
  Share,
  CheckCircle,
  Schedule,
  PictureAsPdf,
  InsertDriveFile
} from '@mui/icons-material'
import { format } from 'date-fns'

const ProjectDocuments = ({ selectedProject }) => {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [dateFilter, setDateFilter] = useState('all')

  // Document categories configuration
  const documentCategories = [
    {
      id: 'progress_images',
      name: 'Progress Images',
      icon: <Image />,
      color: 'primary',
      description: 'Photos from milestone checkpoints and project progress'
    },
    {
      id: 'receipts_bills',
      name: 'Receipts/Bills',
      icon: <Receipt />,
      color: 'success',
      description: 'Expense receipts, supplier bills, and purchase orders'
    },
    {
      id: 'contracts',
      name: 'Contracts',
      icon: <Description />,
      color: 'info',
      description: 'Project contracts, agreements, and legal documents'
    },
    {
      id: 'invoices',
      name: 'Invoices',
      icon: <AttachMoney />,
      color: 'warning',
      description: 'Client invoices and payment documentation'
    },
    {
      id: 'permits_licenses',
      name: 'Permits/Licenses',
      icon: <Gavel />,
      color: 'secondary',
      description: 'Building permits, licenses, and regulatory documents'
    }
  ]

  // Mock documents data
  const documents = [
    // Progress Images (from timeline)
    {
      id: 1,
      name: 'Site Preparation Complete',
      category: 'progress_images',
      type: 'image',
      url: '/api/placeholder/400/300',
      size: 245760,
      uploadedBy: 'contractor',
      uploadedAt: new Date('2024-01-28'),
      milestone: 'Site Preparation & Permits',
      description: 'Site cleared and prepared for construction',
      sharedWithHomeowner: true,
      homeownerViewed: true
    },
    {
      id: 2,
      name: 'Foundation Progress',
      category: 'progress_images',
      type: 'image',
      url: '/api/placeholder/400/300',
      size: 189440,
      uploadedBy: 'contractor',
      uploadedAt: new Date('2024-02-12'),
      milestone: 'Foundation Work',
      description: 'Foundation concrete pour completed',
      sharedWithHomeowner: true,
      homeownerViewed: true
    },
    // Receipts
    {
      id: 3,
      name: 'Lumber Purchase Receipt',
      category: 'receipts_bills',
      type: 'pdf',
      url: '/api/documents/receipt_lumber.pdf',
      size: 85420,
      uploadedBy: 'contractor',
      uploadedAt: new Date('2024-02-10'),
      milestone: 'Framing & Structure',
      description: 'Lumber materials for framing',
      amount: 3250,
      vendor: 'ABC Lumber Co',
      sharedWithHomeowner: true,
      homeownerViewed: true
    },
    // Contracts
    {
      id: 4,
      name: 'Main Construction Contract',
      category: 'contracts',
      type: 'pdf',
      url: '/api/documents/main_contract.pdf',
      size: 456789,
      uploadedBy: 'contractor',
      uploadedAt: new Date('2024-01-15'),
      milestone: null,
      description: 'Primary construction agreement',
      sharedWithHomeowner: true,
      homeownerViewed: true
    },
    // Permits
    {
      id: 5,
      name: 'Building Permit',
      category: 'permits_licenses',
      type: 'pdf',
      url: '/api/documents/building_permit.pdf',
      size: 234560,
      uploadedBy: 'contractor',
      uploadedAt: new Date('2024-01-20'),
      milestone: 'Site Preparation & Permits',
      description: 'City building permit approval',
      permitNumber: 'BP-2024-001234',
      sharedWithHomeowner: true,
      homeownerViewed: true
    }
  ]

  // Get project data with homeowner info
  const projectData = selectedProject ? {
    ...selectedProject,
    homeowner: selectedProject.homeowner || {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      hasAccount: true
    }
  } : null

  // Filter documents
  const getFilteredDocuments = () => {
    let filtered = documents

    if (activeCategory !== 'all') {
      filtered = filtered.filter(doc => doc.category === activeCategory)
    }

    if (searchQuery) {
      filtered = filtered.filter(doc =>
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    return filtered
  }

  // Get documents by category
  const getDocumentsByCategory = (categoryId) => {
    return documents.filter(doc => doc.category === categoryId)
  }

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
  }

  // Get file type icon
  const getFileTypeIcon = (type) => {
    switch (type) {
      case 'image': return <Image color="primary" />
      case 'pdf': return <PictureAsPdf color="error" />
      case 'doc': return <Description color="info" />
      default: return <InsertDriveFile color="action" />
    }
  }

  if (!projectData) {
    return (
      <Card>
        <CardContent>
          <Alert severity="info">
            Please select a project to view its documents.
          </Alert>
        </CardContent>
      </Card>
    )
  }

  const filteredDocuments = getFilteredDocuments()
  const totalDocuments = documents.length
  const totalSize = documents.reduce((total, doc) => total + doc.size, 0)
  const unviewedByHomeowner = documents.filter(doc => doc.sharedWithHomeowner && !doc.homeownerViewed).length

  return (
    <Box>
      {/* Header */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
                Project Documents
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                {projectData.name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                <Avatar sx={{ mr: 2, bgcolor: 'secondary.main' }}>
                  <Person />
                </Avatar>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Shared with: {projectData.homeowner.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {projectData.homeowner.email}
                  </Typography>
                </Box>
                <Chip
                  label={projectData.homeowner.hasAccount ? 'Has Account' : 'Invite Only'}
                  color={projectData.homeowner.hasAccount ? 'success' : 'warning'}
                  size="small"
                  sx={{ ml: 2 }}
                />
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" color="primary.main" sx={{ fontWeight: 600 }}>
                      {totalDocuments}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Files
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" color="info.main" sx={{ fontWeight: 600 }}>
                      {formatFileSize(totalSize)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Size
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" color="warning.main" sx={{ fontWeight: 600 }}>
                      {unviewedByHomeowner}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Unviewed
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Category</InputLabel>
                <Select
                  value={activeCategory}
                  onChange={(e) => setActiveCategory(e.target.value)}
                  label="Category"
                >
                  <MenuItem value="all">All Categories</MenuItem>
                  {documentCategories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Date Range</InputLabel>
                <Select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  label="Date Range"
                >
                  <MenuItem value="all">All Time</MenuItem>
                  <MenuItem value="today">Today</MenuItem>
                  <MenuItem value="week">Last Week</MenuItem>
                  <MenuItem value="month">Last Month</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Button
                variant="contained"
                fullWidth
                startIcon={<Upload />}
                onClick={() => alert('Upload functionality coming soon!')}
              >
                Upload
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Category Tabs */}
      <Card sx={{ mb: 3 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={activeCategory} 
            onChange={(e, value) => setActiveCategory(value)}
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="All" value="all" />
            {documentCategories.map((category) => {
              const categoryCount = getDocumentsByCategory(category.id).length
              return (
                <Tab
                  key={category.id}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {category.icon}
                      {category.name}
                      {categoryCount > 0 && (
                        <Chip 
                          label={categoryCount} 
                          size="small" 
                          color={category.color}
                        />
                      )}
                    </Box>
                  }
                  value={category.id}
                />
              )
            })}
          </Tabs>
        </Box>
      </Card>

      {/* Documents Display */}
      <Card>
        <CardContent>
          {filteredDocuments.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Folder sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No Documents Found
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {searchQuery 
                  ? `No documents match "${searchQuery}"`
                  : 'Upload your first document to get started'
                }
              </Typography>
              <Button
                variant="contained"
                startIcon={<Upload />}
                onClick={() => alert('Upload functionality coming soon!')}
              >
                Upload Document
              </Button>
            </Box>
          ) : (
            <Grid container spacing={2}>
              {filteredDocuments.map((document) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={document.id}>
                  <Paper
                    elevation={2}
                    sx={{
                      p: 2,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      cursor: 'pointer',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: 4
                      }
                    }}
                    onClick={() => alert(`Viewing: ${document.name}`)}
                  >
                    {/* File Type Icon/Preview */}
                    <Box sx={{ textAlign: 'center', mb: 2 }}>
                      {document.type === 'image' ? (
                        <Box
                          sx={{
                            width: '100%',
                            height: 120,
                            backgroundImage: `url(${document.url})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            borderRadius: 1,
                            position: 'relative'
                          }}
                        >
                          {!document.homeownerViewed && document.sharedWithHomeowner && (
                            <Badge
                              badgeContent="New"
                              color="warning"
                              sx={{
                                position: 'absolute',
                                top: 8,
                                right: 8
                              }}
                            />
                          )}
                        </Box>
                      ) : (
                        <Box sx={{ py: 2 }}>
                          <Badge
                            badgeContent={!document.homeownerViewed && document.sharedWithHomeowner ? "New" : 0}
                            color="warning"
                          >
                            {getFileTypeIcon(document.type)}
                          </Badge>
                        </Box>
                      )}
                    </Box>

                    {/* Document Info */}
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                        {document.name}
                      </Typography>
                      
                      {document.description && (
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          {document.description.length > 60 
                            ? `${document.description.substring(0, 60)}...`
                            : document.description
                          }
                        </Typography>
                      )}

                      {/* Milestone Connection */}
                      {document.milestone && (
                        <Chip
                          label={document.milestone}
                          size="small"
                          variant="outlined"
                          sx={{ mb: 1 }}
                        />
                      )}

                      {/* Document Metadata */}
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="caption" color="text.secondary">
                          {formatFileSize(document.size)}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {format(document.uploadedAt, 'MMM d')}
                        </Typography>
                      </Box>

                      {/* Amount (for financial documents) */}
                      {document.amount && (
                        <Typography variant="body2" color="success.main" sx={{ fontWeight: 600 }}>
                          ${document.amount.toLocaleString()}
                        </Typography>
                      )}

                      {/* Vendor */}
                      {document.vendor && (
                        <Typography variant="caption" color="text.secondary">
                          {document.vendor}
                        </Typography>
                      )}
                    </Box>

                    {/* Status and Actions */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Tooltip title={document.sharedWithHomeowner ? 'Shared with homeowner' : 'Not shared'}>
                          <Person 
                            color={document.sharedWithHomeowner ? 'primary' : 'disabled'} 
                            fontSize="small"
                          />
                        </Tooltip>
                        {document.sharedWithHomeowner && (
                          <Tooltip title={document.homeownerViewed ? 'Viewed by homeowner' : 'Not viewed yet'}>
                            {document.homeownerViewed ? (
                              <CheckCircle color="success" fontSize="small" sx={{ ml: 0.5 }} />
                            ) : (
                              <Schedule color="warning" fontSize="small" sx={{ ml: 0.5 }} />
                            )}
                          </Tooltip>
                        )}
                      </Box>

                      <Box>
                        <Tooltip title="View">
                          <IconButton size="small">
                            <Visibility fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Download">
                          <IconButton size="small">
                            <Download fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          )}
        </CardContent>
      </Card>

      {/* Category Overview */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Document Categories
          </Typography>
          <Grid container spacing={2}>
            {documentCategories.map((category) => {
              const categoryDocs = getDocumentsByCategory(category.id)
              const categorySize = categoryDocs.reduce((total, doc) => total + doc.size, 0)
              
              return (
                <Grid item xs={12} sm={6} md={4} key={category.id}>
                  <Paper
                    elevation={1}
                    sx={{
                      p: 2,
                      cursor: 'pointer',
                      '&:hover': { elevation: 3 }
                    }}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Avatar sx={{ mr: 2, bgcolor: `${category.color}.main` }}>
                        {category.icon}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          {category.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {categoryDocs.length} files • {formatFileSize(categorySize)}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      {category.description}
                    </Typography>
                  </Paper>
                </Grid>
              )
            })}
          </Grid>
        </CardContent>
      </Card>
    </Box>
  )
}

export default ProjectDocuments