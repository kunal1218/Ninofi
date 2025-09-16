/**
 * Document Category Component
 * 
 * This component displays documents grouped by category with clear headers.
 * Features include:
 * - Category header with statistics
 * - Document grid layout
 * - File type indicators
 * - Homeowner viewing status
 * - Quick actions (view, download, share)
 */

import React from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  IconButton,
  Avatar,
  Tooltip,
  Paper,
  Badge
} from '@mui/material'
import {
  Visibility,
  Download,
  Share,
  Image,
  PictureAsPdf,
  Description,
  InsertDriveFile,
  CheckCircle,
  Schedule,
  Person
} from '@mui/icons-material'
import { format } from 'date-fns'

const DocumentCategory = ({ 
  category, 
  documents, 
  onDocumentView, 
  searchQuery = '',
  showHeader = true 
}) => {
  // Filter documents by search query if provided
  const filteredDocs = searchQuery 
    ? documents.filter(doc =>
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : documents

  // Get file type icon
  const getFileTypeIcon = (type, size = 'medium') => {
    switch (type) {
      case 'image':
        return <Image color="primary" fontSize={size} />
      case 'pdf':
        return <PictureAsPdf color="error" fontSize={size} />
      case 'doc':
      case 'docx':
        return <Description color="info" fontSize={size} />
      default:
        return <InsertDriveFile color="action" fontSize={size} />
    }
  }

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
  }

  // Get category statistics
  const totalSize = documents.reduce((sum, doc) => sum + doc.size, 0)
  const unviewedCount = documents.filter(doc => doc.sharedWithHomeowner && !doc.homeownerViewed).length

  if (filteredDocs.length === 0) {
    return null
  }

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        {/* Category Header */}
        {showHeader && (
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ mr: 2, bgcolor: `${category.color}.main` }}>
                  {category.icon}
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {category.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {category.description}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="h6" color="primary.main">
                  {documents.length} files
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {formatFileSize(totalSize)}
                </Typography>
                {unviewedCount > 0 && (
                  <Chip
                    label={`${unviewedCount} unviewed`}
                    color="warning"
                    size="small"
                    sx={{ mt: 1 }}
                  />
                )}
              </Box>
            </Box>
          </Box>
        )}

        {/* Documents Grid */}
        <Grid container spacing={2}>
          {filteredDocs.map((document) => (
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
                onClick={() => onDocumentView(document)}
              >
                {/* File Type Icon */}
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
                        {getFileTypeIcon(document.type, 'large')}
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
                      {format(document.uploadedAt, 'MMM d, yyyy')}
                    </Typography>
                  </Box>

                  {/* Amount (for financial documents) */}
                  {document.amount && (
                    <Typography variant="body2" color="success.main" sx={{ fontWeight: 600 }}>
                      ${document.amount.toLocaleString()}
                    </Typography>
                  )}

                  {/* Vendor (for receipts/bills) */}
                  {document.vendor && (
                    <Typography variant="caption" color="text.secondary">
                      Vendor: {document.vendor}
                    </Typography>
                  )}

                  {/* Permit Number (for permits) */}
                  {document.permitNumber && (
                    <Typography variant="caption" color="text.secondary">
                      Permit: {document.permitNumber}
                    </Typography>
                  )}
                </Box>

                {/* Status Indicators */}
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

                  {/* Quick Actions */}
                  <Box>
                    <Tooltip title="View Document">
                      <IconButton 
                        size="small" 
                        onClick={(e) => {
                          e.stopPropagation()
                          onDocumentView(document)
                        }}
                      >
                        <Visibility fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Download">
                      <IconButton 
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation()
                          // Handle download
                          console.log('Download document:', document.name)
                        }}
                      >
                        <Download fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Share with Homeowner">
                      <IconButton 
                        size="small"
                        color={document.sharedWithHomeowner ? 'primary' : 'default'}
                        onClick={(e) => {
                          e.stopPropagation()
                          // Handle share toggle
                          console.log('Toggle share:', document.name)
                        }}
                      >
                        <Share fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Empty State for Category */}
        {filteredDocs.length === 0 && showHeader && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Avatar sx={{ mx: 'auto', mb: 2, bgcolor: `${category.color}.main`, width: 56, height: 56 }}>
              {category.icon}
            </Avatar>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No {category.name} Yet
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {category.description}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  )
}

export default DocumentCategory
