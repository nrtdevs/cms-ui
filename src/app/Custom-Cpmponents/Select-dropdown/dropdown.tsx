import React from 'react'

import { Grid, Typography, FormControl, Select, MenuItem, FormHelperText } from '@mui/material'
import ArrowDropDown from '@mui/icons-material/ArrowDropDown'

interface DropdownProps {
  label?: string
  options: string[]
  selectedOption: string
  error?: boolean
  helperText?: string
  required?: boolean
  onSelect: (value: string) => void
  style?: React.CSSProperties
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  selectedOption,
  required = false,
  error = false,
  helperText = '',
  style,
  onSelect
}) => {
  return (
    <Grid item xs={12} sm={12}>
      <Typography className='mb-1 text-sm font-medium text-gray-700'>
        {label}
        {required && <span style={{ color: 'red', marginLeft: '4px' }}>*</span>}
      </Typography>
      <FormControl fullWidth required={required} error={error}>
        <Select
          value={selectedOption || ''}
          onChange={e => onSelect(e.target.value as string)}
          IconComponent={props => <ArrowDropDown {...props} sx={{ fontSize: 30 }} />}
          sx={{ height: '40px', '& .MuiInputBase-root': { height: '40px' } }}
          displayEmpty
          style={style}
        >
          <MenuItem value=''>
            <em>Select {label}</em>
          </MenuItem>
          {options.map(option => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
        {error && helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    </Grid>
  )
}

export default Dropdown
