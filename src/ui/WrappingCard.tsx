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
        // boxShadow:
        // ' ${var(--tw-ring-offset-shadow, 0 0 #0000)}, var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)',
        marginBottom: `${marginBtm}`,
      }}
      className="rounded shadow-md bg-white"
    >
      {children}
    </div>
  )
}

export default WrappingCard
