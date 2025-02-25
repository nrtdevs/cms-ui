'use client';

import React, { useState, useEffect } from 'react';
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Box,
  Typography,
  Dialog,
  TableHead,
  Button,
  Checkbox
} from '@mui/material';

type Permission = {
  permissionname: string;
  permission_group: string;
  id: number;
};

interface ViewRoleProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  roleData?: {
    name: string;
    userType: string;
    description: string;
    permissions: { permission_group: string; permissions: { id: number; permissionname: string }[] }[];
  };
}

type SelectedPermissions = {
  [key: string]: number[];
};

const ViewRoleInfo: React.FC<ViewRoleProps> = ({ open, setOpen, roleData }) => {
  const [userType, setUserType] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [selectedPermissions, setSelectedPermissions] = useState<SelectedPermissions>({});

  useEffect(() => {
    if (roleData) {
      setName(roleData.name);
      setUserType(roleData.userType);
      setDescription(roleData.description);

      const newSelectedPermissions: SelectedPermissions = {};
      roleData.permissions.forEach(group => {
        newSelectedPermissions[group.permission_group] = group.permissions.map(p => p.id);
      });
      setSelectedPermissions(newSelectedPermissions);
    }
  }, [roleData]);

  const handleClose = () => {
    setOpen(false);
  };

  const permissions: Permission[] = [
    { id: 1, permissionname: 'read', permission_group: 'Dashboard' },
    { id: 2, permissionname: 'create', permission_group: 'User' },
    { id: 3, permissionname: 'read', permission_group: 'User' },
    { id: 4, permissionname: 'update', permission_group: 'User' },
    { id: 5, permissionname: 'approve', permission_group: 'User' },
    { id: 6, permissionname: 'block', permission_group: 'User' },
    { id: 7, permissionname: 'create', permission_group: 'Bidding' },
    { id: 8, permissionname: 'read', permission_group: 'Bidding' },
    { id: 9, permissionname: 'update', permission_group: 'Bidding' },
    { id: 10, permissionname: 'approve', permission_group: 'Bidding' },
    { id: 74, permissionname: 'block', permission_group: 'Bidding' },
    { id: 30, permissionname: 'create', permission_group: 'Reporting' },
    { id: 59, permissionname: 'edit', permission_group: 'Reporting' },
    { id: 24, permissionname: 'delete', permission_group: 'Reporting' },
    { id: 30, permissionname: 'create', permission_group: 'Content' },
    { id: 59, permissionname: 'edit', permission_group: 'Content' },
    { id: 24, permissionname: 'delete', permission_group: 'Content' },
    { id: 30, permissionname: 'create', permission_group: 'Settings' },
    { id: 59, permissionname: 'edit', permission_group: 'Settings' },
    { id: 24, permissionname: 'delete', permission_group: 'Settings' },
    { id: 30, permissionname: 'create', permission_group: 'Notifications' },
    { id: 59, permissionname: 'edit', permission_group: 'Notifications' },
    { id: 24, permissionname: 'delete', permission_group: 'Notifications' },
  ];

  const groupedPermissions = permissions.reduce(
    (acc: { [key: string]: Permission[] }, { permissionname, permission_group, id }) => {
      if (!acc[permission_group]) {
        acc[permission_group] = [];
      }
      acc[permission_group].push({ permissionname, permission_group, id });
      return acc;
    },
    {}
  );

  const isPermissionSelected = (group: string, permissionId: number) => {
    return selectedPermissions[group]?.includes(permissionId) || false;
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth >
      <Container className="p-8 min-h-screen">
        <h1 className="text-2xl mb-6 text-primary">{roleData ? 'View Role' : 'View Role'}</h1>
        <Box className="space-y-4">
          {/* Name and UserType displayed using Typography */}
          <Box className="flex items-center space-x-4 mb-4">
            <Box className="w-1/2">
              <Typography variant="h6" className="text-primary">
                <strong>Name: </strong>
              </Typography>
              {name}
            </Box>
            <Box className="w-1/2">
              <Typography variant="h6" className="text-primary">
                <strong>User Type: </strong>
              </Typography>
              {userType === 'superadmin' ? 'Super Admin' : 'User'}
            </Box>
          </Box>

          {/* Description displayed using Typography */}
          <Box className="mb-4">
            <Typography variant="h6" className="text-primary">
              <strong>Description: </strong>
            </Typography>
            {description}
          </Box>

          {/* Permissions Table */}
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className="center text-primary items-right">
                    <strong>Permission Group</strong>
                  </TableCell>
                  <TableCell className="center text-primary items-right">
                    <strong>Permissions</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(groupedPermissions).map(group => (
                  <TableRow key={group}>
                    <TableCell>
                      <Box display="flex" alignItems="center" marginRight={2}>
                        {group}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box display="flex" flexWrap="wrap" alignItems="center">
                        {groupedPermissions[group].map(permission => (
                          <Box key={permission.id} display="flex" alignItems="center" marginRight={2}>
                            <Checkbox
                              checked={isPermissionSelected(group, permission.id)}
                              disabled
                              color="primary"
                            />
                            <Typography variant="body1" style={{ marginLeft: '8px' }}>
                              {permission.permissionname.charAt(0).toUpperCase() + permission.permissionname.slice(1)}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box className="flex justify-end mt-4">
            <Button variant="outlined" className="border-gray-500 text-gray-300" onClick={handleClose}>
              Close
            </Button>
          </Box>
        </Box>
      </Container>
    </Dialog>
  );
};

export default ViewRoleInfo;
