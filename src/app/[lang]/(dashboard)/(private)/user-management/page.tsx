'use client'

import React, { useMemo, useState } from 'react'

import { useParams, useRouter } from 'next/navigation'

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
  Paper,
  Box
} from '@mui/material'

import type { SortingState, FilterFn } from '@tanstack/react-table'
import { createColumnHelper, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'

import AddUser from './adduser/page'

import Paginator from '../../../../Custom-Cpmponents/paginator/Paginator'
import SearchFilter from '@/app/Custom-Cpmponents/input/searchfilter'

const users = Array.from({ length: 100 }, (_, index) => ({
  id: index + 1,
  firstname: `User`,
  lastname: ` ${index + 1}`,
  employeeId: `P${String(index + 1).padStart(5, '0')}`,
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
  fullname: `First ${index + 1} Last ${index + 1}`,
  company: `Company ${index + 1}`,
  employeeType: `Type ${index % 3}`
}))

interface Timesheet {
  id: number
  firstname: string
  lastname: string
  employeeId: any
  email: string
  contact: string
  position: string
  company: string
  employeeType: string
  fullname: string
}

const Page: React.FC = () => {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const columnHelper = createColumnHelper<Timesheet>()
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()

  const local: any = useParams()

  console.log(local.lang, 'fjksdhgfkjhgsd')

  const rowsPerPage = 10

  const totalPages = Math.ceil(users.length / rowsPerPage)

  const [currentPage, setCurrentPage] = useState(1)

  // Apply the search term to the entire dataset (not just the paginated data)
  const filteredData = useMemo(() => {
    if (!searchTerm) return users

    return users.filter(user =>
      Object.values(user).some(value => value.toString().toLowerCase().includes(searchTerm.toLowerCase()))
    )
  }, [searchTerm])

  // Paginate the filtered data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage

    return filteredData.slice(startIndex, startIndex + rowsPerPage)
  }, [filteredData, currentPage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleAddUserClick = () => {
    setIsAddUserOpen(true)
  }

  const handleCloseAddUser = () => {
    setIsAddUserOpen(false)
  }

  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        header: '#',
        cell: info => <Typography sx={{ whiteSpace: 'nowrap' }}>{info.row.original.id}</Typography>
      }),
      columnHelper.accessor('fullname', {
        header: 'EMPLOYEE NAME',
        cell: info => (
          <Typography color='text.primary' sx={{ whiteSpace: 'nowrap' }}>
            {info.row.original.fullname}
          </Typography>
        )
      }),
      columnHelper.accessor('employeeId', {
        header: 'Employee ID',
        cell: info => (
          <Typography color='text.primary' sx={{ whiteSpace: 'nowrap' }}>
            {info.row.original.employeeId}
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

      columnHelper.display({
        id: 'actions',
        header: 'Actions',
        cell: info => (
          <Typography color='text.primary' sx={{ whiteSpace: 'nowrap' }}>
            <Button
              onClick={() => router.push(`/${local.lang}/user-management/updateuser/${info.row.original.employeeId}`)}
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

  // Define fuzzy filter function
  const fuzzyFilter: FilterFn<Timesheet> = (row, columnId, filterValue) => {
    const cellValue = row.getValue(columnId)

    return cellValue?.toString().toLowerCase().includes(filterValue.toLowerCase()) || false
  }

  const table = useReactTable({
    data: paginatedData,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    filterFns: {
      fuzzy: fuzzyFilter // Add the fuzzy filter here
    }
  })

  return (
    <Box>
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
          <Card className='mt-10'>
            <Box className='flex items-center justify-between m-5'>
              <SearchFilter
                label='Search'
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder='Search all fields'
              />
              <Button
                className=' px-8 py-2 rounded-md bg-primary text-white'
                style={{ backgroundColor: 'primary', fontWeight: '500', cursor: 'pointer' }}
                onClick={handleAddUserClick}
              >
                + ADD USER
              </Button>
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
        </div>
      )}
    </Box>
  )
}

export default Page
