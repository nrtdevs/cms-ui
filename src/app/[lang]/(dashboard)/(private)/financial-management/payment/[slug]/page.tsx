'use client'

import React, { useEffect, useState } from 'react'
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
  CardHeader
} from '@mui/material'
import OpenDialogOnElementClick from '@/app/Custom-Cpmponents/Buttons/OpenDialogOnElementClick'
import ViewPaymentDetails from './ViewPaymentDetails'
import EditPaymentDetails from './EditPaymentDetails'

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
    totalAmount: '20000',
    pendingAmount: '0',
    totalPaymentsList: [
      {
        id: 'p1',
        paymentMode: 'Credit Card',
        amount: 10000,
        refId: 'R5678A',
        transactionId: 'T1234A',
        paymentDate: '2025-01-01'
      },
      {
        id: 'p2',
        paymentMode: 'Bank Transfer',
        amount: 10000,
        refId: 'R5678A',
        transactionId: 'T1234A',
        paymentDate: '2025-01-01'
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
    totalAmount: '15000',
    pendingAmount: '5000',
    totalPaymentsList: [
      {
        id: 'p3',
        paymentMode: 'Credit Card',
        amount: 5000,
        refId: 'R1234B',
        transactionId: 'T5678B',
        paymentDate: '2025-02-01'
      },
      {
        id: 'p4',
        paymentMode: 'Cash',
        amount: 10000,
        refId: 'R1234B',
        transactionId: 'T5678B',
        paymentDate: '2025-02-01'
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
    totalAmount: '25000',
    pendingAmount: '25000',
    totalPaymentsList: [
      {
        id: 'p5',
        paymentMode: 'Wire Transfer',
        amount: 25000,
        refId: 'R5678C',
        transactionId: 'T1234C',
        paymentDate: '2025-01-03'
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
    totalAmount: '18000',
    pendingAmount: '9000',
    totalPaymentsList: [
      {
        id: 'p6',
        paymentMode: 'Credit Card',
        amount: 9000,
        refId: 'R5678D',
        transactionId: 'T1234D',
        paymentDate: '2025-01-04'
      },
      {
        id: 'p7',
        paymentMode: 'Bank Transfer',
        amount: 9000,
        refId: 'R5678D',
        transactionId: 'T1234D',
        paymentDate: '2025-01-04'
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
    totalAmount: '22000',
    pendingAmount: '22000',
    totalPaymentsList: [
      {
        id: 'p8',
        paymentMode: 'PayPal',
        amount: 22000,
        refId: 'R5678E',
        transactionId: 'T1234E',
        paymentDate: '2025-01-05'
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
    totalAmount: '27000',
    pendingAmount: '17000',
    totalPaymentsList: [
      {
        id: 'p9',
        paymentMode: 'Bank Transfer',
        amount: 10000,
        refId: 'R5678F',
        transactionId: 'T1234F',
        paymentDate: '2025-01-06'
      },
      {
        id: 'p10',
        paymentMode: 'Credit Card',
        amount: 17000,
        refId: 'R5678F',
        transactionId: 'T1234F',
        paymentDate: '2025-01-06'
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
    totalAmount: '16000',
    pendingAmount: '0',
    totalPaymentsList: [
      {
        id: 'p11',
        paymentMode: 'Credit Card',
        amount: 16000,
        refId: 'R5678G',
        transactionId: 'T1234G',
        paymentDate: '2025-01-07'
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
    totalAmount: '33000',
    pendingAmount: '33000',
    totalPaymentsList: [
      {
        id: 'p12',
        paymentMode: 'Bank Transfer',
        amount: 33000,
        refId: 'R5678H',
        transactionId: 'T1234H',
        paymentDate: '2025-01-08'
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
    totalAmount: '25000',
    pendingAmount: '0',
    totalPaymentsList: [
      {
        id: 'p13',
        paymentMode: 'Wire Transfer',
        amount: 25000,
        refId: 'R5678I',
        transactionId: 'T1234I',
        paymentDate: '2025-01-09'
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
    totalAmount: '19000',
    pendingAmount: '9500',
    totalPaymentsList: [
      {
        id: 'p14',
        paymentMode: 'Credit Card',
        amount: 9500,
        refId: 'R5678J',
        transactionId: 'T1234J',
        paymentDate: '2025-01-10'
      },
      {
        id: 'p15',
        paymentMode: 'Cheque',
        amount: 9500,
        refId: 'R5678J',
        transactionId: 'T1234J',
        paymentDate: '2025-01-10'
      }
    ]
  }
]

const ViewPayments: React.FC<ViewPaymentsProps> = () => {
  const { slug } = useParams()
  const router = useRouter()
  const [paymentData, setPaymentData] = useState<any | null>(null)

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
    const payment = paymentsData.flat().find(payment => payment.projectId === slug)
    setPaymentData(payment || null)
  }, [slug])

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
      <Box className='p-5 shadow-lg'>
        <Card
          sx={{
            padding: 2,
            boxShadow: 3,

            marginBottom: '25px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',

            minWidth: '50%' // Prevents it from stretching too wide
          }}
          className='space-x-4'
        >
          <Typography variant='h5' className='font-bold text-primary '>
            {paymentData?.projectName}
          </Typography>
          <Typography variant='h5' className='font-medium text-secondary'>
            <strong>Pending Amount:</strong> {paymentData?.pendingAmount}
          </Typography>
          <Typography variant='h5' className='font-medium text-secondary'>
            <strong>Total Amount:</strong> {paymentData?.totalAmount}
          </Typography>
        </Card>

        <TableContainer component={Paper} sx={{ maxHeight: '500px' }}>
          <Table sx={{ minWidth: 750 }}>
            <TableHead>
              <TableRow>
                <TableCell className='text-primary' align='center' sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                  Payment Mode
                </TableCell>
                <TableCell
                  className='text-primary'
                  align='center'
                  sx={{ fontWeight: 'bold', fontSize: '1.1rem', color: 'text.primary' }}
                >
                  Amount
                </TableCell>
                <TableCell
                  className='text-primary'
                  align='center'
                  sx={{ fontWeight: 'bold', fontSize: '1.1rem', color: 'text.primary' }}
                >
                  Payment Date
                </TableCell>
                <TableCell
                  className='text-primary'
                  align='center'
                  sx={{ fontWeight: 'bold', fontSize: '1.1rem', color: 'text.primary' }}
                >
                  Reference ID
                </TableCell>
                <TableCell
                  className='text-primary'
                  align='center'
                  sx={{ fontWeight: 'bold', fontSize: '1.1rem', color: 'text.primary' }}
                >
                  Transaction ID
                </TableCell>
                <TableCell
                  className='text-primary'
                  align='center'
                  sx={{ fontWeight: 'bold', fontSize: '1.1rem', color: 'text.primary' }}
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
                      dialog={ViewPaymentDetails}
                      dialogProps={{ data: payment }}
                    />
                    <OpenDialogOnElementClick
                      element={Button}
                      elementProps={buttonProps}
                      dialog={EditPaymentDetails}
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
