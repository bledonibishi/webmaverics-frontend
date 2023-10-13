import React, { ReactNode } from 'react'

const ProductWrapper: React.FC<{ children: ReactNode; className: string }> = ({
  children,
  className,
}) => {
  return (
    <div
      className={`product-essential bg-white shadow-md rounded ${className} md:p-6 mb-6 mb-4`}
    >
      {children}
    </div>
  )
}

export default ProductWrapper
