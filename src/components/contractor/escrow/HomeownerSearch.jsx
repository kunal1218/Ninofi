/**
 * Homeowner Search Component
 * 
 * This component allows contractors to:
 * - Search for existing homeowners with accounts
 * - Send invite links to homeowners without accounts
 * - View existing escrow relationships
 * - Manage homeowner connections
 */

import React, { useState } from 'react'
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
  Avatar,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Alert,
  Divider,
  InputAdornment,
  LinearProgress
} from '@mui/material'
import {
  Search,
  Add,
  PersonAdd,
  Email,
  Phone,
  CheckCircle,
  Warning,
  Schedule,
  Link as LinkIcon,
  Share,
  Edit,
  Delete,
  Message
} from '@mui/icons-material'

const HomeownerSearch = ({ 
  escrowRelationships, 
  onHomeownerSelect, 
  onAddHomeowner, 
  selectedProject 
}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false)
  const [inviteFormData, setInviteFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [selectedRelationship, setSelectedRelationship] = useState(null)

  // Mock search results - replace with actual API call
  const mockSearchResults = [
    {
      id: 101,
      name: 'Mike Wilson',
      email: 'mike.wilson@email.com',
      phone: '+1 (555) 111-2222',
      hasAccount: true,
      avatar: null,
      previousProjects: 2
    },
    {
      id: 102,
      name: 'Lisa Chen',
      email: 'lisa.chen@email.com',
      phone: '+1 (555) 333-4444',
      hasAccount: true,
      avatar: null,
      previousProjects: 0
    }
  ]

  const handleSearch = async () => {
    if (!searchQuery.trim()) return
    
    setIsSearching(true)
    // Simulate API call
    setTimeout(() => {
      const results = mockSearchResults.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setSearchResults(results)
      setIsSearching(false)
    }, 1000)
  }

  const handleInviteSubmit = () => {
    const inviteData = {
      ...inviteFormData,
      projectId: selectedProject?.id,
      inviteLink: `${window.location.origin}/homeowner/invite/${Math.random().toString(36).substr(2, 9)}`,
      sentAt: new Date()
    }
    
    onAddHomeowner(inviteData)
    setInviteDialogOpen(false)
    setInviteFormData({ name: '', email: '', phone: '', message: '' })
  }

  const handleConnectExisting = (homeowner) => {
    onAddHomeowner({
      ...homeowner,
      projectId: selectedProject?.id,
      connectionType: 'existing_account'
    })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'success'
      case 'pending_approval': return 'warning'
      case 'completed': return 'info'
      case 'cancelled': return 'error'
      default: return 'default'
    }
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case 'active': return 'Active'
      case 'pending_approval': return 'Pending Approval'
      case 'completed': return 'Completed'
      case 'cancelled': return 'Cancelled'
      default: return status
    }
  }

  return (
    <Box>
      {/* Search Section */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Add Homeowner
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Search for existing homeowners or invite new ones to collaborate on your project
          </Typography>

          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Button
                variant="contained"
                fullWidth
                onClick={handleSearch}
                disabled={isSearching || !searchQuery.trim()}
                startIcon={<Search />}
              >
                {isSearching ? 'Searching...' : 'Search'}
              </Button>
            </Grid>
            <Grid item xs={12} md={3}>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => setInviteDialogOpen(true)}
                startIcon={<PersonAdd />}
              >
                Send Invite
              </Button>
            </Grid>
          </Grid>

          {isSearching && (
            <Box sx={{ mt: 2 }}>
              <LinearProgress />
            </Box>
          )}

          {/* Search Results */}
          {searchResults.length > 0 && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2" gutterBottom>
                Search Results
              </Typography>
              <List>
                {searchResults.map((homeowner) => (
                  <ListItem key={homeowner.id} divider>
                    <ListItemAvatar>
                      <Avatar>
                        {homeowner.name.charAt(0)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={homeowner.name}
                      secondary={
                        <Box>
                          <Typography variant="body2">{homeowner.email}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {homeowner.previousProjects} previous projects
                          </Typography>
                        </Box>
                      }
                    />
                    <ListItemSecondaryAction>
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => handleConnectExisting(homeowner)}
                        startIcon={<Add />}
                      >
                        Connect
                      </Button>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Existing Relationships */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Current Escrow Relationships
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Manage your active escrow relationships with homeowners
          </Typography>

          {escrowRelationships.length === 0 ? (
            <Alert severity="info">
              No escrow relationships yet. Search for homeowners or send invites to get started.
            </Alert>
          ) : (
            <Grid container spacing={2}>
              {escrowRelationships.map((relationship) => (
                <Grid item xs={12} md={6} key={relationship.id}>
                  <Card variant="outlined" sx={{ height: '100%' }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar sx={{ mr: 2 }}>
                          {relationship.homeowner.name.charAt(0)}
                        </Avatar>
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            {relationship.homeowner.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {relationship.homeowner.email}
                          </Typography>
                        </Box>
                        <Chip
                          label={getStatusLabel(relationship.status)}
                          color={getStatusColor(relationship.status)}
                          size="small"
                        />
                      </Box>

                      <Divider sx={{ my: 2 }} />

                      <Grid container spacing={2} sx={{ mb: 2 }}>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">
                            Total Amount
                          </Typography>
                          <Typography variant="h6" color="primary.main">
                            ${relationship.totalAmount.toLocaleString()}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">
                            Progress
                          </Typography>
                          <Typography variant="h6" color="success.main">
                            {relationship.completedMilestones}/{relationship.milestones} milestones
                          </Typography>
                        </Grid>
                      </Grid>

                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          Payment Progress
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={(relationship.paidAmount / relationship.totalAmount) * 100}
                          sx={{ height: 8, borderRadius: 4 }}
                        />
                        <Typography variant="caption" color="text.secondary">
                          ${relationship.paidAmount.toLocaleString()} of ${relationship.totalAmount.toLocaleString()} paid
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Chip
                          icon={relationship.homeowner.hasAccount ? <CheckCircle /> : <Warning />}
                          label={relationship.homeowner.hasAccount ? 'Has Account' : 'Invite Sent'}
                          color={relationship.homeowner.hasAccount ? 'success' : 'warning'}
                          size="small"
                        />
                        <Typography variant="caption" color="text.secondary">
                          Last activity: {relationship.lastActivity.toLocaleDateString()}
                        </Typography>
                      </Box>
                    </CardContent>

                    <CardActions>
                      <Button
                        size="small"
                        onClick={() => onHomeownerSelect(relationship.homeowner)}
                        startIcon={<Schedule />}
                      >
                        Timeline
                      </Button>
                      <Button
                        size="small"
                        startIcon={<Message />}
                      >
                        Message
                      </Button>
                      <IconButton size="small">
                        <Edit />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </CardContent>
      </Card>

      {/* Invite Dialog */}
      <Dialog 
        open={inviteDialogOpen} 
        onClose={() => setInviteDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Send Homeowner Invite
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Send an invite link to a homeowner who doesn't have an account yet. 
            They can use this link to collaborate on the project without creating an account.
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Homeowner Name"
                value={inviteFormData.name}
                onChange={(e) => setInviteFormData(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={inviteFormData.email}
                onChange={(e) => setInviteFormData(prev => ({ ...prev, email: e.target.value }))}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone Number (Optional)"
                value={inviteFormData.phone}
                onChange={(e) => setInviteFormData(prev => ({ ...prev, phone: e.target.value }))}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Personal Message (Optional)"
                multiline
                rows={3}
                value={inviteFormData.message}
                onChange={(e) => setInviteFormData(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Add a personal message to the invitation..."
              />
            </Grid>
          </Grid>

          <Alert severity="info" sx={{ mt: 2 }}>
            The homeowner will receive an email with a secure link to collaborate on this project. 
            They won't need to create an account to participate.
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setInviteDialogOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleInviteSubmit}
            disabled={!inviteFormData.name || !inviteFormData.email}
            startIcon={<Share />}
          >
            Send Invite
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default HomeownerSearch
