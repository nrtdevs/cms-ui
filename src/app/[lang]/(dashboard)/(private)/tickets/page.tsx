'use client'

import React, { useMemo, useState } from 'react'

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
  Stack,
  Grid
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
import EditTicket from './EditTickets'
import ViewTicket from './ViewTickets'
import AddProjectsprint from '../project-tracking/addprojectsprint'

type Project = {
  id: number
  title: string
  projectname: string
  Projectstartdate: string
  end_date: string
  clientname: string
  status: string
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

const buttonAddProps: ButtonProps = {
  variant: 'contained',
  className: 'bg-primary text-white rounded-sm py-1 px-4',
  children: 'Add Tickets',
  size: 'large'
}

const AdminProjectTracking: React.FC = ({}) => {
  const [selectedManager, setSelectedManager] = useState('')
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const rowsPerPage = 10

  const data = useMemo(
    () => [
      {
        id: 1,
        projectname: 'Project Alpha',
        title: 'User',
        Projectstartdate: '2025-01-02',
        end_date: '2024-06-01',
        clientname: 'John Doe',
        status: 'Active',
        ticketName: 'Login Bug Fix',
        assignee: 'Sarah Lee',
        ticketStatus: 'In Progress',
        priority: 'High',
        tags: ['Bug', 'Urgent'],
        ticketDescription: 'Fixing the login issue where users cannot authenticate.'
      },
      {
        id: 2,
        projectname: 'Project Beta',
        title: 'Super Admin',
        Projectstartdate: '2025-01-02',
        end_date: '2024-08-01',
        clientname: 'Jane Smith',
        status: 'Unactive',
        ticketName: 'Admin Panel Redesign',
        assignee: 'Michael Wright',
        ticketStatus: 'Not Started',
        priority: 'Medium',
        tags: ['UI', 'Design'],
        ticketDescription: 'Redesign the admin panel to improve the user interface and accessibility.'
      },
      {
        id: 3,
        projectname: 'Project Gamma',
        title: 'Administrator',
        Projectstartdate: '2025-03-01',
        end_date: '2024-12-15',
        clientname: 'Emily Davis',
        status: 'Active',
        ticketName: 'Security Patch Update',
        assignee: 'Lucas Allen',
        ticketStatus: 'Completed',
        priority: 'Low',
        tags: ['Security', 'Patch'],
        ticketDescription: 'Update security patches and make necessary fixes.'
      },
      {
        id: 4,
        projectname: 'Project Delta',
        title: 'Admin',
        Projectstartdate: '2025-04-10',
        end_date: '2025-10-30',
        clientname: 'David Lee',
        status: 'Unactive',
        ticketName: 'Backend Optimization',
        assignee: 'Olivia Martinez',
        ticketStatus: 'In Progress',
        priority: 'High',
        tags: ['Backend', 'Optimization'],
        ticketDescription: 'Optimize backend code for faster processing and better performance.'
      }
    ],
    []
  )

  const bidCreators = Array.from(new Set(data.map(item => item.clientname)))

  const handleSearch = (value: string) => {
    setSearchTerm(value.toLowerCase())
  }

  const filteredData = useMemo(() => {
    return data
      .filter(project => (selectedManager ? project.clientname === selectedManager : true))
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
        accessorKey: 'id',
        header: '#',
        cell: info => (
          <Typography color='text.primary' sx={{ whiteSpace: 'nowrap' }}>
            {info.getValue<string>()}
          </Typography>
        )
      },

      {
        accessorKey: 'title',
        header: 'Title',
        cell: info => (
          <Typography color='text.primary' sx={{ whiteSpace: 'nowrap' }}>
            {info.getValue<string>()}
          </Typography>
        )
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
        header: 'Task Deadline',
        cell: info => (
          <Typography color='text.primary' sx={{ whiteSpace: 'nowrap' }}>
            {info.getValue<string>()}
          </Typography>
        )
      },
      {
        accessorKey: 'clientname',
        header: 'Assign By',
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
          let icon, borderColor, textColor, padding

          // Set icon and colors based on status
          if (status === 'Active') {
            icon = '✓' // Green tick
            borderColor = '#198754' // Green
            textColor = '#198754'
            padding = '29px 29px '
          } else if (status === 'Unactive') {
            icon = '✗' // Orange tick
            borderColor = '#fd0054' // Orange
            textColor = '#fd0054'
            padding = '29px 20px '
          } else if (status === 'Completed') {
            icon = '✓' // Blue tick
            borderColor = 'blue' // Blue
            textColor = 'blue' // Blue
          } else {
            icon = '✗' // Cross for undefined or other statuses
            borderColor = 'gray' // Default gray
            textColor = 'gray'
            padding = '29px 29px '
          }

          return (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                color: textColor,
                border: `1px solid ${borderColor}`,
                padding: '4px 8px',
                borderRadius: '4px',
                width: '60%'
              }}
            >
              <span style={{ fontSize: '16px', marginRight: '8px' }}>{icon}</span>
              <span>{status}</span>
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
                dialog={EditTicket}
                dialogProps={{ data: project }}
              />
              <OpenDialogOnElementClick
                element={Button}
                elementProps={buttonviewProps}
                dialog={ViewTicket}
                dialogProps={{ data: project }}
              />
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
      <Card>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            m: 5,
            gap: 2
          }}
        >
          <Grid container spacing={2} alignItems='center' sx={{ flex: 1 }}>
            <Grid item xs={12} sm={5} md={3}>
              <SearchFilter label='Search' value={searchTerm} onChange={handleSearch} placeholder='Search all fields' />
            </Grid>
            <Grid item xs={12} sm={6} md={3} className='mb-1'>
              <FilterDropdown
                options={bidCreators}
                selectedOption={selectedManager}
                onSelect={value => {
                  setSelectedManager(value)
                }}
              />
            </Grid>
          </Grid>
          <OpenDialogOnElementClick element={Button} elementProps={buttonAddProps} dialog={AddProjectsprint} />
        </Box>

        <TableContainer component={Paper} className='shadow-none'>
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
    </Box>
  )
}

export default AdminProjectTracking
