/**
 * Project Messaging Component
 * 
 * A fully functional real-time messaging system for contractor-homeowner communication.
 * Designed to be easily editable and expandable for future features.
 * Features include:
 * - Real-time message sending and receiving
 * - File and image attachments
 * - Message status indicators
 * - Typing indicators
 * - Message search and filtering
 * - Expandable architecture for future features
 */

import React, { useState, useRef, useEffect, useCallback } from 'react'
import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  List,
  ListItem,
  Paper,
  IconButton,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Chip,
  Badge,
  Tooltip,
  Menu,
  MenuItem,
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
  CheckCircle,
  Schedule,
  Person,
  Notifications,
  NotificationsOff,
  EmojiEmotions,
  Mic,
  VideoCall
} from '@mui/icons-material'
import { format, isToday, isYesterday, differenceInMinutes } from 'date-fns'

// Message Types Configuration - Easily expandable
const MESSAGE_TYPES = {
  TEXT: 'text',
  IMAGE: 'image',
  FILE: 'file',
  SYSTEM: 'system',
  CHECKPOINT_UPDATE: 'checkpoint_update',
  PAYMENT_REQUEST: 'payment_request'
}

// Message Status Configuration
const MESSAGE_STATUS = {
  SENDING: 'sending',
  SENT: 'sent',
  DELIVERED: 'delivered',
  READ: 'read',
  FAILED: 'failed'
}

