import React, { ReactNode } from 'react'

const WrappingCard = ({
  children,
  marginBtm,
  padding,
}: {
  children: ReactNode
  marginBtm?: string
  padding: string
}) => {
  return (
    <div
      style={{
        padding: `${padding}`,
        background: 'rgb(255, 255, 255)',
        marginBottom: `${marginBtm}`,
      }}
      className="rounded shadow-md bg-white shadow-md"
    >
      {children}
    </div>
  )
}

export default WrappingCard
