'use client'
import React from 'react'

import { Grid } from '@mui/material'

import AdminDashboard from './admin/page'
import UserDashboard from './user/page'
import SupportTracker from '@/views/dashboards/analytics/SupportTracker'

const Page: React.FC = () => {
  return (
    <div>
      <h1 className='text-primary-2'>Dashboard</h1>
      <div className='flex flex-wrap gap-6'>
        <Grid item xs={12} md={6}>
          <SupportTracker />
        </Grid>
        <Grid item xs={12} md={6}>
          <SupportTracker />
        </Grid>
        <AdminDashboard />
        <UserDashboard />
      </div>
    </div>
  )
}

export default Page
