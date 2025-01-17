// 'use client'

// import React, { useState, useEffect } from 'react'
// import {
//   Container,
//   TextField,
//   MenuItem,
//   Select,
//   InputLabel,
//   FormControl,
//   Checkbox,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableRow,
//   Button,
//   Box,
//   Dialog,
//   Typography
// } from '@mui/material'

// interface EditRoleProps {
//   open: boolean
//   setOpen: (open: boolean) => void
//   roleData: {
//     usertype: string
//     name: string
//     permissionname: string
//     userType: string
//     description: string
//     permissions: { permission_group: string, permissions: { id: number, name: string }[] }[]
//   }
// }

// const EditRoleInfo: React.FC<EditRoleProps> = ({ open, setOpen, roleData }) => {
//   const [name, setName] = useState<string>(roleData?.name || '')
//   const [userType, setUserType] = useState<string>(roleData?.userType || '')
//   const [description, setDescription] = useState<string>(roleData?.description || '')
//   const [selectedPermissions, setSelectedPermissions] = useState<any>({})

//   useEffect(() => {
//     if (roleData && roleData.permissions) {
//       const initialPermissions: any = {}
//       roleData.permissions.forEach(group => {
//         initialPermissions[group.permission_group] = group.permissions.map(p => p.id)
//       })
//       setSelectedPermissions(initialPermissions)
//     }
//   }, [roleData])

//   const handleClose = () => {
//     setOpen(false)
//   }

//   // Ensure roleData.permissions exists before using reduce
//   const groupedPermissions = (roleData.permissions || []).reduce((acc: any, { permission_group, permissions }) => {
//     permissions.forEach(({ name, id }) => {
//       if (!acc[permission_group]) {
//         acc[permission_group] = []
//       }
//       acc[permission_group].push({ permissionname: name, permission_group, id })
//     })
//     return acc
//   }, {})

//   const handlePermissionChange = (group: string, permissionId: number) => {
//     setSelectedPermissions((prev: Record<string, number[]>) => {
//       const groupPermissions = prev[group] || []
//       if (groupPermissions.includes(permissionId)) {
//         return {
//           ...prev,
//           [group]: groupPermissions.filter(id => id !== permissionId)
//         }
//       } else {
//         return {
//           ...prev,
//           [group]: [...groupPermissions, permissionId]
//         }
//       }
//     })
//   }

//   const handleSubmit = () => {
//     // Validation check
//     if (!name || !userType) {
//       alert('Name and UserType are required fields.')
//       return
//     }

//     // Map selected permissions to include actual permission IDs
//     const permissionsToSubmit = Object.entries(selectedPermissions).map(([group, permissionIds]) => ({
//       permission_group: group,
//       permissions: (permissionIds as number[]).map(permissionId => {
//         const permission = (roleData.permissions || [])
//           .flatMap(g => g.permissions)
//           .find(p => p.id === permissionId)
//         return permission ? { permissionname: permission.name, id: permission.id } : null
//       }).filter((p): p is { permissionname: string; id: number } => p !== null)
//     }))

//     const formData = {
//       name,
//       userType,
//       description,
//       permissions: permissionsToSubmit
//     }

//     console.log('Updated Role Data:', formData)

//     // Send formData to API or handle as needed
//     handleClose()
//   }

//   return (
//     <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
//       <Container className='p-8 min-h-screen'>
//         <h1 className='text-2xl mb-6 text-primary'>Edit Role</h1>
//         <Box className='space-y-4'>
//           {/* Name and UserType */}
//           <Box className='flex items-center space-x-4 mb-4'>
//             <Box className='w-1/2'>
//               <TextField
//                 label='Name *'
//                 placeholder='Enter Name'
//                 fullWidth
//                 value={name}
//                 onChange={e => setName(e.target.value)}
//                 InputLabelProps={{ className: 'text-gray-400' }}
//               />
//             </Box>
//             <Box className='w-1/2'>
//               <FormControl fullWidth>
//                 <InputLabel>{roleData?.usertype}</InputLabel>
//                 <Select value={userType} onChange={e => setUserType(e.target.value)}>
//                   <MenuItem value='user'>User</MenuItem>
//                   <MenuItem value='superAdmin'>SuperAdmin</MenuItem>
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
//               onChange={e => setDescription(e.target.value)}
//               InputLabelProps={{ className: 'text-gray-400' }} defaultValue={roleData?.description}
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
//                         <Checkbox
//                           checked={groupedPermissions[group].length === (selectedPermissions[group]?.length || 0)}
//                           onChange={() => handlePermissionChange(group, groupedPermissions[group][0].id)}
//                           color='primary'
//                         />
//                         {group}
//                       </Box>
//                     </TableCell>
//                     <TableCell>
//                       <Box display='flex' flexWrap='wrap' alignItems='center'>
//                         {groupedPermissions[group].map((permission: { id: number; permissionname: string }) => (
//                           <Box key={permission.id} display='flex' alignItems='center' marginRight={2}>
//                             <Checkbox
//                               checked={selectedPermissions[group]?.includes(permission.id) || false}
//                               onChange={() => handlePermissionChange(group, permission.id)}
//                               color='primary'
//                             />
//                             <Typography variant='body1' style={{ marginLeft: '8px' }}>
//                               {permission.permissionname.charAt(0).toUpperCase() + permission.permissionname.slice(1)}
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
//             <Button variant='contained' className='ml-4 bg-primary' onClick={handleSubmit}>
//               Save
//             </Button>
//           </Box>
//         </Box>
//       </Container>
//     </Dialog>
//   )
// }

