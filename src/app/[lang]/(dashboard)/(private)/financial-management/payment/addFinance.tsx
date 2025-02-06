'use client'

import React, { useState } from 'react'
import { Button, Typography, Grid, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import Swal from 'sweetalert2'
import CustomTextInput from '../../../../../Custom-Cpmponents/input/custominput'
import Dropdown from '../../../../../Custom-Cpmponents/Select-dropdown/dropdown'
import CustomDescriptionInput from '@/app/Custom-Cpmponents/input/customdescriptioinput'
import DatePickerInput from '@/app/Custom-Cpmponents/input/Datepickerinput'
import CustomFileUpload from '@/app/Custom-Cpmponents/Upload-file/CustomfileUpload'

interface FinanceData {
  projectName: string
  amount: string
  transactionId: string
  paymentMode: string
  refId: string
  paymentDate: string
  description: string
  paymentSlip: string
}

interface AddFinanceProps {
  open: boolean
  setOpen: (open: boolean) => void
}

const paymentModes = ['Credit Card', 'Debit Card', 'Bank Transfer', 'PayPal']

const amountRegex = /^\d*\.?\d{0,3}$/  // Allows numbers with up to 3 decimal places

const AddFinance: React.FC<AddFinanceProps> = ({ open, setOpen }) => {
  const handleClose = () => {
    setOpen(false)
  }

  const initialFinanceData: FinanceData = {
    projectName: '',
    amount: '',
    transactionId: '',
    paymentMode: '',
    refId: '',
    paymentDate: '',
    description: '',
    paymentSlip: ''
  }

  const [financeData, setFinanceData] = useState<FinanceData>(initialFinanceData)
  const [errors, setErrors] = useState<{ [key in keyof FinanceData]?: string }>({})

  // Handle input changes with validation
  const handleInputChange = (field: keyof FinanceData, value: string | number) => {
    let inputValue = value.toString()
    let error = ''

    if (field === 'amount') {
      // Prevent alphabets and symbols
      if (!/^\d*\.?\d*$/.test(inputValue)) {
        return  // Ignore invalid input
      }

      // Restrict to 3 decimal places
      if (!amountRegex.test(inputValue)) {
        return  // Ignore input beyond 3 decimal places
      }
    }

    // Check for required fields
    if (!inputValue && inputValue !== '0') {
      error = `${field} is required`
    }

    setErrors(prevErrors => ({
      ...prevErrors,
      [field]: error
    }))

    setFinanceData(prevData => ({
      ...prevData,
      [field]: inputValue
    }))
  }

  const validateAllFields = () => {
    const newErrors: { [key in keyof FinanceData]?: string } = {}

    if (!financeData.projectName.trim()) newErrors.projectName = 'Project Name is required'
    if (!financeData.amount) {
      newErrors.amount = 'Amount is required'
    } else if (!amountRegex.test(financeData.amount)) {
      newErrors.amount = 'Only numbers are allowed'
    }
    if (!financeData.transactionId.trim()) newErrors.transactionId = 'Transaction Id is required'
    if (!financeData.paymentMode) newErrors.paymentMode = 'Payment Mode is required'
    if (!financeData.refId.trim()) newErrors.refId = 'Reference Id is required'
    if (!financeData.paymentDate) newErrors.paymentDate = 'Payment Date is required'
    if (!financeData.paymentSlip) newErrors.paymentSlip = 'Payment Slip is required'

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const handleAddFinance = () => {
    if (validateAllFields()) {
      console.log('New finance data:', financeData)

      handleClose()
      setFinanceData(initialFinanceData)

      Swal.fire({
        title: 'Success!',
        text: 'Finance details added successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
        showConfirmButton: true,
        customClass: {
          confirmButton: 'custom-swal-button'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutDown animate__faster'
        }
      })
    }
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth='md'>
      <DialogTitle variant='h4' className='flex gap-2 flex-col text-primary text-center sm:pbs-16 sm:pbe-6 sm:pli-16'>
        Add Payment Details
        <Typography component='span' className='flex flex-col text-center'>
          Please enter the details for the new Payment.
        </Typography>
      </DialogTitle>
      <form onSubmit={e => e.preventDefault()}>
        <DialogContent className='overflow-visible pbs-0 sm:pli-16'>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Typography variant='h6' className='text-primary font-bold'>
                Payment Details
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <CustomTextInput
                label='Project Name'
                placeholder='Project Name'
                value={financeData.projectName}
                onChange={value => handleInputChange('projectName', value)}
                error={!!errors.projectName}
                helperText={errors.projectName}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <CustomTextInput
                label='Amount'
                placeholder='Amount'
                value={financeData.amount}
                onChange={value => handleInputChange('amount', value)}
                error={!!errors.amount}
                helperText={errors.amount}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <CustomTextInput
                label='Transaction ID'
                placeholder='Transaction ID'
                value={financeData.transactionId}
                onChange={value => handleInputChange('transactionId', value)}
                error={!!errors.transactionId}
                helperText={errors.transactionId}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Dropdown
                label='Payment Mode'
                options={paymentModes}
                selectedOption={financeData.paymentMode}
                onSelect={value => handleInputChange('paymentMode', value)}
                error={!!errors.paymentMode}
                helperText={errors.paymentMode}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <CustomTextInput
                label='Ref ID'
                placeholder='Ref ID'
                value={financeData.refId}
                onChange={value => handleInputChange('refId', value)}
                error={!!errors.refId}
                helperText={errors.refId}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <DatePickerInput
                label='Payment Date'
                placeholder='Payment Date'
                value={financeData.paymentDate}
                onChange={value => handleInputChange('paymentDate', value)}
                error={!!errors.paymentDate}
                helperText={errors.paymentDate}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <CustomDescriptionInput
                label='Payment Description'
                placeholder='Payment Description...'
                value={financeData.description}
                onChange={value => handleInputChange('description', value)}
              />
            </Grid>

            <Grid item xs={12}>
              <CustomFileUpload
                label='Upload Payment Slip...'
                onChange={value => handleInputChange('paymentSlip', value ? value.name : '')}
                fileName={financeData.paymentSlip || ''}
                error={!!errors.paymentSlip}
                helperText={errors.paymentSlip}
                required
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions className='justify-center pbs-0 sm:pbe-16 sm:pli-16'>
          <Button variant='contained' onClick={handleAddFinance} type='submit'>
            Save
          </Button>
          <Button variant='tonal' color='secondary' type='reset' onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default AddFinance

