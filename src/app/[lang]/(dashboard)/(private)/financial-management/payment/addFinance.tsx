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
  receivedAmt: string
  pendingAmt: string
  description: string
  paymentSlip: string
}

interface AddFinanceProps {
  open: boolean
  setOpen: (open: boolean) => void
}

const paymentModes = ['Credit Card', 'Debit Card', 'Bank Transfer', 'PayPal'] // Example options for payment mode

const AddFinance: React.FC<AddFinanceProps> = ({ open, setOpen }) => {
  const handleClose = () => {
    setOpen(false)
  }

  // Initial empty data state
  const initialFinanceData: FinanceData = {
    projectName: '',
    amount: '',
    transactionId: '',
    paymentMode: '',
    refId: '',
    paymentDate: '',
    receivedAmt: '',
    pendingAmt: '',
    description: '',
    paymentSlip: ''
  }

  const [financeData, setFinanceData] = useState<FinanceData>(initialFinanceData)
  const [errors, setErrors] = useState<{ [key in keyof FinanceData]?: string }>({})

  const handleInputChange = (field: keyof FinanceData, value: string | number) => {
    setFinanceData(prevData => ({
      ...prevData,
      [field]: value
    }))

    if (errors[field]) {
      validateField(field, value)
    }
  }

  const validateField = (field: keyof FinanceData, value: string | number) => {
    let error = ''

    // Required field validation
    if (!value && value !== 0) {
      error = `${field} is required`
    }

    setErrors(prevErrors => ({
      ...prevErrors,
      [field]: error
    }))
  }

  const validateAllFields = () => {
    const newErrors: { [key in keyof FinanceData]?: string } = {}

    // Loop through each field in financeData
    Object.keys(financeData).forEach(key => {
      const field = key as keyof FinanceData
      const value = financeData[field]

      // Perform validation for required fields
      if (!value && value !== '') {
        newErrors[field] = `${field} is required`
      }
    })

    setErrors(newErrors)

    // Return true if there are no errors
    return Object.keys(newErrors).length === 0
  }

  const handleAddFinance = () => {
    if (validateAllFields()) {
      console.log('New finance data:', financeData)

      // Close dialog immediately
      handleClose()

      // Reset form data
      setFinanceData(initialFinanceData)

      // Show success Swal
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
                onChange={value => handleInputChange('amount', Number(value))}
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
