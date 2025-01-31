// 'use client'

// // React Imports
// import { useEffect, useState } from 'react'

// import { useForm, useFieldArray, Controller } from 'react-hook-form'

// // MUI Imports
// import Grid from '@mui/material/Grid'
// import Dialog from '@mui/material/Dialog'
// import Button from '@mui/material/Button'
// import DialogTitle from '@mui/material/DialogTitle'
// import DialogContent from '@mui/material/DialogContent'
// import DialogActions from '@mui/material/DialogActions'

// // Custom Components
// import DialogCloseButton from '@/components/dialogs/DialogCloseButton'
// import CustomTextInput from '@/app/Custom-Cpmponents/input/custominput'
// import DatePickerInput from '@/app/Custom-Cpmponents/input/Datepickerinput'

// import CustomTagInput from '@/app/Custom-Cpmponents/input/customtaginput'
// import CustomDescriptionInput from '@/app/Custom-Cpmponents/input/customdescriptioinput'

// // Define form data types
// interface FormValues {
//   projectname: string
//   sprints: {
//     sprintname: string
//     addmodule: string[]
//     sprintStartDate: string
//     sprintEndDate: string
//     totalSprintAmount: string
//     receivedAmount: string
//     pendingAmount: string
//     currency: string
//   }[]
// }

// type EditUserInfoProps = {
//   open: boolean
//   setOpen: (open: boolean) => void
//   data?: { projectname: string }
// }

// const AddProjectsprint = ({ open, setOpen, data }: EditUserInfoProps) => {
//   // Default sprint object to reuse when appending
//   const defaultSprint = {
//     sprintname: '',
//     addmodule: [],
//     sprintStartDate: '',
//     sprintEndDate: '',
//     totalSprintAmount: '',
//     receivedAmount: '',
//     pendingAmount: '',
//     currency: ''
//   }

//   const {
//     control,
//     handleSubmit,
//     setValue,
//     formState: { errors }
//   } = useForm<FormValues>({
//     defaultValues: {
//       projectname: data?.projectname,
//       sprints: [defaultSprint]
//     }
//   })

//   const [options] = useState<string[]>(['Option 1', 'Option 2', 'Option 3'])

//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: 'sprints'
//   })

//   // Handle default values on edit
//   useEffect(() => {
//     if (data) {
//       setValue('projectname', data.projectname)
//     }
//   }, [data, setValue])

//   // Handle dialog close
//   const handleClose = () => {
//     setOpen(false)
//     setValue('projectname', '')
//     setValue('sprints', [defaultSprint])
//   }

//   // Handle form submission
//   const handleSave = (formData: FormValues) => {
//     console.log('Saved Data:', formData)
//     setOpen(false)
//   }

//   // Custom validation for sprint name duplication
//   const validateSprintNames = (value: string, index: number) => {
//     const sprintNames = fields.map(field => field.sprintname)
//     const duplicates = sprintNames.filter((name, i) => name === value && i !== index)

//     return duplicates.length === 0 || 'Sprint name must be unique'
//   }

//   return (
//     <Dialog
//       fullWidth
//       open={open}
//       onClose={handleClose}
//       maxWidth='md'
//       scroll='body'
//       sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
//     >
//       <DialogCloseButton onClick={handleClose} disableRipple>
//         <i className='tabler-x' />
//       </DialogCloseButton>
//       <DialogTitle variant='h4' className='flex gap-2 flex-col text-primary text-center sm:pbs-16 sm:pbe-6 sm:pli-16'>
//         Add Tickets
//       </DialogTitle>
//       <form onSubmit={handleSubmit(handleSave)}>
//         <DialogContent>
//           <Grid container spacing={5}>
//             <Grid item xs={12}>
//               <CustomTextInput
//                 label='Project Name'
//                 placeholder='Enter Project Name'
//                 value={data?.projectname || ''}
//                 onChange={() => {}}
//                 disabled={true}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <div>
//                 {fields.map((field, index) => (
//                   <Grid container spacing={3} key={field.id}>
//                     <Grid item xs={12} sm={6}>
//                       <Controller
//                         control={control}
//                         name={`sprints.${index}.sprintname`}
//                         rules={{
//                           validate: value => validateSprintNames(value, index)
//                         }}
//                         render={({ field }) => (
//                           <CustomTextInput
//                             label='Title'
//                             placeholder='Enter Sprint Name'
//                             {...field}
//                             error={!!errors.sprints?.[index]?.sprintname}
//                             helperText={errors.sprints?.[index]?.sprintname?.message}
//                           />
//                         )}
//                       />
//                     </Grid>
//                     <Grid item xs={12} sm={6}>
//                       <Controller
//                         control={control}
//                         name={`sprints.${index}.addmodule`}
//                         render={({ field }) => (
//                           <CustomTagInput
//                             label='Select Tech Stack'
//                             tags={field.value}
//                             onChange={(value: string[]) => setValue(`sprints.${index}.addmodule`, value)}
//                             options={options}
//                             placeholder='Type and select tags'
//                           />
//                         )}
//                       />
//                     </Grid>

//                     <Grid item xs={12} sm={6}>
//                       <Controller
//                         control={control}
//                         name={`sprints.${index}.sprintStartDate`}
//                         render={({ field }) => (
//                           <DatePickerInput
//                             label='Assign Date'
//                             placeholder='Enter Task Start Date'
//                             type='date'
//                             {...field}
//                           />
//                         )}
//                       />
//                     </Grid>
//                     <Grid item xs={12} sm={6}>
//                       <Controller
//                         control={control}
//                         name={`sprints.${index}.sprintEndDate`}
//                         render={({ field }) => (
//                           <DatePickerInput
//                             label='Deadline Date'
//                             placeholder='Enter Sprint End Date'
//                             type='date'
//                             {...field}
//                           />
//                         )}
//                       />
//                     </Grid>

