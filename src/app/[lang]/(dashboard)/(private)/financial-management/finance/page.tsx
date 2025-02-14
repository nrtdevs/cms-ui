'use client'

import React, { useMemo, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Paginator from '@/app/Custom-Cpmponents/paginator/Paginator'
import {
  Box,
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
  TextField
} from '@mui/material'
import {
  useReactTable,
  createColumnHelper,
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  FilterFn
} from '@tanstack/react-table'
import SearchFilter from '@/app/Custom-Cpmponents/input/searchfilter'
import Link from 'next/link'
import { getLocalizedUrl } from '@/utils/i18n'
import { Locale } from '@/configs/i18n'

interface Project {
  id: string
  projectName: string
  totalBudget: number
  receivedAmount: number
  pendingAmount: number
  totalPayments: number
  totalPaymentsList: Array<{ id: string; paymentMode: string; amount: number }>
  amount: string
  transactionId: string
  refId: string
  paymentDate: string
}

const Page: React.FC = () => {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const columnHelper = createColumnHelper<Project>()
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedManager, setSelectedManager] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState<string>('')

  const handleSearch = (value: string) => {
    setSearchTerm(value.toLowerCase())
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
  const fuzzyFilter: FilterFn<Project> = (row, columnId, filterValue) => {
    const cellValue = row.getValue(columnId)
    return cellValue?.toString().toLowerCase().includes(filterValue.toLowerCase()) || false
  }

  const { lang: locale } = useParams()

  const rowsPerPage = 10

  const filteredData = useMemo(() => {
    return data
      .filter(project => (selectedManager ? project.projectName === selectedManager : true))
      .filter(project => Object.values(project).some(value => value.toString().toLowerCase().includes(searchTerm)))
  }, [data, selectedManager, searchTerm])

  const totalPages = Math.ceil(filteredData.length / rowsPerPage)

  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      setCurrentPage(page)
    }
  }

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage
    return filteredData.slice(startIndex, startIndex + rowsPerPage)
  }, [filteredData, currentPage])

  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        header: () => (
          <span className='text-primary cursor-pointer' style={{ fontWeight: 'bold' }}>
            #
          </span>
        ),
        cell: info => (
          <Typography className='text-primary cursor-pointer' color='text.primary' sx={{ whiteSpace: 'nowrap' }}>
            {info.row.original.id}
          </Typography>
        )
      }),
      columnHelper.accessor('projectName', {
        header: () => (
          <span className='text-primary cursor-pointer' style={{ fontWeight: 'bold' }}>
            Project Name
          </span>
        ),
        cell: info => (
          <Typography color='text.primary' sx={{ whiteSpace: 'nowrap' }}>
            {info.row.original.projectName}
          </Typography>
        )
      }),
      columnHelper.accessor('totalBudget', {
        header: () => (
          <span className='text-primary cursor-pointer' style={{ fontWeight: 'bold' }}>
            Total Budget
          </span>
        ),
        cell: info => (
          <Typography color='text.primary ' sx={{ whiteSpace: 'nowrap' }}>
            {info.row.original.totalBudget}
          </Typography>
        )
      }),
      columnHelper.accessor('receivedAmount', {
        header: () => (
          <span className='text-primary cursor-pointer' style={{ fontWeight: 'bold' }}>
            Received Amount
          </span>
        ),
        cell: info => (
          <Typography color='text.primary' sx={{ whiteSpace: 'nowrap' }}>
            {info.row.original.receivedAmount}
          </Typography>
        )
      }),
      columnHelper.accessor('pendingAmount', {
        header: () => (
          <span className='text-primary cursor-pointer' style={{ fontWeight: 'bold' }}>
            Pending Amount
          </span>
        ),
        cell: info => (
          <Typography color='text.primary' sx={{ whiteSpace: 'nowrap' }}>
            {info.row.original.pendingAmount}
          </Typography>
        )
      }),

      columnHelper.display({
        id: 'Total Payments',
        header: () => (
          <span className='text-primary' style={{ fontWeight: 'bold' }}>
            Total Payments
          </span>
        ),
        cell: info => (
          <Link href={getLocalizedUrl(`/financial-management/payment/${info.row.original.id}`, locale as Locale)}>
            <Button className='p-1 rounded-sm text-white bg-primary ransition-colors flex items-center space-x-2'>
              <span>{info.row.original.totalPayments}</span>
            </Button>
          </Link>
        )
      })
    ],
    [columnHelper]
  )

  const table = useReactTable<Project>({
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
    <div>
      <Card className='container mx-auto p-4'>
        <div className='flex justify-between items-center mb-6'>
          <Typography variant='h4' fontWeight='bold' className='text-primary'>
            Finance Management
          </Typography>
          <SearchFilter label='Search' value={searchTerm} onChange={handleSearch} placeholder='Search all fields' />
        </div>

        <Box className='mt-5 p-4'>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                {table.getHeaderGroups().map(headerGroup => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                      <TableCell
                        className='font-semibold'
                        key={header.id}
                        onClick={header.column.getToggleSortingHandler()}
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
    </div>
  )
}

export default Page
