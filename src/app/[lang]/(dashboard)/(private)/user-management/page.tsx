'use client'

import React, { useMemo, useState } from 'react'

import { useRouter } from 'next/navigation'

import type { FilterFn } from '@tanstack/table-core'

import {
  Button,
  Stack,
  Typography,
  TableCell,
  Card,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  Paper
} from '@mui/material'

import type { SortingState } from '@tanstack/react-table'
import { createColumnHelper, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'

import AddUser from './adduser/page'

import Paginator from '../../../../Custom-Cpmponents/paginator/Paginator'

const users = Array.from({ length: 100 }, (_, index) => ({
  id: index + 1,
  name: `User ${index + 1}`,
  userId: `P${String(index + 1).padStart(5, '0')}`,
  email: `user${index + 1}@example.com`,
  contact: `+33-700-555-${String(200 + index)}`,
  position: [
    'Project Director',
    'Senior Developer',
    'Marketing Director',
    'Project Manager',
    'Product Manager',
    'Senior Designer'
  ][index % 6],
  company: ['FCC Construcción', 'TechCorp', 'DesignPro', 'FilmCo', 'BuildWorks'][index % 5],
  employeeType: ['Full - Time', 'Part - Time', 'Locally Hired', 'Freelancer', 'Contractor'][index % 5],
  activationDate: `01 Jan 2024`,
  endDate: `31 Dec 2024`
}))

interface Timesheet {
  id: number
  name: string
  userId: string
  email: string
  contact: string
  position: string
  company: string
  employeeType: string
  activationDate: string
  endDate: string
}

const Page: React.FC = () => {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const columnHelper = createColumnHelper<Timesheet>()
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)
  const router = useRouter()

  const rowsPerPage = 10

  const totalPages = Math.ceil(users.length / rowsPerPage)

  const [currentPage, setCurrentPage] = useState(1)

  const [paginatedData, setPaginatedData] = useState(users.slice(0, rowsPerPage))

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    const startIndex = (page - 1) * rowsPerPage
    const newData = users.slice(startIndex, startIndex + rowsPerPage)

    setPaginatedData(newData)
  }

  const handleAddUserClick = () => {
    setIsAddUserOpen(true)
  }

  const handleCloseAddUser = () => {
    setIsAddUserOpen(false)
  }

  const fuzzyFilter: FilterFn<any> = (row, columnId, filterValue) => {
    const cellValue = row.getValue(columnId)

    return cellValue?.toString().toLowerCase().includes(filterValue.toString().toLowerCase())
  }

  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        header: '',
        cell: info => (
          <Typography className='text-[#15d155]' sx={{ whiteSpace: 'nowrap' }}>
            {info.row.original.id}
          </Typography>
        )
      }),
      columnHelper.accessor('name', {
        header: 'EMPLOYEE NAME',
        cell: info => (
          <Typography color='text.primary' sx={{ whiteSpace: 'nowrap' }}>
            {info.row.original.name}
          </Typography>
        )
      }),
      columnHelper.accessor('userId', {
        header: 'USER ID',
        cell: info => (
          <Typography color='text.primary' sx={{ whiteSpace: 'nowrap' }}>
            {info.row.original.userId}
          </Typography>
        )
      }),
      columnHelper.accessor('email', {
        header: 'Email',
        cell: info => <Typography color='text.primary'>{info.row.original.email}</Typography>
      }),
      columnHelper.accessor('contact', {
        header: 'Contact No.',
        cell: info => (
          <Typography color='text.primary' sx={{ whiteSpace: 'nowrap' }}>
            {info.row.original.contact}
          </Typography>
        )
      }),
      columnHelper.accessor('position', {
        header: 'Position',
        cell: info => (
          <Typography color='text.primary' sx={{ whiteSpace: 'nowrap' }}>
            {info.row.original.position}
          </Typography>
        )
      }),
      columnHelper.accessor('company', {
        header: 'PARENT COMPANY',
        cell: info => (
          <Typography color='text.primary' sx={{ whiteSpace: 'nowrap' }}>
            {info.row.original.company}
          </Typography>
        )
      }),
      columnHelper.accessor('employeeType', {
        header: 'EMPLOYEE TYPE',
        cell: info => (
          <Typography color='text.primary' sx={{ whiteSpace: 'nowrap' }}>
            {info.row.original.employeeType}
          </Typography>
        )
      }),

      columnHelper.accessor('activationDate', {
        header: 'ACTIVATION DATE',
        cell: info => (
          <Typography color='text.primary' sx={{ whiteSpace: 'nowrap' }}>
            {info.row.original.activationDate}
          </Typography>
        )
      }),

      columnHelper.accessor('endDate', {
        header: 'END DATE',
        cell: info => (
          <Typography color='text.primary' sx={{ whiteSpace: 'nowrap' }}>
            {info.row.original.endDate}
          </Typography>
        )
      }),

      columnHelper.display({
        id: 'actions',
        header: 'Actions',
        cell: info => (
          <Typography color='text.primary' sx={{ whiteSpace: 'nowrap' }}>
            <Button
              onClick={() => router.push(`/user-management/updateuser/${info.row.original.userId}`)}
              className='bg-[#7b91b1] text-white p-0 rounded-sm'
              sx={{ fontSize: '0.5rem', minWidth: '20px', minHeight: '20px' }}
            >
              <i style={{ fontSize: '15px' }} className='tabler-edit text-white' />
            </Button>
            <Button
              className='bg-[#fc7182] text-white p-0 rounded-sm ml-1'
              sx={{ fontSize: '0.5rem', minWidth: '20px', minHeight: '20px' }}
            >
              <i style={{ fontSize: '15px' }} className='tabler-square-off' />
            </Button>
            <Button
              className='bg-[#55d6c3] text-white p-0 rounded-sm ml-1'
              sx={{ fontSize: '0.5rem', minWidth: '20px', minHeight: '20px' }}
            >
              <i style={{ fontSize: '15px' }} className='tabler-square-rounded-x' />
            </Button>
          </Typography>
        )
      })
    ],
    [columnHelper]
  )

  const table = useReactTable({
    data: paginatedData,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    filterFns: {}
  })

  return (
    <div className='container mx-auto p-4'>
      {/* Conditionally render the AddUser component or the User Table */}
      {isAddUserOpen ? (
        <div>
          <AddUser
            onClose={handleCloseAddUser}
            parentCompanies={[]}
            projects={[]}
            employeeTypes={[]}
            entitlements={[]}
          />
        </div>
      ) : (
        <div>
          <div className='flex justify-between items-center mb-4'>
            <h1 className='text-2xl font-bold text-blue-900'>User Management</h1>
            <button
              className='text-blue px-8 py-3 rounded-lg hover:bg-green-500'
              style={{ backgroundColor: '#cbff8c', color: '0c3479', fontWeight: '500' }}
              onClick={handleAddUserClick}
            >
              + ADD USER
            </button>
          </div>

          <Card className='mt-10'>
            <TableContainer component={Paper}>
              <Table>
                <TableHead className='bg-[#f3ffe5]'>
                  {table.getHeaderGroups().map(headerGroup => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map(header => (
                        <TableCell
                          className='text-[#0c3479] font-bold'
                          key={header.id}
                          onClick={header.column.getToggleSortingHandler()}
                          style={{
                            cursor: 'pointer',
                            padding: '12px 6px', // Increased padding
                            height: '60px', // Increased height
                            lineHeight: '24px' // Adjust line height
                          }}
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
                  {table.getRowModel().rows.map((row, index) => (
                    <TableRow
                      key={row.id}
                      sx={{
                        backgroundColor: index % 2 === 0 ? 'transparent' : '#f9f9f9',
                        border: '1px solid #ddd',
                        lineHeight: '1.4', // Reduce line height
                        padding: '4px' // Reduce padding in rows
                      }}
                    >
                      {row.getVisibleCells().map(cell => (
                        <TableCell key={cell.id} sx={{ border: '1px solid #ddd', padding: '6px' }}>
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
        </div>
      )}
    </div>
  )
}

export default Page
