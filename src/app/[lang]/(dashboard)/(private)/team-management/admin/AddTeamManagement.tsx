'use client'

import React, { useState } from 'react'

import { Button, Typography, Grid, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import Swal from 'sweetalert2'

import CustomTextInput from '../../../../../Custom-Cpmponents/input/custominput'
import Dropdown from '../../../../../Custom-Cpmponents/Select-dropdown/dropdown'
import TagInput from '../../../../../Custom-Cpmponents/input/customtaginput' // Assuming you have a tag input component
import CustomDescriptionInput from '@/app/Custom-Cpmponents/input/customdescriptioinput'

interface TeamData {
  teamName: string
  description: string
  teamLead: string
  members: string[]
  techStack: string[]
  status: string // Added status field
}

interface AddTeamProps {
  open: boolean
  setOpen: (open: boolean) => void
}

const techStackTypes = ['React.js', 'Next.js', 'Node.js', 'Angular.js', 'Vue.js']
const positionTypes = ['Project-Manager', 'Team-Lead', 'Developer', 'Designer', 'Tester']
const statusTypes = ['Active', 'Inactive', 'Pending'] // Status options

const AddTeamManagement: React.FC<AddTeamProps> = ({ open, setOpen }) => {
  const handleClose = () => {
    setOpen(false)
  }

  // Initial empty data state
  const initialTeamData: TeamData = {
    teamName: '',
    description: '',
    teamLead: '',
    members: [],
    techStack: [],
    status: '' // Initialize status as empty
  }

  const [teamData, setTeamData] = useState<TeamData>(initialTeamData)
  const [errors, setErrors] = useState<{ [key in keyof TeamData]?: string }>({})

  const handleInputChange = (field: keyof TeamData, value: string | string[]) => {
    setTeamData(prevData => ({
      ...prevData,
      [field]: value
    }))

    if (errors[field]) {
      validateField(field, value)
    }
  }

  const validateField = (field: keyof TeamData, value: string | string[]) => {
    let error = ''

    // Required field validation
    if (!value) {
      error = `${field} is required`
    }

    setErrors(prevErrors => ({
      ...prevErrors,
      [field]: error
    }))
  }

  const validateAllFields = () => {
    const newErrors: { [key in keyof TeamData]?: string } = {}

    // Loop through each field in teamData
    Object.keys(teamData).forEach(key => {
      const field = key as keyof TeamData
      const value = teamData[field]

      // Skip validation for unnecessary fields and perform validation only for required ones
      if (!value || (Array.isArray(value) && value.length === 0)) {
        newErrors[field] = `${field} is required`
      }
    })

    // Additional validation for status
    if (!teamData.status) {
      newErrors.status = 'Status is required'
    }

    setErrors(newErrors)

    // Return true if there are no errors
    return Object.keys(newErrors).length === 0
  }

  const handleAddTeam = () => {
    if (validateAllFields()) {
      console.log('New team data:', teamData)

      // Close dialog immediately
      handleClose()

      // Reset form data
      setTeamData(initialTeamData)

      // Show success Swal
      Swal.fire({
        title: 'Success!',
        text: 'Team added successfully!',
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
        Add Team Details
        <Typography component='span' className='flex flex-col text-center'>
          Please enter the details for the new team.
        </Typography>
      </DialogTitle>
      <form onSubmit={e => e.preventDefault()}>
        <DialogContent className='overflow-visible pbs-0 sm:pli-16'>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Typography variant='h6' className='text-primary font-bold'>
                Team Details
              </Typography>
            </Grid>

            <Grid item xs={12} sm={4}>
              <CustomTextInput
                label='Team Name'
                placeholder='Team Name'
                value={teamData.teamName}
                onChange={value => handleInputChange('teamName', value)}
                error={!!errors.teamName}
                helperText={errors.teamName}
                required
              />
            </Grid>


            <Grid item xs={12} sm={4}>
              <Dropdown
                label='Team Lead'
                options={['User1', 'User2', 'User3']} // Replace with actual data
                selectedOption={teamData.teamLead}
                onSelect={value => handleInputChange('teamLead', value)}
                error={!!errors.teamLead}
                helperText={errors.teamLead}
                required
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TagInput
                options={positionTypes}
                label='Add Members'
                tags={teamData.members}
                onChange={value => handleInputChange('members', value)}
                error={!!errors.members}
                helperText={errors.members}
                required
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TagInput
                options={techStackTypes}
                label='Tech Stack'
                tags={teamData.techStack}
                onChange={value => handleInputChange('techStack', value)}
                error={!!errors.techStack}
                helperText={errors.techStack}
                required
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <Dropdown
                label='Status'
                options={statusTypes} // Added dropdown for status
                selectedOption={teamData.status}
                onSelect={value => handleInputChange('status', value)}
                error={!!errors.status}
                helperText={errors.status}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <CustomDescriptionInput
                label='Team Description'
                placeholder='Team Description...'
                value={teamData.description}
                onChange={value => handleInputChange('description', value)}
              />
            </Grid>

          </Grid>
        </DialogContent>
        <DialogActions className='justify-center pbs-0 sm:pbe-16 sm:pli-16'>
          <Button variant='contained' onClick={handleAddTeam} type='submit'>
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

export default AddTeamManagement
