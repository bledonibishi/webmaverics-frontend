import React, { ReactNode } from 'react'

const WrappingCard = ({
  children,
  marginBtm,
}: {
  children: ReactNode
  marginBtm?: string
}) => {
  return (
    <div
      style={{
        padding: '12px',
        background: '#fff',
        boxShadow: ' 2px 0px 6px rgba(0, 0, 0, 0.1)',
        marginBottom: `${marginBtm}`,
      }}
      className="rounded"
    >
      {children}
    </div>
  )
}

export default WrappingCard
