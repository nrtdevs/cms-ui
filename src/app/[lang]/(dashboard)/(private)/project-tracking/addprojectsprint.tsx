'use client'

// React Imports
import { useEffect, useState } from 'react'

import { useForm, useFieldArray, Controller } from 'react-hook-form'

// MUI Imports
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import { TextField } from '@mui/material'

import DialogCloseButton from '@/components/dialogs/DialogCloseButton'
import CustomTextInput from '@/app/Custom-Cpmponents/input/custominput'
import DatePickerInput from '@/app/Custom-Cpmponents/input/Datepickerinput'

type Project = {
  projectname: string
}

type SprintData = {
  sprintname: string
  addmodule: string
  sprintStartDate: string
  sprintEndDate: string
  totalSprintAmount: string
  receivedAmount: string
  pendingAmount: string
}

type EditUserInfoProps = {
  open: boolean
  setOpen: (open: boolean) => void
  data?: Project
}

const AddProjectsprint = ({ open, setOpen, data }: EditUserInfoProps) => {
  const {
    control,
    handleSubmit,
    register,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: {
      projectname: data?.projectname || '',
      sprints: [
        {
          sprintname: '',
          addmodule: '',
          sprintStartDate: '',
          sprintEndDate: '',
          totalSprintAmount: '',
          receivedAmount: '',
          pendingAmount: ''
        }
      ]
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'sprints'
  })

  useEffect(() => {
    if (data) {
      setValue('projectname', data.projectname)
    }
  }, [data, setValue])

  const handleClose = () => {
    setOpen(false)
    setValue('projectname', '')
    setValue('sprints', [
      {
        sprintname: '',
        addmodule: '',
        sprintStartDate: '',
        sprintEndDate: '',
        totalSprintAmount: '',
        receivedAmount: '',
        pendingAmount: ''
      }
    ])
    setErrors({})
  }

  const handleSave = (data: any) => {
    console.log('Saved Data:', data)
    setOpen(false)
  }

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleClose}
      maxWidth='md'
      scroll='body'
      sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
    >
      <DialogCloseButton onClick={() => setOpen(false)} disableRipple>
        <i className='tabler-x' />
      </DialogCloseButton>
      <DialogTitle variant='h4' className='flex gap-2 flex-col text-primary text-center sm:pbs-16 sm:pbe-6 sm:pli-16'>
        Add Sprint
      </DialogTitle>
      <form onSubmit={handleSubmit(handleSave)}>
        <DialogContent>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TextField label='Project Name' variant='outlined' fullWidth value={data?.projectname} disabled />
            </Grid>
            <Grid item xs={12}>
              <div>
                {fields.map((field, index) => (
                  <Grid container spacing={3} key={field.id}>
                    <Grid item xs={12} sm={6}>
                      <CustomTextInput
                        label='Sprint Name'
                        placeholder='Enter Sprint Name'
                        value={field.sprintname}
                        onChange={value => setValue(`sprints.${index}.sprintname`, value)}
                        error={!!errors.sprints?.[index]?.sprintname}
                        helperText={errors.sprints?.[index]?.sprintname?.message}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <CustomTextInput
                        label='Add Module'
                        placeholder='Enter Add Module'
                        value={field.addmodule}
                        onChange={value => setValue(`sprints.${index}.addmodule`, value)}
                        error={!!errors.sprints?.[index]?.addmodule}
                        helperText={errors.sprints?.[index]?.addmodule?.message}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <DatePickerInput
                        label='Sprint Start Date'
                        placeholder='Enter Sprint Start Date'
                        type='date'
                        value={field.sprintStartDate}
                        onChange={value => setValue(`sprints.${index}.sprintStartDate`, value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <DatePickerInput
                        label='Sprint End Date'
                        placeholder='Enter Sprint End Date'
                        type='date'
                        value={field.sprintEndDate}
                        onChange={value => setValue(`sprints.${index}.sprintEndDate`, value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <CustomTextInput
                        label='Total Sprint Amount'
                        placeholder='Enter Total Sprint Amount'
                        value={field.totalSprintAmount}
                        onChange={value => setValue(`sprints.${index}.totalSprintAmount`, value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <CustomTextInput
                        label='Received Amount'
                        placeholder='Enter Received Amount'
                        value={field.receivedAmount}
                        onChange={value => setValue(`sprints.${index}.receivedAmount`, value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <CustomTextInput
                        label='Pending Amount'
                        placeholder='Enter Pending Amount'
                        value={field.pendingAmount}
                        onChange={value => setValue(`sprints.${index}.pendingAmount`, value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button variant='outlined' onClick={() => remove(index)}>
                        Remove Sprint
                      </Button>
                    </Grid>
                  </Grid>
                ))}
                <Button
                  variant='outlined'
                  onClick={() =>
                    append({
                      sprintname: '',
                      addmodule: '',
                      sprintStartDate: '',
                      sprintEndDate: '',
                      totalSprintAmount: '',
                      receivedAmount: '',
                      pendingAmount: ''
                    })
                  }
                >
                  Add Sprint
                </Button>
              </div>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' type='submit'>
            Save
          </Button>
          <Button variant='outlined' onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default AddProjectsprint
