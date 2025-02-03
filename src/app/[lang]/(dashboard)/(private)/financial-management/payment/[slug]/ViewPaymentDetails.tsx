import React from 'react'
import { Dialog, DialogTitle, DialogContent, Typography, DialogActions, Button } from '@mui/material'

interface Payment {
  id: string
  paymentMode: string
  amount: number
  paymentDate: string
  refId: string
  transactionId: string
}

interface ViewPaymentDetailsProps {
  open: boolean
  setOpen: (open: boolean) => void
  data: Payment // Individual payment data
}

const ViewPaymentDetails: React.FC<ViewPaymentDetailsProps> = ({ data, open, setOpen }) => {
  // Handle close dialog
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth='lg'>
      <DialogTitle>
        <Typography variant='h4'>Payment Details</Typography>
      </DialogTitle>
      <DialogContent>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-4'>
          <div className='flex flex-col'>
            <Typography variant='body1' className='font-semibold text-primary'>
              Payment Mode:
            </Typography>
            <Typography variant='body2'>{data.paymentMode}</Typography>
          </div>
          <div className='flex flex-col'>
            <Typography variant='body1' className='font-semibold text-primary'>
              Amount:
            </Typography>
            <Typography variant='body2'>{data.amount}</Typography>
          </div>
          <div className='flex flex-col'>
            <Typography variant='body1' className='font-semibold text-primary'>
              Payment Date:
            </Typography>
            <Typography variant='body2'>{data.paymentDate}</Typography>
          </div>
          <div className='flex flex-col'>
            <Typography variant='body1' className='font-semibold text-primary'>
              Reference ID:
            </Typography>
            <Typography variant='body2'>{data.refId}</Typography>
          </div>
          <div className='flex flex-col'>
            <Typography variant='body1' className='font-semibold text-primary'>
              Transaction ID:
            </Typography>
            <Typography variant='body2'>{data.transactionId}</Typography>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ViewPaymentDetails
