import React, { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, Typography, DialogActions, Button, TextField } from '@mui/material'
import CustomTextInput from '@/app/Custom-Cpmponents/input/custominput'
import DatePickerInput from '@/app/Custom-Cpmponents/input/Datepickerinput'

interface Payment {
  id: string
  paymentMode: string
  amount: any
  paymentDate: string
  refId: string
  transactionId: string
}

interface EditPaymentDetailsProps {
  open: boolean
  setOpen: (open: boolean) => void
  data: Payment // Individual payment data
}

const EditPaymentDetails: React.FC<EditPaymentDetailsProps> = ({ data, open, setOpen }) => {
  const [paymentData, setPaymentData] = useState<Payment>(data)
  const [errors, setErrors] = useState<{ [key in keyof Payment]?: string }>({})

  // Handle input change
  const handleInputChange = (field: keyof Payment, value: string | string[]) => {
    setPaymentData(prevData => ({
      ...prevData,
      [field]: value
    }))
  }

  // Handle close dialog
  const handleClose = () => {
    setOpen(false)
  }

  const handleEditPayment = () => {
    setPaymentData(data)
    console.log(data)
    setOpen(false)
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth='lg'>
      <DialogTitle>
        <Typography variant='h4'>Edit Payment Details</Typography>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={e => e.preventDefault()}>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-4'>
            <div className='flex flex-col'>
              <Typography variant='body1' className='font-semibold text-primary'>
                Payment Mode:
              </Typography>
              <CustomTextInput
                label='Team Name'
                placeholder='Team Name'
                value={paymentData.paymentMode}
                onChange={value => handleInputChange('paymentMode', value)}
                error={!!errors.paymentMode}
                helperText={errors.paymentMode}
                required
              />
            </div>
            <div className='flex flex-col'>
              <Typography variant='body1' className='font-semibold text-primary'>
                Amount:
              </Typography>
              <CustomTextInput
                label='Team Name'
                placeholder='Team Name'
                value={paymentData.amount}
                onChange={value => handleInputChange('amount', value)}
                error={!!errors.amount}
                helperText={errors.amount}
                required
              />
            </div>
            <div className='flex flex-col'>
              <Typography variant='body1' className='font-semibold text-primary'>
                Payment Date:
              </Typography>
              <DatePickerInput
                label='Team Name'
                placeholder='Team Name'
                value={paymentData.paymentDate}
                onChange={value => handleInputChange('paymentDate', value)}
                error={!!errors.paymentDate}
                helperText={errors.paymentDate}
                required
              />
            </div>
            <div className='flex flex-col'>
              <Typography variant='body1' className='font-semibold text-primary'>
                Reference ID:
              </Typography>
              <CustomTextInput
                label='Team Name'
                placeholder='Team Name'
                value={paymentData.refId}
                onChange={value => handleInputChange('refId', value)}
                error={!!errors.refId}
                helperText={errors.refId}
                required
              />
            </div>
            <div className='flex flex-col'>
              <Typography variant='body1' className='font-semibold text-primary'>
                Transaction ID:
              </Typography>
              <CustomTextInput
                label='Team Name'
                placeholder='Team Name'
                value={paymentData.transactionId}
                onChange={value => handleInputChange('transactionId', value)}
                error={!!errors.transactionId}
                helperText={errors.transactionId}
                required
              />
            </div>
          </div>
        </form>
      </DialogContent>
      <DialogActions>
        <Button variant='contained' onClick={handleEditPayment} type='submit'>
          Save Changes
        </Button>
        <Button onClick={handleClose} color='secondary'>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditPaymentDetails
