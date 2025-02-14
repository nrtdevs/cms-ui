'use client'

import React, { useMemo, useState } from 'react'

import type { ButtonProps } from '@mui/material'
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
import { createColumnHelper, useReactTable, getCoreRowModel, getSortedRowModel } from '@tanstack/react-table'

import Paginator from '../../../../Custom-Cpmponents/paginator/Paginator'
import SearchFilter from '@/app/Custom-Cpmponents/input/searchfilter'
import OpenDialogOnElementClick from '@/app/Custom-Cpmponents/Buttons/OpenDialogOnElementClick'
import EditRollInfo from './EditRollInfo'
import ViewRollInfo from './ViewRoleInfo'
import AddRole from './AddRole'

// Define missing types for better typing
interface PermissionDetails {
  id: number
  permissionname: string
}

interface PermissionGroup {
  permission_group: string
  permissions: PermissionDetails[]
}

interface Permission {
  id: number
  name: string
  userType: string
  permissionname: string
  description: string
  permissions: PermissionGroup[]
  createdat: string
}

// Define Button props for better typing
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
  children: 'Add Role'
}

const Page: React.FC = () => {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const columnHelper = createColumnHelper<Permission>()
  const [searchTerm, setSearchTerm] = useState<string>('')

  const rowsPerPage = 10

  const permissions: Permission[] = useMemo(
    () => [
      {
        id: 1,
        name: 'Mid-Level Bidding Specialist',
        permissionname: 'View Permissions',
        userType: 'user',
        description: 'Responsible for viewing permissions within the bidding group.',
        permissions: [
          {
            permission_group: 'Dashboard',
            permissions: [{ permissionname: 'read', id: 34 }]
          },
          {
            permission_group: 'User',
            permissions: [
              { permissionname: 'create', id: 23 },
              { permissionname: 'read', id: 47 },
              { permissionname: 'update', id: 12 },
              // { permissionname: 'approve', id: 8 },
              // { permissionname: 'block', id: 74 }
            ]
          },
          {
            permission_group: 'Bidding',
            permissions: [
              { permissionname: 'create', id: 23 },
              { permissionname: 'read', id: 47 },
              { permissionname: 'update', id: 12 },
              { permissionname: 'approve', id: 8 },
              { permissionname: 'block', id: 74 }
            ]
          },
          {
            permission_group: 'Reporting',
            permissions: [
              { permissionname: 'create', id: 30 },
              { permissionname: 'edit', id: 59 },
              { permissionname: 'delete', id: 24 }
            ]
          },
          {
            permission_group: 'Content',
            permissions: [
              { permissionname: 'create', id: 30 },
              { permissionname: 'edit', id: 59 },
              { permissionname: 'delete', id: 24 }
            ]
          },
          {
            permission_group: 'Settings',
            permissions: [
              { permissionname: 'create', id: 30 },
              { permissionname: 'edit', id: 59 },
              { permissionname: 'delete', id: 24 }
            ]
          },
          {
            permission_group: 'Notifications',
            permissions: [
              { permissionname: 'create', id: 30 },
              { permissionname: 'edit', id: 59 },
              { permissionname: 'delete', id: 24 }
            ]
          }
        ],
        createdat: '2022-01-01'
      },
      {
        id: 2,
        userType: 'superadmin',
        name: 'Senior Bidding Specialist',
        permissionname: 'Edit Permissions',
        description: 'Responsible for editing permissions within the bidding group.',
        permissions: [
          {
            permission_group: 'Dashboard',
            permissions: [{ permissionname: 'read', id: 34 }]
          },
          {
            permission_group: 'User',
            permissions: [
              { permissionname: 'create', id: 23 },
              { permissionname: 'read', id: 47 },
              { permissionname: 'update', id: 12 },
              { permissionname: 'approve', id: 8 },
              { permissionname: 'block', id: 74 }
            ]
          },
          {
            permission_group: 'Bidding',
            permissions: [
              { permissionname: 'create', id: 23 },
              { permissionname: 'read', id: 47 },
              { permissionname: 'update', id: 12 },
              { permissionname: 'approve', id: 8 },
              { permissionname: 'block', id: 74 }
            ]
          },
          {
            permission_group: 'Reporting',
            permissions: [
              { permissionname: 'create', id: 30 },
              { permissionname: 'edit', id: 59 },
              { permissionname: 'delete', id: 24 }
            ]
          },
          {
            permission_group: 'Content',
            permissions: [
              { permissionname: 'create', id: 30 },
              { permissionname: 'edit', id: 59 },
              { permissionname: 'delete', id: 24 }
            ]
          },
          {
            permission_group: 'Settings',
            permissions: [
              { permissionname: 'create', id: 30 },
              { permissionname: 'edit', id: 59 },
              { permissionname: 'delete', id: 24 }
            ]
          },
          {
            permission_group: 'Notifications',
            permissions: [
              { permissionname: 'create', id: 30 },
              { permissionname: 'edit', id: 59 },
              { permissionname: 'delete', id: 24 }
            ]
          }
        ],
        createdat: '2022-02-01'
      }
    ],
    []
  )

  const totalPages = Math.ceil(permissions.length / rowsPerPage)

  const [currentPage, setCurrentPage] = useState(1)

  const filteredData = useMemo(() => {
    if (!searchTerm) return permissions

    return permissions.filter(permission =>
      Object.values(permission).some(value => value.toString().toLowerCase().includes(searchTerm.toLowerCase()))
    )
  }, [searchTerm, permissions])

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage

    return filteredData.slice(startIndex, startIndex + rowsPerPage)
  }, [filteredData, currentPage, rowsPerPage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        id: 'id',
        header: '#',
        cell: info => <Typography sx={{ whiteSpace: 'nowrap' }}>{info.getValue()}</Typography>
      }),
      columnHelper.accessor('name', {
        header: 'Role Name',
        cell: info => (
          <Typography color='text.primary' sx={{ whiteSpace: 'nowrap' }}>
            {info.getValue()}
          </Typography>
        )
      }),
      columnHelper.accessor('userType', {
        header: 'User Type',
        cell: info => (
          <Typography color='text.primary' sx={{ whiteSpace: 'nowrap' }}>
            {info.getValue()}
          </Typography>
        )
      }),
      columnHelper.accessor('createdat', {
        id: 'createdat',
        header: 'Created At',
        cell: info => <Typography color='text.primary'>{info.getValue()}</Typography>
      }),

      columnHelper.display({
        id: 'actions',
        header: 'Actions',
        cell: info => {
          const roleData = info.row.original

          return (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <OpenDialogOnElementClick
                element={Button}
                elementProps={buttonProps}
                dialog={EditRollInfo}
                dialogProps={{ roleData  }}
              />
              <OpenDialogOnElementClick
                element={Button}
                elementProps={buttonviewProps}
                dialog={ViewRollInfo}
                dialogProps={{ roleData }}
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

  const fuzzyFilter: FilterFn<Permission> = (row, columnId, filterValue) => {
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
    filterFns: { fuzzy: fuzzyFilter }
  })

  return (
    <Card>
      <Box className='mt-10'>
        <Box className='flex items-center justify-between m-5'>
          <SearchFilter label='Search' value={searchTerm} onChange={setSearchTerm} placeholder='Search all fields' />
          <OpenDialogOnElementClick element={Button} elementProps={buttonaddrops} dialog={AddRole} />
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
                      {typeof cell.column.columnDef.cell === 'function'
                        ? cell.column.columnDef.cell(cell.getContext())
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