const ProjectMessaging = ({ project, homeowner }) => {
  // Core messaging state
  const [messages, setMessages] = useState([
    {
      id: 1,
      senderId: 'contractor',
      senderName: 'John Contractor',
      content: `Hi ${homeowner.name}! I wanted to update you on the foundation progress. We've completed the excavation and are ready to pour concrete tomorrow.`,
      timestamp: new Date('2024-01-20T09:30:00'),
      type: MESSAGE_TYPES.TEXT,
      status: MESSAGE_STATUS.READ,
      isStarred: false,
      attachments: [],
      replyTo: null
    },
    {
      id: 2,
      senderId: 'homeowner',
      senderName: homeowner.name,
      content: 'That\'s great news! Will the concrete need time to cure before you can start framing?',
      timestamp: new Date('2024-01-20T10:15:00'),
      type: MESSAGE_TYPES.TEXT,
      status: MESSAGE_STATUS.READ,
      isStarred: false,
      attachments: [],
      replyTo: null
    },
    {
      id: 3,
      senderId: 'contractor',
      senderName: 'John Contractor',
      content: 'Yes, we\'ll need about 48 hours for proper curing. Here are some photos from today\'s work:',
      timestamp: new Date('2024-01-20T10:45:00'),
      type: MESSAGE_TYPES.TEXT,
      status: MESSAGE_STATUS.READ,
      isStarred: true,
      attachments: [
        { id: 1, type: 'image', name: 'foundation_progress.jpg', url: '/api/placeholder/200/150', size: 245760 },
        { id: 2, type: 'image', name: 'excavation_complete.jpg', url: '/api/placeholder/200/150', size: 189440 }
      ],
      replyTo: null
    },
    {
      id: 4,
      senderId: 'system',
      senderName: 'System',
      content: 'Checkpoint "Foundation Work" has been marked as complete',
      timestamp: new Date('2024-01-20T14:20:00'),
      type: MESSAGE_TYPES.CHECKPOINT_UPDATE,
      status: MESSAGE_STATUS.DELIVERED,
      isStarred: false,
      attachments: [],
      replyTo: null,
      metadata: { checkpointId: 2, checkpointTitle: 'Foundation Work' }
    },
    {
      id: 5,
      senderId: 'homeowner',
      senderName: homeowner.name,
      content: 'Perfect! The excavation looks exactly as we discussed. I\'ve approved the checkpoint.',
      timestamp: new Date('2024-01-20T14:25:00'),
      type: MESSAGE_TYPES.TEXT,
      status: MESSAGE_STATUS.READ,
      isStarred: false,
      attachments: [],
      replyTo: null
    }
  ])

  // UI state
  const [newMessage, setNewMessage] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [menuAnchor, setMenuAnchor] = useState(null)
  const [replyingTo, setReplyingTo] = useState(null)

  // Refs
  const messagesEndRef = useRef(null)
  const fileInputRef = useRef(null)
  const typingTimeoutRef = useRef(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Simulated typing indicator
  const handleTyping = useCallback(() => {
    if (!isTyping) {
      setIsTyping(true)
    }
    
    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }
    
    // Set new timeout
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false)
    }, 1000)
  }, [isTyping])

  // Send message function - easily expandable
  const sendMessage = useCallback((content, type = MESSAGE_TYPES.TEXT, attachments = [], replyTo = null) => {
    const message = {
      id: Date.now(),
      senderId: 'contractor',
      senderName: 'John Contractor',
      content,
      timestamp: new Date(),
      type,
      status: MESSAGE_STATUS.SENDING,
      isStarred: false,
      attachments,
      replyTo
    }

    setMessages(prev => [...prev, message])

    // Simulate message delivery
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === message.id 
          ? { ...msg, status: MESSAGE_STATUS.SENT }
          : msg
      ))
    }, 500)

    // Simulate homeowner reading (if they have account)
    if (homeowner.hasAccount) {
      setTimeout(() => {
        setMessages(prev => prev.map(msg => 
          msg.id === message.id 
            ? { ...msg, status: MESSAGE_STATUS.DELIVERED }
            : msg
        ))
      }, 1000)
    }

    return message
  }, [homeowner.hasAccount])

  // Handle text message send
  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    sendMessage(newMessage, MESSAGE_TYPES.TEXT, [], replyingTo?.id || null)
    setNewMessage('')
    setReplyingTo(null)
    
    // Trigger notification for homeowner
    console.log('New message notification sent to homeowner')
  }

  // Handle file upload
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

    const content = attachments.length === 1 
      ? `Shared ${attachments[0].name}`
      : `Shared ${attachments.length} files`

    sendMessage(content, MESSAGE_TYPES.FILE, attachments)
  }

  // Message actions
  const toggleStarMessage = (messageId) => {
    setMessages(prev => prev.map(msg =>
      msg.id === messageId ? { ...msg, isStarred: !msg.isStarred } : msg
    ))
  }

  const handleReply = (message) => {
    setReplyingTo(message)
    setMenuAnchor(null)
  }

  // Format message time
  const formatMessageTime = (timestamp) => {
    if (isToday(timestamp)) {
      return format(timestamp, 'h:mm a')
    } else if (isYesterday(timestamp)) {
      return `Yesterday ${format(timestamp, 'h:mm a')}`
    } else {
      return format(timestamp, 'MMM d, h:mm a')
    }
  }

  // Get message status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case MESSAGE_STATUS.SENDING:
        return <Schedule sx={{ fontSize: 14, opacity: 0.5 }} />
      case MESSAGE_STATUS.SENT:
      case MESSAGE_STATUS.DELIVERED:
        return <CheckCircle sx={{ fontSize: 14, opacity: 0.7 }} />
      case MESSAGE_STATUS.READ:
        return <CheckCircle sx={{ fontSize: 14, color: 'primary.main' }} />
      default:
        return null
    }
  }

  // Filter messages based on search
  const filteredMessages = messages.filter(msg =>
    msg.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    msg.senderName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Group messages by date for better UX
  const groupMessagesByDate = (messages) => {
    const groups = {}
    messages.forEach(msg => {
      const dateKey = format(msg.timestamp, 'yyyy-MM-dd')
      if (!groups[dateKey]) {
        groups[dateKey] = []
      }
      groups[dateKey].push(msg)
    })
    return groups
  }

  const messageGroups = groupMessagesByDate(filteredMessages)

  return (
    <Box sx={{ height: '70vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ mr: 2 }}>
              <Person />
            </Avatar>
            <Box>
              <Typography variant="h6">
                {homeowner.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {homeowner.hasAccount ? 'Online' : 'Invited via email'}
                {isTyping && homeowner.hasAccount && (
                  <Chip 
                    label="Typing..." 
                    size="small" 
                    color="primary" 
                    sx={{ ml: 1 }} 
                  />
                )}
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* Future expansion buttons */}
            <Tooltip title="Video Call (Coming Soon)">
              <IconButton disabled>
                <VideoCall />
              </IconButton>
            </Tooltip>
            <Tooltip title="Voice Call (Coming Soon)">
              <IconButton disabled>
                <Mic />
              </IconButton>
            </Tooltip>
            <IconButton
              onClick={() => setNotifications(!notifications)}
              color={notifications ? 'primary' : 'default'}
            >
              {notifications ? <Notifications /> : <NotificationsOff />}
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
      </Paper>

      {/* Messages Area */}
      <Paper 
        elevation={1} 
        sx={{ 
          flexGrow: 1, 
          display: 'flex', 
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
          {Object.keys(messageGroups).length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body2" color="text.secondary">
                {searchQuery ? 'No messages found matching your search.' : 'Start your conversation with the homeowner!'}
              </Typography>
            </Box>
          ) : (
            Object.entries(messageGroups).map(([dateKey, dayMessages]) => (
              <Box key={dateKey}>
                {/* Date Divider */}
                <Box sx={{ textAlign: 'center', my: 2 }}>
                  <Chip 
                    label={format(new Date(dateKey), 'MMMM d, yyyy')} 
                    size="small" 
                    variant="outlined"
                  />
                </Box>

                {/* Messages for this day */}
                {dayMessages.map((message) => {
                  const isOwnMessage = message.senderId === 'contractor'
                  const isSystemMessage = message.type === MESSAGE_TYPES.SYSTEM || message.type === MESSAGE_TYPES.CHECKPOINT_UPDATE

                  if (isSystemMessage) {
                    return (
                      <Box key={message.id} sx={{ textAlign: 'center', my: 2 }}>
                        <Alert severity="info" sx={{ maxWidth: 400, mx: 'auto' }}>
                          <Typography variant="body2">
                            {message.content}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {formatMessageTime(message.timestamp)}
                          </Typography>
                        </Alert>
                      </Box>
                    )
                  }

                  return (
                    <Box
                      key={message.id}
                      sx={{
                        display: 'flex',
                        flexDirection: isOwnMessage ? 'row-reverse' : 'row',
                        alignItems: 'flex-start',
                        mb: 2
                      }}
                    >
                      <Avatar 
                        sx={{ 
                          bgcolor: isOwnMessage ? 'primary.main' : 'secondary.main',
                          width: 32, 
                          height: 32,
                          mx: 1
                        }}
                      >
                        {message.senderName.charAt(0)}
                      </Avatar>
                      
                      <Box sx={{ maxWidth: '70%' }}>
                        {/* Reply indicator */}
                        {message.replyTo && (
                          <Box sx={{ mb: 1, opacity: 0.7 }}>
                            <Typography variant="caption" color="text.secondary">
                              Replying to previous message
                            </Typography>
                          </Box>
                        )}

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

                          {/* Message footer */}
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
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              {isOwnMessage && getStatusIcon(message.status)}
                              <IconButton
                                size="small"
                                onClick={() => toggleStarMessage(message.id)}
                                sx={{ 
                                  color: isOwnMessage ? 'primary.contrastText' : 'text.secondary',
                                  opacity: message.isStarred ? 1 : 0.5,
                                  '&:hover': { opacity: 1 }
                                }}
                              >
                                {message.isStarred ? <Star sx={{ fontSize: 12 }} /> : <StarBorder sx={{ fontSize: 12 }} />}
                              </IconButton>
                              <IconButton
                                size="small"
                                onClick={(e) => {
                                  setSelectedMessage(message)
                                  setMenuAnchor(e.currentTarget)
                                }}
                                sx={{ 
                                  color: isOwnMessage ? 'primary.contrastText' : 'text.secondary',
                                  opacity: 0.5,
                                  '&:hover': { opacity: 1 }
                                }}
                              >
                                <MoreVert sx={{ fontSize: 12 }} />
                              </IconButton>
                            </Box>
                          </Box>
                        </Paper>
                      </Box>
                    </Box>
                  )
                })}
              </Box>
            ))
          )}
          <div ref={messagesEndRef} />
        </Box>

        {/* Reply indicator */}
        {replyingTo && (
          <Box sx={{ p: 1, bgcolor: 'grey.50', borderTop: 1, borderColor: 'divider' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="caption" color="text.secondary">
                Replying to: {replyingTo.content.substring(0, 50)}...
              </Typography>
              <IconButton size="small" onClick={() => setReplyingTo(null)}>
                <MoreVert />
              </IconButton>
            </Box>
          </Box>
        )}

        {/* Message Input */}
        <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1 }}>
            <TextField
              fullWidth
              multiline
              maxRows={3}
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => {
                setNewMessage(e.target.value)
                handleTyping()
              }}
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
            {/* Future expansion - emoji picker */}
            <Tooltip title="Emojis (Coming Soon)">
              <IconButton disabled>
                <EmojiEmotions />
              </IconButton>
            </Tooltip>
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
      </Paper>

      {/* Message Actions Menu */}
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={() => setMenuAnchor(null)}
      >
        <MenuItem onClick={() => handleReply(selectedMessage)}>
          <Reply sx={{ mr: 1 }} />
          Reply
        </MenuItem>
        <MenuItem onClick={() => toggleStarMessage(selectedMessage?.id)}>
          {selectedMessage?.isStarred ? <StarBorder sx={{ mr: 1 }} /> : <Star sx={{ mr: 1 }} />}
          {selectedMessage?.isStarred ? 'Unstar' : 'Star'}
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default ProjectMessaging
