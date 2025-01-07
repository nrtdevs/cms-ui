'use client'
import React from 'react'

import Link from 'next/link'

import { Box, Grid } from '@mui/material'

import DistributedBarChartOrder from '@/views/dashboards/crm/DistributedBarChartOrder'
import LineAreaYearlySalesChart from '@/views/dashboards/crm/LineAreaYearlySalesChart'
import CardStatsVertical from '@/components/card-statistics/Vertical'
import BarChartRevenueGrowth from '@/views/dashboards/crm/BarChartRevenueGrowth'
import EarningReportsWithTabs from '@/views/dashboards/crm/EarningReportsWithTabs'
import RadarSalesChart from '@/views/dashboards/crm/RadarSalesChart'
import SalesByCountries from '@/views/dashboards/analytics/SalesByCountries'
import ProjectStatus from '@/views/dashboards/crm/ProjectStatus'
import ActiveProjects from '@/views/dashboards/crm/ActiveProjects'

import ActivityTimeline from '@/views/dashboards/crm/ActivityTimeline'
import SupportTracker from '@/views/dashboards/analytics/SupportTracker'

export type DataType = {
  name: string

  value: number
}

const Page: React.FC = () => {
  return (
    <Box>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <Link href='/user-management'>
            <CardStatsVertical
              title='Total Users'
              subtitle='Last Week'
              stats='100'
              avatarColor='success'
              avatarIcon='tabler-user'
              avatarSkin='light'
              avatarSize={44}
              chipText='Active: 90'
              chipColor='success'
              chipVariant='tonal'
            />
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <Link href='/project-management'>
            <CardStatsVertical
              title='Total Biddings'
              subtitle='Last Week'
              stats='2'
              avatarColor='info'
              avatarIcon='tabler-hammer'
              avatarSkin='light'
              avatarSize={44}
              chipText='Approved: 0'
              chipColor='info'
              chipVariant='tonal'
            />
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <Link href='/project-tracking'>
            <CardStatsVertical
              title='Total Projects'
              subtitle='Last Week'
              stats='0'
              avatarColor='success'
              avatarIcon='tabler-package'
              avatarSkin='light'
              avatarSize={44}
              chipText='Completed: 0'
              chipColor='success'
              chipVariant='tonal'
            />
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <LineAreaYearlySalesChart />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <CardStatsVertical
            title='Total Profit'
            subtitle='Last Week'
            stats='1.28k'
            avatarColor='error'
            avatarIcon='tabler-user'
            avatarSkin='light'
            avatarSize={44}
            chipText='-12.2%'
            chipColor='error'
            chipVariant='tonal'
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <DistributedBarChartOrder />
        </Grid>

        <Grid item xs={12} md={8} lg={4}>
          <BarChartRevenueGrowth />
        </Grid>
        <Grid item xs={12} lg={8}>
          <EarningReportsWithTabs />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <RadarSalesChart />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <SalesByCountries />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <ProjectStatus />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <ActiveProjects />
        </Grid>

        <Grid item xs={12} md={6}>
          <ActivityTimeline />
        </Grid>
        <Grid item xs={12} md={6}>
          <SupportTracker />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Page
