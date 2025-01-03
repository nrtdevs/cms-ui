import React, { useState, useRef, useEffect } from 'react'

import { Grid, Typography, Autocomplete, TextField, Chip } from '@mui/material'

interface TagInputProps {
  label: string
  tags: string[]
  onChange: (tags: string[]) => void
  options: string[]
  placeholder?: string
  required?: boolean
  error?: boolean
  helperText?: string
}

const CustomTagInput: React.FC<TagInputProps> = ({
  label,
  tags,
  onChange,
  options,
  placeholder = '',
  required = false,
  error = false,
  helperText = ''
}) => {
  const [inputValue, setInputValue] = useState('')
  const textFieldRef = useRef<HTMLInputElement | null>(null)

  const handleAddTag = (value: string) => {
    if (value && !tags.includes(value)) {
      onChange([...tags, value])
    }

    setInputValue('')
  }

  const handleDeleteTag = (tagToDelete: string) => {
    onChange(tags.filter(tag => tag !== tagToDelete))
  }

  const calculateHeight = () => {
    const baseHeight = 0
    const tagHeight = 5
    const containerWidth = textFieldRef.current?.offsetWidth
    const tagCount = tags.length

    const tagsPerRow = containerWidth ? Math.floor(containerWidth / (tagHeight + 10)) : 1
    const rows = Math.ceil(tagCount / tagsPerRow)

    return baseHeight + rows * tagHeight
  }

  useEffect(() => {
    const resizeHeight = calculateHeight()

    if (textFieldRef.current) {
      textFieldRef.current.style.height = `${resizeHeight}px`
    }
  }, [tags])

  return (
    <Grid item xs={12} sm={12}>
      <Typography className='mb-1 text-sm font-medium text-gray-700'>
        {label}
        {required && <span style={{ color: 'red', marginLeft: '4px' }}>*</span>}
      </Typography>

      <Autocomplete
        freeSolo
        multiple
        options={options}
        value={tags}
        onChange={(event, newValue) => {
          if (typeof newValue[newValue.length - 1] === 'string') {
            handleAddTag(newValue[newValue.length - 1] as string)
          }
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
        renderInput={params => (
          <TextField
            {...params}
            placeholder={placeholder}
            error={error}
            helperText={error ? helperText : ''}
            variant='outlined'
            inputRef={textFieldRef}
            sx={{
              '& .MuiInputBase-root': {
                display: 'flex',
                flexWrap: 'wrap',
                padding: '2px',
                minHeight: '40px'
              },
              '& .MuiOutlinedInput-root': {
                alignItems: 'center'
              },
              '& .MuiAutocomplete-inputRoot': {
                padding: '2px 8px'
              }
            }}
            onKeyDown={event => {
              if (event.key === 'Enter') {
                event.preventDefault()
                handleAddTag(inputValue.trim())
              }
            }}
          />
        )}
        renderTags={value =>
          value.map((option) => (
            <Chip
              key={option} // Directly using the option as the key
              label={option}
              onDelete={() => handleDeleteTag(option)}
              sx={{
                backgroundColor: 'primary.main',
                color: 'white',
                height: '25px',
                margin: '2px'
              }}
            />
          ))
        }
        onBlur={() => {
          if (inputValue.trim() && !tags.includes(inputValue.trim())) {
            handleAddTag(inputValue.trim())
          }
        }}
      />
    </Grid>
  )
}

export default CustomTagInput