//                   </Grid>
//                 ))}
//                 <Button variant='outlined' className='mt-5' onClick={() => append(defaultSprint)}>
//                   Add Sprint
//                 </Button>
//               </div>
//             </Grid>
//           </Grid>
//         </DialogContent>
//         <DialogActions>
//           <Button variant='contained' type='submit'>
//             Save
//           </Button>
//           <Button variant='outlined' onClick={handleClose}>
//             Cancel
//           </Button>
//         </DialogActions>
//       </form>
//     </Dialog>
//   )
// }

// export default AddProjectsprint

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
import Dropdown from '@/app/Custom-Cpmponents/Select-dropdown/dropdown'

// Custom Components
import DialogCloseButton from '@/components/dialogs/DialogCloseButton'
import CustomTextInput from '@/app/Custom-Cpmponents/input/custominput'
import DatePickerInput from '@/app/Custom-Cpmponents/input/Datepickerinput'
import CustomTagInput from '@/app/Custom-Cpmponents/input/customtaginput'
import CustomDescriptionInput from '@/app/Custom-Cpmponents/input/customdescriptioinput'

// Define form data types
interface FormValues {
  projectname: string
  sprints: {
    sprintname: string
    addmodule: string[]
    sprintStartDate: string
    sprintEndDate: string
    description: string
    tester: string
    developer: string
    assignBy: string
  }[]
}

type EditUserInfoProps = {
  open: boolean
  setOpen: (open: boolean) => void
  data?: { projectname: string }
}

const AddProjectsprint = ({ open, setOpen, data }: EditUserInfoProps) => {
  const defaultSprint = {
    sprintname: '',
    addmodule: [],
    sprintStartDate: '',
    sprintEndDate: '',
    description: '',
    tester: '',
    developer: '',
    assignBy: ''
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

  const [options] = useState<string[]>(['Node.js', 'React.js', 'Next.js'])
  const [testers] = useState<string[]>(['Tester 1', 'Tester 2', 'Tester 3'])
  const [developers] = useState<string[]>(['Developer 1', 'Developer 2', 'Developer 3'])

  const { fields, append } = useFieldArray({
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
    setValue('sprints', [defaultSprint])
  }

  const handleSave = (formData: FormValues) => {
    console.log('Saved Data:', formData)
    setOpen(false)
  }

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
        Add Tickets
      </DialogTitle>
      <form onSubmit={handleSubmit(handleSave)}>
        <DialogContent>
          <Grid container spacing={5}>
            {/* Project Name and Title */}
            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <CustomTextInput
                    label='Project Name'
                    placeholder='Enter Project Name'
                    value={data?.projectname || ''}
                    onChange={() => {}}
                    disabled={true}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    control={control}
                    name={`sprints.0.sprintname`}
                    rules={{
                      validate: value => validateSprintNames(value, 0)
                    }}
                    render={({ field }) => (
                      <CustomTextInput
                        label='Title'
                        placeholder='Enter Title...'
                        {...field}
                        error={!!errors.sprints?.[0]?.sprintname}
                        helperText={errors.sprints?.[0]?.sprintname?.message}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* AssignBy and Tech Stack */}
            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Controller
                    control={control}
                    name={`sprints.0.assignBy`}
                    render={({ field }) => (
                      <CustomTextInput
                        label='Assign By'
                        placeholder='Enter Assign By...'
                        {...field}
                        error={!!errors.sprints?.[0]?.assignBy}
                        helperText={errors.sprints?.[0]?.assignBy?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    control={control}
                    name={`sprints.0.addmodule`}
                    render={({ field }) => (
                      <CustomTagInput
                        label='Select Tech Stack'
                        tags={field.value}
                        onChange={(value: string[]) => setValue(`sprints.0.addmodule`, value)}
                        options={options}
                        placeholder='Type and select tags'
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* Start Date and Deadline Date */}
            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Controller
                    control={control}
                    name={`sprints.0.sprintStartDate`}
                    render={({ field }) => (
                      <DatePickerInput label='Start Date' placeholder='Enter Task Start Date' type='date' {...field} />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    control={control}
                    name={`sprints.0.sprintEndDate`}
                    render={({ field }) => (
                      <DatePickerInput
                        label='Deadline Date'
                        placeholder='Enter Sprint End Date'
                        type='date'
                        {...field}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* Select Tester and Developer */}
            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Controller
                    control={control}
                    name={`sprints.0.tester`}
                    render={({ field }) => (
                      <Dropdown
                        label='Select Tester'
                        options={testers}
                        selectedOption={field.value}
                        onSelect={(selectedValue: string) => setValue(`sprints.0.tester`, selectedValue)}
                        error={!!errors.sprints?.[0]?.tester}
                        helperText={errors.sprints?.[0]?.tester?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    control={control}
                    name={`sprints.0.developer`}
                    render={({ field }) => (
                      <Dropdown
                        label='Select Developer'
                        options={developers}
                        selectedOption={field.value}
                        onSelect={(selectedValue: string) => setValue(`sprints.0.developer`, selectedValue)}
                        error={!!errors.sprints?.[0]?.developer}
                        helperText={errors.sprints?.[0]?.developer?.message}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* Description */}
            <Grid item xs={12}>
              <Controller
                control={control}
                name={`sprints.0.description`}
                render={({ field }) => (
                  <CustomDescriptionInput
                    label='Description'
                    placeholder='Enter Task Description'
                    value={field.value}
                    onChange={(value: string) => setValue(`sprints.0.description`, value)}
                    error={!!errors.sprints?.[0]?.description}
                    helperText={errors.sprints?.[0]?.description?.message}
                  />
                )}
              />
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
