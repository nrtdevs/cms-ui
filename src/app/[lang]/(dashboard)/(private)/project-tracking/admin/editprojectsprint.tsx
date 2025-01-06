import React, { useState } from 'react'

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid } from '@mui/material'

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
    totalSprintAmount: sprint.totalSprintAmount || '',
    receivedAmount: sprint.receivedAmount || '',
    pendingAmount: sprint.pendingAmount || '',
    addmodule: sprint.addmodule ? sprint.addmodule.join(', ') : ''
  })

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setFormValues(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Handle Save
  const handleSave = () => {
    const updatedSprint = {
      ...formValues,
      totalSprintAmount: parseFloat(formValues?.totalSprintAmount.toString()),
      receivedAmount: parseFloat(formValues?.receivedAmount.toString()),
      pendingAmount: parseFloat(formValues?.pendingAmount.toString()),
      addmodule: formValues.addmodule.split(',').map((item: string) => item.trim())
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
            <TextField
              fullWidth
              label='Sprint Name'
              name='sprintname'
              value={formValues.sprintname}
              onChange={handleChange}
              variant='outlined'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Start Date'
              name='sprintStartDate'
              type='date'
              value={formValues.sprintStartDate}
              onChange={handleChange}
              variant='outlined'
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='End Date'
              name='sprintEndDate'
              type='date'
              value={formValues.sprintEndDate}
              onChange={handleChange}
              variant='outlined'
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Total Sprint Amount'
              name='totalSprintAmount'
              type='number'
              value={formValues.totalSprintAmount}
              onChange={handleChange}
              variant='outlined'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Received Amount'
              name='receivedAmount'
              type='number'
              value={formValues.receivedAmount}
              onChange={handleChange}
              variant='outlined'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Pending Amount'
              name='pendingAmount'
              type='number'
              value={formValues.pendingAmount}
              onChange={handleChange}
              variant='outlined'
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label='Modules'
              name='addmodule'
              value={formValues.addmodule}
              onChange={handleChange}
              variant='outlined'
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
