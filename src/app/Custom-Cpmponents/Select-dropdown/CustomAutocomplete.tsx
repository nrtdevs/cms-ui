import React from 'react'

import { Grid, Typography, Autocomplete, TextField } from '@mui/material'

interface InputProps {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  required?: boolean
  error?: boolean
  helperText?: string
  disabled?: boolean
  options: string[] // Pass options for autocomplete suggestions
}

const CustomAutocomplete = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      value,
      onChange,
      placeholder = '',
      required = false,
      error = false,
      helperText = '',
      options = [],
      disabled = false
    },
    ref
  ) => {
    return (
      <Grid item xs={12} sm={12}>
        <Typography className='mb-1 text-sm font-medium text-700'>
          {label}
          {required && <span style={{ color: 'red', marginLeft: '4px' }}>*</span>}
        </Typography>
        <Autocomplete
          value={value}
          onChange={(_, newValue) => onChange(newValue || '')} // Handles change
          freeSolo // Allows free input of any value
          options={options} // Options for suggestions
          renderInput={params => (
            <TextField
              {...params}
              placeholder={placeholder}
              fullWidth
              required={required}
              error={error}
              helperText={error ? helperText : ''}
              variant='outlined'
              sx={{
                height: '40px',
                '& .MuiInputBase-root': { height: '40px' }
              }}
              inputRef={ref}
              disabled={disabled}
            />
          )}
        />
      </Grid>
    )
  }
)

export default CustomAutocomplete
