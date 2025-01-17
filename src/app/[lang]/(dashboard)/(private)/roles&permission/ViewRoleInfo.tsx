// 'use client'

// import React, { useState, useEffect } from 'react'
// import {
//   Container,
//   TextField,
//   MenuItem,
//   Select,
//   InputLabel,
//   FormControl,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableRow,
//   Box,
//   Dialog,
//   Typography,
//   Button
// } from '@mui/material'

// interface ViewRoleProps {
//   open: boolean
//   setOpen: (open: boolean) => void
//   roleData: {
//     usertype:string
//     name: string
//     userType: string
//     description: string
//     permissions: { permission_group: string; permissions: { id: number; name: string }[] }[]
//   }
// }

// const ViewRoleInfo: React.FC<ViewRoleProps> = ({ open, setOpen, roleData }) => {
//   const [name, setName] = useState<string>('')
//   const [userType, setUserType] = useState<string>('')
//   const [description, setDescription] = useState<string>('')
//   const [selectedPermissions, setSelectedPermissions] = useState<any>({})

//   useEffect(() => {
//     // Ensure roleData exists and has the necessary structure
//     if (roleData) {
//       const { name, userType, description, permissions } = roleData
//       setName(name || '')
//       setUserType(userType || '')
//       setDescription(description || '')

//       // Set permissions if available, otherwise default to empty array
//       const initialPermissions: any = {}
//       permissions?.forEach(group => {
//         initialPermissions[group.permission_group] = group.permissions.map(p => p.id)
//       })
//       setSelectedPermissions(initialPermissions)
//     }
//   }, [roleData])

//   const handleClose = () => {
//     setOpen(false)
//   }

//   // Example permission data
//   const permissions = [
//     { id: 34, name: 'read', permission_group: 'Dashboard' },
//     { id: 72, name: 'create', permission_group: 'User' },
//     { id: 58, name: 'read', permission_group: 'User' },
//     { id: 61, name: 'update', permission_group: 'User' },
//     { id: 19, name: 'delete', permission_group: 'User' },
//     { id: 95, name: 'block', permission_group: 'User' },
//     { id: 23, name: 'create', permission_group: 'Bidding' },
//     { id: 47, name: 'read', permission_group: 'Bidding' },
//     { id: 12, name: 'update', permission_group: 'Bidding' },
//     { id: 8, name: 'approve', permission_group: 'Bidding' },
//     { id: 74, name: 'block', permission_group: 'Bidding' },
//     { id: 63, name: 'view', permission_group: 'Reporting' },
//     { id: 21, name: 'generate', permission_group: 'Reporting' },
//     { id: 89, name: 'download', permission_group: 'Reporting' },
//     { id: 16, name: 'create', permission_group: 'Content' },
//     { id: 43, name: 'edit', permission_group: 'Content' },
//     { id: 77, name: 'delete', permission_group: 'Content' },
//     { id: 52, name: 'approve', permission_group: 'Content' },
//     { id: 91, name: 'manage', permission_group: 'Settings' },
//     { id: 35, name: 'update', permission_group: 'Settings' },
//     { id: 68, name: 'view', permission_group: 'Settings' },
//     { id: 30, name: 'create', permission_group: 'Notifications' },
//     { id: 59, name: 'edit', permission_group: 'Notifications' },
//     { id: 24, name: 'delete', permission_group: 'Notifications' }
//   ]

//   const groupedPermissions = permissions.reduce((acc: any, { name, permission_group, id }) => {
//     if (!acc[permission_group]) {
//       acc[permission_group] = []
//     }
//     acc[permission_group].push({ name, permission_group, id })
//     return acc
//   }, {})

//   return (
//     <Dialog open={open} onClose={handleClose} maxWidth='md' fullWidth>
//       <Container className='p-8 min-h-screen'>
//         <h1 className='text-2xl mb-6 text-primary'>View Role</h1>
//         <Box className='space-y-4'>
//           {/* Name and UserType */}
//           <Box className='flex items-center space-x-4 mb-4'>
//             <Box className='w-1/2'>
//               <TextField
//                 label='Name'
//                 placeholder='Enter Name'
//                 fullWidth
//                 value={roleData?.name}
//                 InputProps={{ readOnly: true }}
//                 InputLabelProps={{ className: 'text-gray-400' }}
//               />
//             </Box>
//             <Box className='w-1/2'>
//               <FormControl fullWidth>
//                 <InputLabel>{roleData?.usertype}</InputLabel>
//                 <Select value={userType} disabled>
//                   <MenuItem value=''>Select UserType</MenuItem>
//                   <MenuItem value='User'>User</MenuItem>
//                   <MenuItem value='SuperAdmin'>SuperAdmin</MenuItem>
//                 </Select>
//               </FormControl>
//             </Box>
//           </Box>

