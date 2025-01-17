

'use client'

import React, { useMemo, useState } from 'react'
import { ButtonProps } from '@mui/material'
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
import {
  SortingState,
  FilterFn,
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel
} from '@tanstack/react-table'
import Paginator from '../../../../Custom-Cpmponents/paginator/Paginator'
import SearchFilter from '@/app/Custom-Cpmponents/input/searchfilter'
import OpenDialogOnElementClick from '@/app/Custom-Cpmponents/Buttons/OpenDialogOnElementClick'
import EditRollInfo from './EditRollInfo'
import ViewRollInfo from './ViewRoleInfo'
import AddRole from './AddRole'

// Define missing types for better typing
interface PermissionDetails {
  id: number
  name: string
}

interface PermissionGroup {
  permission_group: string
  permissions: PermissionDetails[]
}

interface Permission {
  id: number
  name: string
  usertype: string
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

  // Sample permissions data with more entries
  const permissions: Permission[] = [
    {
      id: 1,
      usertype: 'user',
      name: 'Mid-Level Bidding Specialist',
      permissionname: 'View Permissions',
      userType: 'user',
      description: 'Responsible for viewing permissions within the bidding group.',
      permissions: [
        {
          permission_group: 'Bidding Group',
          permissions: [{ id: 1, name: 'View Permissions' }]
        }
      ],
      createdat: '2022-01-01',
    },
    {
      id: 2,
      usertype: 'user',
      name: 'Senior Bidding Specialist',
      permissionname: 'Edit Permissions',
      userType: 'user',
      description: 'Responsible for editing permissions within the bidding group.',
      permissions: [
        {
          permission_group: 'Bidding Group',
          permissions: [{ id: 2, name: 'Edit Permissions' }]
        }
      ],
      createdat: '2022-02-01',
    },
    {
      id: 3,
      usertype: 'superadmin',
      name: 'Bidding Manager',
      permissionname: 'Delete Permissions',
      userType: 'superadmin',
      description: 'Has the authority to delete permissions in the bidding group.',
      permissions: [
        {
          permission_group: 'Bidding Group',
          permissions: [{ id: 3, name: 'Delete Permissions' }]
        }
      ],
      createdat: '2022-03-01',
    },
    {
      id: 4,
      usertype: 'user',
      name: 'Reporting Analyst',
      permissionname: 'View Reports',
      userType: 'user',
      description: 'Responsible for viewing reports in the reporting group.',
      permissions: [
        {
          permission_group: 'Reporting Group',
          permissions: [{ id: 4, name: 'View Reports' }]
        }
      ],
      createdat: '2022-04-01',
    },
    {
      id: 5,
      usertype: 'user',
      name: 'Reporting Specialist',
      permissionname: 'Edit Reports',
      userType: 'user',
      description: 'Responsible for editing reports in the reporting group.',
      permissions: [
        {
          permission_group: 'Reporting Group',
          permissions: [{ id: 5, name: 'Edit Reports' }]
        }
      ],
      createdat: '2022-05-01',
    },
    {
      id: 6,
      usertype: 'superadmin',
      name: 'Data Reporting Analyst',
      permissionname: 'Delete Reports',
      userType: 'superadmin',
      description: 'Has the authority to delete reports in the reporting group.',
      permissions: [
        {
          permission_group: 'Reporting Group',
          permissions: [{ id: 6, name: 'Delete Reports' }]
        }
      ],
      createdat: '2022-06-01',
    },
    {
      id: 7,
      usertype: 'user',
      name: 'Content Developer',
      permissionname: 'View Content',
      userType: 'user',
      description: 'Responsible for viewing content in the content group.',
      permissions: [
        {
          permission_group: 'Content Group',
          permissions: [{ id: 7, name: 'View Content' }]
        }
      ],
      createdat: '2022-07-01',
    },
    {
      id: 8,
      usertype: 'user',
      name: 'Content Editor',
      permissionname: 'Edit Content',
      userType: 'user',
      description: 'Responsible for editing content in the content group.',
      permissions: [
        {
          permission_group: 'Content Group',
          permissions: [{ id: 8, name: 'Edit Content' }]
        }
      ],
      createdat: '2022-08-01',
    },
    {
      id: 9,
      usertype: 'superadmin',
      name: 'Content Manager',
      permissionname: 'Manage Content',
      userType: 'superadmin',
      description: 'Responsible for managing all aspects of content within the content group.',
      permissions: [
        {
          permission_group: 'Content Group',
          permissions: [{ id: 9, name: 'Manage Content' }]
        }
      ],
      createdat: '2022-09-01',
    },
    {
      id: 10,
      usertype: 'user',
      name: 'Senior Content Developer',
      permissionname: 'Create Content',
      userType: 'user',
      description: 'Responsible for creating content in the content group.',
      permissions: [
        {
          permission_group: 'Content Group',
          permissions: [{ id: 10, name: 'Create Content' }]
        }
      ],
      createdat: '2022-10-01',
    },
    {
      id: 11,
      usertype: 'superadmin',
      name: 'Settings Administrator',
      permissionname: 'Manage Settings',
      userType: 'superadmin',
      description: 'Has full authority to manage all settings within the settings group.',
      permissions: [
        {
          permission_group: 'Settings Group',
          permissions: [{ id: 11, name: 'Manage Settings' }]
        }
      ],
      createdat: '2022-11-01',
    },
    {
      id: 12,
      usertype: 'user',
      name: 'Settings Specialist',
      permissionname: 'Edit Settings',
      userType: 'user',
      description: 'Responsible for editing settings within the settings group.',
      permissions: [
        {
          permission_group: 'Settings Group',
          permissions: [{ id: 12, name: 'Edit Settings' }]
        }
      ],
      createdat: '2022-12-01',
    },
    {
      id: 13,
      usertype: 'user',
      name: 'Settings Viewer',
      permissionname: 'View Settings',
      userType: 'user',
      description: 'Responsible for viewing settings in the settings group.',
      permissions: [
        {
          permission_group: 'Settings Group',
          permissions: [{ id: 13, name: 'View Settings' }]
        }
      ],
      createdat: '2023-01-01',
    },
    {
      id: 14,
      usertype: 'user',
      name: 'Notifications Developer',
      permissionname: 'Create Notifications',
      userType: 'user',
      description: 'Responsible for creating notifications within the notifications group.',
      permissions: [
        {
          permission_group: 'Notifications Group',
          permissions: [{ id: 14, name: 'Create Notifications' }]
        }
      ],
      createdat: '2023-02-01',
    },
    {
      id: 15,
      usertype: 'user',
      name: 'Notifications Editor',
      permissionname: 'Edit Notifications',
      userType: 'user',
      description: 'Responsible for editing notifications within the notifications group.',
      permissions: [
        {
          permission_group: 'Notifications Group',
          permissions: [{ id: 15, name: 'Edit Notifications' }]
        }
      ],
      createdat: '2023-03-01',
    },
    {
      id: 16,
      usertype: 'superadmin',
      name: 'Notifications Manager',
      permissionname: 'Manage Notifications',
      userType: 'superadmin',
      description: 'Has full authority to manage notifications within the notifications group.',
      permissions: [
        {
          permission_group: 'Notifications Group',
          permissions: [{ id: 16, name: 'Manage Notifications' }]
        }
      ],
      createdat: '2023-04-01',
    }
  ]

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
          <Typography color="text.primary" sx={{ whiteSpace: 'nowrap' }}>
            {info.getValue()}
          </Typography>
        )
      }),
      columnHelper.accessor('usertype', {
        header: 'User Type',
        cell: info => (
          <Typography color="text.primary" sx={{ whiteSpace: 'nowrap' }}>
            {info.getValue()}
          </Typography>
        )
      }),
      columnHelper.accessor('createdat', {
        id: 'createdat',
        header: 'Created At',
        cell: info => <Typography color="text.primary">{info.getValue()}</Typography>
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
                dialogProps={{ roleData }}
              />
              <OpenDialogOnElementClick
                element={Button}
                elementProps={buttonviewProps}
                dialog={ViewRollInfo}
                dialogProps={{ roleData }}
              />
              <Button
                variant="contained"
                color="secondary"
                size="small"
                className="bg-[#fc7182] text-white p-0 rounded-sm ml-1"
                sx={{ fontSize: '0.5rem', minWidth: '20px', minHeight: '20px' }}
              >
                <i style={{ fontSize: '15px' }} className="tabler-square-off" />
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
      <Box className="mt-10">
        <Box className="flex items-center justify-between m-5">
          <SearchFilter label="Search" value={searchTerm} onChange={setSearchTerm} placeholder="Search all fields" />
          <OpenDialogOnElementClick element={Button} elementProps={buttonaddrops} dialog={AddRole} />
        </Box>
        <TableContainer component={Paper} className="shadow-none">
          <Table>
            <TableHead>
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <TableCell
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      className="text-primary font-bold cursor-pointer"
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
        <div className="flex items-center justify-center mt-10 mb-2 my-4">
          <Stack spacing={2}>
            <Paginator currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </Stack>
        </div>
      </Box>
    </Card>
  )
}

export default Page
