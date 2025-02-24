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
  Paper,
  Chip
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
import EditTeamManagement from './EditTeamManagement'
import ViewTeamManagement from './ViewTeamManagement'
import AddTeamManagement from './AddTeamManagement'
import { ThemeColor } from '@/@core/types'


type Project = {
  id: string
  teamname: string
  description: string
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
  children: 'Add Team',
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
        teamname: 'Project Alpha',
        description: 'A groundbreaking project.',
        status: 'active',
        teamLead: 'John Doe', // Team lead name
        members: [
          { id: 'm1', name: 'Alice Smith' },
          { id: 'm2', name: 'Bob Johnson' }
        ], // List of team members
        techStack: ['React.js', 'Node.js', 'MongoDB'] // Tech stack used
      },
      {
        id: '2',
        teamname: 'Project Beta',
        description: 'An innovative app.',
        status: 'pending',
        teamLead: 'Sarah Lee',
        members: [
          { id: 'm3', name: 'Charlie Brown' },
          { id: 'm4', name: 'David Clark' }
        ],
        techStack: ['Vue.js', 'Firebase', 'Express.js']
      },
      {
        id: '3',
        teamname: 'Project Gamma',
        description: 'A new social platform.',
        status: 'active',
        teamLead: 'Emily Davis',
        members: [
          { id: 'm5', name: 'George Harris' },
          { id: 'm6', name: 'Grace Martin' }
        ],
        techStack: ['Angular.js', 'Node.js', 'MySQL']
      },
      {
        id: '4',
        teamname: 'Project Delta',
        description: 'Revolutionary AI software.',
        status: 'active',
        teamLead: 'Michael Wright',
        members: [
          { id: 'm7', name: 'Hannah King' },
          { id: 'm8', name: 'Isabella Scott' }
        ],
        techStack: ['Python', 'TensorFlow', 'Keras']
      },
      {
        id: '5',
        teamname: 'Project Epsilon',
        description: 'Next-gen e-commerce solution.',
        status: 'active',
        teamLead: 'James Taylor',
        members: [
          { id: 'm9', name: 'Liam Rodriguez' },
          { id: 'm10', name: 'Mia Gonzalez' }
        ],
        techStack: ['React.js', 'Redux', 'Node.js']
      },
      {
        id: '6',
        teamname: 'Project Zeta',
        description: 'Advanced data analytics tool.',
        status: 'pending',
        teamLead: 'Olivia Martinez',
        members: [
          { id: 'm11', name: 'Sophia Lee' },
          { id: 'm12', name: 'Lucas Anderson' }
        ],
        techStack: ['R', 'Python', 'D3.js']
      },
      {
        id: '7',
        teamname: 'Project Eta',
        description: 'Cutting-edge VR experience.',
        status: 'active',
        teamLead: 'Benjamin Wilson',
        members: [
          { id: 'm13', name: 'William Moore' },
          { id: 'm14', name: 'Amelia Taylor' }
        ],
        techStack: ['Unity', 'C#', 'VR']
      },
      {
        id: '8',
        teamname: 'Project Theta',
        description: 'Cloud-based storage system.',
        status: 'active',
        teamLead: 'Lucas Allen',
        members: [
          { id: 'm15', name: 'Ella Martinez' },
          { id: 'm16', name: 'Ava Clark' }
        ],
        techStack: ['AWS', 'Docker', 'React.js']
      },
      {
        id: '9',
        teamname: 'Project Iota',
        description: 'Sustainable energy technology.',
        status: 'pending',
        teamLead: 'Daniel Thompson',
        members: [
          { id: 'm17', name: 'Chloe Harris' },
          { id: 'm18', name: 'Jacob Lee' }
        ],
        techStack: ['Java', 'Spring', 'Angular.js']
      },
      {
        id: '10',
        teamname: 'Project Kappa',
        description: 'Smart home automation platform.',
        status: 'pending',
        teamLead: 'Mason Carter',
        members: [
          { id: 'm19', name: 'Charlotte Perez' },
          { id: 'm20', name: 'Ethan Mitchell' }
        ],
        techStack: ['IoT', 'Python', 'React Native']
      },
      {
        id: '11',
        teamname: 'Project Lambda',
        description: 'Blockchain-based solution.',
        status: 'active',
        teamLead: 'Isabella Williams',
        members: [
          { id: 'm21', name: 'Zoe Taylor' },
          { id: 'm22', name: 'Evan Young' }
        ],
        techStack: ['Solidity', 'Ethereum', 'Truffle']
      },
      {
        id: '12',
        teamname: 'Project Mu',
        description: 'AI-driven healthcare platform.',
        status: 'pending',
        teamLead: 'Alexander Martinez',
        members: [
          { id: 'm23', name: 'Oliver Johnson' },
          { id: 'm24', name: 'Mason Anderson' }
        ],
        techStack: ['Python', 'TensorFlow', 'Pandas']
      },
      {
        id: '13',
        teamname: 'Project Nu',
        description: 'Autonomous vehicle technology.',
        status: 'active',
        teamLead: 'Victoria Moore',
        members: [
          { id: 'm25', name: 'Sophia Brown' },
          { id: 'm26', name: 'Aiden Harris' }
        ],
        techStack: ['C++', 'ROS', 'Python']
      },
      {
        id: '14',
        teamname: 'Project Xi',
        description: 'Online learning platform.',
        status: 'active',
        teamLead: 'Evelyn White',
        members: [
          { id: 'm27', name: 'Jack Robinson' },
          { id: 'm28', name: 'Avery Adams' }
        ],
        techStack: ['JavaScript', 'React.js', 'Node.js']
      },
      {
        id: '15',
        teamname: 'Project Omicron',
        description: 'Digital payment solution.',
        status: 'pending',
        teamLead: 'Liam Martinez',
        members: [
          { id: 'm29', name: 'Grace Walker' },
          { id: 'm30', name: 'Leo Hall' }
        ],
        techStack: ['Java', 'Spring Boot', 'Angular.js']
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
  const handleSearch = (value: string) => {
    setSearchTerm(value.toLowerCase())
  }

  const filteredData = useMemo(() => {
    return data
      .filter(project => (selectedManager ? project.teamname === selectedManager : true))
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
        accessorKey: 'teamname',
        header: () => (
          <span className='text-primary' style={{ fontWeight: 'bold' }}>
            Team Name
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
        accessorKey: 'description',
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
        accessorKey: 'status',
        header: () => (
          <span className='text-primary' style={{ fontWeight: 'bold' }}>
            Status
          </span>
        ),
        cell: info => (
          <Typography color='text.primary' sx={{ whiteSpace: 'nowrap' }}>
             <div className='flex items-center gap-3'>
            <Chip
              variant='tonal'
              label={info.getValue<string>()}
              size='small'
              color={userStatusObj[info.getValue<string>()]}
              className='capitalize'
            />
          </div>

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
                dialog={EditTeamManagement}
                dialogProps={{ data: project }}
              />
              <OpenDialogOnElementClick
                element={Button}
                elementProps={buttonviewProps}
                dialog={ViewTeamManagement}
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
          flexWrap: 'wrap', // Ensures proper alignment on smaller screens
          m: 5,
          gap: 2 // Adds spacing between elements when wrapping
        }}
      >
        <Grid container spacing={2} alignItems='center' sx={{ flex: 1 }}>
          <Grid item xs={12} sm={5} md={3}>
            <SearchFilter label='Search' value={searchTerm} onChange={handleSearch} placeholder='Search all fields' />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FilterDropdown
              options={data.map(project => project.teamname)}
              selectedOption={selectedManager}
              onSelect={value => {
                setSelectedManager(value)
              }}
            />
          </Grid>
        </Grid>
        <OpenDialogOnElementClick element={Button} elementProps={buttonAddProps} dialog={AddTeamManagement} />
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
