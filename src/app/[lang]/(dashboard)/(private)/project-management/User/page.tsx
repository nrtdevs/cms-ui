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
  Stack
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

import EditprojectInfo from './editproject'
import ViewProjectInfo from './viewproject'
import Paginator from '@/app/Custom-Cpmponents/paginator/Paginator'
import AddProjectInfo from './addproject'
import OpenDialogOnElementClick from '@/app/Custom-Cpmponents/Buttons/OpenDialogOnElementClick'

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

const buttonaddrops: ButtonProps = {
  variant: 'contained',
  className: 'bg-primary text-white  rounded-sm',
  children: 'Add Project'
}

const UserProjectData: React.FC = () => {
  const [sorting, setSorting] = React.useState<SortingState>([])

  const [searchTerm, setSearchTerm] = useState('')

  const rowsPerPage = 10

  const data = useMemo(
    () => [
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
    ],
    []
  )

  const handleSearch = (value: string) => {
    setSearchTerm(value.toLowerCase())
  }

  const filteredData = useMemo(
    () =>
      data.filter(project => Object.values(project).some(value => value.toString().toLowerCase().includes(searchTerm))),
    [data, searchTerm]
  )

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
        header: 'Client Company',
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
              <OpenDialogOnElementClick
                element={Button}
                elementProps={buttonviewProps}
                dialog={ViewProjectInfo}
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

        <OpenDialogOnElementClick element={Button} elementProps={buttonaddrops} dialog={AddProjectInfo} />
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
  )
}

export default UserProjectData
