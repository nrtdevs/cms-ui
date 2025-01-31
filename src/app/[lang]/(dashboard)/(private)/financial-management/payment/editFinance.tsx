'use client'

import React, { useState, useEffect } from 'react'
import { Button, Typography, Grid, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import Swal from 'sweetalert2'
import CustomTextInput from '../../../../../Custom-Cpmponents/input/custominput'
import Dropdown from '../../../../../Custom-Cpmponents/Select-dropdown/dropdown'
import DatePickerInput from '@/app/Custom-Cpmponents/input/Datepickerinput'
import CustomDescriptionInput from '@/app/Custom-Cpmponents/input/customdescriptioinput'
import CustomFileUpload from '@/app/Custom-Cpmponents/Upload-file/CustomfileUpload'

interface EditFinanceProps {
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

const ProjectData = ['Project Alpha', 'Project Beta', 'Project Gamma']

const EditFinance: React.FC<EditFinanceProps> = ({ open, setOpen, data }) => {
  const handleClose = () => {
    setOpen(false)
  }

  // Initialize state with the financial data
  const [financeData, setFinanceData] = useState(data)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    setFinanceData(data)
  }, [data])

  const handleInputChange = (field: keyof typeof financeData, value: string | number) => {
    setFinanceData(prevData => ({
      ...prevData,
      [field]: value
    }))

    if (errors[field]) {
      validateField(field, value)
    }
  }

  const validateField = (field: keyof typeof financeData, value: string | number) => {
    let error = ''

    // Required field validation
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      error = `${field} is required`
    }

    setErrors(prevErrors => ({
      ...prevErrors,
      [field]: error
    }))
  }

  const validateAllFields = () => {
    const newErrors: { [key: string]: string } = {}

    // Loop through each field in financeData
    Object.keys(financeData).forEach(key => {
      const field = key as keyof typeof financeData
      const value = financeData[field]

      // Perform validation for required fields
      if (!value || (typeof value === 'string' && value.trim() === '')) {
        newErrors[field] = `${field} is required`
      }
    })

    setErrors(newErrors)

    // Return true if there are no errors
    return Object.keys(newErrors).length === 0
  }

  const handleEditFinance = () => {
    if (validateAllFields()) {
      console.log('Updated finance data:', financeData)

      // Close dialog immediately
      handleClose()

      // Show success Swal
      Swal.fire({
        title: 'Success!',
        text: 'Finance details updated successfully!',
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
        Edit Payment Details
        <Typography component='span' className='flex flex-col text-center'>
          Modify the details for the Payment.
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
              <Dropdown
                label='Team Lead'
                options={ProjectData} // Map to member names for dropdown
                selectedOption={financeData.projectName} // Pass team lead name as selected option
                onSelect={value => handleInputChange('projectName', value)}
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
                options={['Credit Card', 'Debit Card', 'Bank Transfer', 'PayPal']}
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
          <Button variant='contained' onClick={handleEditFinance} type='submit'>
            Save Changes
          </Button>
          <Button variant='tonal' color='secondary' type='reset' onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default EditFinance
