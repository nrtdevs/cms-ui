import React, { useState, useEffect } from 'react'

import {
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Divider,
  Box
} from '@mui/material'


interface ViewFinanceProps {
  open: boolean
  setOpen: (open: boolean) => void
  data: {
    projectName: string
    amount: string
    transactionId: string
    paymentMode: string
    refId: string
    paymentDate: string
    receivedAmt: string
    pendingAmt: string
    description: string
    paymentSlip: string
  }
}

const ViewFinance: React.FC<ViewFinanceProps> = ({ open, setOpen, data }) => {
  const handleClose = () => {
    setOpen(false)
  }

  // Initialize state with the project data
  const [financeData, setFinanceData] = useState(data)

  useEffect(() => {
    setFinanceData(data)
  }, [data])

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
      <DialogTitle className='text-primary font-bold align-left text-left' gutterBottom>
        Payment Information
      </DialogTitle>

      <DialogContent sx={{ backgroundColor: 'background.paper', padding: '32px' }}>
        <Box mb={3}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant='h6' className='text-primary'>
                Project Name
              </Typography>
              <Typography variant='body1'>{financeData.projectName}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant='h6' className='text-primary'>
                Amount
              </Typography>
              <Typography variant='body1'>{financeData.amount}</Typography>
            </Grid>
          </Grid>
        </Box>

        <Grid container spacing={2} mt={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant='h6' className='text-primary'>
              Transaction Id
            </Typography>
            <Typography variant='body1'>{financeData.transactionId}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant='h6' className='text-primary'>
              Payment Mode
            </Typography>
            <Typography variant='body1'>{financeData.paymentMode}</Typography>
          </Grid>
        </Grid>

        <Grid container spacing={2} mt={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant='h6' className='text-primary'>
              Ref Id
            </Typography>
            <Typography variant='body1'>{financeData.refId}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant='h6' className='text-primary'>
              Payment Date
            </Typography>
            <Typography variant='body1'>{financeData.paymentDate}</Typography>
          </Grid>
        </Grid>

        <Grid container spacing={2} mt={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant='h6' className='text-primary'>
              Received Amount
            </Typography>
            <Typography variant='body1'>{financeData.receivedAmt}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant='h6' className='text-primary'>
              Pending Amount
            </Typography>
            <Typography variant='body1'>{financeData.pendingAmt}</Typography>
          </Grid>
        </Grid>

        <Box mb={3} mt={2}>
          <Typography variant='h6' className='text-primary'>
            Description
          </Typography>
          <Typography variant='body1'>{financeData.description}</Typography>
        </Box>

        <Divider sx={{ width: '100%', marginY: 2 }} />

        <Box mt={2}>
          <Typography variant='h5' className='text-primary font-bold align-left text-left'>
            Payment Slip
          </Typography>
          <Typography variant='body1'>{financeData.paymentSlip}</Typography>
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

export default ViewFinance

