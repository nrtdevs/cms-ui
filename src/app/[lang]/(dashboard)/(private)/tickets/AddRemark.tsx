// import CustomDescriptionInput from '@/app/Custom-Cpmponents/input/customdescriptioinput'
// import DatePickerInput from '@/app/Custom-Cpmponents/input/Datepickerinput'
// import {
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Grid,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   Typography,
//   MenuItem,
//   Select,
//   FormControl,
//   InputLabel,
//   SelectChangeEvent
// } from '@mui/material'
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
//   tags: string[]
//   remarks: Remark[]
//   username: string
// }

// const AddRemark: React.FC<ViewTicketProps> = ({ data, open, setOpen }) => {
//   const handleClose = () => {
//     setOpen(false)
//   }

//   // Initialize state with the ticket data
//   const [ticketData, setTicketData] = useState<Ticket>({
//     ...data,
//     tags: data.tags || [] // Ensure tags is an empty array if undefined
//   })

//   // State for storing the current remark and date
//   const [remark, setRemark] = useState<Remark>({ remark: '', date: '' })
//   const [error, setError] = useState<string>('')
//   const [status, setStatus] = useState<string>(ticketData.status) // Track status for the dropdown

//   // Handle change in the remark or date fields
//   const handleRemarkChange = (field: string, value: string) => {
//     setRemark(prevState => ({ ...prevState, [field]: value }))
//   }

//   // Handle change in the status dropdown
//   const handleStatusChange = (event: SelectChangeEvent<string>) => {
//     setStatus(event.target.value)
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

//   useEffect(() => {
//     setTicketData({
//       ...data,
//       tags: data.tags || [] // Ensure tags is an empty array if undefined
//     })
//   }, [data])

//   return (
//     <div>
//       <Dialog open={open} onClose={handleClose} fullWidth maxWidth='md'>
//         <DialogTitle variant='h4' className='flex gap-2 flex-col text-primary text-center sm:pbs-16 sm:pbe-6 sm:pli-16'>
//           View Remarks
//           <Typography component='span' className='flex flex-col text-center'>
//             Here are the details for the Remarks
//           </Typography>
//         </DialogTitle>
//         <DialogContent className='overflow-visible pbs-0 sm:pli-16'>
//           <Grid item xs={12}>
//             <Table>
//               <TableHead >
//                 <TableRow>
//                   <TableCell align='center'>
//                     <strong className='text-primary'>Date</strong>
//                   </TableCell>
//                   <TableCell align='center'>
//                     <strong className='text-primary'>Remark</strong>
//                   </TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {ticketData.remarks.map((remark, index) => (
//                   <TableRow key={index}>
//                     <TableCell align='center'>{remark.date}</TableCell>
//                     <TableCell align='center'>{remark.remark}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </Grid>

//           {/* Dropdown for status */}
//           <Grid container spacing={3} className="w-full mt-4">
//   {/* Status Section */}
//   <Grid item xs={12} sm={6} className="w-full">
//     <Typography component="span" className="flex flex-col text-left mb-5">
//       Change The Status To Active To Save Remarks
//     </Typography>
//     <FormControl sx={{ minWidth: 300 }}>
//       <InputLabel id="demo-simple-select-helper-label">
//         {ticketData?.status}
//       </InputLabel>
//       <Select
//         labelId="demo-simple-select-helper-label"
//         id="demo-simple-select-helper"
//         value={status}
//         label="Status"
//         onChange={handleStatusChange}
//       >
//         <MenuItem value="Unactive">
//           <em>None</em>
//         </MenuItem>
//         <MenuItem value="Active">Active</MenuItem>
//         <MenuItem value="Unactive">Inactive</MenuItem>
//       </Select>
//     </FormControl>
//   </Grid>

