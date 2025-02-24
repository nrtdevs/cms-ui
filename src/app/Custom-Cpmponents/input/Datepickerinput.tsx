import React from 'react'

import { Grid, Typography, TextField } from '@mui/material'

interface DatepickerInputProps {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  required?: boolean
  error?: boolean
  helperText?: string
  type?: 'date' // You can extend this as needed
}

const DatePickerInput = React.forwardRef<HTMLInputElement, DatepickerInputProps>(
  (
    { label, value, onChange, placeholder = '', required = false, error = false, helperText = '', type = 'date' },
    ref
  ) => {
    return (
      <Grid item xs={12} sm={12}>
        <Typography className='mb-1 text-sm font-medium text-700'>
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
          helperText={helperText}
          type={type}
          variant='outlined'
          sx={{
            height: '40px',
            '& .MuiInputBase-root': { height: '40px' } // Customize the input field height
          }}
          inputRef={ref} // Assign the ref to the input element
        />
      </Grid>
    )
  }
)

export default DatePickerInput