//           {/* Description */}
//           <Box className='mb-4'>
//             <TextField
//               label='Description'
//               placeholder='Enter description'
//               multiline
//               rows={4}
//               fullWidth
//               value={description}
//               InputProps={{ readOnly: true }}
//               InputLabelProps={{ className: 'text-gray-400' }}
//               defaultValue={roleData?.description}
//             />
//           </Box>

//           {/* Permissions Table */}
//           <TableContainer>
//             <Table>
//               <TableBody>
//                 {Object.keys(groupedPermissions).map(group => (
//                   <TableRow key={group}>
//                     <TableCell>
//                       <Box display='flex' alignItems='center' marginRight={2}>
//                         <Typography variant='body1' className='font-semibold'>
//                           {group}
//                         </Typography>
//                       </Box>
//                     </TableCell>
//                     <TableCell>
//                       <Box display='flex' flexWrap='wrap' alignItems='center'>
//                         {groupedPermissions[group].map((permission: { id: string; name: string }) => (
//                           <Box key={permission.id} display='flex' alignItems='center' marginRight={2}>
//                             <Typography variant='body1' style={{ marginLeft: '8px' }}>
//                               {permission.name.charAt(0).toUpperCase() + permission.name.slice(1)}
//                             </Typography>
//                           </Box>
//                         ))}
//                       </Box>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           {/* Buttons */}
//           <Box className='flex justify-end mt-4'>
//             <Button variant='outlined' onClick={handleClose} className='border-gray-500 text-gray-300'>
//               Close
//             </Button>
//           </Box>
//         </Box>
//       </Container>
//     </Dialog>
//   )
// }

// export default ViewRoleInfo


'use client';

import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Box,
  Dialog,
  Typography,
  Button,
} from '@mui/material';

interface ViewRoleProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  roleData?: {
    usertype: string;
    name: string;
    permissionname: string;
    userType: string;
    description: string;
    permissions: { permission_group: string; permissions: { id: number; name: string }[] }[];
  };
}

const ViewRoleInfo: React.FC<ViewRoleProps> = ({ open, setOpen, roleData }) => {
  const [name, setName] = useState<string>('');
  const [userType, setUserType] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [selectedPermissions, setSelectedPermissions] = useState<Record<string, number[]>>({});

  useEffect(() => {
    if (roleData) {
      setName(roleData.name || '');
      setUserType(roleData.userType || '');
      setDescription(roleData.description || '');

      const initialPermissions: Record<string, number[]> = {};
      roleData.permissions?.forEach(group => {
        initialPermissions[group.permission_group] = group.permissions.map(p => p.id);
      });
      setSelectedPermissions(initialPermissions);
    }
  }, [roleData]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <Container className="p-8 min-h-screen">
        <h1 className="text-2xl mb-6 text-primary">View Role</h1>
        <Box className="space-y-4">
          {/* Name and UserType */}
          <Box className="flex items-center space-x-4 mb-4">
            <Box className="w-1/2">
              <TextField
                label="Name"
                fullWidth
                value={name}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Box>
            <Box className="w-1/2">
              <FormControl fullWidth>
                <InputLabel>User Type</InputLabel>
                <Select value={userType} readOnly>
                  <MenuItem value="user">User</MenuItem>
                  <MenuItem value="superAdmin">SuperAdmin</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>

          {/* Description */}
          <Box className="mb-4">
            <TextField
              label="Description"
              multiline
              rows={4}
              fullWidth
              value={description}
              InputProps={{
                readOnly: true,
              }}
            />
          </Box>

          {/* Permissions Table */}
          <TableContainer>
            <Table>
              <TableBody>
                {(roleData?.permissions || []).map(({ permission_group, permissions }) => (
                  <TableRow key={permission_group}>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Checkbox
                          checked={permissions.every(p => selectedPermissions[permission_group]?.includes(p.id))}
                          disabled
                        />
                        <Typography>{permission_group}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {permissions.map(permission => (
                        <Box key={permission.id} display="flex" alignItems="center">
                          <Checkbox
                            checked={selectedPermissions[permission_group]?.includes(permission.id) || false}
                            disabled
                          />
                          <Typography>{permission.name}</Typography>
                        </Box>
                      ))}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Close Button */}
          <Box display="flex" justifyContent="flex-end" mt={4}>
            <Button onClick={handleClose} variant="outlined">Close</Button>
          </Box>
        </Box>
      </Container>
    </Dialog>
  );
};

export default ViewRoleInfo;
