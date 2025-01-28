'use client'
import React, { useState } from 'react'

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  Divider,
  Grid,
  Box
} from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'

// Define the base theme with customizable colors and typography
const getTheme = (mode: 'light' | 'dark') =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'light' ? '#3f51b5' : '#90caf9' // Blue for light, light blue for dark
      },
      secondary: {
        main: '#f50057' // Pink (same for both modes)
      },
      background: {
        default: mode === 'light' ? '#f5f5f5' : '#121212', // Light background for light mode, dark for dark mode
        paper: mode === 'light' ? '#ffffff' : '#333333' // Paper color for cards and dialogs
      },
      text: {
        primary: mode === 'light' ? '#333333' : '#ffffff', // Dark text for light mode, white text for dark mode
        secondary: '#777777' // Lighter gray text (same for both modes)
      }
    },
    typography: {
      h6: {
        fontWeight: 600
      },
      body1: {
        fontSize: '1rem'
      }
    }
  })

type ViewProjectInfoProps = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  data: {
    id: number
    fullname: string
    event: string
    description: string
    attributes: string
    createdDate: string
  }
}

const ViewLogsInfo: React.FC<ViewProjectInfoProps> = ({ open, setOpen, data }) => {
  const [mode, setMode] = useState<'light' | 'dark'>('light') // Light mode by default

  return (
    // <ThemeProvider theme={getTheme(mode)}>
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth='sm'>
      {/* Dialog Title */}
      <DialogTitle className='font-bold text-primary align-left text-left '>User Details</DialogTitle>

      {/* Dialog Content */}
      <DialogContent sx={{ backgroundColor: 'background.paper', padding: '32px' }}>
        {/* Section 1: User Information */}
        <Box mb={3}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Typography variant='h6' className='text-primary'>
                <br />
                Full Name
              </Typography>
              <Typography variant='body1'>{data.fullname}</Typography>
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ width: '100%', marginY: 2 }} />

        {/* Section 2: Additional Information */}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant='h6' className=' text-primary'>
              Event
            </Typography>
            <Typography variant='body1'>{data.event}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant='h6' className=' text-primary'>
              User ID
            </Typography>
            <Typography variant='body1'>{data.id.toLocaleString()}</Typography>
          </Grid>
        </Grid>

        <Grid container spacing={3} mt={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant='h6' className=' text-primary'>
              Attributes
            </Typography>
            <Typography variant='body1'>{data.attributes}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant='h6' className=' text-primary'>
              Created Date
            </Typography>
            <Typography variant='body1'>{data.createdDate}</Typography>
          </Grid>
          {/* <Grid item xs={12} sm={6}>
              <Typography variant='h6' className=' text-primary'>
                Contact
              </Typography>
              <Typography variant='body1'>{data.contact}</Typography>
            </Grid> */}
        </Grid>

        <Divider sx={{ width: '100%', marginY: 2 }} />

        <Grid container spacing={2} >
          <Grid item xs={12} sm={6}>
            <Typography variant='h6' className=' text-primary'>
              Description
            </Typography>
            <Typography variant='body1'>{data.description}</Typography>
          </Grid>
        </Grid>
      </DialogContent>

      {/* Dialog Actions */}
      <DialogActions>
        <Button onClick={() => setOpen(false)} color='secondary'>
          Close
        </Button>
      </DialogActions>
    </Dialog>
    // </ThemeProvider>
  )
}

export default ViewLogsInfo