//   {/* If status is "Unactive", show message */}
//   {status === "Unactive" ? (
//     <Grid item xs={12} className="text-primary mt-3">
//       <Typography variant="h6" color="error" className="text-left">
//         Remarks cannot be added as the status is inactive.
//       </Typography>
//     </Grid>
//   ) : (
//     <>
//       {/* Add Remark & Date Section */}
//       <Grid item xs={12} className="text-primary mt-5 w-full">
//         <Typography variant="h6" className="text-primary flex justify-left">
//           Add Remark & Date
//         </Typography>

//         <Grid container spacing={2} className="text-primary mt-3 w-full">
//           <Grid item xs={12} sm={5}>
//             <DatePickerInput
//               label="Date"
//               value={remark.date}
//               onChange={(value) => handleRemarkChange("date", value)}
//               error={!!error}
//             />
//           </Grid>
//         </Grid>

//         <Grid container spacing={2} className="text-primary mt-2 w-full">
//           <Grid item xs={12} sm={5}>
//             <CustomDescriptionInput
//               label="Remark"
//               value={remark.remark}
//               onChange={(value) => handleRemarkChange("remark", value)}
//               error={!!error}
//             />
//           </Grid>
//         </Grid>

//         {/* Show error if validation fails */}
//         {error && (
//           <Typography variant="body2" color="error" className="mt-1">
//             {error}
//           </Typography>
//         )}

//         {/* Save Remark Button */}
//         <Button
//           variant="outlined"
//           onClick={handleSaveRemark}
//           className="text-primary flex justify-center mt-5"
//         >
//           Save Remark
//         </Button>
//       </Grid>
//     </>
//   )}
// </Grid>

//         </DialogContent>

//         <DialogActions className='justify-center pbs-0 sm:pbe-16 sm:pli-16'>
//           <Button variant='contained' onClick={handleClose}>
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   )
// }
// export default AddRemark

'use client'

import React, { useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from '@mui/material'
import CustomDescriptionInput from '@/app/Custom-Cpmponents/input/customdescriptioinput'

interface Remark {
  remark: string
}

interface AddRemarkProps {
  open: boolean
  setOpen: (open: boolean) => void
}

const AddRemark: React.FC<AddRemarkProps> = ({ open, setOpen }) => {
  const [remark, setRemark] = useState<Remark>({ remark: '' })
  const [error, setError] = useState<string>('')

  const handleClose = () => {
    setOpen(false)
  }

  const handleRemarkChange = (value: string) => {
    setRemark({ remark: value })

  }

  const handleSaveRemark = () => {
    if (!remark.remark.trim()) {
      setError('Please provide a remark.')
      return
    }

    setError('')

    // Clear input field after saving the remark
    setRemark({ remark: '' })
    console.log('Remark:', remark)
    setOpen(false)
  }

  return (
    <Dialog open={open} onClose={handleClose}  maxWidth='md' fullWidth>
      <DialogTitle variant='h4' className='flex flex-col text-primary text-center sm:pbs-16 sm:pbe-6 sm:pli-16'>
        Add Remark
        <Typography component='span' className='flex flex-col text-center'>
          Here are the details for the Remark
        </Typography>
      </DialogTitle>

      <DialogContent className='overflow-visible pbs-0 sm:pli-16 flex justify-center items-center text-center'>
        <Grid container spacing={3} className=' flex justify-center items-center text-center'>
          <Grid item xs={12} sm={8}>
            <CustomDescriptionInput
              label=''
              value={remark.remark}
              onChange={handleRemarkChange}
              error={!!error}
            />
          </Grid>

          {error && (
            <Grid item xs={12} className='text-left'>
              <Typography variant='body2' color='error' className='mt-1'>
                {error}
              </Typography>
            </Grid>
          )}

          <Grid item xs={12} className=' flex justify-center items-center text-center '>
            <Button
              variant='outlined'
              onClick={handleSaveRemark}
              className='text-primary flex justify-center mt-5 mr-5'
            >
              Save Remark
            </Button>
            <Button variant='contained' onClick={handleClose} className='flex justify-center mt-5'>
          Close
        </Button>
          </Grid>
        </Grid>
      </DialogContent>


    </Dialog>
  )
}

export default AddRemark
