/**
 * Document Upload Component
 * 
 * This component handles document uploads with proper categorization.
 * Features include:
 * - Drag and drop file upload
 * - Category selection
 * - Milestone linking
 * - Automatic sharing with homeowner
 * - File validation and preview
 */

import React, { useState, useRef } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Alert,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  LinearProgress,
  Switch,
  FormControlLabel,
  Chip
} from '@mui/material'
import {
  CloudUpload,
  Delete,
  Image,
  PictureAsPdf,
  Description,
  InsertDriveFile,
  AttachMoney,
  Business,
  Timeline
} from '@mui/icons-material'

const DocumentUpload = ({ 
  open, 
  onClose, 
  onUpload, 
  categories, 
  project 
}) => {
  const [selectedFiles, setSelectedFiles] = useState([])
  const [uploading, setUploading] = useState(false)
  const [formData, setFormData] = useState({
    category: '',
    milestone: '',
    description: '',
    amount: '',
    vendor: '',
    permitNumber: '',
    shareWithHomeowner: true
  })
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef(null)

  // Mock milestones - would come from project timeline
  const milestones = [
    'Site Preparation & Permits',
    'Foundation Work',
    'Framing & Structure',
    'Install Door',
    'Electrical & Plumbing',
    'Insulation & Drywall',
    'Final Finishing'
  ]

  // Handle file selection
  const handleFileSelect = (files) => {
    const fileArray = Array.from(files)
    const processedFiles = fileArray.map(file => ({
      id: Date.now() + Math.random(),
      file: file,
      name: file.name,
      size: file.size,
      type: getFileType(file),
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null
    }))
    
    setSelectedFiles(prev => [...prev, ...processedFiles])
  }

  // Get file type
  const getFileType = (file) => {
    if (file.type.startsWith('image/')) return 'image'
    if (file.type === 'application/pdf') return 'pdf'
    if (file.type.includes('word')) return 'doc'
    return 'file'
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

  // Handle drag events
  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files)
    }
  }

  // Handle file input change
  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files)
    }
  }

  // Remove file from selection
  const removeFile = (fileId) => {
    setSelectedFiles(prev => prev.filter(f => f.id !== fileId))
  }

  // Handle form submission
  const handleSubmit = async () => {
    if (selectedFiles.length === 0 || !formData.category) {
      alert('Please select files and category')
      return
    }

    setUploading(true)

    // Simulate upload process
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i]
      
      const documentData = {
        name: file.name,
        category: formData.category,
        type: file.type,
        url: file.preview || `/api/documents/${file.name}`,
        size: file.size,
        milestone: formData.milestone || null,
        description: formData.description,
        amount: formData.amount ? parseFloat(formData.amount) : null,
        vendor: formData.vendor || null,
        permitNumber: formData.permitNumber || null,
        sharedWithHomeowner: formData.shareWithHomeowner
      }

      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      onUpload(documentData)
    }

    setUploading(false)
    handleClose()
  }

  // Handle dialog close
  const handleClose = () => {
    setSelectedFiles([])
    setFormData({
      category: '',
      milestone: '',
      description: '',
      amount: '',
      vendor: '',
      permitNumber: '',
      shareWithHomeowner: true
    })
    setDragActive(false)
    onClose()
  }

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
  }

  // Get category-specific fields
  const getCategoryFields = () => {
    switch (formData.category) {
      case 'receipts_bills':
        return (
          <>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Amount"
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                InputProps={{
                  startAdornment: <AttachMoney />
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Vendor/Supplier"
                value={formData.vendor}
                onChange={(e) => setFormData(prev => ({ ...prev, vendor: e.target.value }))}
                InputProps={{
                  startAdornment: <Business />
                }}
              />
            </Grid>
          </>
        )
      case 'invoices':
        return (
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Invoice Amount"
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
              InputProps={{
                startAdornment: <AttachMoney />
              }}
              required
            />
          </Grid>
        )
      case 'permits_licenses':
        return (
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Permit/License Number"
              value={formData.permitNumber}
              onChange={(e) => setFormData(prev => ({ ...prev, permitNumber: e.target.value }))}
            />
          </Grid>
        )
      default:
        return null
    }
  }

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        Upload Documents
      </DialogTitle>
      
      <DialogContent>
        {/* File Upload Area */}
        <Box
          sx={{
            border: 2,
            borderColor: dragActive ? 'primary.main' : 'grey.300',
            borderStyle: 'dashed',
            borderRadius: 2,
            p: 4,
            mb: 3,
            textAlign: 'center',
            bgcolor: dragActive ? 'primary.50' : 'grey.50',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <CloudUpload sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            {dragActive ? 'Drop files here' : 'Click to upload or drag and drop'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Supports images, PDFs, Word documents, and more
          </Typography>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            style={{ display: 'none' }}
            onChange={handleFileInputChange}
            accept="image/*,.pdf,.doc,.docx,.txt"
          />
        </Box>

        {/* Selected Files */}
        {selectedFiles.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Selected Files ({selectedFiles.length})
            </Typography>
            <List dense>
              {selectedFiles.map((file) => (
                <ListItem key={file.id}>
                  <ListItemIcon>
                    {getFileTypeIcon(file.type)}
                  </ListItemIcon>
                  <ListItemText
                    primary={file.name}
                    secondary={formatFileSize(file.size)}
                  />
                  <ListItemSecondaryAction>
                    <IconButton 
                      edge="end" 
                      onClick={() => removeFile(file.id)}
                      size="small"
                    >
                      <Delete />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Box>
        )}

        {/* Document Information Form */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Category</InputLabel>
              <Select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                label="Category"
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {category.icon}
                      <Typography sx={{ ml: 1 }}>{category.name}</Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Link to Milestone (Optional)</InputLabel>
              <Select
                value={formData.milestone}
                onChange={(e) => setFormData(prev => ({ ...prev, milestone: e.target.value }))}
                label="Link to Milestone (Optional)"
                startAdornment={<Timeline sx={{ mr: 1 }} />}
              >
                <MenuItem value="">None</MenuItem>
                {milestones.map((milestone) => (
                  <MenuItem key={milestone} value={milestone}>
                    {milestone}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description (Optional)"
              multiline
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Add a description for these documents..."
            />
          </Grid>

          {/* Category-specific fields */}
          {getCategoryFields()}

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.shareWithHomeowner}
                  onChange={(e) => setFormData(prev => ({ ...prev, shareWithHomeowner: e.target.checked }))}
                />
              }
              label="Share with homeowner"
            />
            <Typography variant="caption" color="text.secondary" display="block">
              When enabled, the homeowner will be able to view these documents
            </Typography>
          </Grid>
        </Grid>

        {/* Upload Progress */}
        {uploading && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="body2" gutterBottom>
              Uploading documents...
            </Typography>
            <LinearProgress />
          </Box>
        )}
      </DialogContent>
      
      <DialogActions>
        <Button onClick={handleClose} disabled={uploading}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={selectedFiles.length === 0 || !formData.category || uploading}
          startIcon={<CloudUpload />}
        >
          {uploading ? 'Uploading...' : `Upload ${selectedFiles.length} File${selectedFiles.length !== 1 ? 's' : ''}`}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DocumentUpload
