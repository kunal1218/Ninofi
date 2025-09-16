/**
 * Project Checkpoints Component
 * 
 * This component manages the project timeline checkpoints/milestones.
 * Each checkpoint represents a specific task (e.g., "install door", "finish foundation")
 * that requires mutual confirmation from both contractor and homeowner.
 */

import React, { useState } from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Chip,
  IconButton,
  ImageList,
  ImageListItem,
  Alert,
  Fab,
  Tooltip,
  LinearProgress
} from '@mui/material'
import {
  Add,
  Edit,
  Delete,
  PhotoCamera,
  CheckCircle,
  Schedule,
  Warning,
  AttachMoney,
  CloudUpload,
  Visibility,
  ThumbUp,
  ThumbDown,
  Pending,
  PlayArrow,
  NotificationImportant
} from '@mui/icons-material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { format } from 'date-fns'

const ProjectCheckpoints = ({ project, checkpoints: initialCheckpoints }) => {
  const [checkpoints, setCheckpoints] = useState(initialCheckpoints || [])
  const [checkpointDialogOpen, setCheckpointDialogOpen] = useState(false)
  const [editingCheckpoint, setEditingCheckpoint] = useState(null)
  const [photoDialogOpen, setPhotoDialogOpen] = useState(false)
  const [selectedCheckpoint, setSelectedCheckpoint] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    amount: '',
    dueDate: new Date()
  })

  const handleCheckpointSubmit = () => {
    const checkpointData = {
      ...formData,
      id: editingCheckpoint?.id || Date.now(),
      status: 'pending',
      contractorApproved: true,
      homeownerApproved: false,
      paymentReleased: false,
      photos: editingCheckpoint?.photos || [],
      order: editingCheckpoint?.order || checkpoints.length + 1,
      completedDate: null
    }

    if (editingCheckpoint) {
      setCheckpoints(prev => prev.map(c => 
        c.id === editingCheckpoint.id 
          ? { ...checkpointData, homeownerApproved: false } // Reset approval when edited
          : c
      ))
    } else {
      setCheckpoints(prev => [...prev, checkpointData])
    }

    handleCloseCheckpointDialog()
    
    // Simulate notification to homeowner
    console.log('Checkpoint change notification sent to homeowner:', checkpointData)
  }

  const handleCloseCheckpointDialog = () => {
    setCheckpointDialogOpen(false)
    setEditingCheckpoint(null)
    setFormData({ title: '', description: '', amount: '', dueDate: new Date() })
  }

  const handleEditCheckpoint = (checkpoint) => {
    setEditingCheckpoint(checkpoint)
    setFormData({
      title: checkpoint.title,
      description: checkpoint.description,
      amount: checkpoint.amount.toString(),
      dueDate: checkpoint.dueDate
    })
    setCheckpointDialogOpen(true)
  }

  const handleMarkComplete = (checkpointId) => {
    setCheckpoints(prev => prev.map(c =>
      c.id === checkpointId
        ? {
            ...c,
            status: 'completed',
            completedDate: new Date(),
            contractorApproved: true
            // homeownerApproved remains false until they confirm
          }
        : c
    ))
    
    // Simulate notification to homeowner
    console.log('Checkpoint completion notification sent to homeowner')
  }

  const handleRequestPayment = (checkpointId) => {
    const checkpoint = checkpoints.find(c => c.id === checkpointId)
    console.log('Payment request sent for checkpoint:', checkpoint.title)
    
    // In a real app, this would create a payment request
    alert(`Payment request sent to ${project.homeowner.name} for $${checkpoint.amount.toLocaleString()}`)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'success'
      case 'in_progress': return 'primary'
      case 'pending': return 'default'
      default: return 'default'
    }
  }

  const getStatusIcon = (checkpoint) => {
    if (checkpoint.status === 'completed') {
      return checkpoint.homeownerApproved ? <CheckCircle color="success" /> : <Warning color="warning" />
    } else if (checkpoint.status === 'in_progress') {
      return <PlayArrow color="primary" />
    } else {
      return <Schedule color="disabled" />
    }
  }

  const canRequestPayment = (checkpoint) => {
    return checkpoint.status === 'completed' && 
           checkpoint.contractorApproved && 
           checkpoint.homeownerApproved && 
           !checkpoint.paymentReleased
  }

  return (
    <Box>
      {/* Action Bar */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Project Checkpoints
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setCheckpointDialogOpen(true)}
          size="small"
        >
          Add Checkpoint
        </Button>
      </Box>

      {/* Timeline Stepper */}
      <Card>
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          <Stepper
            orientation="vertical"
            sx={{
              mt: 1,
              '& .MuiStepLabel-label': { fontWeight: 600 },
              '& .MuiStepContent-root': { borderLeftColor: 'divider' }
            }}
          >
            {checkpoints.map((checkpoint) => (
              <Step key={checkpoint.id} active={true}>
                <StepLabel
                  icon={getStatusIcon(checkpoint)}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                      {checkpoint.title}
                    </Typography>
                    <Chip
                      label={checkpoint.status.charAt(0).toUpperCase() + checkpoint.status.slice(1)}
                      color={getStatusColor(checkpoint.status)}
                      size="small"
                    />
                    <Chip
                      label={`$${checkpoint.amount.toLocaleString()}`}
                      variant="outlined"
                      size="small"
                      icon={<AttachMoney />}
                    />
                  </Box>
                </StepLabel>
                <StepContent>
                  <Box sx={{ pb: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5, lineHeight: 1.6 }}>
                      {checkpoint.description}
                    </Typography>

                    <Grid container spacing={2} sx={{ mb: 2 }}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary">
                          Due Date: {format(checkpoint.dueDate, 'MMM dd, yyyy')}
                        </Typography>
                        {checkpoint.completedDate && (
                          <Typography variant="body2" color="success.main">
                            Completed: {format(checkpoint.completedDate, 'MMM dd, yyyy')}
                          </Typography>
                        )}
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Chip
                            icon={checkpoint.contractorApproved ? <ThumbUp /> : <ThumbDown />}
                            label="Contractor"
                            color={checkpoint.contractorApproved ? 'success' : 'default'}
                            size="small"
                          />
                          <Chip
                            icon={checkpoint.homeownerApproved ? <ThumbUp /> : <ThumbDown />}
                            label="Homeowner"
                            color={checkpoint.homeownerApproved ? 'success' : 'default'}
                            size="small"
                          />
                        </Box>
                      </Grid>
                    </Grid>

                    {/* Approval Status Alert */}
                    {checkpoint.status === 'completed' && !checkpoint.homeownerApproved && (
                      <Alert severity="warning" sx={{ mb: 2 }}>
                        <Typography variant="body2">
                          <strong>Awaiting Homeowner Confirmation</strong> - 
                          The homeowner needs to approve this checkpoint before payment can be released.
                        </Typography>
                      </Alert>
                    )}

                    {/* Progress Photos */}
                    {checkpoint.photos.length > 0 && (
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" gutterBottom>
                          Progress Photos ({checkpoint.photos.length})
                        </Typography>
                        <ImageList sx={{ width: '100%' }} cols={4} rowHeight={140} gap={8}>
                          {checkpoint.photos.map((photo) => (
                            <ImageListItem key={photo.id}>
                              <img
                                src={photo.url}
                                alt={photo.caption}
                                loading="lazy"
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                  setSelectedCheckpoint(checkpoint)
                                  setPhotoDialogOpen(true)
                                }}
                              />
                            </ImageListItem>
                          ))}
                        </ImageList>
                      </Box>
                    )}

                    {/* Action Buttons */}
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      {checkpoint.status !== 'completed' && (
                        <Button
                          size="small"
                          variant="contained"
                          color="success"
                          startIcon={<CheckCircle />}
                          onClick={() => handleMarkComplete(checkpoint.id)}
                        >
                          Mark Complete
                        </Button>
                      )}
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<PhotoCamera />}
                        onClick={() => {
                          setSelectedCheckpoint(checkpoint)
                          setPhotoDialogOpen(true)
                        }}
                      >
                        {checkpoint.photos.length > 0 ? 'View Photos' : 'Add Photos'}
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<Edit />}
                        onClick={() => handleEditCheckpoint(checkpoint)}
                      >
                        Edit
                      </Button>
                      {canRequestPayment(checkpoint) && (
                        <Button
                          size="small"
                          variant="contained"
                          color="primary"
                          startIcon={<AttachMoney />}
                          onClick={() => handleRequestPayment(checkpoint.id)}
                        >
                          Request Payment
                        </Button>
                      )}
                      {checkpoint.status === 'completed' && !checkpoint.homeownerApproved && (
                        <Button
                          size="small"
                          variant="outlined"
                          color="warning"
                          startIcon={<NotificationImportant />}
                        >
                          Send Reminder
                        </Button>
                      )}
                    </Box>
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>

          {checkpoints.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Schedule sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No Checkpoints Yet
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Create your first checkpoint to start tracking project progress
              </Typography>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => setCheckpointDialogOpen(true)}
              >
                Add First Checkpoint
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Checkpoint Dialog */}
      <Dialog 
        open={checkpointDialogOpen} 
        onClose={handleCloseCheckpointDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {editingCheckpoint ? 'Edit Checkpoint' : 'Add New Checkpoint'}
        </DialogTitle>
        <DialogContent>
          <Alert severity="info" sx={{ mb: 3 }}>
            {editingCheckpoint 
              ? 'Changes to checkpoints require homeowner approval before being finalized.'
              : 'New checkpoints require homeowner approval before being added to the timeline.'
            }
          </Alert>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Checkpoint Title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g., Install Door, Finish Foundation, etc."
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  multiline
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Detailed description of work to be completed..."
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Payment Amount"
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                  InputProps={{
                    startAdornment: <span>$</span>
                  }}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="Due Date"
                  value={formData.dueDate}
                  onChange={(date) => setFormData(prev => ({ ...prev, dueDate: date }))}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </Grid>
            </Grid>
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCheckpointDialog}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleCheckpointSubmit}
            disabled={!formData.title || !formData.amount}
          >
            {editingCheckpoint ? 'Update Checkpoint' : 'Add Checkpoint'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Photo Dialog */}
      <Dialog 
        open={photoDialogOpen} 
        onClose={() => setPhotoDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Progress Photos - {selectedCheckpoint?.title}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 3 }}>
            <Button
              variant="outlined"
              startIcon={<CloudUpload />}
              fullWidth
              sx={{ p: 3, borderStyle: 'dashed' }}
            >
              Click to Upload Photos or Drag & Drop
            </Button>
          </Box>

          {selectedCheckpoint?.photos.length > 0 && (
            <ImageList sx={{ width: '100%' }} cols={3}>
              {selectedCheckpoint.photos.map((photo) => (
                <ImageListItem key={photo.id}>
                  <img
                    src={photo.url}
                    alt={photo.caption}
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPhotoDialogOpen(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default ProjectCheckpoints
