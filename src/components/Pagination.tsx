import React from 'react'
import { PaginationContainer, PageButton } from './PaginationSyles'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (pageNumber: number) => void
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  return (
    <PaginationContainer>
      <PageButton $isActive={false} onClick={handlePrevPage} disabled={currentPage === 1}>
        Previous
      </PageButton>
      <span>{currentPage} / {totalPages}</span>
      <PageButton $isActive={false} onClick={handleNextPage} disabled={currentPage === totalPages}>
        Next
      </PageButton>
    </PaginationContainer>
  )
}

export default Pagination