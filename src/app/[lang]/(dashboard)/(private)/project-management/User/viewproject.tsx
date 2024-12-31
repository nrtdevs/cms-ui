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
    projectname: string
    projectdescription: string
    skills: string[]
    bidammount: number
    platform: string
    bid_date: string
    end_date: string
    clientname: string
    status: string
    clientemail: string
    clientcontact: string
    clientcompany: string
  }
}

const ViewProjectInfo: React.FC<ViewProjectInfoProps> = ({ open, setOpen, data }) => {
  const [mode, setMode] = useState<'light' | 'dark'>('light') // Light mode by default

  return (
    <ThemeProvider theme={getTheme(mode)}>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth='md'>
        <DialogTitle sx={{ backgroundColor: 'primary.main', color: 'white' }}>Project Details</DialogTitle>
        <DialogContent sx={{ backgroundColor: 'background.paper', padding: '24px' }}>
          <Box mb={2}>
            <Grid className='mt-5'>
              <Typography variant='h6' className='text-primary font-bold' gutterBottom>
                Project Information
              </Typography>
            </Grid>
            <Typography variant='h6' gutterBottom>
              Project Name
            </Typography>
            <Typography variant='body1' color='text.secondary'>
              {data.projectname}
            </Typography>
          </Box>

          <Grid container spacing={2} mt={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant='h6'>Skills</Typography>
              <Typography variant='body1' color='text.secondary'>
                {data.skills.join(', ')}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant='h6'>Bid Amount</Typography>
              <Typography variant='body1' color='text.secondary'>
                ${data.bidammount.toLocaleString()}
              </Typography>
            </Grid>
          </Grid>

          <Grid container spacing={2} mt={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant='h6'>Platform</Typography>
              <Typography variant='body1' color='text.secondary'>
                {data.platform}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant='h6'>Bidding Date</Typography>
              <Typography variant='body1' color='text.secondary'>
                {data.bid_date}
              </Typography>
            </Grid>
          </Grid>

          <Box mt={2} mb={2}>
            <Typography variant='h6' gutterBottom>
              Description
            </Typography>
            <Typography variant='body1' color='text.secondary'>
              {data.projectdescription}
            </Typography>
          </Box>

          <Divider />

          {/* Client Information Section */}
          <Box mt={2}>
            <Grid className='mt-5'>
              <Typography variant='h6' className='text-primary font-bold' gutterBottom>
                Client Information
              </Typography>
            </Grid>

            <Grid container spacing={2} mt={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant='h6'>Client Name</Typography>
                <Typography variant='body1' color='text.secondary'>
                  {data.clientname}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant='h6'>Client Email</Typography>
                <Typography variant='body1' color='text.secondary'>
                  {data.clientemail}
                </Typography>
              </Grid>
            </Grid>

            <Grid container spacing={2} mt={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant='h6'>Client Contact</Typography>
                <Typography variant='body1' color='text.secondary'>
                  {data.clientcontact}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant='h6'>Client Company</Typography>
                <Typography variant='body1' color='text.secondary'>
                  {data.clientcompany}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>

        <DialogActions className='bg-[transparent]'>
          <Button onClick={() => setOpen(false)} color='primary' variant='contained'>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  )
}

export default ViewProjectInfo
