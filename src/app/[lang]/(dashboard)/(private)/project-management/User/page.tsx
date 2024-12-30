'use client'

import React, { useMemo, useState } from 'react'

import { useRouter } from 'next/navigation' // Updated import for Next.js 13+

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
import Paginator from '@/app/Custom-Cpmponents/paginator/Paginator'

type Project = {
  id: number
  projectname: string
  projectdescription: string
  skills: string[]
  bidammount: number
  platform: string
  activation_date: string
  end_date: string
  clientname: string
  status: string
  clientemail: string
  clientcontact: string
  clientcompany: string
}

const UserProjectData: React.FC = () => {
  const router = useRouter() // Ensure this is used in a client component
  const [searchTerm, setSearchTerm] = useState('')

  const data: Project[] = [
    {
      id: 1,
      projectname: 'Project Alpha',
      projectdescription: 'A groundbreaking project.',
      skills: ['React', 'Node.js'],
      bidammount: 1500,
      platform: 'Web',
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
        accessorKey: 'projectdescription',
        header: 'Description',
        cell: info => (
          <Typography color='text.primary' sx={{ whiteSpace: 'nowrap' }}>
            {info.getValue<string>()}
          </Typography>
        )
      },
      {
        accessorKey: 'bidammount',
        header: 'Bid Amt',
        cell: info => (
          <Typography color='text.primary' sx={{ whiteSpace: 'nowrap' }}>
            {info.getValue<string>()}
          </Typography>
        )
      },
      {
        accessorKey: 'bidammount',
        header: 'Bid Amt',
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
        id: 'actions',
        header: 'Actions',
        cell: info => {
          const project = info.row.original

          return (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant='contained'
                color='primary'
                size='small'
                onClick={() => router.push(`/edit/${project.id}`)}
                className='bg-[#7b91b1] text-white p-0 rounded-sm'
                sx={{ fontSize: '0.5rem', minWidth: '20px', minHeight: '20px' }}
              >
                <i style={{ fontSize: '15px' }} className='tabler-edit text-white' />
              </Button>
              <Button
                variant='contained'
                color='secondary'
                size='small'
                className='bg-[#fc7182] text-white p-0 rounded-sm ml-1'
                sx={{ fontSize: '0.5rem', minWidth: '20px', minHeight: '20px' }}
              >
                <i style={{ fontSize: '15px' }} className='tabler-square-off' />
              </Button>
            </Box>
          )
        }
      }
    ],
    [router]
  )

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase())
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
        <SearchFilter label='Search' value={searchTerm} onChange={setSearchTerm} placeholder='Search all fields' />
        <Button variant='contained' color='primary' onClick={() => console.log('Add New Project')}>
          + Add Project
        </Button>
      </Box>
      <TableContainer component={Paper} className='shadow-none'>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell key={column.id} className='text-primary font-bold cursor-pointer'>
                  <Typography>{String(column.header)}</Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map(project => (
              <TableRow key={project.id}>
                {columns.map(column => (
                  <TableCell key={column.id || column.accessorKey}>
                    {column.cell?.({
                      row: { original: project },
                      getValue: () => project[column.accessorKey as keyof Project]
                    } as any)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className='flex items-center justify-center mt-10 mb-2 my-4'>
        <Stack spacing={2}>
          {/* <Paginator currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} /> */}
        </Stack>
      </div>
    </Card>
  )
}

export default UserProjectData
