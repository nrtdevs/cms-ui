'use client'

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'


// Third Party Imports
import classnames from 'classnames'
import type { ApexOptions } from 'apexcharts'

// Types Imports
import type { ThemeColor } from '@core/types'

// Components Imports
import OptionMenu from '@core/components/option-menu'
import CustomAvatar from '@core/components/mui/Avatar'

// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

type DataType = {
  title: string
  subtitle: string
  avatarIcon: string
  avatarColor?: ThemeColor
}

// Vars for default options
const defaultOptions: ApexOptions = {
  stroke: { dashArray: 10 },
  labels: ['Completed Task'],
  colors: ['var(--mui-palette-primary-main)'],
  states: {
    hover: {
      filter: { type: 'none' }
    },
    active: {
      filter: { type: 'none' }
    }
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'dark',
      opacityTo: 0.5,
      opacityFrom: 1,
      shadeIntensity: 0.5,
      stops: [30, 70, 100],
      inverseColors: false,
      gradientToColors: ['var(--mui-palette-primary-main)']
    }
  },
  plotOptions: {
    radialBar: {
      endAngle: 130,
      startAngle: -140,
      hollow: { size: '60%' },
      track: { background: 'transparent' },
      dataLabels: {
        name: {
          offsetY: -24,
          color: 'var(--mui-palette-text-disabled)',
          fontFamily: 'Roboto, sans-serif',
          fontSize: '14px'
        },
        value: {
          offsetY: 8,
          fontWeight: 500,
          formatter: value => `${value}%`,
          color: 'var(--mui-palette-text-primary)',
          fontFamily: 'Roboto, sans-serif',
          fontSize: '32px'
        }
      }
    }
  },
  grid: {
    padding: {
      top: -18,
      left: 0,
      right: 0,
      bottom: 14
    }
  },
  responsive: [
    {
      breakpoint: 1380,
      options: {
        grid: {
          padding: {
            top: 8,
            left: 12
          }
        }
      }
    },
    {
      breakpoint: 1280,
      options: {
        chart: {
          height: 325
        },
        grid: {
          padding: {
            top: 12,
            left: 12
          }
        }
      }
    },
    {
      breakpoint: 1201,
      options: {
        chart: {
          height: 362
        }
      }
    },
    {
      breakpoint: 1135,
      options: {
        chart: {
          height: 350
        }
      }
    },
    {
      breakpoint: 980,
      options: {
        chart: {
          height: 300
        }
      }
    },
    {
      breakpoint: 900,
      options: {
        chart: {
          height: 350
        }
      }
    }
  ]
}

// SupportTracker Component accepting props
interface SupportTrackerProps {
  totalTickets: number
  data: DataType[]
  chartPercentage: number
}

const SupportTracker = ({ totalTickets, data, chartPercentage }: SupportTrackerProps) => {
  return (
    <Card>
      <CardHeader
        title="Support Tracker"
        subheader="Last 7 Days"
        action={<OptionMenu options={['Refresh', 'Edit', 'Share']} />}
      />
      <CardContent className="flex flex-col sm:flex-row items-center justify-between gap-7">
        <div className="flex flex-col gap-6 is-full sm:is-[unset]">
          <div className="flex flex-col">
            <Typography variant="h2">{totalTickets}</Typography>
            <Typography>Total Tickets</Typography>
          </div>
          <div className="flex flex-col gap-4 is-full">
            {data.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <CustomAvatar skin="light" variant="rounded" color={item.avatarColor} size={34}>
                  <i className={classnames(item.avatarIcon, 'text-[22px]')} />
                </CustomAvatar>
                <div className="flex flex-col">
                  <Typography className="font-medium" color="text.primary">
                    {item.title}
                  </Typography>
                  <Typography variant="body2">{item.subtitle}</Typography>
                </div>
              </div>
            ))}
          </div>
        </div>
        <AppReactApexCharts
          type="radialBar"
          height={350}
          width="100%"
          series={[chartPercentage]}
          options={defaultOptions}
        />
      </CardContent>
    </Card>
  )
}

export default SupportTracker
