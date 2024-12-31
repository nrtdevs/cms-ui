import React from 'react'

import { Grid, Typography, TextField } from '@mui/material'

interface InputProps {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  required?: boolean
  error?: boolean
  helperText?: string
  type?: 'text' | 'password' | 'email' | 'number' // You can extend this as needed
  rows?: number // To specify the number of rows for multiline input
}

const CustomDescriptionInput: React.FC<InputProps> = ({
  label,
  value,
  onChange,
  placeholder = '',
  required = false,
  error = false,
  helperText = '',
  type = 'text',
  rows = 2 // Default rows for description input
}) => {
  return (
    <Grid item xs={12} sm={12}>
      <Typography className='mb-1 text-sm font-medium text-gray-700'>
        {label}
        {required && <span style={{ color: 'red', marginLeft: '4px' }}>*</span>}
      </Typography>
      <TextField
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        fullWidth
        required={required}
        error={error}
        helperText={error ? helperText : ''}
        type={type}
        variant='outlined'
        multiline // Allows multiple lines
        rows={rows} // Specifies the number of visible rows for the description input
        sx={{ '& .MuiInputBase-root': { minHeight: '60px' } }} // Adjust height as needed
      />
    </Grid>
  )
}

export default CustomDescriptionInput
