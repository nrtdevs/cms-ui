import React from 'react'

import { Grid, TextField, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

interface InputProps {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  required?: boolean
  error?: boolean
  helperText?: string
  type?: 'text' | 'number' | 'email' | 'password' // Extended type options
  style?: React.CSSProperties
}

const SearchFilter: React.FC<InputProps> = ({
  label,
  value,
  onChange,
  placeholder = '',
  error = false,
  helperText = '',
  type = 'text',
  style
}) => {
  const inputId = `search-filter-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`

  return (
    <Grid item xs={12} sm={12}>
      <TextField
        id={inputId}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        fullWidth
        error={error}
        helperText={error ? helperText : ''}
        type={type}
        variant='outlined'
        InputProps={{
          startAdornment: (
            <InputAdornment position='end'>
              <SearchIcon />
            </InputAdornment>
          )
        }}
        sx={{
          '& .MuiInputBase-root': { height: '40px' },
          '& .MuiInputBase-input': { padding: '8px 30px' },
          ...style // Apply the passed `style` here
        }}
      />
    </Grid>
  )
}

export default SearchFilter
