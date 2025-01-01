'use client'

import React from 'react'

import { Box } from '@mui/material'

import AdminProjectData from './admin/page'

// import UserProjectData from './User/page'

const ProjectsPage = () => {
  return (
    <Box>
      {/* <UserProjectData /> */}
      <AdminProjectData />
    </Box>
  )
}

export default ProjectsPage
