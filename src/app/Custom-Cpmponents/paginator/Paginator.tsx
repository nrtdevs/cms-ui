'use client'

import React from 'react'

import Pagination from '@mui/material/Pagination'
import PaginationItem from '@mui/material/PaginationItem'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { styled } from '@mui/material/styles'

const StyledPaginationItem = styled(PaginationItem)(({ theme }) => ({
  borderRadius: '5px',
  padding: '4px 8px',
  fontSize: '0.9rem',
  boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.3)',
  '&.Mui-selected': {
    backgroundColor: '#F3FFE5',
    color: theme.palette.common.black,
    fontWeight: 'bold'
  },
  '&:hover': {
    backgroundColor: '#CBFF8C'
  },
  '&:focus': {
    outline: 'none',
    backgroundColor: '#CBFF8C'
  }
}))

const PreviousButton = () => (
  <div style={{ display: 'flex', alignItems: 'center', borderRadius: '20px' }}>
    <ArrowBackIcon style={{ marginRight: '4px' }} />
    Previous
  </div>
)

const NextButton = () => (
  <div style={{ display: 'flex', alignItems: 'center', borderRadius: '20px' }}>
    Next
    <ArrowForwardIcon style={{ marginLeft: '4px' }} />
  </div>
)

interface PaginatorProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const Paginator: React.FC<PaginatorProps> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <Pagination
      count={totalPages}
      page={currentPage}
      onChange={(_, page) => onPageChange(page)}
      renderItem={item => (
        <StyledPaginationItem
          slots={{
            previous: PreviousButton,
            next: NextButton
          }}
          {...item}
        />
      )}
    />
  )
}

export default Paginator
