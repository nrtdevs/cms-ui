import React from 'react'

import { Grid, Typography, Button } from '@mui/material'

interface FileUploadProps {
  label: string
  onChange: (file: File | null) => void
  fileName?: string // Display the name of the uploaded file
  required?: boolean
  error?: boolean
  helperText?: string
}

const CustomFileUpload: React.FC<FileUploadProps> = ({
  label,
  onChange,
  fileName = '',
  required = false,
  error = false,
  helperText = ''
}) => {
  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null

    onChange(file)
  }

  return (
    <Grid item xs={12} sm={12}>
      <Typography className='mb-1 text-sm font-medium text-gray-700'>
        {label}
        {required && <span style={{ color: 'red', marginLeft: '4px' }}>*</span>}
      </Typography>
      <div>
        <Button variant='outlined' component='label' color={error ? 'error' : 'primary'} sx={{ marginBottom: '8px' }}>
          Choose File
          {/* Hidden file input */}
          <input
            type='file'
            onChange={handleFileChange}
            hidden
            accept='image/*, .pdf, .docx, .xlsx' // Example of file types allowed (can be customized)
          />
        </Button>
        {fileName && (
          <Typography variant='body2' color='primary'>
            {fileName}
          </Typography>
        )}
      </div>
      {error && (
        <Typography variant='body2' color='error' sx={{ marginTop: '4px' }}>
          {helperText}
        </Typography>
      )}
    </Grid>
  )
}

export default CustomFileUpload
