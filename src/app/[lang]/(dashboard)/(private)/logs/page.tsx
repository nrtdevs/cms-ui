'use client'

import React, { useMemo, useState } from 'react'

import {
  Typography,
  TableCell,
  Card,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  Paper,
  Box,
  Stack,
  Button,
  ButtonProps
} from '@mui/material'

import { SortingState, FilterFn, createColumnHelper, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'

import Paginator from '../../../../Custom-Cpmponents/paginator/Paginator'
import SearchFilter from '@/app/Custom-Cpmponents/input/searchfilter'


import ViewLogsInfo from './viewlogs'
import OpenDialogOnElementClick from '@/app/Custom-Cpmponents/Buttons/OpenDialogOnElementClick'

// Adjusted users array to match headers
const users = Array.from({ length: 100 }, (_, index) => ({
  id: index + 1,
  fullname: `User ${index + 1}`, // Combines firstname and lastname
  event: `Event ${index + 1}`, // Repurposed from email or another relevant source
  description: `Description for User ${index + 1}`, // Repurposed from contact or custom description
  attributes: [
    'Project Director',
    'Senior Developer',
    'Marketing Director',
    'Project Manager',
    'Product Manager',
    'Senior Designer'
  ][index % 6], // Using position
  createdDate: `2023-12-${(index % 30) + 1}` // Simulated created date
}))

interface Timesheet {
  id: number
  fullname: string
  event: string
  description: string
  attributes: string
  createdDate: string
}

const buttonviewProps: ButtonProps = {
  variant: 'contained',
  color: 'primary',
  size: 'small',
  className: 'bg-primary text-white p-0 rounded-sm',
  sx: { fontSize: '0.5rem', minWidth: '20px', minHeight: '20px' },
  children: <i style={{ fontSize: '15px' }} className='tabler-eye text-white' />
}

const Page: React.FC = () => {
  const [sorting, setSorting] = useState<SortingState>([]) // Explicitly define SortingState
  const columnHelper = createColumnHelper<Timesheet>()
  const [searchTerm, setSearchTerm] = useState('')

  const rowsPerPage = 10
  const totalPages = Math.ceil(users.length / rowsPerPage)
  const [currentPage, setCurrentPage] = useState(1)

  const filteredData = useMemo(() => {
    if (!searchTerm) return users

    return users.filter(user =>
      Object.values(user).some(value => value.toString().toLowerCase().includes(searchTerm.toLowerCase()))
    )
  }, [searchTerm])

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage
    return filteredData.slice(startIndex, startIndex + rowsPerPage)
  }, [filteredData, currentPage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        header: '#',
        cell: info => <Typography sx={{ whiteSpace: 'nowrap' }}>{info.row.original.id}</Typography>
      }),
      columnHelper.accessor('fullname', {
        header: 'User',
        cell: info => (
          <Typography color='text.primary' sx={{ whiteSpace: 'nowrap' }}>
            {info.row.original.fullname}
          </Typography>
        )
      }),
      columnHelper.accessor('event', {
        header: 'Event',
        cell: info => (
          <Typography color='text.primary' sx={{ whiteSpace: 'nowrap' }}>
            {info.row.original.event}
          </Typography>
        )
      }),
      columnHelper.accessor('description', {
        header: 'Description',
        cell: info => (
          <Typography color='text.primary' sx={{ whiteSpace: 'nowrap' }}>
            {info.row.original.description}
          </Typography>
        )
      }),
      columnHelper.accessor('attributes', {
        header: 'Attributes',
        cell: info => (
          <Typography color='text.primary' sx={{ whiteSpace: 'nowrap' }}>
            {info.row.original.attributes}
          </Typography>
        )
      }),
      columnHelper.accessor('createdDate', {
        header: 'Created Date',
        cell: info => (
          <Typography color='text.primary' sx={{ whiteSpace: 'nowrap' }}>
            {info.row.original.createdDate}
          </Typography>
        )
      }),
      columnHelper.display({
        id: 'actions',
        header: 'Actions',
        cell: info => {
          const user = info.row.original

          return (
            <Box sx={{ display: 'flex', gap: 1 }}>
              {/* <OpenDialogOnElementClick
                element={Button}
                elementProps={buttonProps}
                dialog={EditUserInfo}
                dialogProps={{ data: user }}
              /> */}
              <OpenDialogOnElementClick
                element={Button}
                elementProps={buttonviewProps}
                dialog={ViewLogsInfo}
                dialogProps={{ data: user }}
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
      })
    ],
    [columnHelper]
  )

  // Simple fuzzy filter function for the columns
  const fuzzyFilter: FilterFn<Timesheet> = (row, columnId, filterValue) => {
    const cellValue = row.getValue(columnId)
    return cellValue?.toString().toLowerCase().includes(filterValue.toLowerCase()) || false
  }

  const table = useReactTable({
    data: paginatedData,
    columns,
    state: { sorting },
    onSortingChange: setSorting, // Type matches correctly
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    filterFns: {
      fuzzy: fuzzyFilter // Adding filter function to resolve the missing filterFns error
    }
  })

  return (
    <Card>
      <Box className='mt-10'>
        <Box className='flex items-center justify-between m-5'>
          <SearchFilter label='Search' value={searchTerm} onChange={setSearchTerm} placeholder='Search all fields' />
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
      </Box>
    </Card>
  )
}

export default Page

