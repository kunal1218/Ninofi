/**
 * Project Timeline Component
 * 
 * This component manages the project-specific escrow timeline with checkpoints.
 * Each project has its own timeline tied to a specific homeowner.
 * Features include:
 * - Project-specific checkpoint/milestone management
 * - Progress photo uploads
 * - Real-time messaging with homeowner
 * - Payment requests and confirmations
 * - Mutual approval system
 */

import React, { useState } from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Tab,
  Tabs,
  Alert,
  Chip,
  Avatar,
  Button,
  LinearProgress
} from '@mui/material'
import {
  Timeline as TimelineIcon,
  Message,
  Payment,
  Person,
  CheckCircle,
  Warning
} from '@mui/icons-material'

import ProjectCheckpoints from './timeline/ProjectCheckpoints'
import ProjectMessaging from './timeline/ProjectMessaging'
import ProjectPayments from './timeline/ProjectPayments'

const ProjectTimeline = ({ selectedProject }) => {
  const [activeTab, setActiveTab] = useState(0)

  // Mock project data with linked homeowner
  const projectData = selectedProject ? {
    ...selectedProject,
    homeowner: {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '+1 (555) 987-6543',
      hasAccount: true,
      avatar: null,
      linkedDate: new Date('2024-01-15')
    },
    checkpoints: [
      {
        id: 1,
        title: 'Site Preparation & Permits',
        description: 'Clear site, obtain permits, set up utilities',
        status: 'completed',
        amount: 5000,
        dueDate: new Date('2024-02-01'),
        completedDate: new Date('2024-01-28'),
        contractorApproved: true,
        homeownerApproved: true,
        paymentReleased: true,
        photos: [
          { id: 1, url: '/api/placeholder/200/150', caption: 'Site cleared and prepared' },
          { id: 2, url: '/api/placeholder/200/150', caption: 'Permits obtained' }
        ],
        order: 1
      },
      {
        id: 2,
        title: 'Foundation Work',
        description: 'Excavation, concrete pour, and foundation setup',
        status: 'completed',
        amount: 12000,
        dueDate: new Date('2024-02-15'),
        completedDate: new Date('2024-02-12'),
        contractorApproved: true,
        homeownerApproved: true,
        paymentReleased: true,
        photos: [
          { id: 3, url: '/api/placeholder/200/150', caption: 'Foundation complete' }
        ],
        order: 2
      },
      {
        id: 3,
        title: 'Framing & Structure',
        description: 'Install main structural elements and framing',
        status: 'in_progress',
        amount: 15000,
        dueDate: new Date('2024-03-01'),
        completedDate: null,
        contractorApproved: false,
        homeownerApproved: false,
        paymentReleased: false,
        photos: [
          { id: 4, url: '/api/placeholder/200/150', caption: 'Framing in progress' }
        ],
        order: 3
      },
      {
        id: 4,
        title: 'Install Door',
        description: 'Install main entrance door and hardware',
        status: 'pending',
        amount: 2500,
        dueDate: new Date('2024-03-10'),
        completedDate: null,
        contractorApproved: false,
        homeownerApproved: false,
        paymentReleased: false,
        photos: [],
        order: 4
      },
      {
        id: 5,
        title: 'Electrical & Plumbing',
        description: 'Install electrical systems and plumbing infrastructure',
        status: 'pending',
        amount: 18000,
        dueDate: new Date('2024-03-20'),
        completedDate: null,
        contractorApproved: false,
        homeownerApproved: false,
        paymentReleased: false,
        photos: [],
        order: 5
      }
    ],
    totalAmount: 52500,
    paidAmount: 17000,
    completedCheckpoints: 2
  } : null

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  if (!selectedProject) {
    return (
      <Card>
        <CardContent>
          <Alert severity="info">
            Please select a project to view its timeline and manage checkpoints.
          </Alert>
        </CardContent>
      </Card>
    )
  }

  if (!projectData.homeowner) {
    return (
      <Card>
        <CardContent>
          <Alert severity="warning">
            This project doesn't have a linked homeowner yet. Please link a homeowner to enable timeline management.
          </Alert>
          <Button variant="contained" sx={{ mt: 2 }}>
            Link Homeowner
          </Button>
        </CardContent>
      </Card>
    )
  }

  const tabs = [
    {
      label: 'Timeline',
      icon: <TimelineIcon />,
      content: (
        <ProjectCheckpoints
          project={projectData}
          checkpoints={projectData.checkpoints}
        />
      )
    },
    {
      label: 'Messages',
      icon: <Message />,
      content: (
        <ProjectMessaging
          project={projectData}
          homeowner={projectData.homeowner}
        />
      )
    },
    {
      label: 'Payments',
      icon: <Payment />,
      content: (
        <ProjectPayments
          project={projectData}
          checkpoints={projectData.checkpoints}
        />
      )
    }
  ]

  return (
    <Box>
      {/* Project Header */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
                {projectData.name}
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                {projectData.description}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                <Avatar sx={{ mr: 2 }}>
                  <Person />
                </Avatar>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {projectData.homeowner.name}
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
                    <Typography variant="h3" color="success.main" sx={{ fontWeight: 600 }}>
                      {projectData.completedCheckpoints}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Completed
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" color="primary.main" sx={{ fontWeight: 600 }}>
                      {projectData.checkpoints.length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Checkpoints
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" color="info.main" sx={{ fontWeight: 600 }}>
                      ${projectData.paidAmount.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Paid
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
              
              <Box sx={{ mt: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Progress
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {Math.round((projectData.completedCheckpoints / projectData.checkpoints.length) * 100)}%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={(projectData.completedCheckpoints / projectData.checkpoints.length) * 100}
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

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
    </Box>
  )
}

export default ProjectTimeline
