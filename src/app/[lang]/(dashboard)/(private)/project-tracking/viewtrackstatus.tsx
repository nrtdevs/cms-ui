import React from 'react'

import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, Box } from '@mui/material'

interface Project {
  id: number
  projectname: string
  projectdescription: string
  skills: string[]
  Actualbidammount: number
  platform: string
  bid_date: string
  activation_date: string
  end_date: string
  clientname: string
  status: string
  clientemail: string
  clientcontact: string
  clientcompany: string
  projectlead: string
  frontenddev: string[]
  backenddev: string[]
  testingteam: string[]
  Projectstartdate: string
  recivedammount: number
  pendingammount: number
  clientcountry: string
}

interface ViewTrackStatusProps {
  open: boolean
  handleClose: () => void
  data: Project
}

const ViewTrackStatus: React.FC<ViewTrackStatusProps> = ({ open, handleClose, data }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth='md'
      sx={{
        '& .MuiDialog-container': {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          animation: 'slide-in 0.5s ease-out'
        },
        '@keyframes slide-in': {
          '0%': {
            transform: 'translateY(100%)'
          },
          '100%': {
            transform: 'translateY(0)'
          }
        }
      }}
    >
      <DialogTitle sx={{ animation: 'fade-in 0.3s ease-out' }}>Project Details</DialogTitle>
      <DialogContent sx={{ animation: 'fade-in 0.3s ease-out' }}>
        <Box>
          <Typography variant='h6'>Project Name: {data.projectname}</Typography>
          <Typography variant='body1' sx={{ marginTop: 1 }}>
            <strong>Description:</strong> {data.projectdescription}
          </Typography>
          <Typography variant='body1' sx={{ marginTop: 1 }}>
            <strong>Client Name:</strong> {data.clientname}
          </Typography>
          <Typography variant='body1' sx={{ marginTop: 1 }}>
            <strong>Status:</strong> {data.status}
          </Typography>
          <Typography variant='body1' sx={{ marginTop: 1 }}>
            <strong>Client Email:</strong> {data.clientemail}
          </Typography>
          <Typography variant='body1' sx={{ marginTop: 1 }}>
            <strong>Client Contact:</strong> {data.clientcontact}
          </Typography>
          <Typography variant='body1' sx={{ marginTop: 1 }}>
            <strong>Skills Required:</strong> {data.skills.join(', ')}
          </Typography>
          <Typography variant='body1' sx={{ marginTop: 1 }}>
            <strong>Platform:</strong> {data.platform}
          </Typography>
          <Typography variant='body1' sx={{ marginTop: 1 }}>
            <strong>Project Start Date:</strong> {data.Projectstartdate}
          </Typography>
          <Typography variant='body1' sx={{ marginTop: 1 }}>
            <strong>Bid Date:</strong> {data.bid_date}
          </Typography>
          <Typography variant='body1' sx={{ marginTop: 1 }}>
            <strong>End Date:</strong> {data.end_date}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          onClick={handleClose}
          color='primary'
          sx={{ transition: 'all 0.3s ease', '&:hover': { transform: 'scale(1.05)', backgroundColor: '#fc7182' } }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleClose}
          color='primary'
          autoFocus
          sx={{ transition: 'all 0.3s ease', '&:hover': { transform: 'scale(1.05)', backgroundColor: '#fc7182' } }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ViewTrackStatus
