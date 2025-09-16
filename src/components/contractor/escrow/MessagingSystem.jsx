/**
 * Messaging System Component
 * 
 * This component provides direct communication between contractors and homeowners.
 * Features include:
 * - Real-time messaging interface
 * - File and image sharing
 * - Message history and search
 * - Notification triggers for new messages
 * - Thread organization by topic/milestone
 */

import React, { useState, useRef, useEffect } from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  IconButton,
  Divider,
  Chip,
  Badge,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Alert
} from '@mui/material'
import {
  Send,
  AttachFile,
  PhotoCamera,
  Search,
  MoreVert,
  Reply,
  Star,
  StarBorder,
  Schedule,
  CheckCircle,
  Notifications,
  NotificationsOff
} from '@mui/icons-material'
import { format, isToday, isYesterday } from 'date-fns'

const MessagingSystem = ({ selectedHomeowner, selectedProject }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      senderId: 'contractor',
      senderName: 'John Contractor',
      content: 'Hi Sarah! I wanted to update you on the foundation progress. We\'ve completed the excavation and are ready to pour concrete tomorrow.',
      timestamp: new Date('2024-01-20T09:30:00'),
      type: 'text',
      isRead: true,
      isStarred: false,
      attachments: []
    },
    {
      id: 2,
      senderId: 'homeowner',
      senderName: 'Sarah Johnson',
      content: 'That\'s great news! Will the concrete need time to cure before you can start framing?',
      timestamp: new Date('2024-01-20T10:15:00'),
      type: 'text',
      isRead: true,
      isStarred: false,
      attachments: []
    },
    {
      id: 3,
      senderId: 'contractor',
      senderName: 'John Contractor',
      content: 'Yes, we\'ll need about 48 hours for proper curing. Here are some photos from today\'s work:',
      timestamp: new Date('2024-01-20T10:45:00'),
      type: 'text',
      isRead: true,
      isStarred: true,
      attachments: [
        { id: 1, type: 'image', name: 'foundation_progress.jpg', url: '/api/placeholder/200/150' },
        { id: 2, type: 'image', name: 'excavation_complete.jpg', url: '/api/placeholder/200/150' }
      ]
    },
    {
      id: 4,
      senderId: 'homeowner',
      senderName: 'Sarah Johnson',
      content: 'Perfect! The excavation looks exactly as we discussed. I\'ve approved the first milestone payment.',
      timestamp: new Date('2024-01-20T14:20:00'),
      type: 'text',
      isRead: true,
      isStarred: false,
      attachments: []
    },
    {
      id: 5,
      senderId: 'contractor',
      senderName: 'John Contractor',
      content: 'Thank you! I\'ll send you updates as we progress with the concrete pour. Should be starting early Tuesday morning.',
      timestamp: new Date('2024-01-20T15:10:00'),
      type: 'text',
      isRead: false,
      isStarred: false,
      attachments: []
    }
  ])

  const [newMessage, setNewMessage] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [notifications, setNotifications] = useState(true)
  const messagesEndRef = useRef(null)
  const fileInputRef = useRef(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const message = {
      id: Date.now(),
      senderId: 'contractor',
      senderName: 'John Contractor',
      content: newMessage,
      timestamp: new Date(),
      type: 'text',
      isRead: false,
      isStarred: false,
      attachments: []
    }

    setMessages(prev => [...prev, message])
    setNewMessage('')
    
    // Trigger notification for homeowner
    console.log('New message notification sent to homeowner')
  }

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files)
    if (files.length === 0) return

    const attachments = files.map(file => ({
      id: Date.now() + Math.random(),
      type: file.type.startsWith('image/') ? 'image' : 'file',
      name: file.name,
      url: URL.createObjectURL(file),
      size: file.size
    }))

    const message = {
      id: Date.now(),
      senderId: 'contractor',
      senderName: 'John Contractor',
      content: `Shared ${files.length} file${files.length > 1 ? 's' : ''}`,
      timestamp: new Date(),
      type: 'attachment',
      isRead: false,
      isStarred: false,
      attachments
    }

    setMessages(prev => [...prev, message])
  }

  const toggleStarMessage = (messageId) => {
    setMessages(prev => prev.map(msg =>
      msg.id === messageId ? { ...msg, isStarred: !msg.isStarred } : msg
    ))
  }

  const formatMessageTime = (timestamp) => {
    if (isToday(timestamp)) {
      return format(timestamp, 'h:mm a')
    } else if (isYesterday(timestamp)) {
      return `Yesterday ${format(timestamp, 'h:mm a')}`
    } else {
      return format(timestamp, 'MMM d, h:mm a')
    }
  }

  const filteredMessages = messages.filter(msg =>
    msg.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    msg.senderName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (!selectedHomeowner) {
    return (
      <Card>
        <CardContent>
          <Alert severity="info">
            Please select a homeowner from the Homeowners tab to start messaging.
          </Alert>
        </CardContent>
      </Card>
    )
  }

  return (
    <Box sx={{ height: '70vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Card sx={{ mb: 2 }}>
        <CardContent sx={{ pb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ mr: 2 }}>
                {selectedHomeowner.name.charAt(0)}
              </Avatar>
              <Box>
                <Typography variant="h6">
                  {selectedHomeowner.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {selectedHomeowner.hasAccount ? 'Online' : 'Invited via email'}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton
                onClick={() => setNotifications(!notifications)}
                color={notifications ? 'primary' : 'default'}
              >
                {notifications ? <Notifications /> : <NotificationsOff />}
              </IconButton>
              <IconButton>
                <MoreVert />
              </IconButton>
            </Box>
          </Box>

          {/* Search */}
          <TextField
            fullWidth
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            size="small"
            sx={{ mt: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              )
            }}
          />
        </CardContent>
      </Card>

      {/* Messages Area */}
      <Card sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
          {filteredMessages.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body2" color="text.secondary">
                {searchQuery ? 'No messages found matching your search.' : 'No messages yet. Start the conversation!'}
              </Typography>
            </Box>
          ) : (
            <List sx={{ p: 0 }}>
              {filteredMessages.map((message, index) => {
                const isOwnMessage = message.senderId === 'contractor'
                const showDateDivider = index === 0 || 
                  !isToday(message.timestamp) && 
                  (index === 0 || !isToday(filteredMessages[index - 1].timestamp))

                return (
                  <React.Fragment key={message.id}>
                    {showDateDivider && (
                      <Box sx={{ textAlign: 'center', my: 2 }}>
                        <Chip 
                          label={format(message.timestamp, 'MMMM d, yyyy')} 
                          size="small" 
                          variant="outlined"
                        />
                      </Box>
                    )}
                    
                    <ListItem
                      sx={{
                        flexDirection: isOwnMessage ? 'row-reverse' : 'row',
                        alignItems: 'flex-start',
                        px: 1,
                        py: 1
                      }}
                    >
                      <ListItemAvatar sx={{ minWidth: isOwnMessage ? 'auto' : 56, ml: isOwnMessage ? 1 : 0, mr: isOwnMessage ? 0 : 1 }}>
                        <Avatar 
                          sx={{ 
                            bgcolor: isOwnMessage ? 'primary.main' : 'secondary.main',
                            width: 32, 
                            height: 32 
                          }}
                        >
                          {message.senderName.charAt(0)}
                        </Avatar>
                      </ListItemAvatar>
                      
                      <Box
                        sx={{
                          maxWidth: '70%',
                          width: 'fit-content'
                        }}
                      >
                        <Paper
                          elevation={1}
                          sx={{
                            p: 2,
                            bgcolor: isOwnMessage ? 'primary.main' : 'grey.100',
                            color: isOwnMessage ? 'primary.contrastText' : 'text.primary',
                            borderRadius: 2,
                            borderTopRightRadius: isOwnMessage ? 4 : 16,
                            borderTopLeftRadius: isOwnMessage ? 16 : 4,
                            position: 'relative'
                          }}
                        >
                          <Typography variant="body2" sx={{ mb: 1 }}>
                            {message.content}
                          </Typography>

                          {/* Attachments */}
                          {message.attachments.length > 0 && (
                            <Box sx={{ mt: 2 }}>
                              <Grid container spacing={1}>
                                {message.attachments.map((attachment) => (
                                  <Grid item key={attachment.id}>
                                    {attachment.type === 'image' ? (
                                      <img
                                        src={attachment.url}
                                        alt={attachment.name}
                                        style={{
                                          maxWidth: 200,
                                          maxHeight: 150,
                                          borderRadius: 8,
                                          cursor: 'pointer'
                                        }}
                                      />
                                    ) : (
                                      <Paper
                                        sx={{
                                          p: 1,
                                          display: 'flex',
                                          alignItems: 'center',
                                          bgcolor: 'rgba(255,255,255,0.1)',
                                          cursor: 'pointer'
                                        }}
                                      >
                                        <AttachFile sx={{ mr: 1, fontSize: 16 }} />
                                        <Typography variant="caption">
                                          {attachment.name}
                                        </Typography>
                                      </Paper>
                                    )}
                                  </Grid>
                                ))}
                              </Grid>
                            </Box>
                          )}

                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1 }}>
                            <Typography 
                              variant="caption" 
                              sx={{ 
                                opacity: 0.8,
                                fontSize: '0.7rem'
                              }}
                            >
                              {formatMessageTime(message.timestamp)}
                            </Typography>
                            <Box>
                              <IconButton
                                size="small"
                                onClick={() => toggleStarMessage(message.id)}
                                sx={{ 
                                  color: isOwnMessage ? 'primary.contrastText' : 'text.secondary',
                                  opacity: message.isStarred ? 1 : 0.5,
                                  '&:hover': { opacity: 1 }
                                }}
                              >
                                {message.isStarred ? <Star sx={{ fontSize: 14 }} /> : <StarBorder sx={{ fontSize: 14 }} />}
                              </IconButton>
                            </Box>
                          </Box>
                        </Paper>
                      </Box>
                    </ListItem>
                  </React.Fragment>
                )
              })}
              <div ref={messagesEndRef} />
            </List>
          )}
        </Box>

        {/* Message Input */}
        <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1 }}>
            <TextField
              fullWidth
              multiline
              maxRows={3}
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSendMessage()
                }
              }}
              variant="outlined"
              size="small"
            />
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              multiple
              accept="image/*,.pdf,.doc,.docx"
              onChange={handleFileUpload}
            />
            <IconButton
              onClick={() => fileInputRef.current?.click()}
              color="primary"
            >
              <AttachFile />
            </IconButton>
            <IconButton
              onClick={() => {
                fileInputRef.current.accept = "image/*"
                fileInputRef.current?.click()
              }}
              color="primary"
            >
              <PhotoCamera />
            </IconButton>
            <Button
              variant="contained"
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              sx={{ minWidth: 'auto', px: 2 }}
            >
              <Send />
            </Button>
          </Box>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            Press Enter to send, Shift+Enter for new line
          </Typography>
        </Box>
      </Card>
    </Box>
  )
}

export default MessagingSystem
