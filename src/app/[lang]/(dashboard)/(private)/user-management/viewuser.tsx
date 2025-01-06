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
    id: string
    firstname: string
    lastname: string
    email: string
    employeeId: string
    contact: string
    position: string | string[]
    company: string
    employeeType: string
    fullname: string
  }
}

const ViewUserInfo: React.FC<ViewProjectInfoProps> = ({ open, setOpen, data }) => {
  const [mode, setMode] = useState<'light' | 'dark'>('light') // Light mode by default

  return (
    <ThemeProvider theme={getTheme(mode)}>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth='md'>
        {/* Dialog Title */}
        <DialogTitle sx={{ backgroundColor: 'primary.main', color: 'white', fontWeight: 'bold' }}>
          User Details
        </DialogTitle>

        {/* Dialog Content */}
        <DialogContent sx={{ backgroundColor: 'background.paper', padding: '32px' }}>
          {/* Section 1: User Information */}
          <Box mb={3}>
            <Typography variant='h6' className='text-primary font-bold' gutterBottom>
              User Information
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <Typography variant='subtitle2' color='text.secondary'>
                  Full Name
                </Typography>
                <Typography variant='body1'>{data.fullname}</Typography>
              </Grid>
            </Grid>
          </Box>

          {/* Section 2: Additional Information */}
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography variant='subtitle2' color='text.secondary'>
                Position
              </Typography>
              <Typography variant='body1'>{data.position}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant='subtitle2' color='text.secondary'>
                User ID
              </Typography>
              <Typography variant='body1'>{data.employeeId.toLocaleString()}</Typography>
            </Grid>
          </Grid>

          <Grid container spacing={3} mt={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant='subtitle2' color='text.secondary'>
                Company
              </Typography>
              <Typography variant='body1'>{data.company}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant='subtitle2' color='text.secondary'>
                Employee Type
              </Typography>
              <Typography variant='body1'>{data.employeeType}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant='subtitle2' color='text.secondary'>
                Contact
              </Typography>
              <Typography variant='body1'>{data.contact}</Typography>
            </Grid>
          </Grid>

          {/* Section 3: Email */}
          <Box mt={3}>
            <Typography variant='subtitle2' color='text.secondary'>
              Email
            </Typography>
            <Typography variant='body1'>{data.email}</Typography>
          </Box>

          {/* Divider for clean separation */}
          <Divider sx={{ marginTop: 3, marginBottom: 3 }} />
        </DialogContent>

        {/* Dialog Actions */}
        <DialogActions sx={{ padding: '16px 32px', backgroundColor: 'background.default' }}>
          <Button onClick={() => setOpen(false)} color='primary' variant='contained'>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  )
}

export default ViewUserInfo
