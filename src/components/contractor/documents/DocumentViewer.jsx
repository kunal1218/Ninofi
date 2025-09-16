/**
 * Document Viewer Component
 * 
 * This component provides a comprehensive document viewing experience.
 * Features include:
 * - Image preview with zoom
 * - PDF viewing
 * - Document metadata display
 * - Sharing controls
 * - Download functionality
 */

import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Grid,
  Chip,
  IconButton,
  Avatar,
  Divider,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  FormControlLabel
} from '@mui/material'
import {
  Close,
  Download,
  Share,
  ZoomIn,
  ZoomOut,
  FullScreen,
  Person,
  Schedule,
  CheckCircle,
  AttachMoney,
  Business,
  Timeline,
  Visibility,
  Edit
} from '@mui/icons-material'
import { format } from 'date-fns'

const DocumentViewer = ({ 
  open, 
  onClose, 
  document, 
  project 
}) => {
  const [zoomLevel, setZoomLevel] = useState(100)
  const [isShared, setIsShared] = useState(document?.sharedWithHomeowner || false)

  if (!document) return null

  // Handle zoom controls
  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 25, 200))
  }

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 25, 50))
  }

  const handleZoomReset = () => {
    setZoomLevel(100)
  }

  // Handle sharing toggle
  const handleShareToggle = (shared) => {
    setIsShared(shared)
    console.log(`Document ${shared ? 'shared with' : 'unshared from'} homeowner:`, document.name)
    // In a real app, this would update the backend
  }

  // Handle download
  const handleDownload = () => {
    console.log('Downloading document:', document.name)
    // In a real app, this would trigger download
    const link = document.createElement('a')
    link.href = document.url
    link.download = document.name
    link.click()
  }

  // Get file type display
  const getFileTypeDisplay = (type) => {
    switch (type) {
      case 'image': return 'Image'
      case 'pdf': return 'PDF Document'
      case 'doc': return 'Word Document'
      default: return 'File'
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

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: { height: '90vh' }
      }}
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {document.name}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {document.type === 'image' && (
              <>
                <IconButton onClick={handleZoomOut} disabled={zoomLevel <= 50}>
                  <ZoomOut />
                </IconButton>
                <Typography variant="body2" sx={{ minWidth: 60, textAlign: 'center' }}>
                  {zoomLevel}%
                </Typography>
                <IconButton onClick={handleZoomIn} disabled={zoomLevel >= 200}>
                  <ZoomIn />
                </IconButton>
                <IconButton onClick={handleZoomReset}>
                  <FullScreen />
                </IconButton>
              </>
            )}
            <IconButton onClick={onClose}>
              <Close />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>
      
      <DialogContent sx={{ display: 'flex', gap: 2, p: 0 }}>
        {/* Document Preview */}
        <Box sx={{ flexGrow: 1, p: 2, overflow: 'auto', bgcolor: 'grey.50' }}>
          {document.type === 'image' ? (
            <Box sx={{ textAlign: 'center' }}>
              <img
                src={document.url}
                alt={document.name}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  transform: `scale(${zoomLevel / 100})`,
                  transition: 'transform 0.2s'
                }}
              />
            </Box>
          ) : document.type === 'pdf' ? (
            <Box sx={{ 
              width: '100%', 
              height: '100%', 
              minHeight: 500,
              bgcolor: 'white',
              borderRadius: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Typography variant="h6" color="text.secondary">
                PDF Preview (Would embed PDF viewer here)
              </Typography>
            </Box>
          ) : (
            <Box sx={{ 
              width: '100%', 
              height: '100%', 
              minHeight: 500,
              bgcolor: 'white',
              borderRadius: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Avatar sx={{ width: 80, height: 80, mb: 2, bgcolor: 'primary.main' }}>
                <Description sx={{ fontSize: 40 }} />
              </Avatar>
              <Typography variant="h6" gutterBottom>
                {getFileTypeDisplay(document.type)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Click download to view this file
              </Typography>
            </Box>
          )}
        </Box>

        {/* Document Information Panel */}
        <Box sx={{ width: 300, p: 2, borderLeft: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
          <Typography variant="h6" gutterBottom>
            Document Details
          </Typography>
          
          <List dense>
            <ListItem>
              <ListItemIcon>
                <Visibility />
              </ListItemIcon>
              <ListItemText
                primary="File Type"
                secondary={getFileTypeDisplay(document.type)}
              />
            </ListItem>
            
            <ListItem>
              <ListItemIcon>
                <Schedule />
              </ListItemIcon>
              <ListItemText
                primary="Size"
                secondary={formatFileSize(document.size)}
              />
            </ListItem>
            
            <ListItem>
              <ListItemIcon>
                <Schedule />
              </ListItemIcon>
              <ListItemText
                primary="Uploaded"
                secondary={format(document.uploadedAt, 'MMM dd, yyyy h:mm a')}
              />
            </ListItem>

            {document.milestone && (
              <ListItem>
                <ListItemIcon>
                  <Timeline />
                </ListItemIcon>
                <ListItemText
                  primary="Milestone"
                  secondary={document.milestone}
                />
              </ListItem>
            )}

            {document.amount && (
              <ListItem>
                <ListItemIcon>
                  <AttachMoney />
                </ListItemIcon>
                <ListItemText
                  primary="Amount"
                  secondary={`$${document.amount.toLocaleString()}`}
                />
              </ListItem>
            )}

            {document.vendor && (
              <ListItem>
                <ListItemIcon>
                  <Business />
                </ListItemIcon>
                <ListItemText
                  primary="Vendor"
                  secondary={document.vendor}
                />
              </ListItem>
            )}

            {document.permitNumber && (
              <ListItem>
                <ListItemIcon>
                  <Business />
                </ListItemIcon>
                <ListItemText
                  primary="Permit Number"
                  secondary={document.permitNumber}
                />
              </ListItem>
            )}
          </List>

          {document.description && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Description
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {document.description}
              </Typography>
            </Box>
          )}

          <Divider sx={{ my: 2 }} />

          {/* Sharing Information */}
          <Typography variant="subtitle2" gutterBottom>
            Sharing & Access
          </Typography>
          
          <FormControlLabel
            control={
              <Switch
                checked={isShared}
                onChange={(e) => handleShareToggle(e.target.checked)}
              />
            }
            label="Share with homeowner"
          />

          {isShared && (
            <Box sx={{ mt: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Avatar sx={{ width: 24, height: 24, mr: 1, bgcolor: 'secondary.main' }}>
                  <Person />
                </Avatar>
                <Typography variant="body2">
                  {project.homeowner.name}
                </Typography>
              </Box>
              
              <Chip
                icon={document.homeownerViewed ? <CheckCircle /> : <Schedule />}
                label={document.homeownerViewed ? 'Viewed' : 'Not viewed yet'}
                color={document.homeownerViewed ? 'success' : 'warning'}
                size="small"
              />
              
              {!document.homeownerViewed && (
                <Alert severity="info" sx={{ mt: 2 }}>
                  <Typography variant="body2">
                    The homeowner hasn't viewed this document yet. 
                    {project.homeowner.hasAccount 
                      ? 'They will be notified in their account.'
                      : 'They will receive an email notification.'
                    }
                  </Typography>
                </Alert>
              )}
            </Box>
          )}
        </Box>
      </DialogContent>
      
      <DialogActions>
        <Button 
          startIcon={<Download />}
          onClick={handleDownload}
        >
          Download
        </Button>
        <Button 
          startIcon={<Share />}
          onClick={() => handleShareToggle(!isShared)}
        >
          {isShared ? 'Unshare' : 'Share'}
        </Button>
        <Button 
          startIcon={<Edit />}
        >
          Edit Details
        </Button>
        <Button onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DocumentViewer
