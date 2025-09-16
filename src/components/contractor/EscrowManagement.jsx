/**
 * Escrow Management Component
 * 
 * This component manages escrow relationships between contractors and homeowners.
 * Features include:
 * - Homeowner search and invite functionality
 * - Collaborative escrow timeline creation
 * - Milestone tracking with progress photos
 * - Payment management and notifications
 * - Integrated messaging system
 */

import React, { useState } from 'react'
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Tab,
  Tabs,
  Divider
} from '@mui/material'
import {
  Home,
  Timeline,
  Message,
  Payment,
  Add
} from '@mui/icons-material'

import HomeownerSearch from './escrow/HomeownerSearch'
import EscrowTimeline from './escrow/EscrowTimeline'
import MessagingSystem from './escrow/MessagingSystem'
import PaymentManagement from './escrow/PaymentManagement'

const EscrowManagement = ({ selectedProject }) => {
  const [activeTab, setActiveTab] = useState(0)
  const [selectedHomeowner, setSelectedHomeowner] = useState(null)
  const [escrowRelationships, setEscrowRelationships] = useState([
    // Mock data - replace with actual API calls
    {
      id: 1,
      homeowner: {
        id: 1,
        name: 'John Smith',
        email: 'john.smith@email.com',
        phone: '+1 (555) 123-4567',
        hasAccount: true,
        avatar: null
      },
      project: selectedProject,
      status: 'active',
      totalAmount: 45000,
      paidAmount: 15000,
      milestones: 5,
      completedMilestones: 2,
      createdAt: new Date('2024-01-15'),
      lastActivity: new Date('2024-01-20')
    },
    {
      id: 2,
      homeowner: {
        id: 2,
        name: 'Sarah Johnson',
        email: 'sarah.j@email.com',
        phone: '+1 (555) 987-6543',
        hasAccount: false,
        avatar: null
      },
      project: selectedProject,
      status: 'pending_approval',
      totalAmount: 32000,
      paidAmount: 0,
      milestones: 4,
      completedMilestones: 0,
      createdAt: new Date('2024-01-18'),
      lastActivity: new Date('2024-01-18')
    }
  ])

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  const handleHomeownerSelect = (homeowner) => {
    setSelectedHomeowner(homeowner)
    setActiveTab(1) // Switch to timeline tab
  }

  const handleAddHomeowner = (homeownerData) => {
    // Handle adding new homeowner relationship
    console.log('Adding homeowner:', homeownerData)
    // In a real app, this would make an API call
  }

  const tabs = [
    {
      label: 'Homeowners',
      icon: <Home />,
      content: (
        <HomeownerSearch
          escrowRelationships={escrowRelationships}
          onHomeownerSelect={handleHomeownerSelect}
          onAddHomeowner={handleAddHomeowner}
          selectedProject={selectedProject}
        />
      )
    },
    {
      label: 'Timeline',
      icon: <Timeline />,
      content: (
        <EscrowTimeline
          selectedHomeowner={selectedHomeowner}
          selectedProject={selectedProject}
        />
      )
    },
    {
      label: 'Messages',
      icon: <Message />,
      content: (
        <MessagingSystem
          selectedHomeowner={selectedHomeowner}
          selectedProject={selectedProject}
        />
      )
    },
    {
      label: 'Payments',
      icon: <Payment />,
      content: (
        <PaymentManagement
          selectedHomeowner={selectedHomeowner}
          selectedProject={selectedProject}
        />
      )
    }
  ]

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
          Homeowner / Escrow Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {selectedProject 
            ? `Manage escrow relationships for ${selectedProject.name}`
            : 'Manage escrow relationships with homeowners'
          }
        </Typography>
        {selectedHomeowner && (
          <Box sx={{ mt: 2, p: 2, bgcolor: 'primary.50', borderRadius: 1, border: '1px solid', borderColor: 'primary.200' }}>
            <Typography variant="body2" color="primary.main">
              <strong>Active Relationship:</strong> {selectedHomeowner.name} ({selectedHomeowner.email})
            </Typography>
          </Box>
        )}
      </Box>

      {/* Tabs Navigation */}
      <Card sx={{ mb: 3 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{
              '& .MuiTab-root': {
                minHeight: 64,
                textTransform: 'none',
                fontSize: '1rem'
              }
            }}
          >
            {tabs.map((tab, index) => (
              <Tab
                key={index}
                label={tab.label}
                icon={tab.icon}
                iconPosition="start"
                sx={{
                  '&.Mui-selected': {
                    color: 'primary.main',
                    backgroundColor: 'primary.50'
                  }
                }}
              />
            ))}
          </Tabs>
        </Box>
      </Card>

      {/* Tab Content */}
      <Box>
        {tabs[activeTab].content}
      </Box>

      {/* Quick Stats */}
      {escrowRelationships.length > 0 && (
        <Card sx={{ mt: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Quick Overview
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="primary.main" sx={{ fontWeight: 600 }}>
                    {escrowRelationships.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Active Relationships
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="success.main" sx={{ fontWeight: 600 }}>
                    ${escrowRelationships.reduce((sum, rel) => sum + rel.paidAmount, 0).toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Paid
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="warning.main" sx={{ fontWeight: 600 }}>
                    ${escrowRelationships.reduce((sum, rel) => sum + (rel.totalAmount - rel.paidAmount), 0).toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Pending
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="info.main" sx={{ fontWeight: 600 }}>
                    {escrowRelationships.reduce((sum, rel) => sum + rel.completedMilestones, 0)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Completed Milestones
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}
    </Box>
  )
}

export default EscrowManagement
