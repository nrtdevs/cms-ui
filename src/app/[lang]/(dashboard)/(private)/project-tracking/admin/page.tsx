'use client'

import React, { useMemo, useState } from 'react'

import type { ButtonProps } from '@mui/material'
import { ThemeColor } from '@/@core/types'


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
  Stack,
  Grid,
  Chip
} from '@mui/material'

import {
  useReactTable,
  type ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  type SortingState,
  type FilterFn
} from '@tanstack/react-table'

import SearchFilter from '@/app/Custom-Cpmponents/input/searchfilter'

import Paginator from '@/app/Custom-Cpmponents/paginator/Paginator'

import OpenDialogOnElementClick from '@/app/Custom-Cpmponents/Buttons/OpenDialogOnElementClick'

import FilterDropdown from '@/app/Custom-Cpmponents/Select-dropdown/filterdropdown'

import editTrackStatus from '../edittrackstatus'
import ViewTrackStatus from '../viewtrackstatus'
import AddProjectsprint from '../addprojectsprint'

type Project = {
  id: number
  projectname: string
  projectdescription: string
  skills: string[]
  currency: string
  Actualbidammount: number
  bid_creater: string
  platform: string
  bid_date: string
  activation_date: string
  end_date: string
  clientname: string
  status: string
  clientemail: string
  clientcontact: string
  clientcompany: string
  projectlead: string
  frontenddev: string[]
  backenddev: string[]
  testingteam: string[]
  Projectstartdate: string
  recivedammount: number
  pendingammount: number
  clientcountry: string
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

const buttonaddmoduleProps: ButtonProps = {
  variant: 'contained',
  color: 'primary',
  size: 'small',
  className: 'bg-[#5eba00] text-white p-0 rounded-sm',
  sx: { fontSize: '0.5rem', minWidth: '20px', minHeight: '20px' },
  children: <i style={{ fontSize: '15px' }} className='tabler-plus text-white' />
}

const AdminProjectTracking: React.FC = () => {
  const [selectedManager, setSelectedManager] = useState('')
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [isViewTrackStatusOpen, setIsViewTrackStatusOpen] = useState(false)

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const rowsPerPage = 10

  const data = useMemo(
    () => [
      {
        id: 1,
        projectname: 'Project Alpha',
        projectdescription: 'A groundbreaking project.',
        skills: ['React', 'Node.js'],
        currency: 'USD',
        Actualbidammount: 1500,
        platform: 'Web',
        bid_date: '2024-02-01',
        activation_date: '2024-01-01',
        end_date: '2024-06-01',
        clientname: 'John Doe',
        status: 'active',
        bid_creater: 'Rihana',
        clientemail: 'john.doe@example.com',
        clientcontact: '1234567890',
        clientcompany: 'Doe Enterprises',
        projectlead: 'Anil',
        frontenddev: ['shivam'],
        backenddev: ['gaurav'],
        testingteam: ['akash'],
        Projectstartdate: '2025-01-02',
        recivedammount: 1200,
        pendingammount: 300,
        clientcountry: 'India'
      },
      {
        id: 2,
        projectname: 'Project Beta',
        projectdescription: 'An innovative app.',
        skills: ['Angular', 'TypeScript'],
        Actualbidammount: 2000,
        platform: 'Mobile',
        bid_date: '2024-02-01',
        bid_creater: 'Shashank',
        activation_date: '2024-02-01',
        end_date: '2024-08-01',
        clientname: 'Jane Smith',
        status: 'pending',
        currency: 'INR',
        clientemail: 'jane.smith@example.com',
        clientcontact: '9876543210',
        clientcompany: 'Smith Corp',
        projectlead: 'Anil',
        frontenddev: ['shivam'],
        backenddev: ['gaurav'],
        testingteam: ['akash'],
        Projectstartdate: '2025-01-02',
        recivedammount: 1500,
        pendingammount: 500,
        clientcountry: 'USA'
      }
    ],
    []
  )


  type UserStatusType = {
    [key: string]: ThemeColor
  }

  const userStatusObj: UserStatusType = {
    active: 'success',
    pending: 'warning',
    inactive: 'secondary'
  }

  const bidCreators = Array.from(new Set(data.map(item => item.bid_creater)))

  const handleSearch = (value: string) => {
    setSearchTerm(value.toLowerCase())
  }

  const handleViewTrackStatusClick = (project: Project) => {
    setSelectedProject(project)
    setIsViewTrackStatusOpen(true)
  }

  const handleCloseViewTrackStatus = () => {
    setIsViewTrackStatusOpen(false)
    setSelectedProject(null)
  }

  const filteredData = useMemo(() => {
    return data
      .filter(project => (selectedManager ? project.bid_creater === selectedManager : true))
      .filter(project => Object.values(project).some(value => value.toString().toLowerCase().includes(searchTerm)))
  }, [data, selectedManager, searchTerm])

  const totalPages = Math.ceil(filteredData.length / rowsPerPage)

  const [currentPage, setCurrentPage] = useState(1)

  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      setCurrentPage(page)
    }
  }

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage

    return filteredData.slice(startIndex, startIndex + rowsPerPage)
  }, [filteredData, currentPage])

  const fuzzyFilter: FilterFn<Project> = (row, columnId, filterValue) => {
    const cellValue = row.getValue(columnId)

    return cellValue?.toString().toLowerCase().includes(filterValue.toLowerCase()) || false
  }

  const columns = useMemo<ColumnDef<Project>[]>(
    () => [
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
        accessorKey: 'Projectstartdate',
        header: 'Start Date',
        cell: info => (
          <Typography color='text.primary' sx={{ whiteSpace: 'nowrap' }}>
            {info.getValue<string>()}
          </Typography>
        )
      },
      {
        accessorKey: 'end_date',
        header: 'Project Deadline',
        cell: info => (
          <Typography color='text.primary' sx={{ whiteSpace: 'nowrap' }}>
            {info.getValue<string>()}
          </Typography>
        )
      },

      {
        accessorKey: 'Actualbidammount',
        header: 'Project Amount',
        cell: info => (
          <Typography color='text.primary' sx={{ whiteSpace: 'nowrap' }}>
            ${info.getValue<number>().toLocaleString()}
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
        accessorKey: 'clientcountry',
        header: 'Client Country',
        cell: info => (
          <Typography color='text.primary' sx={{ whiteSpace: 'nowrap' }}>
            {info.getValue<string>()}
          </Typography>
        )
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: info => {
          const status = info.getValue<string>()
          return(
          <div className='flex items-center gap-3'>
          <Chip
            variant='tonal'
            label={status}
            size='small'
            color={userStatusObj[status]}
            className='capitalize'
          />
        </div>
          )
        }
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
                dialog={editTrackStatus}
                dialogProps={{ data: project }}
              />
              <OpenDialogOnElementClick
                element={Button}
                elementProps={buttonaddmoduleProps}
                dialog={AddProjectsprint}
                dialogProps={{ data: project }}
              />
              <Button {...buttonviewProps} onClick={() => handleViewTrackStatusClick(project)} />
            </Box>
          )
        }
      }
    ],
    []
  )

  const table = useReactTable({
    data: paginatedData,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    filterFns: {
      fuzzy: fuzzyFilter
    },
    manualPagination: true,
    pageCount: totalPages // Use totalPages for controlled pagination
  })

  return (
    <Box>
      {isViewTrackStatusOpen && selectedProject ? (
        <ViewTrackStatus data={selectedProject} onClose={handleCloseViewTrackStatus} />
      ) : (
        <Card>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              m: 5
            }}
          >
            <Grid container spacing={2} alignItems='center'>
              <Grid item xs={12} sm={5} md={3}>
                <SearchFilter
                  label='Search'
                  value={searchTerm}
                  onChange={handleSearch}
                  placeholder='Search all fields'
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3} className='mb-1'>
                <FilterDropdown
                  options={bidCreators}
                  selectedOption={selectedManager}
                  onSelect={value => {
                    setSelectedManager(value)
                    console.log('Selected Bid Creator:', value)
                  }}
                />
              </Grid>
            </Grid>
          </Box>

          <TableContainer component={Paper} className='shadow-none '>
            <Table>
              <TableHead>
                {table.getHeaderGroups().map(headerGroup => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                      <TableCell
                        key={header.id}
                        onClick={header.column.getToggleSortingHandler()}
                        className='text-primary font-bold cursor-pointer'
                      >
                        {header.isPlaceholder
                          ? null
                          : typeof header.column.columnDef.header === 'function'
                            ? header.column.columnDef.header(header.getContext())
                            : header.column.columnDef.header}
                        {header.column.getIsSorted() === 'asc'
                          ? ' 🔼'
                          : header.column.getIsSorted() === 'desc'
                            ? ' 🔽'
                            : ''}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableHead>
              <TableBody>
                {table.getRowModel().rows.map(row => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map(cell => (
                      <TableCell key={cell.id}>
                        {cell.column.columnDef.cell
                          ? typeof cell.column.columnDef.cell === 'function'
                            ? cell.column.columnDef.cell(cell.getContext())
                            : cell.getValue()
                          : cell.getValue()}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div className='flex items-center justify-center mt-10 mb-2 my-4'>
            <Stack spacing={2}>
              <Paginator currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </Stack>
          </div>
        </Card>
      )}
    </Box>
  )
}

export default AdminProjectTracking
