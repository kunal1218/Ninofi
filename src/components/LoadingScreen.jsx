import React from 'react'
import { Box, CircularProgress, Typography } from '@mui/material'

const LoadingScreen = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}
    >
      <CircularProgress 
        size={60} 
        thickness={4}
        sx={{ 
          color: 'white',
          mb: 3
        }} 
      />
      <Typography 
        variant="h6" 
        color="white"
        sx={{ fontWeight: 500 }}
      >
        Loading Mavu...
      </Typography>
    </Box>
  )
}

export default LoadingScreen
