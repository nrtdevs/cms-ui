'use client'

import React, { useState, useEffect } from 'react'
import { Button, Typography, Grid, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import Swal from 'sweetalert2'
import CustomTextInput from '../../../../Custom-Cpmponents/input/custominput'
import Dropdown from '../../../../Custom-Cpmponents/Select-dropdown/dropdown'
import TagInput from '../../../../Custom-Cpmponents/input/customtaginput'
import CustomDescriptionInput from '@/app/Custom-Cpmponents/input/customdescriptioinput'

interface Member {
  id: string
  name: string
}

interface Ticket {
  ticketName: string
  id: string
  ticketDescription: string
  assignee: string
  status: string
  priority: string
  tags: string[]
}

interface EditTicketProps {
  open: boolean
  setOpen: (open: boolean) => void
  data: Ticket // The ticket data to be edited
}

const techStackTypes = ['Bug', 'Urgent', 'UI', 'Design', 'Security', 'Patch', 'Backend', 'Optimization']
const positionTypes = ['Project-Manager', 'Team-Lead', 'Developer', 'Designer', 'Tester']
const ticketStatusTypes = ['Active', 'Unactive']
const priorityLevels = ['Low', 'Medium', 'High']

const EditTicketManagement: React.FC<EditTicketProps> = ({ open, setOpen, data }) => {
  const handleClose = () => {
    setOpen(false)
  }

  // Initialize state with the ticket data
  const [ticketData, setTicketData] = useState<Ticket>({
    ...data,
    tags: data.tags || [] // Ensure tags is an empty array if undefined
  })

  const [errors, setErrors] = useState<{ [key in keyof Ticket]?: string }>({})

  useEffect(() => {
    setTicketData({
      ...data,
      tags: data.tags || [] // Ensure tags is an empty array if undefined
    })
  }, [data])

  const handleInputChange = (field: keyof Ticket, value: string | string[] | Member[]) => {
    setTicketData(prevData => ({
      ...prevData,
      [field]: value
    }))

    if (errors[field]) {
      validateField(field, value)
    }
  }

  const validateField = (field: keyof Ticket, value: string | string[] | Member[]) => {
    let error = ''

    // Check if the value is an array and if it's empty or undefined
    if (Array.isArray(value) && (value.length === 0 || value === undefined)) {
      error = `${field} is required`
    }

    setErrors(prevErrors => ({
      ...prevErrors,
      [field]: error
    }))
  }

  const validateAllFields = () => {
    const newErrors: { [key in keyof Ticket]?: string } = {}

    // Loop through each field in ticketData
    Object.keys(ticketData).forEach(key => {
      const field = key as keyof Ticket
      const value = ticketData[field]

      // Perform validation for required fields
      if (Array.isArray(value) && (value.length === 0 || value === undefined)) {
        newErrors[field] = `${field} is required`
      }

      // If value is not defined or empty, add to errors
      if (!value && value !== 0) {
        newErrors[field] = `${field} is required`
      }
    })

    setErrors(newErrors)

    // Return true if there are no errors
    return Object.keys(newErrors).length === 0
  }

  const handleEditTicket = () => {
    if (validateAllFields()) {
      console.log('Updated ticket data:', ticketData)

      // Close dialog immediately
      handleClose()

      // Show success Swal
      Swal.fire({
        title: 'Success!',
        text: 'Ticket updated successfully!',
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
        Edit Ticket Details
        <Typography component='span' className='flex flex-col text-center'>
          Modify the details for the ticket.
        </Typography>
      </DialogTitle>
      <form onSubmit={e => e.preventDefault()}>
        <DialogContent className='overflow-visible pbs-0 sm:pli-16'>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Typography variant='h6' className='text-primary font-bold'>
                Ticket Details
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <CustomTextInput
                label='Ticket Name'
                placeholder='Ticket Name'
                value={ticketData.ticketName}
                onChange={value => handleInputChange('ticketName', value)}
                error={!!errors.ticketName}
                helperText={errors.ticketName}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Dropdown
                label='Assignee'
                options={['Olivia Martinez', 'Lucas Allen', 'Not Started', 'Sarah Lee']} // Replace with actual assignee list
                selectedOption={ticketData.assignee}
                onSelect={value => handleInputChange('assignee', value)}
                error={!!errors.assignee}
                helperText={errors.assignee}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Dropdown
                label='Status'
                options={ticketStatusTypes}
                selectedOption={ticketData.status}
                onSelect={value => handleInputChange('status', value)}
                error={!!errors.status}
                helperText={errors.status}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Dropdown
                label='Priority'
                options={priorityLevels}
                selectedOption={ticketData.priority}
                onSelect={value => handleInputChange('priority', value)}
                error={!!errors.priority}
                helperText={errors.priority}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TagInput
                options={techStackTypes}
                label='Add Tags'
                tags={ticketData.tags}
                onChange={value => handleInputChange('tags', value)}
                error={!!errors.tags}
                helperText={errors.tags}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <CustomDescriptionInput
                label='Ticket Description'
                placeholder='Ticket Description...'
                value={ticketData.ticketDescription}
                onChange={value => handleInputChange('ticketDescription', value)}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions className='justify-center pbs-0 sm:pbe-16 sm:pli-16'>
          <Button variant='contained' onClick={handleEditTicket} type='submit'>
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

export default EditTicketManagement
