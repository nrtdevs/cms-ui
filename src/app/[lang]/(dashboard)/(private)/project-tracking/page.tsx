'use client'

import React from 'react'

import { Box } from '@mui/material'

import AdminProjectTracking from './admin/page'

// import UserProjectData from './User/page'

const ProjectsPage = () => {
  return (
    <Box>
      {/* <UserProjectData /> */}
      <AdminProjectTracking />
    </Box>
  )
}

export default ProjectsPage
