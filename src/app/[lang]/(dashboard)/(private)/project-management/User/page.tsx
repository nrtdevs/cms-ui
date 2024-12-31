'use client'

import React, { useMemo, useState } from 'react'

import { useRouter } from 'next/navigation'

import type { ButtonProps } from '@mui/material'
import {
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Card,
  Stack
} from '@mui/material'

import type { ColumnDef } from '@tanstack/react-table'

import SearchFilter from '@/app/Custom-Cpmponents/input/searchfilter'

import OpenDialogOnElementClick from '@/components/dialogs/OpenDialogOnElementClick'

import EditprojectInfo from './editproject'
import ViewProjectInfo from './viewproject'

type Project = {
  id: number
  projectname: string
  projectdescription: string
  skills: string[]
  bidammount: number
  platform: string
  bid_date: string
  activation_date: string
  end_date: string
  clientname: string
  status: string
  clientemail: string
  clientcontact: string
  clientcompany: string
}

const buttonProps: ButtonProps = {
  variant: 'contained',
  color: 'primary',
  size: 'small',
  className: 'bg-[#7b91b1] text-white p-0 rounded-sm',
  sx: { fontSize: '0.5rem', minWidth: '20px', minHeight: '20px' },
  children: <i style={{ fontSize: '15px' }} className='tabler-edit text-white' />
}

const buttonviewProps: ButtonProps = {
  variant: 'contained',
  color: 'primary',
  size: 'small',
  className: 'bg-primary text-white p-0 rounded-sm',
  sx: { fontSize: '0.5rem', minWidth: '20px', minHeight: '20px' },
  children: <i style={{ fontSize: '15px' }} className='tabler-eye text-white' />
}

const UserProjectData: React.FC = () => {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')

  const data: Project[] = [
    {
      id: 1,
      projectname: 'Project Alpha',
      projectdescription: 'A groundbreaking project.',
      skills: ['React', 'Node.js'],
      bidammount: 1500,
      platform: 'Web',
      bid_date: '2024-02-01',
      activation_date: '2024-01-01',
      end_date: '2024-06-01',
      clientname: 'John Doe',
      status: 'Active',
      clientemail: 'john.doe@example.com',
      clientcontact: '1234567890',
      clientcompany: 'Doe Enterprises'
    },
    {
      id: 2,
      projectname: 'Project Beta',
      projectdescription: 'An innovative app.',
      skills: ['Angular', 'TypeScript'],
      bidammount: 2000,
      platform: 'Mobile',
      bid_date: '2024-02-01',
      activation_date: '2024-02-01',
      end_date: '2024-08-01',
      clientname: 'Jane Smith',
      status: 'Completed',
      clientemail: 'jane.smith@example.com',
      clientcontact: '9876543210',
      clientcompany: 'Smith Corp'
    }
  ]

  const columns = useMemo<ColumnDef<Project>[]>(
    () => [
      {
        accessorKey: 'id',
        header: '#',
        cell: info => <Typography sx={{ whiteSpace: 'nowrap' }}>{info.getValue<number>()}</Typography>
      },
      {
        accessorKey: 'projectname',
        header: 'Project Name',
        cell: info => (
          <Typography color='text.primary' sx={{ whiteSpace: 'nowrap' }}>
            {info.getValue<string>()}
          </Typography>
        )
      },

      {
        accessorKey: 'skills',
        header: 'Skills',
        cell: info => (
          <Typography color='text.primary' sx={{ whiteSpace: 'nowrap' }}>
            {info.getValue<string[]>().join(', ')}
          </Typography>
        )
      },
      {
        accessorKey: 'platform',
        header: 'Platform',
        cell: info => (
          <Typography color='text.primary' sx={{ whiteSpace: 'nowrap' }}>
            {info.getValue<string>()}
          </Typography>
        )
      },
      {
        accessorKey: 'bid_date',
        header: 'Bid Date',
        cell: info => (
          <Typography color='text.primary' sx={{ whiteSpace: 'nowrap' }}>
            {info.getValue<string>()}
          </Typography>
        )
      },
      {
        accessorKey: 'clientname',
        header: 'Client Name',
        cell: info => (
          <Typography color='text.primary' sx={{ whiteSpace: 'nowrap' }}>
            {info.getValue<string>()}
          </Typography>
        )
      },

      {
        accessorKey: 'clientemail',
        header: 'Client Email',
        cell: info => (
          <Typography color='text.primary' sx={{ whiteSpace: 'nowrap' }}>
            {info.getValue<string>()}
          </Typography>
        )
      },
      {
        accessorKey: 'clientcontact',
        header: 'Client Contact',
        cell: info => (
          <Typography color='text.primary' sx={{ whiteSpace: 'nowrap' }}>
            {info.getValue<string>()}
          </Typography>
        )
      },
      {
        accessorKey: 'clientcompany',
        header: 'Client Compony',
        cell: info => (
          <Typography color='text.primary' sx={{ whiteSpace: 'nowrap' }}>
            {info.getValue<string>()}
          </Typography>
        )
      },
      {
        accessorKey: 'bidammount',
        header: 'Bid Amount',
        cell: info => (
          <Typography color='text.primary' sx={{ whiteSpace: 'nowrap' }}>
            ${info.getValue<number>().toLocaleString()}
          </Typography>
        )
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: info => {
          const project = info.row.original

          return (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <OpenDialogOnElementClick
                element={Button}
                elementProps={buttonProps}
                dialog={EditprojectInfo}
                dialogProps={{ data: project }}
              />
              <Button
                variant='contained'
                color='secondary'
                size='small'
                className='bg-[#fc7182] text-white p-0 rounded-sm ml-1'
                sx={{ fontSize: '0.5rem', minWidth: '20px', minHeight: '20px' }}
              >
                <i style={{ fontSize: '15px' }} className='tabler-square-off' />
              </Button>
              <OpenDialogOnElementClick
                element={Button}
                elementProps={buttonviewProps}
                dialog={ViewProjectInfo}
                dialogProps={{ data: project }}
              />
            </Box>
          )
        }
      }
    ],
    [router]
  )

  const handleSearch = (value: string) => {
    setSearchTerm(value.toLowerCase())
  }

  const filteredData = data.filter(project =>
    Object.values(project).some(value => value.toString().toLowerCase().includes(searchTerm))
  )

  return (
    <Card>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          m: 5
        }}
      >
        <SearchFilter label='Search' value={searchTerm} onChange={handleSearch} placeholder='Search all fields' />
        <Button variant='contained' color='primary' onClick={() => console.log('Add New Project')}>
          + Add Project
        </Button>
      </Box>
      <TableContainer component={Paper} className='shadow-none'>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id || (column as ColumnDef<Project> & { accessorKey?: string }).accessorKey}
                  className='text-primary font-bold cursor-pointer'
                >
                  <Typography>{String(column.header)}</Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map(project => (
              <TableRow key={project.id}>
                {columns.map(column => (
                  <TableCell
                    key={
                      column.id ||
                      ((column as ColumnDef<Project> & { accessorKey: keyof Project }).accessorKey as string)
                    }
                  >
                    {typeof column.cell === 'function' &&
                      column.cell({
                        row: { original: project },
                        getValue: () =>
                          project[(column as ColumnDef<Project> & { accessorKey: keyof Project }).accessorKey]
                      } as any)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className='flex items-center justify-center mt-10 mb-2 my-4'>
        <Stack spacing={2}>{/* Pagination logic can be added here */}</Stack>
      </div>
    </Card>
  )
}

export default UserProjectData
