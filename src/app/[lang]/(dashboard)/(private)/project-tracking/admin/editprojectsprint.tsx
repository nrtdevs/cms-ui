import React, { useState } from 'react'

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid } from '@mui/material'

import CustomTextInput from '@/app/Custom-Cpmponents/input/custominput'
import DatePickerInput from '@/app/Custom-Cpmponents/input/Datepickerinput'

interface Sprint {
  sprintname: string
  sprintStartDate: string
  sprintEndDate: string
  totalSprintAmount: number
  receivedAmount: number
  pendingAmount: number
  addmodule: string[]
}

interface SprintEditDialogProps {
  sprint: Sprint
  open: boolean
  onClose: () => void
}

const SprintEditDialog: React.FC<SprintEditDialogProps> = ({ sprint, open, onClose }) => {
  // Local state to manage form inputs
  const [formValues, setFormValues] = useState({
    sprintname: sprint.sprintname || '',
    sprintStartDate: sprint.sprintStartDate || '',
    sprintEndDate: sprint.sprintEndDate || '',
    totalSprintAmount: sprint.totalSprintAmount.toString() || '',
    receivedAmount: sprint.receivedAmount.toString() || '',
    pendingAmount: sprint.pendingAmount.toString() || '',
    addmodule: sprint.addmodule ? sprint.addmodule.join(', ') : ''
  })

  // Handle input change
  const handleChange = (field: keyof typeof formValues, value: string) => {
    setFormValues(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Handle Save
  const handleSave = () => {
    const updatedSprint = {
      ...formValues,
      totalSprintAmount: parseFloat(formValues.totalSprintAmount),
      receivedAmount: parseFloat(formValues.receivedAmount),
      pendingAmount: parseFloat(formValues.pendingAmount),
      addmodule: formValues.addmodule.split(',').map(item => item.trim())
    }

    console.log('Updated Sprint Data:', updatedSprint)
    if (onClose) onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle>Edit Sprint</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomTextInput
              label='Sprint Name'
              value={formValues.sprintname}
              onChange={value => handleChange('sprintname', value)}
              placeholder='Enter Sprint Name'
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DatePickerInput
              label='Start Date'
              value={formValues.sprintStartDate}
              onChange={value => handleChange('sprintStartDate', value)}
              placeholder='Select Start Date'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DatePickerInput
              label='End Date'
              value={formValues.sprintEndDate}
              onChange={value => handleChange('sprintEndDate', value)}
              placeholder='Select End Date'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextInput
              label='Total Sprint Amount'
              value={formValues.totalSprintAmount}
              onChange={value => handleChange('totalSprintAmount', value)}
              placeholder='Enter Total Sprint Amount'
              type='number'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextInput
              label='Received Amount'
              value={formValues.receivedAmount}
              onChange={value => handleChange('receivedAmount', value)}
              placeholder='Enter Received Amount'
              type='number'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextInput
              label='Pending Amount'
              value={formValues.pendingAmount}
              onChange={value => handleChange('pendingAmount', value)}
              placeholder='Enter Pending Amount'
              type='number'
            />
          </Grid>
          <Grid item xs={12}>
            <CustomTextInput
              label='Modules'
              value={formValues.addmodule}
              onChange={value => handleChange('addmodule', value)}
              placeholder='Separate module names with commas'
              helperText='Separate module names with commas.'
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='secondary'>
          Cancel
        </Button>
        <Button onClick={handleSave} color='primary' variant='contained'>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default SprintEditDialog
