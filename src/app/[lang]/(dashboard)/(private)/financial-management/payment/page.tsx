'use client'

import React, { useMemo, useState } from 'react'
import { flexRender } from '@tanstack/react-table'

import type { ButtonProps } from '@mui/material'
import {
  Typography,
  Button,
  Box,
  Card,
  Grid,
  Stack,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper
} from '@mui/material'

import {
  useReactTable,
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  FilterFn
} from '@tanstack/react-table'

import SearchFilter from '@/app/Custom-Cpmponents/input/searchfilter'
import Paginator from '@/app/Custom-Cpmponents/paginator/Paginator'
import OpenDialogOnElementClick from '@/app/Custom-Cpmponents/Buttons/OpenDialogOnElementClick'
import FilterDropdown from '@/app/Custom-Cpmponents/Select-dropdown/filterdropdown'
import ViewFinance from './viewFinance'
import EditFinance from './editFinance'
import AddFinance from './addFinance'

type Project = {
  id: string
  projectName: string
  amount: string
  transactionId: string
  paymentMode: string
  refId: string
  paymentDate: string
  receivedAmt: string
  pendingAmt: string
  description: string // Added description field
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
  children: 'Add Payment',
  size: 'large'
}

const AdminTeamManagement: React.FC = () => {
  const [selectedManager, setSelectedManager] = useState<string>('')
  const [sorting, setSorting] = useState<SortingState>([])
  const [searchTerm, setSearchTerm] = useState<string>('')

  const rowsPerPage = 10

  const data: Project[] = useMemo(
    () => [
      {
        id: '1',
        projectName: 'Project Alpha',
        amount: '$5000',
        transactionId: 'T12345',
        paymentMode: 'Credit Card',
        refId: 'R1234',
        paymentDate: '2025-01-01',
        receivedAmt: '$3000',
        pendingAmt: '$2000',
        description: 'Initial project phase',
        paymentSlip: `SL${Math.random().toString(36).substr(2, 9).toUpperCase()}`
      },
      {
        id: '2',
        projectName: 'Project Beta',
        amount: '$7500',
        transactionId: 'T12346',
        paymentMode: 'Bank Transfer',
        refId: 'R1235',
        paymentDate: '2025-01-10',
        receivedAmt: '$5000',
        pendingAmt: '$2500',
        description: 'Client onboarding and setup',
        paymentSlip: `SL${Math.random().toString(36).substr(2, 9).toUpperCase()}`
      },
      {
        id: '3',
        projectName: 'Project Gamma',
        amount: '$10000',
        transactionId: 'T12347',
        paymentMode: 'PayPal',
        refId: 'R1236',
        paymentDate: '2025-01-15',
        receivedAmt: '$7000',
        pendingAmt: '$3000',
        description: 'Marketing campaign launch',
        paymentSlip: `SL${Math.random().toString(36).substr(2, 9).toUpperCase()}`
      },
      {
        id: '4',
        projectName: 'Project Delta',
        amount: '$6000',
        transactionId: 'T12348',
        paymentMode: 'Bank Transfer',
        refId: 'R1237',
        paymentDate: '2025-01-20',
        receivedAmt: '$4000',
        pendingAmt: '$2000',
        description: 'Product development phase',
        paymentSlip: `SL${Math.random().toString(36).substr(2, 9).toUpperCase()}`
      },
      {
        id: '5',
        projectName: 'Project Epsilon',
        amount: '$8500',
        transactionId: 'T12349',
        paymentMode: 'Credit Card',
        refId: 'R1238',
        paymentDate: '2025-01-25',
        receivedAmt: '$5500',
        pendingAmt: '$3000',
        description: 'Final review and adjustments',
        paymentSlip: `SL${Math.random().toString(36).substr(2, 9).toUpperCase()}`
      }
      // Add more projects here...
    ],
    []
  )

  const handleSearch = (value: string) => {
    setSearchTerm(value.toLowerCase())
  }

  const filteredData = useMemo(() => {
    return data
      .filter(project => (selectedManager ? project.projectName === selectedManager : true))
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

  const columns: ColumnDef<Project, any>[] = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: () => (
          <span className='text-primary' style={{ fontWeight: 'bold' }}>
            #
          </span>
        ),
        cell: info => (
          <Typography color='text.primary' sx={{ whiteSpace: 'nowrap' }} className='text-primary'>
            {info.getValue<string>()}
          </Typography>
        ),
        enableSorting: true
      },
      {
        accessorKey: 'projectName',
        header: () => (
          <span className='text-primary' style={{ fontWeight: 'bold' }}>
            Project Name
          </span>
        ),
        cell: info => (
          <Typography color='text.primary' sx={{ whiteSpace: 'nowrap' }}>
            {info.getValue<string>()}
          </Typography>
        ),
        enableSorting: true
      },
      {
        accessorKey: 'amount',
        header: () => (
          <span className='text-primary' style={{ fontWeight: 'bold' }}>
            Amount
          </span>
        ),
        cell: info => (
          <Typography color='text.primary' sx={{ whiteSpace: 'nowrap' }}>
            {info.getValue<string>()}
          </Typography>
        ),
        enableSorting: true
      },
      {
        accessorKey: 'transactionId',
        header: () => (
          <span className='text-primary' style={{ fontWeight: 'bold' }}>
            Transaction ID
          </span>
        ),
        cell: info => (
          <Typography color='text.primary' sx={{ whiteSpace: 'nowrap' }}>
            {info.getValue<string>()}
          </Typography>
        ),
        enableSorting: true
      },
      {
        accessorKey: 'paymentMode',
        header: () => (
          <span className='text-primary' style={{ fontWeight: 'bold' }}>
            Payment Mode
          </span>
        ),
        cell: info => (
          <Typography color='text.primary' sx={{ whiteSpace: 'nowrap' }}>
            {info.getValue<string>()}
          </Typography>
        ),
        enableSorting: true
      },
      {
        accessorKey: 'refId',
        header: () => (
          <span className='text-primary' style={{ fontWeight: 'bold' }}>
            Ref ID
          </span>
        ),
        cell: info => (
          <Typography color='text.primary' sx={{ whiteSpace: 'nowrap' }}>
            {info.getValue<string>()}
          </Typography>
        ),
        enableSorting: true
      },
      {
        accessorKey: 'paymentDate',
        header: () => (
          <span className='text-primary' style={{ fontWeight: 'bold' }}>
            Payment Date
          </span>
        ),
        cell: info => (
          <Typography color='text.primary' sx={{ whiteSpace: 'nowrap' }}>
            {info.getValue<string>()}
          </Typography>
        ),
        enableSorting: true
      },
      {
        accessorKey: 'description', // New column for description
        header: () => (
          <span className='text-primary' style={{ fontWeight: 'bold' }}>
            Description
          </span>
        ),
        cell: info => (
          <Typography color='text.primary' sx={{ whiteSpace: 'nowrap' }}>
            {info.getValue<string>()}
          </Typography>
        ),
        enableSorting: true
      },
      {
        id: 'actions',
        header: () => (
          <span className='text-primary' style={{ fontWeight: 'bold' }}>
            Actions
          </span>
        ),
        cell: info => {
          const project = info.row.original

          return (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <OpenDialogOnElementClick
                element={Button}
                elementProps={buttonProps}
                dialog={EditFinance}
                dialogProps={{ data: project }}
              />
              <OpenDialogOnElementClick
                element={Button}
                elementProps={buttonviewProps}
                dialog={ViewFinance}
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
    pageCount: totalPages
  })

  return (
    <Card>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          m: 5,
          gap: 2
        }}
      >
        <Grid container spacing={2} alignItems='center' sx={{ flex: 1 }}>
          <Grid item xs={12} sm={5} md={3}>
            <SearchFilter label='Search' value={searchTerm} onChange={handleSearch} placeholder='Search all fields' />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FilterDropdown
              options={data.map(project => project.projectName)}
              selectedOption={selectedManager}
              onSelect={value => {
                setSelectedManager(value)
              }}
            />
          </Grid>
        </Grid>
        <OpenDialogOnElementClick element={Button} elementProps={buttonAddProps} dialog={AddFinance} />
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {table.getHeaderGroups().map(headerGroup =>
                headerGroup.headers.map(header => (
                  <TableCell key={header.id} onClick={header.column.getToggleSortingHandler()}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    {{ asc: ' 🔼', desc: ' 🔽' }[header.column.getIsSorted() as string] ?? null}
                  </TableCell>
                ))
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map(row => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
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

export default AdminTeamManagement
