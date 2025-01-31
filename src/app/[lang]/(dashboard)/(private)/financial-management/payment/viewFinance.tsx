import React, { useState, useEffect } from 'react'
import { Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'

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
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth='md'>
      <DialogTitle className='flex flex-col gap-4 items-center p-6 rounded-t-lg text-center bg-surface-variant'>
        <Typography variant='h4' className='font-bold text-lg text-on-surface-variant text-primary'>
          Payment Details
        </Typography>
        <Typography className='text-sm text-on-surface-variant-secondary'>
          Here you can view the detailed information for the Payment...
        </Typography>
      </DialogTitle>

      <DialogContent className='px-6 py-4 bg-surface'>
        {/* 2 Columns in the first row */}
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
          {/* Project Name */}
          <div className='p-4 rounded-lg bg-surface-variant'>
            <Typography className='font-medium text-on-surface-variant text-primary'>Project Name:</Typography>
            <Typography className='text-on-surface'>{financeData.projectName}</Typography>
          </div>

          {/* Amount */}
          <div className='p-4 rounded-lg bg-surface-variant'>
            <Typography className='font-medium text-on-surface-variant text-primary'>Amount:</Typography>
            <Typography className='text-on-surface'>{financeData?.amount}</Typography>
          </div>
        </div>

        {/* 2 Columns in the second row */}
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6'>
          {/* Transaction Id */}
          <div className='p-4 rounded-lg bg-surface-variant'>
            <Typography className='font-medium text-on-surface-variant text-primary'>Transaction Id:</Typography>
            <Typography className='text-on-surface'>{financeData.transactionId}</Typography>
          </div>

          {/* Payment Mode */}
          <div className='p-4 rounded-lg bg-surface-variant'>
            <Typography className='font-medium text-on-surface-variant text-primary'>Payment Mode:</Typography>
            <Typography className='text-on-surface'>{financeData.paymentMode}</Typography>
          </div>
        </div>

        {/* 2 Columns in the third row */}
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6'>
          {/* Ref Id */}
          <div className='p-4 rounded-lg bg-surface-variant'>
            <Typography className='font-medium text-on-surface-variant text-primary'>Ref Id:</Typography>
            <Typography className='text-on-surface'>{financeData.refId}</Typography>
          </div>

          {/* Payment Date */}
          <div className='p-4 rounded-lg bg-surface-variant'>
            <Typography className='font-medium text-on-surface-variant text-primary'>Payment Date:</Typography>
            <Typography className='text-on-surface'>{financeData.paymentDate}</Typography>
          </div>
        </div>

        {/* 2 Columns in the fourth row */}
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6'>
          {/* Received Amount */}
          <div className='p-4 rounded-lg bg-surface-variant'>
            <Typography className='font-medium text-on-surface-variant text-primary'>Description :</Typography>
            <Typography className='text-on-surface'>{financeData?.description}</Typography>
          </div>

          {/* Pending Amount */}
          <div className='p-4 rounded-lg bg-surface-variant'>
            <Typography className='font-medium text-on-surface-variant text-primary'>Payment Slip :</Typography>
            <Typography className='text-on-surface'>{financeData?.paymentSlip}</Typography>
          </div>
        </div>
      </DialogContent>

      <DialogActions className='p-4 justify-center bg-surface rounded-b-lg'>
        <Button variant='contained' onClick={handleClose} className='bg-primary text-on-primary hover:bg-primary-dark'>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ViewFinance
