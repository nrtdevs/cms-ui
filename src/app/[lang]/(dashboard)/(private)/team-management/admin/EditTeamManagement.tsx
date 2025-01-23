'use client'

import React, { useState, useEffect } from 'react'
import { Button, Typography, Grid, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import Swal from 'sweetalert2'
import CustomTextInput from '../../../../../Custom-Cpmponents/input/custominput'
import Dropdown from '../../../../../Custom-Cpmponents/Select-dropdown/dropdown'
import TagInput from '../../../../../Custom-Cpmponents/input/customtaginput'
import CustomDescriptionInput from '@/app/Custom-Cpmponents/input/customdescriptioinput'

interface Member {
  id: string
  name: string
}

interface Project {
  name: string
  id: string
  teamname: string
  description: string
  status: string
  teamLead: string
  members: Member[]
  techStack: string[]
}

interface EditTeamProps {
  open: boolean
  setOpen: (open: boolean) => void
  data: Project // The project data to be edited
}

const techStackTypes = ['React.js', 'Next.js', 'Node.js', 'Angular.js', 'Vue.js']
const positionTypes = ['Project-Manager', 'Team-Lead', 'Developer', 'Designer', 'Tester']

const EditTeamManagement: React.FC<EditTeamProps> = ({ open, setOpen, data }) => {
  const handleClose = () => {
    setOpen(false)
  }

  // Initialize state with the project data

  const [teamData, setTeamData] = useState<Project>(data)
  const [errors, setErrors] = useState<{ [key in keyof Project]?: string }>({})

  useEffect(() => {
    setTeamData(data)
  }, [data])
   
  const handleInputChange = (field: keyof Project, value: string | string[] | Member[]) => {
    setTeamData(prevData => ({
      ...prevData,
      [field]: value
    }))

    if (errors[field]) {
      validateField(field, value)
    }
  }

  const validateField = (field: keyof Project, value: string | string[] | Member[]) => {
    let error = ''

    // Required field validation
    if (!value || (Array.isArray(value) && value.length === 0)) {
      error = `${field} is required`
    }

    setErrors(prevErrors => ({
      ...prevErrors,
      [field]: error
    }))
  }

  const validateAllFields = () => {
    const newErrors: { [key in keyof Project]?: string } = {}

    // Loop through each field in teamData
    Object.keys(teamData).forEach(key => {
      const field = key as keyof Project
      const value = teamData[field]

      // Perform validation for required fields
      if (!value || (Array.isArray(value) && value.length === 0)) {
        newErrors[field] = `${field} is required`
      }

      // Additional check for status field
      if (field === 'status' && !value) {
        newErrors[field] = 'Status is required'
      }
    })

    setErrors(newErrors)

    // Return true if there are no errors
    return Object.keys(newErrors).length === 0
  }

  const handleEditTeam = () => {
    if (validateAllFields()) {
      console.log('Updated team data:', teamData)

      // Close dialog immediately
      handleClose()

      // Show success Swal
      Swal.fire({
        title: 'Success!',
        text: 'Team updated successfully!',
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

  const teamLeadData = [
    'John Doe',
    'Sarah Lee',
    'Emily Davis',
    'Michael Wright',
    'James Taylor',
    'Olivia Martinez',
    'Benjamin Wilson',
    'Lucas Allen',
    'Daniel Thompson',
    'Mason Carter',
    'Isabella Williams',
    'Alexander Martinez',
    'Victoria Moore',
    'Evelyn White',
    'Liam Martinez'
  ];

  const teamLeadStatus = ['InProgress', 'Completed', 'Active', 'Pending']

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth='md'>
      <DialogTitle variant='h4' className='flex gap-2 flex-col text-primary text-center sm:pbs-16 sm:pbe-6 sm:pli-16'>
        Edit Team Details
        <Typography component='span' className='flex flex-col text-center'>
          Modify the details for the team.
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
                value={teamData.teamname}
                onChange={value => handleInputChange('teamname', value)}
                error={!!errors.teamname}
                helperText={errors.teamname}
                required
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <Dropdown
                label='Team Lead'
                options={teamLeadData} // Map to member names for dropdown
                selectedOption={teamData.teamLead} // Pass team lead name as selected option
                onSelect={value => handleInputChange('teamLead', value)}
                error={!!errors.teamLead}
                helperText={errors.teamLead}
                required
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <Dropdown
                label='Status'
                options={teamLeadStatus} // Map to member names for dropdown
                selectedOption={teamData.status} // Pass team lead name as selected option
                onSelect={value => handleInputChange('status', value)}
                error={!!errors.status}
                helperText={errors.status}
                required
              />
            </Grid>

            <Grid item xs={12} sm={4} sx={{ minWidth: '50%' }}>
              <TagInput
                options={positionTypes}
                label='Add Members'
                tags={teamData.members.map(member => member.name)} // Pass member names as tags
                onChange={value =>
                  handleInputChange(
                    'members',
                    value.map(name => ({ id: '', name })) // Update member array with objects
                  )
                }
                error={!!errors.members}
                helperText={errors.members}
                required
              />
            </Grid>

            <Grid item xs={12} sm={4} sx={{ minWidth: '50%' }}>
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
          <Button variant='contained' onClick={handleEditTeam} type='submit'>
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

export default EditTeamManagement