// export default EditRoleInfo

// 'use client'

// import React, { useState, useEffect } from 'react'
// import {
//   Container,
//   TextField,
//   MenuItem,
//   Select,
//   InputLabel,
//   FormControl,
//   Checkbox,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableRow,
//   Button,
//   Box,
//   Dialog,
//   Typography
// } from '@mui/material'

// interface EditRoleProps {
//   open: boolean
//   setOpen: (open: boolean) => void
//   roleData: {
//     usertype: string
//     name: string
//     permissionname: string
//     userType: string
//     description: string
//     permissions: { permission_group: string, permissions: { id: number, name: string }[] }[]
//   }
// }

// const EditRoleInfo: React.FC<EditRoleProps> = ({ open, setOpen, roleData }) => {
//   const [name, setName] = useState<string>(roleData?.name || '')
//   const [userType, setUserType] = useState<string>(roleData?.userType || '')
//   const [description, setDescription] = useState<string>(roleData?.description || '')
//   const [selectedPermissions, setSelectedPermissions] = useState<any>({})

//   useEffect(() => {
//     if (roleData && roleData.permissions) {
//       const initialPermissions: any = {}
//       roleData.permissions.forEach(group => {
//         initialPermissions[group.permission_group] = group.permissions.map(p => p.id)
//       })
//       setSelectedPermissions(initialPermissions)
//     }
//   }, [roleData])

//   const handleClose = () => {
//     setOpen(false)
//   }

//   // Group permissions by permission_group
//   const groupedPermissions = (roleData.permissions || []).reduce((acc: any, { permission_group, permissions }) => {
//     permissions.forEach(({ name, id }) => {
//       if (!acc[permission_group]) {
//         acc[permission_group] = []
//       }
//       acc[permission_group].push({ permissionname: name, permission_group, id })
//     })
//     return acc
//   }, {})

//   const handlePermissionChange = (group: string, permissionId: number) => {
//     setSelectedPermissions((prev: Record<string, number[]>) => {
//       const groupPermissions = prev[group] || []
//       if (groupPermissions.includes(permissionId)) {
//         return {
//           ...prev,
//           [group]: groupPermissions.filter(id => id !== permissionId)
//         }
//       } else {
//         return {
//           ...prev,
//           [group]: [...groupPermissions, permissionId]
//         }
//       }
//     })
//   }

//   const handleSubmit = () => {
//     // Validation check
//     if (!name || !userType) {
//       alert('Name and UserType are required fields.')
//       return
//     }

//     // Map selected permissions to include actual permission IDs
//     const permissionsToSubmit = Object.entries(selectedPermissions).map(([group, permissionIds]) => ({
//       permission_group: group,
//       permissions: (permissionIds as number[]).map(permissionId => {
//         const permission = (roleData.permissions || [])
//           .flatMap(g => g.permissions)
//           .find(p => p.id === permissionId)
//         return permission ? { permissionname: permission.name, id: permission.id } : null
//       }).filter((p): p is { permissionname: string; id: number } => p !== null)
//     }))

//     const formData = {
//       name,
//       userType,
//       description,
//       permissions: permissionsToSubmit
//     }

//     console.log('Updated Role Data:', formData)

//     // Send formData to API or handle as needed
//     handleClose()
//   }

