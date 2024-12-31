'use client'
import React from 'react'

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

type ViewProjectInfoProps = {
  open: boolean
  onClose: () => void
  setOpen: (open: boolean) => void
  data: {
    projectname: string
    projectdescription: string
    skills: string[]
    bidammount: number
    platform: string
    activation_date: string
    end_date: string
    clientname: string
    status: string
    clientemail: string
    clientcontact: string
    clientcompany: string
  }
}

const handleClose = (setOpen: (open: boolean) => void) => {
  setOpen(false)
}

const ViewProjectInfo: React.FC<ViewProjectInfoProps> = ({ open, setOpen, data }) => {
  return (
    <Dialog open={open} onClose={setOpen} fullWidth maxWidth='md'>
      <DialogTitle>Project Details</DialogTitle>
      <DialogContent>
        <Box mb={2}>
          <Typography variant='h6' gutterBottom>
            Project Name
          </Typography>
          <Typography variant='body1' color='textSecondary'>
            {data.projectname}
          </Typography>
        </Box>

        <Divider />

        <Box mt={2} mb={2}>
          <Typography variant='h6' gutterBottom>
            Description
          </Typography>
          <Typography variant='body1' color='textSecondary'>
            {data.projectdescription}
          </Typography>
        </Box>

        <Divider />

        <Grid container spacing={2} mt={2}>
          <Grid item xs={6}>
            <Typography variant='h6'>Skills</Typography>
            <Typography variant='body1' color='textSecondary'>
              {data.skills.join(', ')}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant='h6'>Bid Amount</Typography>
            <Typography variant='body1' color='textSecondary'>
              ${data.bidammount.toLocaleString()}
            </Typography>
          </Grid>
        </Grid>

        <Divider />

        <Grid container spacing={2} mt={2}>
          <Grid item xs={6}>
            <Typography variant='h6'>Platform</Typography>
            <Typography variant='body1' color='textSecondary'>
              {data.platform}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant='h6'>Activation Date</Typography>
            <Typography variant='body1' color='textSecondary'>
              {data.activation_date}
            </Typography>
          </Grid>
        </Grid>

        <Divider />

        <Grid container spacing={2} mt={2}>
          <Grid item xs={6}>
            <Typography variant='h6'>End Date</Typography>
            <Typography variant='body1' color='textSecondary'>
              {data.end_date}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant='h6'>Status</Typography>
            <Typography variant='body1' color='textSecondary'>
              {data.status}
            </Typography>
          </Grid>
        </Grid>

        <Divider />

        <Box mt={2}>
          <Typography variant='h6' gutterBottom>
            Client Information
          </Typography>
          <Typography variant='body1' color='textSecondary'>
            Name: {data.clientname}
          </Typography>
          <Typography variant='body1' color='textSecondary'>
            Email: {data.clientemail}
          </Typography>
          <Typography variant='body1' color='textSecondary'>
            Contact: {data.clientcontact}
          </Typography>
          <Typography variant='body1' color='textSecondary'>
            Company: {data.clientcompany}
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={() => handleClose(setOpen)} color='primary'>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ViewProjectInfo
