import React, { useState } from 'react'
import { Pagination } from '@mui/material'

type PaginationProps = {
  totalItems: number
  itemsPerPage: number
  onPageChange: (page: number) => void
}

const PaginationComponent: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const [currentPage, setCurrentPage] = useState(1)

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value)
    onPageChange(value)
  }

  return (
    <Pagination
      count={Math.ceil(totalItems / itemsPerPage)}
      page={currentPage}
      onChange={handlePageChange}
      color="primary"
    />
  )
}

export default PaginationComponent