//   return (
//     <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
//       <Container className='p-8 min-h-screen'>
//         <h1 className='text-2xl mb-6 text-primary'>Edit Role</h1>
//         <Box className='space-y-4'>
//           {/* Name and UserType */}
//           <Box className='flex items-center space-x-4 mb-4'>
//             <Box className='w-1/2'>
//               <TextField
//                 label='Name *'
//                 placeholder='Enter Name'
//                 fullWidth
//                 value={name}
//                 onChange={e => setName(e.target.value)}
//                 InputLabelProps={{ className: 'text-gray-400' }}
//               />
//             </Box>
//             <Box className='w-1/2'>
//               <FormControl fullWidth>
//                 <InputLabel>{roleData?.usertype}</InputLabel>
//                 <Select value={userType} onChange={e => setUserType(e.target.value)}>
//                   <MenuItem value='user'>User</MenuItem>
//                   <MenuItem value='superAdmin'>SuperAdmin</MenuItem>
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
//               onChange={e => setDescription(e.target.value)}
//               InputLabelProps={{ className: 'text-gray-400' }} defaultValue={roleData?.description}
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
//                         {/* Group checkbox */}
//                         <Checkbox
//                           checked={groupedPermissions[group].every((permission: { id: number }) => selectedPermissions[group]?.includes(permission.id))}
//                           onChange={() => {
//                             const allSelected = groupedPermissions[group].every((permission: { id: number }) => selectedPermissions[group]?.includes(permission.id));                            setSelectedPermissions((prev: any) => ({
//                               ...prev,
//                               [group]: allSelected ? [] : groupedPermissions[group].map((p: { id: number }) => p.id)
//                             }));
//                           }}
//                           color='primary'
//                         />
//                         <Typography variant='body1'>{group}</Typography>
//                       </Box>
//                     </TableCell>
//                     <TableCell>
//                       <Box display='flex' flexWrap='wrap' alignItems='center'>
//                         {/* Individual permission checkboxes */}
//                         {groupedPermissions[group].map((permission: { id: number; permissionname: string }) => (
//                           <Box key={permission.id} display='flex' alignItems='center' marginRight={2}>
//                             <Checkbox
//                               checked={selectedPermissions[group]?.includes(permission.id) || false}
//                               onChange={() => handlePermissionChange(group, permission.id)}
//                               color='primary'
//                             />
//                             <Typography variant='body1' style={{ marginLeft: '8px' }}>
//                               {permission.permissionname.charAt(0).toUpperCase() + permission.permissionname.slice(1)}
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
//             <Button variant='contained' className='ml-4 bg-primary' onClick={handleSubmit}>
//               Save
//             </Button>
//           </Box>
//         </Box>
//       </Container>
//     </Dialog>
//   )
// }

// export default EditRoleInfo

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
  Button,
  Box,
  Dialog,
  Typography,
} from '@mui/material';

interface EditRoleProps {
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

const EditRoleInfo: React.FC<EditRoleProps> = ({ open, setOpen, roleData }) => {
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

  const handlePermissionChange = (group: string, permissionId: number) => {
    setSelectedPermissions(prev => {
      const groupPermissions = prev[group] || [];
      if (groupPermissions.includes(permissionId)) {
        return {
          ...prev,
          [group]: groupPermissions.filter(id => id !== permissionId),
        };
      } else {
        return {
          ...prev,
          [group]: [...groupPermissions, permissionId],
        };
      }
    });
  };

  const handleSubmit = () => {
    if (!name || !userType) {
      alert('Name and UserType are required fields.');
      return;
    }

    const permissionsToSubmit = Object.entries(selectedPermissions).map(([group, permissionIds]) => ({
      permission_group: group,
      permissions: permissionIds.map(permissionId => {
        const permission = roleData?.permissions
          ?.flatMap(g => g.permissions)
          ?.find(p => p.id === permissionId);
        return permission ? { permissionname: permission.name, id: permission.id } : null;
      }).filter((p): p is { permissionname: string; id: number } => p !== null),
    }));

    console.log('Updated Role Data:', { name, userType, description, permissions: permissionsToSubmit });
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <Container className="p-8 min-h-screen">
        <h1 className="text-2xl mb-6 text-primary">Edit Role</h1>
        <Box className="space-y-4">
          {/* Name and UserType */}
          <Box className="flex items-center space-x-4 mb-4">
            <Box className="w-1/2">
              <TextField
                label="Name *"
                placeholder="Enter Name"
                fullWidth
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </Box>
            <Box className="w-1/2">
              <FormControl fullWidth>
                <InputLabel>User Type</InputLabel>
                <Select value={userType} onChange={e => setUserType(e.target.value)}>
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
              placeholder="Enter description"
              multiline
              rows={4}
              fullWidth
              value={description}
              onChange={e => setDescription(e.target.value)}
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
                          onChange={() => {
                            const allSelected = permissions.every(p =>
                              selectedPermissions[permission_group]?.includes(p.id)
                            );
                            setSelectedPermissions(prev => ({
                              ...prev,
                              [permission_group]: allSelected ? [] : permissions.map(p => p.id),
                            }));
                          }}
                        />
                        <Typography>{permission_group}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {permissions.map(permission => (
                        <Box key={permission.id} display="flex" alignItems="center">
                          <Checkbox
                            checked={selectedPermissions[permission_group]?.includes(permission.id) || false}
                            onChange={() => handlePermissionChange(permission_group, permission.id)}
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

          {/* Buttons */}
          <Box display="flex" justifyContent="flex-end" mt={4}>
            <Button onClick={handleClose} variant="outlined">Cancel</Button>
            <Button onClick={handleSubmit} variant="contained" color="primary" style={{ marginLeft: 8 }}>
              Save
            </Button>
          </Box>
        </Box>
      </Container>
    </Dialog>
  );
};

export default EditRoleInfo;


