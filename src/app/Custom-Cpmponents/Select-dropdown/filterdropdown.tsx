import React from 'react'

import { Grid, FormControl, Select, MenuItem, FormHelperText } from '@mui/material'
import ArrowDropDown from '@mui/icons-material/ArrowDropDown'

interface DropdownProps {
  label?: string
  options: string[]
  selectedOption: string
  error?: boolean
  helperText?: string
  required?: boolean
  onSelect: (value: string) => void
}

const FilterDropdown: React.FC<DropdownProps> = ({
  label,
  options,
  selectedOption,
  required = false,
  error = false,
  helperText = '',
  onSelect
}) => {
  return (
    <Grid item xs={12} sm={12}>
      <FormControl fullWidth required={required} error={error}>
        <Select
          value={selectedOption || ''}
          onChange={e => onSelect(e.target.value as string)}
          IconComponent={props => <ArrowDropDown {...props} sx={{ fontSize: 30 }} />}
          sx={{ height: '40px', '& .MuiInputBase-root': { height: '40px' } }}
          displayEmpty
        >
          <MenuItem value=''>
            <em>All {label}</em>
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

export default FilterDropdown
