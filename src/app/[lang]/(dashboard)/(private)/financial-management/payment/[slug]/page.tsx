'use client'

import React, { useEffect, useState } from 'react'
import classnames from 'classnames'
import useMediaQuery from '@mui/material/useMediaQuery'
import type { Theme } from '@mui/material/styles'
import { useParams, useRouter } from 'next/navigation'
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Card,
  CardHeader,
  CardContent,
  Grid,
  Divider,
  Avatar
} from '@mui/material'
import OpenDialogOnElementClick from '@/app/Custom-Cpmponents/Buttons/OpenDialogOnElementClick'
import ViewFinance from '../viewFinance'
import EditFinance from '../editFinance'

interface Payment {
  id: string
  paymentMode: string
  amount: number
  paymentDate: string
  refId: string
  transactionId: string
}

interface ViewPaymentsProps {
  open: boolean
  setOpen: (open: boolean) => void
  data: {
    amount: string
    transactionId: string
    paymentMode: string
    refId: string
    paymentDate: string
    totalPaymentsList: Payment[]
    projectId: string
    projectName: string
    receivedAmt: number
    pendingAmt: number
    description: string
    paymentSlip: string
  }
}

const paymentsData = [
  {
    projectId: '1',
    projectName: 'Project Alpha',
    amount: '20000',
    transactionId: 'T1234A',
    paymentMode: 'Credit Card',
    refId: 'R5678A',
    paymentDate: '2025-01-01',
    totalAmount: '$20000',
    receivedAmt: '$13000',
    pendingAmount: '7000$',
    totalPaymentsList: [
      {
        id: 'p1',
        paymentMode: 'Credit Card',
        amount: 10000,
        refId: 'R5678A',
        transactionId: 'T1234A',
        paymentDate: '2025-01-01',
        totalAmount: '20000',
        pendingAmount: '7000$',
        paymentSlip: `SL${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        description: 'Initial project phase',
        receivedAmt: '$3000',
        totalPayments: 0,
        projectName: 'Project Alpha'
      },
      {
        id: 'p2',
        paymentMode: 'Bank Transfer',
        amount: 10000,
        refId: 'R5678A',
        transactionId: 'T1234A',
        paymentDate: '2025-01-01',
        totalAmount: '20000',
        pendingAmount: '7000$',
        paymentSlip: `SL${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        description: 'Final payment phase',
        receivedAmt: '$10000',
        totalPayments: 0,
        projectName: 'Project Alpha'
      }
    ]
  },
  {
    projectId: '2',
    projectName: 'Project Beta',
    amount: '15000',
    transactionId: 'T5678B',
    paymentMode: 'Bank Transfer',
    refId: 'R1234B',
    paymentDate: '2025-02-01',
    totalAmount: '$15000',
    receivedAmt: '$10000',
    pendingAmount: '5000$',
    totalPaymentsList: [
      {
        id: 'p3',
        paymentMode: 'Credit Card',
        amount: 5000,
        refId: 'R1234B',
        transactionId: 'T5678B',
        paymentDate: '2025-02-01',
        totalAmount: '15000',
        pendingAmount: '5000$',
        paymentSlip: `SL${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        description: 'Initial project phase',
        receivedAmt: '$5000',
        totalPayments: 0,
        projectName: 'Project Beta'
      },
      {
        id: 'p4',
        paymentMode: 'Cash',
        amount: 10000,
        refId: 'R1234B',
        transactionId: 'T5678B',
        paymentDate: '2025-02-01',
        totalAmount: '15000',
        pendingAmount: '5000$',
        paymentSlip: `SL${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        description: 'Final payment phase',
        receivedAmt: '$5000',
        totalPayments: 0,
        projectName: 'Project Beta'
      }
    ]
  },
  {
    projectId: '3',
    projectName: 'Project Gamma',
    amount: '25000',
    transactionId: 'T1234C',
    paymentMode: 'Wire Transfer',
    refId: 'R5678C',
    paymentDate: '2025-01-03',
    totalAmount: '$25000',
    receivedAmt: '$0',
    pendingAmount: '25000$',
    totalPaymentsList: [
      {
        id: 'p5',
        paymentMode: 'Wire Transfer',
        amount: 25000,
        refId: 'R5678C',
        transactionId: 'T1234C',
        paymentDate: '2025-01-03',
        totalAmount: '25000',
        pendingAmount: '25000$',
        paymentSlip: `SL${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        description: 'Full project payment',
        receivedAmt: '$0',
        totalPayments: 0,
        projectName: 'Project Gamma'
      }
    ]
  },
  {
    projectId: '4',
    projectName: 'Project Delta',
    amount: '18000',
    transactionId: 'T1234D',
    paymentMode: 'Credit Card',
    refId: 'R5678D',
    paymentDate: '2025-01-04',
    totalAmount: '$18000',
    receivedAmt: '$9000',
    pendingAmount: '9000$',
    totalPaymentsList: [
      {
        id: 'p6',
        paymentMode: 'Credit Card',
        amount: 9000,
        refId: 'R5678D',
        transactionId: 'T1234D',
        paymentDate: '2025-01-04',
        totalAmount: '18000',
        pendingAmount: '9000$',
        paymentSlip: `SL${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        description: 'Initial payment phase',
        receivedAmt: '$4500',
        totalPayments: 0,
        projectName: 'Project Delta'
      },
      {
        id: 'p7',
        paymentMode: 'Bank Transfer',
        amount: 9000,
        refId: 'R5678D',
        transactionId: 'T1234D',
        paymentDate: '2025-01-04',
        totalAmount: '18000',
        pendingAmount: '9000$',
        paymentSlip: `SL${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        description: 'Final payment phase',
        receivedAmt: '$4500',
        totalPayments: 0,
        projectName: 'Project Delta'
      }
    ]
  },
  {
    projectId: '5',
    projectName: 'Project Epsilon',
    amount: '22000',
    transactionId: 'T1234E',
    paymentMode: 'PayPal',
    refId: 'R5678E',
    paymentDate: '2025-01-05',
    totalAmount: '$22000',
    receivedAmt: '$0',
    pendingAmount: '22000$',
    totalPaymentsList: [
      {
        id: 'p8',
        paymentMode: 'PayPal',
        amount: 22000,
        refId: 'R5678E',
        transactionId: 'T1234E',
        paymentDate: '2025-01-05',
        totalAmount: '22000',
        pendingAmount: '22000$',
        paymentSlip: `SL${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        description: 'Full project payment',
        receivedAmt: '$0',
        totalPayments: 0,
        projectName: 'Project Epsilon'
      }
    ]
  },
  {
    projectId: '6',
    projectName: 'Project Zeta',
    amount: '27000',
    transactionId: 'T1234F',
    paymentMode: 'Bank Transfer',
    refId: 'R5678F',
    paymentDate: '2025-01-06',
    totalAmount: '$27000',
    receivedAmt: '$10000',
    pendingAmount: '17000$',
    totalPaymentsList: [
      {
        id: 'p9',
        paymentMode: 'Bank Transfer',
        amount: 10000,
        refId: 'R5678F',
        transactionId: 'T1234F',
        paymentDate: '2025-01-06',
        totalAmount: '27000',
        pendingAmount: '17000$',
        paymentSlip: `SL${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        description: 'Initial payment phase',
        receivedAmt: '$5000',
        totalPayments: 0,
        projectName: 'Project Zeta'
      },
      {
        id: 'p10',
        paymentMode: 'Credit Card',
        amount: 17000,
        refId: 'R5678F',
        transactionId: 'T1234F',
        paymentDate: '2025-01-06',
        totalAmount: '27000',
        pendingAmount: '17000$',
        paymentSlip: `SL${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        description: 'Final payment phase',
        receivedAmt: '$12000',
        totalPayments: 0,
        projectName: 'Project Zeta'
      }
    ]
  },
  {
    projectId: '7',
    projectName: 'Project Eta',
    amount: '16000',
    transactionId: 'T1234G',
    paymentMode: 'PayPal',
    refId: 'R5678G',
    paymentDate: '2025-01-07',
    totalAmount: '$16000',
    receivedAmt: '$16000',
    pendingAmount: '0$',
    totalPaymentsList: [
      {
        id: 'p11',
        paymentMode: 'Credit Card',
        amount: 16000,
        refId: 'R5678G',
        transactionId: 'T1234G',
        paymentDate: '2025-01-07',
        totalAmount: '16000',
        pendingAmount: '0$',
        paymentSlip: `SL${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        description: 'Complete payment',
        receivedAmt: '$16000',
        totalPayments: 0,
        projectName: 'Project Eta'
      }
    ]
  },
  {
    projectId: '8',
    projectName: 'Project Theta',
    amount: '33000',
    transactionId: 'T1234H',
    paymentMode: 'Bank Transfer',
    refId: 'R5678H',
    paymentDate: '2025-01-08',
    totalAmount: '$33000',
    receivedAmt: '$0',
    pendingAmount: '33000$',
    totalPaymentsList: [
      {
        id: 'p12',
        paymentMode: 'Bank Transfer',
        amount: 33000,
        refId: 'R5678H',
        transactionId: 'T1234H',
        paymentDate: '2025-01-08',
        totalAmount: '33000',
        pendingAmount: '33000$',
        paymentSlip: `SL${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        description: 'Initial project phase',
        receivedAmt: '$0',
        totalPayments: 0,
        projectName: 'Project Theta'
      }
    ]
  },
  {
    projectId: '9',
    projectName: 'Project Iota',
    amount: '25000',
    transactionId: 'T1234I',
    paymentMode: 'Wire Transfer',
    refId: 'R5678I',
    paymentDate: '2025-01-09',
    totalAmount: '$25000',
    receivedAmt: '$25000',
    pendingAmount: '0$',
    totalPaymentsList: [
      {
        id: 'p13',
        paymentMode: 'Wire Transfer',
        amount: 25000,
        refId: 'R5678I',
        transactionId: 'T1234I',
        paymentDate: '2025-01-09',
        totalAmount: '25000',
        pendingAmount: '0$',
        paymentSlip: `SL${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        description: 'Complete payment',
        receivedAmt: '$25000',
        totalPayments: 0,
        projectName: 'Project Iota'
      }
    ]
  },
  {
    projectId: '10',
    projectName: 'Project Kappa',
    amount: '19000',
    transactionId: 'T1234J',
    paymentMode: 'Credit Card',
    refId: 'R5678J',
    paymentDate: '2025-01-10',
    totalAmount: '$19000',
    receivedAmt: '$0',
    pendingAmount: '19000$',
    totalPaymentsList: [
      {
        id: 'p14',
        paymentMode: 'Credit Card',
        amount: 19000,
        refId: 'R5678J',
        transactionId: 'T1234J',
        paymentDate: '2025-01-10',
        totalAmount: '19000',
        pendingAmount: '9000$',
        paymentSlip: `SL${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        description: 'Initial payment phase',
        receivedAmt: '$10000',
        totalPayments: 0,
        projectName: 'Project Kappa'
      },
      {
        id: 'p15',
        paymentMode: 'Cheque',
        amount: 9500,
        refId: 'R5678J',
        transactionId: 'T1234J',
        paymentDate: '2025-01-10',
        totalAmount: '19000',
        pendingAmount: '9500$',
        paymentSlip: `SL${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        description: 'Cheque payment for project phase completion',
        receivedAmt: '$9500',
        totalPayments: 0,
        projectName: 'Project Kappa'
      }
    ]
  }
]

const ViewPayments: React.FC<ViewPaymentsProps> = () => {
  const { slug } = useParams()
  const router = useRouter()
  const [paymentData, setPaymentData] = useState<any | null>(null)

  const data = [
    {
      title: paymentData?.projectName,
      subtitle: 'Project Name'
    },
    {
      title: paymentData?.totalAmount,
      subtitle: 'Total Payment Amount'
    },
    {
      title: paymentData?.receivedAmt,
      subtitle: 'Total Received Amount'
    },
    {
      title: paymentData?.pendingAmount,
      subtitle: 'Total Pending Amount'
    }
  ]

  const buttonviewProps = {
    variant: 'contained',
    color: 'primary',
    size: 'small',
    className: 'bg-primary text-white p-0 rounded-sm',
    sx: { fontSize: '0.5rem', minWidth: '20px', minHeight: '20px', marginRight: '10px' },
    children: <i style={{ fontSize: '15px' }} className='tabler-eye text-white' />
  }

  const buttonProps = {
    variant: 'contained',
    color: 'primary',
    size: 'small',
    className: 'bg-[#7b91b1] text-white p-0 rounded-sm',
    sx: { fontSize: '0.5rem', minWidth: '20px', minHeight: '20px' },
    children: <i style={{ fontSize: '15px' }} className='tabler-edit text-white' />
  }

  useEffect(() => {
    const payment = paymentsData.find(payment => payment.projectId === slug)
    setPaymentData(payment || null)
  }, [slug])

  const isBelowMdScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))
  const isBelowSmScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))

  if (!paymentData) {
    return (
      <Box className='container mx-auto p-6'>
        <Typography variant='h6' color='error'>
          Payment data not found.
        </Typography>
      </Box>
    )
  }

  return (
    <div className='container mx-auto'>
      <Box className='p-5  mb-5'>
        <Card className=' mb-5'>
          <CardContent>
            <Grid container spacing={6}>
              {data.map((item, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  key={index}
                  className={classnames({
                    '[&:nth-of-type(odd)>div]:pie-6 [&:nth-of-type(odd)>div]:border-ie':
                      isBelowMdScreen && !isBelowSmScreen,
                    '[&:not(:last-child)>div]:pie-6 [&:not(:last-child)>div]:border-ie': !isBelowMdScreen
                  })}
                >
                  <div className='flex justify-between items-center'>
                    <div className='flex flex-col'>
                      <Typography variant='h4' className='text-primary'>{item.title}</Typography>
                      <Typography>{item.subtitle}</Typography>
                    </div>
                    </div>
                  {isBelowMdScreen && !isBelowSmScreen && index < data.length - 2 && (
                    <Divider
                      className={classnames('mbs-6', {
                        'mie-6': index % 2 === 0
                      })}
                    />
                  )}
                  {isBelowSmScreen && index < data.length - 1 && <Divider className='mbs-6' />}
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
        <TableContainer component={Paper} sx={{ maxHeight: '500px' }}>
          <Table sx={{ minWidth: 750 }}>
            <TableHead>
              <TableRow>
                <TableCell className='text-primary' align='center' sx={{ fontSize: '1rem' }}>
                  Payment Mode
                </TableCell>
                <TableCell
                  className='text-primary'
                  align='center'
                  sx={{ fontSize: '1rem', color: 'text.primary' }}
                >
                  Amount
                </TableCell>
                <TableCell
                  className='text-primary'
                  align='center'
                  sx={{ fontSize: '1rem', color: 'text.primary' }}
                >
                  Payment Date
                </TableCell>
                <TableCell
                  className='text-primary'
                  align='center'
                  sx={{  fontSize: '1rem', color: 'text.primary' }}
                >
                  Reference ID
                </TableCell>
                <TableCell
                  className='text-primary'
                  align='center'
                  sx={{  fontSize: '1rem', color: 'text.primary' }}
                >
                  Transaction ID
                </TableCell>
                <TableCell
                  className='text-primary'
                  align='center'
                  sx={{  fontSize: '1rem', color: 'text.primary' }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paymentData.totalPaymentsList.map((payment: Payment) => (
                <TableRow key={payment.id}>
                  <TableCell align='center' sx={{ fontSize: '1rem' }}>
                    {payment.paymentMode}
                  </TableCell>
                  <TableCell align='center' sx={{ fontSize: '1rem' }}>
                    {payment.amount}
                  </TableCell>
                  <TableCell align='center' sx={{ fontSize: '1rem' }}>
                    {payment.paymentDate}
                  </TableCell>
                  <TableCell align='center' sx={{ fontSize: '1rem' }}>
                    {payment.refId}
                  </TableCell>
                  <TableCell align='center' sx={{ fontSize: '1rem' }}>
                    {payment.transactionId}
                  </TableCell>
                  <TableCell align='center' sx={{ marginRight: '10px' }}>
                    <OpenDialogOnElementClick
                      element={Button}
                      elementProps={buttonviewProps}
                      dialog={ViewFinance}
                      dialogProps={{ data: payment }}
                    />
                    <OpenDialogOnElementClick
                      element={Button}
                      elementProps={buttonProps}
                      dialog={EditFinance}
                      dialogProps={{ data: payment }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Back Button */}
        <Box sx={{ display: 'flex', justifyContent: 'right', marginTop: 3 }}>
          <Button variant='contained' onClick={() => router.push(`/financial-management`)}>
            Back To Finance...
          </Button>
        </Box>
      </Box>
    </div>
  )
}
export default ViewPayments
