
'use client'

import CustomDescriptionInput from '@/app/Custom-Cpmponents/input/customdescriptioinput'
import CustomDateInput from '@/app/Custom-Cpmponents/input/Datepickerinput' // Assuming this is your custom date input
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface ViewTicketProps {
  open: boolean
  setOpen: (open: boolean) => void
  data: Ticket // The ticket data to be viewed
}

interface Remark {
  text: string
  date: string
  username: string
}

interface Ticket {
  ticketName: string
  id: string
  ticketDescription: string
  assignee: string
  status: string
  priority: string
  tags: string[] // Tags can be an empty array if not provided
  remarks: Remark[] // Remarks will always default to an empty array
  username: string // Username comes from the props
}

const Remarks: React.FC<ViewTicketProps> = ({ data, open, setOpen }) => {
  const [remarks, setRemarks] = useState<Remark[]>([])

  const { slug } = useParams()
  const router = useRouter()

  const handleClose = () => {
    setOpen(false)
  }

  // Initialize state with the ticket data, ensuring remarks is always an array
  const [ticketData, setTicketData] = useState<Ticket>({
    ...data,
    tags: data?.tags || [], // Default tags to an empty array if missing
    remarks: data?.remarks || [], // Default remarks to an empty array if missing
    username: data?.username || '' // Ensure username is included
  })

  const remarksData = [
    {
      id: '1',
      remarks: [
        { remarkId: 'R1', text: 'Payment for Project Alpha' },
        { remarkId: 'R2', text: 'Initial deposit received' }
      ],
      date: '2025-01-01',
      username: 'john_doe'
    },
    {
      id: '2',
      remarks: [
        { remarkId: 'R1', text: 'Payment for Project Beta' },
        { remarkId: 'R2', text: 'Second installment received' }
      ],
      date: '2025-01-05',
      username: 'jane_smith'
    },
    {
      id: '3',
      remarks: [
        { remarkId: 'R1', text: 'Payment for Project Gamma' },
        { remarkId: 'R2', text: 'Final payment completed' }
      ],
      date: '2025-01-10',
      username: 'mike_jones'
    },
    {
      id: '4',
      remarks: [
        { remarkId: 'R1', text: 'Payment for Project Delta' },
        { remarkId: 'R2', text: 'Partial payment made' }
      ],
      date: '2025-01-15',
      username: 'lisa_white'
    },
    {
      id: '5',
      remarks: [
        { remarkId: 'R1', text: 'Payment for Project Epsilon' },
        { remarkId: 'R2', text: 'Advance payment completed' }
      ],
      date: '2025-01-20',
      username: 'sara_lee'
    },
    {
      id: '6',
      remarks: [
        { remarkId: 'R1', text: 'Payment for Project Zeta' },
        { remarkId: 'R2', text: 'Payment received' }
      ],
      date: '2025-02-01',
      username: 'alex_brown'
    },
    {
      id: '7',
      remarks: [
        { remarkId: 'R1', text: 'Payment for Project Eta' },
        { remarkId: 'R2', text: 'First installment paid' }
      ],
      date: '2025-02-05',
      username: 'chris_miller'
    },
    {
      id: '8',
      remarks: [
        { remarkId: 'R1', text: 'Payment for Project Theta' },
        { remarkId: 'R2', text: 'Payment in full received' }
      ],
      date: '2025-02-10',
      username: 'kelly_wilson'
    },
    {
      id: '9',
      remarks: [
        { remarkId: 'R1', text: 'Payment for Project Iota' },
        { remarkId: 'R2', text: 'Deposit made' }
      ],
      date: '2025-02-15',
      username: 'daniel_evans'
    },
    {
      id: '10',
      remarks: [
        { remarkId: 'R1', text: 'Payment for Project Kappa' },
        { remarkId: 'R2', text: 'Final balance paid' }
      ],
      date: '2025-02-20',
      username: 'nancy_clark'
    }
  ]

  // State for storing the current remark and date
  const [remark, setRemark] = useState<Remark>({ text: '', date: '', username: '' })
  const [error, setError] = useState<string>('')

  const handleRemarkChange = (field: string, value: string) => {
    setRemark(prevState => ({ ...prevState, [field]: value }))
  }

  // Handle save remark with validation
  const handleSaveRemark = () => {
    if (!remark.text.trim() || !remark.date) {
      setError('Please provide a remark and a date.')
      return
    }

    // Clear previous error if validation is successful
    setError('')

    // Save the current remark to the ticket
    const updatedTicket = { ...ticketData, remarks: [...ticketData.remarks, remark] }
    setTicketData(updatedTicket)
    setRemark({ text: '', date: '', username: data?.username }) // Clear the fields after saving
  }

  // Handle delete remark
  const handleDeleteRemark = (index: number) => {
    const updatedRemarks = ticketData.remarks.filter((_, i) => i !== index)
    setTicketData(prevState => ({ ...prevState, remarks: updatedRemarks }))
  }

  useEffect(() => {
    // Directly use the remarks from the `data` prop if available
    if (data?.remarks) {
      setTicketData({
        ...data,
        tags: data?.tags || [], // Default tags to an empty array if missing
        remarks: data?.remarks || [], // Default remarks to an empty array if missing
        username: data?.username || '' // Ensure username is included
      })
    }
  }, [data, slug])

  return (
    <div>
      {/* Card component to replace Dialog */}
      <Card sx={{ maxWidth: 900, margin: 'auto', padding: '20px', boxShadow: 3 }}>
        <CardHeader
          title='View Remarks'
          subheader='Here are the details for the Remarks'
          titleTypographyProps={{
            variant: 'h4',
            fontWeight: 'bold',
            textAlign: 'center'
          }}
          subheaderTypographyProps={{
            variant: 'body1',
            align: 'center',
            color: 'text.secondary'
          }}
          sx={{ paddingBottom: 2 }}
        />
        <CardContent>
          <Typography variant='h5' align='center' gutterBottom>
            Saved Remarks
          </Typography>
          <Table sx={{ marginBottom: 3 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>#</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>Remark</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>Username</TableCell>
                <TableCell align='center' sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ticketData.remarks.map((remark, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{remark.text}</TableCell>
                  <TableCell>{remark.date}</TableCell>
                  <TableCell>{remark.username}</TableCell>
                  <TableCell align='center'>
                    <Button variant='outlined' color='error' onClick={() => handleDeleteRemark(index)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Add new remark */}
          <Grid item xs={12}>
            <Typography variant='h6' color='primary' align='center' gutterBottom>
              Add Remark
            </Typography>
            <Grid container spacing={2} justifyContent='center'>
              <CustomDateInput
                label='Date'
                value={remark.date}
                onChange={value => handleRemarkChange('date', value)}
                error={!!error}
              />
            </Grid>
            <CustomDescriptionInput
              label='Remark'
              value={remark.text}
              onChange={value => handleRemarkChange('text', value)}
              error={!!error}
            />
            {/* Username is automatically set from props */}
            {/* <Typography variant='body1' color='text.secondary' align='center' sx={{ marginTop: 2 }}>
              Username: {data?.username}
            </Typography> */}
            {/* Show error if validation fails */}
            {error && (
              <Typography variant='body2' color='error' align='center' sx={{ marginTop: 2 }}>
                {error}
              </Typography>
            )}

            <Button variant='contained' color='primary' onClick={handleSaveRemark} fullWidth sx={{ marginTop: 3 }}>
              Save Remark
            </Button>
          </Grid>
        </CardContent>

        <CardActions sx={{ paddingTop: 2 }}>
          <Button variant='outlined' onClick={handleClose} fullWidth>
            Close
          </Button>
        </CardActions>
      </Card>
    </div>
  )
}
export default Remarks

// 'use client'

// import CustomDescriptionInput from '@/app/Custom-Cpmponents/input/customdescriptioinput'
// import DatePickerInput from '@/app/Custom-Cpmponents/input/Datepickerinput'
// import {
//   Button,
//   Card,
//   CardActions,
//   CardContent,
//   CardHeader,
//   Grid,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   Typography
// } from '@mui/material'
// import { useParams, useRouter } from 'next/navigation'
// import { useEffect, useState } from 'react'

// interface ViewTicketProps {
//   open: boolean
//   setOpen: (open: boolean) => void
//   data: Ticket // The ticket data to be viewed
// }

// interface Remark {
//   remark: string
//   date: string
// }

// interface Ticket {
//   ticketName: string
//   id: string
//   ticketDescription: string
//   assignee: string
//   status: string
//   priority: string
//   tags?: string[] // Make tags optional
//   remarks: Remark[]
// }

// const Remarks: React.FC<ViewTicketProps> = ({ data, open, setOpen }) => {
//   const [remarks, setRemarks] = useState<any | null>(null)

//   const remarksData = [
//     {
//       id: '1',
//       remarks: [
//         { remarkId: 'R1', text: 'Payment for Project Alpha' },
//         { remarkId: 'R2', text: 'Initial deposit received' }
//       ],
//       date: '2025-01-01',
//       username: 'john_doe'
//     },
//     {
//       id: '2',
//       remarks: [
//         { remarkId: 'R1', text: 'Payment for Project Beta' },
//         { remarkId: 'R2', text: 'Second installment received' }
//       ],
//       date: '2025-01-05',
//       username: 'jane_smith'
//     },
//     {
//       id: '3',
//       remarks: [
//         { remarkId: 'R1', text: 'Payment for Project Gamma' },
//         { remarkId: 'R2', text: 'Final payment completed' }
//       ],
//       date: '2025-01-10',
//       username: 'mike_jones'
//     },
//     {
//       id: '4',
//       remarks: [
//         { remarkId: 'R1', text: 'Payment for Project Delta' },
//         { remarkId: 'R2', text: 'Partial payment made' }
//       ],
//       date: '2025-01-15',
//       username: 'lisa_white'
//     },
//     {
//       id: '5',
//       remarks: [
//         { remarkId: 'R1', text: 'Payment for Project Epsilon' },
//         { remarkId: 'R2', text: 'Advance payment completed' }
//       ],
//       date: '2025-01-20',
//       username: 'sara_lee'
//     },
//     {
//       id: '6',
//       remarks: [
//         { remarkId: 'R1', text: 'Payment for Project Zeta' },
//         { remarkId: 'R2', text: 'Payment received' }
//       ],
//       date: '2025-02-01',
//       username: 'alex_brown'
//     },
//     {
//       id: '7',
//       remarks: [
//         { remarkId: 'R1', text: 'Payment for Project Eta' },
//         { remarkId: 'R2', text: 'First installment paid' }
//       ],
//       date: '2025-02-05',
//       username: 'chris_miller'
//     },
//     {
//       id: '8',
//       remarks: [
//         { remarkId: 'R1', text: 'Payment for Project Theta' },
//         { remarkId: 'R2', text: 'Payment in full received' }
//       ],
//       date: '2025-02-10',
//       username: 'kelly_wilson'
//     },
//     {
//       id: '9',
//       remarks: [
//         { remarkId: 'R1', text: 'Payment for Project Iota' },
//         { remarkId: 'R2', text: 'Deposit made' }
//       ],
//       date: '2025-02-15',
//       username: 'daniel_evans'
//     },
//     {
//       id: '10',
//       remarks: [
//         { remarkId: 'R1', text: 'Payment for Project Kappa' },
//         { remarkId: 'R2', text: 'Final balance paid' }
//       ],
//       date: '2025-02-20',
//       username: 'nancy_clark'
//     }
//   ]

//   const { slug } = useParams()
//   const router = useRouter()

//   const handleClose = () => {
//     setOpen(false)
//   }

//   // Initialize state with the ticket data, use optional chaining for `tags`
//   const [ticketData, setTicketData] = useState<Ticket>({
//     ...data,
//     tags: data.tags ?? [] // Use an empty array if `tags` is undefined
//   })

//   // State for storing the current remark and date
//   const [remark, setRemark] = useState<Remark>({ remark: '', date: '' })
//   const [error, setError] = useState<string>('')

//   // Handle change in the remark or date fields
//   const handleRemarkChange = (field: string, value: string) => {
//     setRemark(prevState => ({ ...prevState, [field]: value }))
//   }

//   // Handle save remark with validation
//   const handleSaveRemark = () => {
//     if (!remark.remark.trim() || !remark.date) {
//       setError('Please provide both a remark and a date.')
//       return
//     }

//     // Clear previous error if validation is successful
//     setError('')

//     // Save the current remark to the ticket
//     const updatedTicket = { ...ticketData, remarks: [...ticketData.remarks, remark] }
//     setTicketData(updatedTicket)
//     setRemark({ remark: '', date: '' }) // Clear the fields after saving
//   }

//   // Handle delete remark
//   const handleDeleteRemark = (index: number) => {
//     const updatedRemarks = ticketData.remarks.filter((_, i) => i !== index)
//     setTicketData(prevState => ({ ...prevState, remarks: updatedRemarks }))
//   }

//   useEffect(() => {
//     const remarkData = remarksData.find(remarks => remarks.id === slug)
//     setRemarks(remarkData || null)

//     setTicketData({
//       ...data,
//       tags: data.tags ?? [] // Ensure tags is an empty array if undefined
//     })
//   }, [data, slug])

//   return (
//     <div>
//       {/* Card Component replacing Dialog */}
//       <Card sx={{ maxWidth: 900, margin: 'auto', padding: '20px', boxShadow: 3 }}>
//         <CardHeader
//           title='View Remarks'
//           subheader='Here are the details for the Remarks'
//           titleTypographyProps={{
//             variant: 'h4',
//             fontWeight: 'bold',
//             textAlign: 'center'
//           }}
//           subheaderTypographyProps={{
//             variant: 'body1',
//             align: 'center',
//             color: 'text.secondary'
//           }}
//           sx={{ paddingBottom: 2 }}
//         />
//         <CardContent>
//           <Typography variant='h5' align='center' gutterBottom>
//             Saved Remarks
//           </Typography>
//           <Table sx={{ marginBottom: 3 }}>
//             <TableHead>
//               <TableRow>
//                 <TableCell>
//                   <strong>Date</strong>
//                 </TableCell>
//                 <TableCell>
//                   <strong>Remark</strong>
//                 </TableCell>
//                 <TableCell align='center'>
//                   <strong>Action</strong>
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {ticketData.remarks.map((remark, index) => (
//                 <TableRow key={index}>
//                   <TableCell>{remark.date}</TableCell>
//                   <TableCell>{remark.remark}</TableCell>
//                   <TableCell align='center'>
//                     <Button variant='outlined' color='error' onClick={() => handleDeleteRemark(index)}>
//                       Delete
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>

//           {/* Add new remark */}
//           <Grid item xs={12}>
//             <Typography variant='h6' color='primary' align='center' gutterBottom>
//               Add Remark & Date
//             </Typography>
//             <Grid container spacing={2} justifyContent='center'>
//               <Grid item xs={12} sm={5}>
//                 <DatePickerInput
//                   label='Date'
//                   value={remark.date}
//                   onChange={value => handleRemarkChange('date', value)}
//                   error={!!error}
//                 />
//               </Grid>
//             </Grid>
//             <Grid container spacing={2} justifyContent='center'>
//               <Grid item xs={12} sm={5}>
//                 <CustomDescriptionInput
//                   label='Remark'
//                   value={remark.remark}
//                   onChange={value => handleRemarkChange('remark', value)}
//                   error={!!error}
//                 />
//               </Grid>
//             </Grid>

//             {/* Show error if validation fails */}
//             {error && (
//               <Typography variant='body2' color='error' align='center' sx={{ marginTop: 2 }}>
//                 {error}
//               </Typography>
//             )}

//             <Button variant='outlined' onClick={handleSaveRemark} fullWidth sx={{ marginTop: 3 }}>
//               Save Remark
//             </Button>
//           </Grid>
//         </CardContent>

//         <CardActions sx={{ paddingTop: 2 }}>
//           <Button variant='outlined' onClick={handleClose} fullWidth>
//             Close
//           </Button>
//         </CardActions>
//       </Card>
//     </div>
//   )
// }

// export default Remarks
