import { Button, Typography, Grid } from '@mui/material'
import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface ViewPaymentsProps {
  open: boolean
  setOpen: (open: boolean) => void
  data: {
    amount: string
    transactionId: string
    paymentMode: string
    refId: string
    paymentDate: string
    totalPaymentsList: Array<{
      id: string
      paymentMode: string
      amount: number
    }>
    projectId: string // Added projectId to the data structure
  }
}

const ViewPayments: React.FC<ViewPaymentsProps> = ({ data, open, setOpen }: ViewPaymentsProps) => {
  const router = useRouter()
  const { lang: locale } = useParams()

  useEffect(() => {
    if (data.projectId) {
      router.push(`/${locale}/financial-management/${data.projectId}`)
    }
  }, [data.projectId, locale, router])

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant='h4' sx={{ fontWeight: 'bold', marginBottom: 2 }} className='text-primary'>
        View Finances
      </Typography>

      <Grid container spacing={3}>
        {/* Displaying main details */}
        <Grid item xs={12} sm={6}>
          <Typography variant='body1' fontWeight='bold' color='primary'>
            Amount:
          </Typography>
          <Typography variant='body1'>{data.amount}</Typography>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant='body1' fontWeight='bold' color='primary'>
            Transaction ID:
          </Typography>
          <Typography variant='body1'>{data.transactionId}</Typography>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant='body1' fontWeight='bold' color='primary'>
            Ref ID:
          </Typography>
          <Typography variant='body1'>{data.refId}</Typography>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant='body1' fontWeight='bold' color='primary'>
            Payment Date:
          </Typography>
          <Typography variant='body1'>{data.paymentDate}</Typography>
        </Grid>

        {/* Displaying total payments in a numbered sequence */}
        <Grid item xs={12}>
          <Typography variant='h6' fontWeight='bold' color='primary' gutterBottom>
            Total Payments:
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='body1'>
                {data.totalPaymentsList.map((payment, index) => (
                  <span key={payment.id}>
                    {index + 1}. {payment.paymentMode} - ${payment.amount.toLocaleString()} &nbsp;&nbsp;
                  </span>
                ))}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Close button */}
      <Button onClick={() => setOpen(false)} color='secondary' variant='contained' sx={{ marginTop: 2 }}>
        Close
      </Button>
    </div>
  )
}

export default ViewPayments
