/**
 * Escrow Timeline Component
 * 
 * This component manages the collaborative escrow timeline with milestones.
 * Features include:
 * - Milestone creation and editing (requires mutual approval)
 * - Progress photo uploads
 * - Timeline progression tracking
 * - Payment milestone management
 * - Mutual approval system for all changes
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
  Avatar,
  Chip,
  IconButton,
  ImageList,
  ImageListItem,
  Alert,
  LinearProgress,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Fab,
  Tooltip
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
  Timeline as TimelineIcon
} from '@mui/icons-material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { format } from 'date-fns'

const EscrowTimeline = ({ selectedHomeowner, selectedProject }) => {
  const [milestones, setMilestones] = useState([
    {
      id: 1,
      title: 'Project Kickoff & Permits',
      description: 'Obtain all necessary permits and prepare site',
      amount: 5000,
      dueDate: new Date('2024-02-01'),
      status: 'completed',
      approvalStatus: 'approved',
      completedDate: new Date('2024-01-28'),
      photos: [
        { id: 1, url: '/api/placeholder/200/150', caption: 'Permits received' },
        { id: 2, url: '/api/placeholder/200/150', caption: 'Site preparation' }
      ],
      contractorApproval: true,
      homeownerApproval: true,
      paymentReleased: true,
      order: 1
    },
    {
      id: 2,
      title: 'Foundation & Framing',
      description: 'Complete foundation work and basic framing structure',
      amount: 15000,
      dueDate: new Date('2024-02-15'),
      status: 'completed',
      approvalStatus: 'approved',
      completedDate: new Date('2024-02-12'),
      photos: [
        { id: 3, url: '/api/placeholder/200/150', caption: 'Foundation complete' },
        { id: 4, url: '/api/placeholder/200/150', caption: 'Framing progress' }
      ],
      contractorApproval: true,
      homeownerApproval: true,
      paymentReleased: true,
      order: 2
    },
    {
      id: 3,
      title: 'Electrical & Plumbing',
      description: 'Install electrical systems and plumbing infrastructure',
      amount: 12000,
      dueDate: new Date('2024-03-01'),
      status: 'in_progress',
      approvalStatus: 'pending_homeowner',
      completedDate: null,
      photos: [
        { id: 5, url: '/api/placeholder/200/150', caption: 'Electrical rough-in' }
      ],
      contractorApproval: true,
      homeownerApproval: false,
      paymentReleased: false,
      order: 3
    },
    {
      id: 4,
      title: 'Insulation & Drywall',
      description: 'Install insulation and complete drywall work',
      amount: 8000,
      dueDate: new Date('2024-03-15'),
      status: 'pending',
      approvalStatus: 'draft',
      completedDate: null,
      photos: [],
      contractorApproval: false,
      homeownerApproval: false,
      paymentReleased: false,
      order: 4
    },
    {
      id: 5,
      title: 'Final Finishing',
      description: 'Complete all finishing work including painting and fixtures',
      amount: 5000,
      dueDate: new Date('2024-03-30'),
      status: 'pending',
      approvalStatus: 'draft',
      completedDate: null,
      photos: [],
      contractorApproval: false,
      homeownerApproval: false,
      paymentReleased: false,
      order: 5
    }
  ])

  const [milestoneDialogOpen, setMilestoneDialogOpen] = useState(false)
  const [editingMilestone, setEditingMilestone] = useState(null)
  const [photoDialogOpen, setPhotoDialogOpen] = useState(false)
  const [selectedMilestone, setSelectedMilestone] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    amount: '',
    dueDate: new Date()
  })

  const handleMilestoneSubmit = () => {
    const milestoneData = {
      ...formData,
      id: editingMilestone?.id || Date.now(),
      status: 'pending',
      approvalStatus: 'pending_homeowner',
      contractorApproval: true,
      homeownerApproval: false,
      paymentReleased: false,
      photos: editingMilestone?.photos || [],
      order: editingMilestone?.order || milestones.length + 1
    }

    if (editingMilestone) {
      setMilestones(prev => prev.map(m => 
        m.id === editingMilestone.id 
          ? { ...milestoneData, approvalStatus: 'pending_homeowner' }
          : m
      ))
    } else {
      setMilestones(prev => [...prev, milestoneData])
    }

    handleCloseMilestoneDialog()
  }

  const handleCloseMilestoneDialog = () => {
    setMilestoneDialogOpen(false)
    setEditingMilestone(null)
    setFormData({ title: '', description: '', amount: '', dueDate: new Date() })
  }

  const handleEditMilestone = (milestone) => {
    setEditingMilestone(milestone)
    setFormData({
      title: milestone.title,
      description: milestone.description,
      amount: milestone.amount.toString(),
      dueDate: milestone.dueDate
    })
    setMilestoneDialogOpen(true)
  }

  const handleMarkComplete = (milestoneId) => {
    setMilestones(prev => prev.map(m =>
      m.id === milestoneId
        ? {
            ...m,
            status: 'completed',
            completedDate: new Date(),
            approvalStatus: 'pending_homeowner'
          }
        : m
    ))
  }

  const handleUploadPhotos = (milestoneId, photos) => {
    setMilestones(prev => prev.map(m =>
      m.id === milestoneId
        ? { ...m, photos: [...m.photos, ...photos] }
        : m
    ))
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'success'
      case 'in_progress': return 'primary'
      case 'pending': return 'default'
      default: return 'default'
    }
  }

  const getApprovalColor = (approvalStatus) => {
    switch (approvalStatus) {
      case 'approved': return 'success'
      case 'pending_homeowner': return 'warning'
      case 'pending_contractor': return 'info'
      case 'rejected': return 'error'
      case 'draft': return 'default'
      default: return 'default'
    }
  }

  const getApprovalLabel = (approvalStatus) => {
    switch (approvalStatus) {
      case 'approved': return 'Approved'
      case 'pending_homeowner': return 'Awaiting Homeowner'
      case 'pending_contractor': return 'Awaiting Contractor'
      case 'rejected': return 'Rejected'
      case 'draft': return 'Draft'
      default: return approvalStatus
    }
  }

  if (!selectedHomeowner) {
    return (
      <Card>
        <CardContent>
          <Alert severity="info">
            Please select a homeowner from the Homeowners tab to view and manage the escrow timeline.
          </Alert>
        </CardContent>
      </Card>
    )
  }

  const totalAmount = milestones.reduce((sum, m) => sum + m.amount, 0)
  const paidAmount = milestones.filter(m => m.paymentReleased).reduce((sum, m) => sum + m.amount, 0)
  const completedMilestones = milestones.filter(m => m.status === 'completed').length

  return (
    <Box>
      {/* Header with Progress Summary */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Box>
              <Typography variant="h6">
                Escrow Timeline - {selectedHomeowner.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedProject?.name}
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setMilestoneDialogOpen(true)}
            >
              Add Milestone
            </Button>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" color="primary.main" sx={{ fontWeight: 600 }}>
                  {completedMilestones}/{milestones.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Milestones Complete
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" color="success.main" sx={{ fontWeight: 600 }}>
                  ${paidAmount.toLocaleString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Payments Released
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" color="info.main" sx={{ fontWeight: 600 }}>
                  ${totalAmount.toLocaleString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Project Value
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Box sx={{ mt: 3 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Overall Progress
            </Typography>
            <LinearProgress
              variant="determinate"
              value={(completedMilestones / milestones.length) * 100}
              sx={{ height: 8, borderRadius: 4 }}
            />
          </Box>
        </CardContent>
      </Card>

      {/* Timeline */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <TimelineIcon sx={{ mr: 1 }} />
            Project Milestones
          </Typography>
          
          <Stepper orientation="vertical" sx={{ mt: 2 }}>
            {milestones.map((milestone) => (
              <Step key={milestone.id} active={true}>
                <StepLabel
                  icon={
                    milestone.status === 'completed' ? (
                      <CheckCircle color="success" />
                    ) : milestone.status === 'in_progress' ? (
                      <Schedule color="primary" />
                    ) : (
                      <Pending color="disabled" />
                    )
                  }
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {milestone.title}
                    </Typography>
                    <Chip
                      label={getApprovalLabel(milestone.approvalStatus)}
                      color={getApprovalColor(milestone.approvalStatus)}
                      size="small"
                    />
                    <Chip
                      label={`$${milestone.amount.toLocaleString()}`}
                      variant="outlined"
                      size="small"
                      icon={<AttachMoney />}
                    />
                  </Box>
                </StepLabel>
                <StepContent>
                  <Box sx={{ pb: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {milestone.description}
                    </Typography>

                    <Grid container spacing={2} sx={{ mb: 2 }}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary">
                          Due Date: {format(milestone.dueDate, 'MMM dd, yyyy')}
                        </Typography>
                        {milestone.completedDate && (
                          <Typography variant="body2" color="success.main">
                            Completed: {format(milestone.completedDate, 'MMM dd, yyyy')}
                          </Typography>
                        )}
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Chip
                            icon={milestone.contractorApproval ? <ThumbUp /> : <ThumbDown />}
                            label="Contractor"
                            color={milestone.contractorApproval ? 'success' : 'default'}
                            size="small"
                          />
                          <Chip
                            icon={milestone.homeownerApproval ? <ThumbUp /> : <ThumbDown />}
                            label="Homeowner"
                            color={milestone.homeownerApproval ? 'success' : 'default'}
                            size="small"
                          />
                        </Box>
                      </Grid>
                    </Grid>

                    {/* Progress Photos */}
                    {milestone.photos.length > 0 && (
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" gutterBottom>
                          Progress Photos ({milestone.photos.length})
                        </Typography>
                        <ImageList sx={{ width: '100%', height: 150 }} cols={4} rowHeight={150}>
                          {milestone.photos.map((photo) => (
                            <ImageListItem key={photo.id}>
                              <img
                                src={photo.url}
                                alt={photo.caption}
                                loading="lazy"
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                  setSelectedMilestone(milestone)
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
                      {milestone.status !== 'completed' && (
                        <Button
                          size="small"
                          variant="contained"
                          color="success"
                          startIcon={<CheckCircle />}
                          onClick={() => handleMarkComplete(milestone.id)}
                        >
                          Mark Complete
                        </Button>
                      )}
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<PhotoCamera />}
                        onClick={() => {
                          setSelectedMilestone(milestone)
                          setPhotoDialogOpen(true)
                        }}
                      >
                        Add Photos
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<Edit />}
                        onClick={() => handleEditMilestone(milestone)}
                      >
                        Edit
                      </Button>
                      {milestone.status === 'completed' && milestone.homeownerApproval && !milestone.paymentReleased && (
                        <Button
                          size="small"
                          variant="contained"
                          color="primary"
                          startIcon={<AttachMoney />}
                        >
                          Request Payment
                        </Button>
                      )}
                    </Box>
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </CardContent>
      </Card>

      {/* Add/Edit Milestone Dialog */}
      <Dialog 
        open={milestoneDialogOpen} 
        onClose={handleCloseMilestoneDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {editingMilestone ? 'Edit Milestone' : 'Add New Milestone'}
        </DialogTitle>
        <DialogContent>
          <Alert severity="info" sx={{ mb: 3 }}>
            {editingMilestone 
              ? 'Changes to milestones require homeowner approval before being finalized.'
              : 'New milestones require homeowner approval before being added to the timeline.'
            }
          </Alert>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Milestone Title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
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
          <Button onClick={handleCloseMilestoneDialog}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleMilestoneSubmit}
            disabled={!formData.title || !formData.amount}
          >
            {editingMilestone ? 'Update Milestone' : 'Add Milestone'}
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
          Progress Photos - {selectedMilestone?.title}
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

          {selectedMilestone?.photos.length > 0 && (
            <ImageList sx={{ width: '100%' }} cols={3}>
              {selectedMilestone.photos.map((photo) => (
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

export default EscrowTimeline
