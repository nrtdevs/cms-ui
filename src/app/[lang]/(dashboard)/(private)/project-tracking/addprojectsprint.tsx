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

// Custom Components
import DialogCloseButton from '@/components/dialogs/DialogCloseButton'
import CustomTextInput from '@/app/Custom-Cpmponents/input/custominput'
import DatePickerInput from '@/app/Custom-Cpmponents/input/Datepickerinput'
import Dropdown from '@/app/Custom-Cpmponents/Select-dropdown/dropdown'

import CustomTagInput from '@/app/Custom-Cpmponents/input/customtaginput'

// Define form data types
interface FormValues {
  projectname: string
  sprints: {
    sprintname: string
    addmodule: string[]
    sprintStartDate: string
    sprintEndDate: string
    totalSprintAmount: string
    receivedAmount: string
    pendingAmount: string
    currency: string
  }[]
}

type EditUserInfoProps = {
  open: boolean
  setOpen: (open: boolean) => void
  data?: { projectname: string }
}

const AddProjectsprint = ({ open, setOpen, data }: EditUserInfoProps) => {
  // Default sprint object to reuse when appending
  const defaultSprint = {
    sprintname: '',
    addmodule: [],
    sprintStartDate: '',
    sprintEndDate: '',
    totalSprintAmount: '',
    receivedAmount: '',
    pendingAmount: '',
    currency: ''
  }

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      projectname: data?.projectname,
      sprints: [defaultSprint]
    }
  })

  const [options] = useState<string[]>(['Option 1', 'Option 2', 'Option 3'])

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'sprints'
  })

  // Handle default values on edit
  useEffect(() => {
    if (data) {
      setValue('projectname', data.projectname)
    }
  }, [data, setValue])

  // Handle dialog close
  const handleClose = () => {
    setOpen(false)
    setValue('projectname', '')
    setValue('sprints', [defaultSprint])
  }

  // Handle form submission
  const handleSave = (formData: FormValues) => {
    console.log('Saved Data:', formData)
    setOpen(false)
  }

  // Custom validation for sprint name duplication
  const validateSprintNames = (value: string, index: number) => {
    const sprintNames = fields.map(field => field.sprintname)
    const duplicates = sprintNames.filter((name, i) => name === value && i !== index)

    return duplicates.length === 0 || 'Sprint name must be unique'
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
      <DialogCloseButton onClick={handleClose} disableRipple>
        <i className='tabler-x' />
      </DialogCloseButton>
      <DialogTitle variant='h4' className='flex gap-2 flex-col text-primary text-center sm:pbs-16 sm:pbe-6 sm:pli-16'>
        Add Sprint
      </DialogTitle>
      <form onSubmit={handleSubmit(handleSave)}>
        <DialogContent>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <CustomTextInput
                label='Project Name'
                placeholder='Enter Project Name'
                value={data?.projectname || ''}
                onChange={() => {}}
                disabled={true}
              />
            </Grid>
            <Grid item xs={12}>
              <div>
                {fields.map((field, index) => (
                  <Grid container spacing={3} key={field.id}>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        control={control}
                        name={`sprints.${index}.sprintname`}
                        rules={{
                          validate: value => validateSprintNames(value, index)
                        }}
                        render={({ field }) => (
                          <CustomTextInput
                            label='Sprint Name'
                            placeholder='Enter Sprint Name'
                            {...field}
                            error={!!errors.sprints?.[index]?.sprintname}
                            helperText={errors.sprints?.[index]?.sprintname?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        control={control}
                        name={`sprints.${index}.addmodule`}
                        render={({ field }) => (
                          <CustomTagInput
                            label='Select Tags'
                            tags={field.value}
                            onChange={(value: string[]) => setValue(`sprints.${index}.addmodule`, value)}
                            options={options}
                            placeholder='Type and select tags'
                          />
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Controller
                        control={control}
                        name={`sprints.${index}.sprintStartDate`}
                        render={({ field }) => (
                          <DatePickerInput
                            label='Sprint Start Date'
                            placeholder='Enter Sprint Start Date'
                            type='date'
                            {...field}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        control={control}
                        name={`sprints.${index}.sprintEndDate`}
                        render={({ field }) => (
                          <DatePickerInput
                            label='Sprint End Date'
                            placeholder='Enter Sprint End Date'
                            type='date'
                            {...field}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <Controller
                        control={control}
                        name={`sprints.${index}.currency`}
                        render={({ field }) => (
                          <Dropdown
                            label='Currency'
                            options={['USD', 'EUR', 'RUB', 'INR']}
                            selectedOption={field.value || ''}
                            onSelect={value => setValue(`sprints.${index}.currency`, value)}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <Controller
                        control={control}
                        name={`sprints.${index}.totalSprintAmount`}
                        rules={{
                          pattern: {
                            value: /^[0-9]*\.?[0-9]+$/,
                            message: 'Please enter a valid number'
                          }
                        }}
                        render={({ field }) => (
                          <CustomTextInput
                            label='Total Sprint Amount'
                            placeholder='Enter Total Sprint Amount'
                            {...field}
                            error={!!errors.sprints?.[index]?.totalSprintAmount}
                            helperText={errors.sprints?.[index]?.totalSprintAmount?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <Controller
                        control={control}
                        name={`sprints.${index}.receivedAmount`}
                        rules={{
                          pattern: {
                            value: /^[0-9]*\.?[0-9]+$/,
                            message: 'Please enter a valid number'
                          }
                        }}
                        render={({ field }) => (
                          <CustomTextInput
                            label='Received Amount'
                            placeholder='Enter Received Amount'
                            {...field}
                            error={!!errors.sprints?.[index]?.receivedAmount}
                            helperText={errors.sprints?.[index]?.receivedAmount?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <Controller
                        control={control}
                        name={`sprints.${index}.pendingAmount`}
                        rules={{
                          pattern: {
                            value: /^[0-9]*\.?[0-9]+$/,
                            message: 'Please enter a valid number'
                          }
                        }}
                        render={({ field }) => (
                          <CustomTextInput
                            label='Pending Amount'
                            placeholder='Enter Pending Amount'
                            {...field}
                            error={!!errors.sprints?.[index]?.pendingAmount}
                            helperText={errors.sprints?.[index]?.pendingAmount?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        variant='outlined'
                        color='error'
                        onClick={() => remove(index)}
                        sx={{
                          borderColor: 'red',
                          color: 'red',
                          marginBottom: '5px',
                          '&:hover': {
                            backgroundColor: 'rgba(217, 28, 28, 0.874)'
                          }
                        }}
                      >
                        Remove Sprint
                      </Button>
                    </Grid>
                  </Grid>
                ))}
                <Button variant='outlined' className='mt-5' onClick={() => append(defaultSprint)}>
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
