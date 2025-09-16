/**
 * Homeowner Linking Component
 * 
 * This component allows contractors to link homeowners to projects during creation.
 * Features include:
 * - Search existing homeowners with accounts
 * - Send invite links to homeowners without accounts
 * - Integration with project creation flow
 */

import React, { useState } from 'react'
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Alert,
  Tabs,
  Tab,
  InputAdornment,
  LinearProgress,
  Chip
} from '@mui/material'
import {
  Search,
  PersonAdd,
  Email,
  Phone,
  Add,
  CheckCircle,
  Link as LinkIcon
} from '@mui/icons-material'

const HomeownerLinking = ({ onHomeownerLinked, selectedHomeowner }) => {
  const [activeTab, setActiveTab] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [inviteFormData, setInviteFormData] = useState({
    name: '',
    email: '',
    phone: ''
  })

  // Mock search results - replace with actual API call
  const mockSearchResults = [
    {
      id: 101,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+1 (555) 111-2222',
      hasAccount: true,
      avatar: null,
      previousProjects: 2
    },
    {
      id: 102,
      name: 'Mike Wilson',
      email: 'mike.wilson@email.com',
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

  const handleSelectExistingHomeowner = (homeowner) => {
    onHomeownerLinked({
      type: 'existing',
      homeowner: homeowner
    })
  }

  const handleSendInvite = () => {
    if (!inviteFormData.name || !inviteFormData.email) {
      alert('Please fill in at least name and email')
      return
    }

    const inviteData = {
      type: 'invite',
      homeowner: {
        name: inviteFormData.name,
        email: inviteFormData.email,
        phone: inviteFormData.phone,
        hasAccount: false,
        inviteLink: `${window.location.origin}/homeowner/invite/${Math.random().toString(36).substr(2, 9)}`
      }
    }

    onHomeownerLinked(inviteData)
    
    // Reset form
    setInviteFormData({ name: '', email: '', phone: '' })
  }

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Link Homeowner to Project
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Search for existing homeowners or send an invite to collaborate on this project
      </Typography>

      {selectedHomeowner ? (
        <Alert severity="success" sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar>
              {selectedHomeowner.name.charAt(0)}
            </Avatar>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {selectedHomeowner.name}
              </Typography>
              <Typography variant="body2">
                {selectedHomeowner.email}
              </Typography>
            </Box>
            <Chip
              label={selectedHomeowner.hasAccount ? 'Has Account' : 'Invite Sent'}
              color={selectedHomeowner.hasAccount ? 'success' : 'warning'}
              size="small"
            />
          </Box>
        </Alert>
      ) : (
        <Card>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={activeTab} onChange={handleTabChange}>
              <Tab label="Search Existing" />
              <Tab label="Send Invite" />
            </Tabs>
          </Box>

          <CardContent>
            {activeTab === 0 ? (
              // Search Existing Homeowners
              <Box>
                <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
                  <Grid item xs={12} md={8}>
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
                  <Grid item xs={12} md={4}>
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
                </Grid>

                {isSearching && (
                  <Box sx={{ mb: 2 }}>
                    <LinearProgress />
                  </Box>
                )}

                {searchResults.length > 0 && (
                  <Box>
                    <Typography variant="subtitle2" gutterBottom>
                      Search Results ({searchResults.length})
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
                              onClick={() => handleSelectExistingHomeowner(homeowner)}
                              startIcon={<CheckCircle />}
                            >
                              Select
                            </Button>
                          </ListItemSecondaryAction>
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                )}

                {searchQuery && searchResults.length === 0 && !isSearching && (
                  <Alert severity="info">
                    No homeowners found matching "{searchQuery}". Try searching with a different name or email, 
                    or use the "Send Invite" tab to invite a new homeowner.
                  </Alert>
                )}
              </Box>
            ) : (
              // Send Invite
              <Box>
                <Alert severity="info" sx={{ mb: 3 }}>
                  Send an invite link to a homeowner who doesn't have an account yet. 
                  They can use this link to collaborate on the project without creating an account.
                </Alert>

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
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={handleSendInvite}
                      disabled={!inviteFormData.name || !inviteFormData.email}
                      startIcon={<LinkIcon />}
                    >
                      Send Invite Link
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            )}
          </CardContent>
        </Card>
      )}
    </Box>
  )
}

export default HomeownerLinking
