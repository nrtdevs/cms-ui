import React, { useState, useEffect } from 'react'

import {
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Box,
} from '@mui/material'

interface Remark {
  open: boolean
  setOpen: (open: boolean) => void
  data: {
    remark: string
    date: string
    username: string
  }
}

interface ViewFinanceProps {
  open: boolean
  setOpen: (open: boolean) => void
  data: {
    ticketName: string
    id: string
    ticketDescription: string
    assignee: string
    status: string
    priority: string
    tags: string[]
    remarks: Remark[]
  }
}

const ViewRemarkData: React.FC<Remark> = ({ open, setOpen, data }) => {
  const handleClose = () => {
    setOpen(false)
  }

  // Initialize state with the project data
  const [remarkData, setRemarkData] = useState(data)

  useEffect(() => {
    setRemarkData(data)
    console.log(data)
  }, [data])

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
      <DialogTitle className='text-primary font-bold align-left text-left' gutterBottom>
        Remark Information
      </DialogTitle>

      <DialogContent sx={{ backgroundColor: 'background.paper', padding: '32px' }}>
        <Box mb={3}>
          <Grid container spacing={2} key={remarkData.date}>
            <Grid item xs={5} sm={6}>
              <Typography variant='h6' className='text-primary'>
                User
              </Typography>
              <Typography variant='body1' className='font-light'>
                {remarkData.username}
              </Typography>
            </Grid>

            <Grid item xs={5} sm={6}>
              <Typography variant='h6' className='text-primary'>
                Date
              </Typography>
              <Typography variant='body1' className='font-light'>
                {remarkData.date}{' '}
              </Typography>
            </Grid>
            <Grid item xs={5} sm={6}>
              <Typography variant='h6' className='text-primary'>
                Remark
              </Typography>
              <Typography variant='body1' className='font-light' >
                {remarkData.remark}{' '}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color='secondary'>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ViewRemarkData
