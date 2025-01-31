'use client'

import React, { useEffect, useMemo, useState } from 'react'
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
import FilterDropdown from '@/app/Custom-Cpmponents/Select-dropdown/filterdropdown'
import ViewPayments from './view/[slug]/page'
import { useRouter, useParams } from 'next/navigation'

type Project = {
  id: string
  projectName: string // Project Name
  totalBudget: number // Total Budget
  receivedAmount: number // Received Amount
  pendingAmount: number // Pending Amount
  totalPayments: number // Total Payments
  totalPaymentsList: Array<{
    id: string
    paymentMode: string
    amount: number
  }>

  // Total Payments array
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
  const [isViewPaymentsOpen, setIsViewPaymentsOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [userData, setUserData] = useState<Project | null>(null)

  const router = useRouter()
  const { slug } = useParams()
  const { lang: locale } = useParams()

  const handleViewTrackStatusClick = (project: Project) => {
    setSelectedProject(project)
    setIsViewPaymentsOpen(true)
    router.push(`/${locale}/financial-management/${project.id}`)
  }

  const handleCloseViewTrackStatus = () => {
    setIsViewPaymentsOpen(false)
    setSelectedProject(null)
  }

  const data: Project[] = useMemo(
    () => [
      {
        id: '1',
        projectName: 'Project Alpha',
        totalBudget: 50000,
        receivedAmount: 20000,
        pendingAmount: 30000,
        totalPayments: 5,
        totalPaymentsList: [
          { id: 'p1', paymentMode: 'Credit Card', amount: 10000 },
          { id: 'p2', paymentMode: 'Bank Transfer', amount: 10000 },
          { id: 'p3', paymentMode: 'Cash', amount: 10000 }
        ],
        amount: '20000',
        transactionId: 'T1234A',
        refId: 'R5678A',
        paymentDate: '2025-01-01'
      },
      {
        id: '2',
        projectName: 'Project Beta',
        totalBudget: 75000,
        receivedAmount: 30000,
        pendingAmount: 45000,
        totalPayments: 5,
        totalPaymentsList: [
          { id: 'p4', paymentMode: 'Bank Transfer', amount: 15000 },
          { id: 'p5', paymentMode: 'PayPal', amount: 15000 }
        ],
        amount: '30000',
        transactionId: 'T1234B',
        refId: 'R5678B',
        paymentDate: '2025-01-02'
      },
      {
        id: '3',
        projectName: 'Project Gamma',
        totalBudget: 100000,
        receivedAmount: 80000,
        pendingAmount: 20000,
        totalPayments: 5,
        totalPaymentsList: [
          { id: 'p6', paymentMode: 'Wire Transfer', amount: 20000 },
          { id: 'p7', paymentMode: 'Cheque', amount: 30000 },
          { id: 'p8', paymentMode: 'PayPal', amount: 25000 }
        ],
        amount: '80000',
        transactionId: 'T1234C',
        refId: 'R5678C',
        paymentDate: '2025-01-03'
      },
      {
        id: '4',
        projectName: 'Project Delta',
        totalBudget: 120000,
        receivedAmount: 70000,
        pendingAmount: 50000,
        totalPayments: 5,
        totalPaymentsList: [
          { id: 'p9', paymentMode: 'Credit Card', amount: 25000 },
          { id: 'p10', paymentMode: 'Bank Transfer', amount: 25000 },
          { id: 'p11', paymentMode: 'Cash', amount: 20000 }
        ],
        amount: '70000',
        transactionId: 'T1234D',
        refId: 'R5678D',
        paymentDate: '2025-01-04'
      },
      {
        id: '5',
        projectName: 'Project Epsilon',
        totalBudget: 90000,
        receivedAmount: 45000,
        pendingAmount: 45000,
        totalPayments: 5,
        totalPaymentsList: [
          { id: 'p12', paymentMode: 'PayPal', amount: 20000 },
          { id: 'p13', paymentMode: 'Bank Transfer', amount: 15000 },
          { id: 'p14', paymentMode: 'Cheque', amount: 10000 }
        ],
        amount: '45000',
        transactionId: 'T1234E',
        refId: 'R5678E',
        paymentDate: '2025-01-05'
      },
      {
        id: '6',
        projectName: 'Project Zeta',
        totalBudget: 110000,
        receivedAmount: 85000,
        pendingAmount: 25000,
        totalPayments: 5,
        totalPaymentsList: [
          { id: 'p15', paymentMode: 'Bank Transfer', amount: 30000 },
          { id: 'p16', paymentMode: 'Wire Transfer', amount: 25000 },
          { id: 'p17', paymentMode: 'Cheque', amount: 20000 }
        ],
        amount: '85000',
        transactionId: 'T1234F',
        refId: 'R5678F',
        paymentDate: '2025-01-06'
      },
      {
        id: '7',
        projectName: 'Project Eta',
        totalBudget: 60000,
        receivedAmount: 35000,
        pendingAmount: 25000,
        totalPayments: 5,
        totalPaymentsList: [
          { id: 'p18', paymentMode: 'Credit Card', amount: 10000 },
          { id: 'p19', paymentMode: 'PayPal', amount: 15000 },
          { id: 'p20', paymentMode: 'Bank Transfer', amount: 10000 }
        ],
        amount: '35000',
        transactionId: 'T1234G',
        refId: 'R5678G',
        paymentDate: '2025-01-07'
      },
      {
        id: '8',
        projectName: 'Project Theta',
        totalBudget: 150000,
        receivedAmount: 120000,
        pendingAmount: 30000,
        totalPayments: 5,
        totalPaymentsList: [
          { id: 'p21', paymentMode: 'Bank Transfer', amount: 40000 },
          { id: 'p22', paymentMode: 'Cheque', amount: 30000 },
          { id: 'p23', paymentMode: 'Credit Card', amount: 50000 }
        ],
        amount: '120000',
        transactionId: 'T1234H',
        refId: 'R5678H',
        paymentDate: '2025-01-08'
      },
      {
        id: '9',
        projectName: 'Project Iota',
        totalBudget: 80000,
        receivedAmount: 60000,
        pendingAmount: 20000,
        totalPayments: 5,
        totalPaymentsList: [
          { id: 'p24', paymentMode: 'Wire Transfer', amount: 20000 },
          { id: 'p25', paymentMode: 'PayPal', amount: 15000 },
          { id: 'p26', paymentMode: 'Bank Transfer', amount: 25000 }
        ],
        amount: '60000',
        transactionId: 'T1234I',
        refId: 'R5678I',
        paymentDate: '2025-01-09'
      },
      {
        id: '10',
        projectName: 'Project Kappa',
        totalBudget: 70000,
        receivedAmount: 45000,
        pendingAmount: 25000,
        totalPayments: 5,
        totalPaymentsList: [
          { id: 'p27', paymentMode: 'Credit Card', amount: 10000 },
          { id: 'p28', paymentMode: 'Cheque', amount: 15000 },
          { id: 'p29', paymentMode: 'Bank Transfer', amount: 20000 }
        ],
        amount: '45000',
        transactionId: 'T1234J',
        refId: 'R5678J',
        paymentDate: '2025-01-10'
      },
      {
        id: '11',
        projectName: 'Project Lambda',
        totalBudget: 95000,
        receivedAmount: 60000,
        pendingAmount: 35000,
        totalPayments: 5,
        totalPaymentsList: [
          { id: 'p30', paymentMode: 'Wire Transfer', amount: 25000 },
          { id: 'p31', paymentMode: 'Cheque', amount: 20000 },
          { id: 'p32', paymentMode: 'PayPal', amount: 15000 }
        ],
        amount: '60000',
        transactionId: 'T1234K',
        refId: 'R5678K',
        paymentDate: '2025-01-11'
      },
      {
        id: '12',
        projectName: 'Project Mu',
        totalBudget: 105000,
        receivedAmount: 70000,
        pendingAmount: 35000,
        totalPayments: 5,
        totalPaymentsList: [
          { id: 'p33', paymentMode: 'Bank Transfer', amount: 30000 },
          { id: 'p34', paymentMode: 'Cheque', amount: 20000 },
          { id: 'p35', paymentMode: 'Credit Card', amount: 25000 }
        ],
        amount: '70000',
        transactionId: 'T1234L',
        refId: 'R5678L',
        paymentDate: '2025-01-12'
      },
      {
        id: '13',
        projectName: 'Project Nu',
        totalBudget: 85000,
        receivedAmount: 40000,
        pendingAmount: 45000,
        totalPayments: 5,
        totalPaymentsList: [
          { id: 'p36', paymentMode: 'Credit Card', amount: 20000 },
          { id: 'p37', paymentMode: 'Wire Transfer', amount: 10000 },
          { id: 'p38', paymentMode: 'Cheque', amount: 15000 }
        ],
        amount: '40000',
        transactionId: 'T1234M',
        refId: 'R5678M',
        paymentDate: '2025-01-13'
      },
      {
        id: '14',
        projectName: 'Project Xi',
        totalBudget: 120000,
        receivedAmount: 80000,
        pendingAmount: 40000,
        totalPayments: 5,
        totalPaymentsList: [
          { id: 'p39', paymentMode: 'PayPal', amount: 25000 },
          { id: 'p40', paymentMode: 'Bank Transfer', amount: 30000 },
          { id: 'p41', paymentMode: 'Cheque', amount: 20000 }
        ],
        amount: '80000',
        transactionId: 'T1234N',
        refId: 'R5678N',
        paymentDate: '2025-01-14'
      },
      {
        id: '15',
        projectName: 'Project Omicron',
        totalBudget: 95000,
        receivedAmount: 50000,
        pendingAmount: 45000,
        totalPayments: 5,
        totalPaymentsList: [
          { id: 'p42', paymentMode: 'Credit Card', amount: 15000 },
          { id: 'p43', paymentMode: 'Wire Transfer', amount: 20000 },
          { id: 'p44', paymentMode: 'PayPal', amount: 10000 }
        ],
        amount: '50000',
        transactionId: 'T1234O',
        refId: 'R5678O',
        paymentDate: '2025-01-15'
      }
    ],
    []
  )

  console.log(slug)

  const totalPayments = data[1]?.totalPayments

  const buttonviewProps: ButtonProps = {
    variant: 'contained',
    color: 'primary',
    size: 'large',
    className: 'bg-primary text-white p-0 rounded-sm ',
    sx: {
      fontSize: '1rem',
      borderRadius: '50%',
      margin: '20 auto'
    },
    children: <span>{totalPayments}</span>
  }

  const rowsPerPage = 10

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

  useEffect(() => {
    const user = data.find(user => user.id === String(slug))

    setUserData(user || null)
  }, [slug])

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
        accessorKey: 'totalBudget',
        header: () => (
          <span className='text-primary' style={{ fontWeight: 'bold' }}>
            Total Budget
          </span>
        ),
        cell: info => (
          <Typography color='text.primary' sx={{ whiteSpace: 'nowrap' }}>
            ${info.getValue<number>().toLocaleString()}
          </Typography>
        ),
        enableSorting: true
      },
      {
        accessorKey: 'receivedAmount',
        header: () => (
          <span className='text-primary' style={{ fontWeight: 'bold' }}>
            Received Amount
          </span>
        ),
        cell: info => (
          <Typography color='text.primary' sx={{ whiteSpace: 'nowrap' }}>
            ${info.getValue<number>().toLocaleString()}
          </Typography>
        ),
        enableSorting: true
      },
      {
        accessorKey: 'pendingAmount',
        header: () => (
          <span className='text-primary' style={{ fontWeight: 'bold' }}>
            Pending Amount
          </span>
        ),
        cell: info => (
          <Typography color='text.primary' sx={{ whiteSpace: 'nowrap' }}>
            ${info.getValue<number>().toLocaleString()}
          </Typography>
        ),
        enableSorting: true
      },
      {
        id: 'Total Payments',
        header: () => (
          <span className='text-primary' style={{ fontWeight: 'bold' }}>
            Total Payments
          </span>
        ),
        cell: info => {
          const project = info.row.original
          return (
            <Button
              onClick={() => router.push(`/financial-management/view/${project.id}`)}
              className='bg-[#7b91b1] text-white p-0 rounded-sm'
              sx={{ fontSize: '25px', minWidth: '20px', minHeight: '20px' }}
            >
              {project.totalPayments}
              <i style={{ fontSize: '25px' }} className='tabler-eye text-white'></i>
            </Button>
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
      <Box>
        {isViewPaymentsOpen && selectedProject ? (
          <ViewPayments data={selectedProject} onClose={handleCloseViewTrackStatus} />
        ) : (
          <>
            <Card
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
                  <SearchFilter
                    label='Search'
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder='Search all fields'
                  />
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
            </Card>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    {table.getHeaderGroups().map(headerGroup =>
                      headerGroup.headers.map(header => (
                        <TableCell key={header.id} onClick={header.column.getToggleSortingHandler()}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
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
          </>
        )}
      </Box>
    </Card>
  )
}

export default AdminTeamManagement
