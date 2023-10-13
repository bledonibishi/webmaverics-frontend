import React, { ReactNode } from 'react'
import './style.css'

const AddressCard = ({ children }: { children: ReactNode }) => {
  return <div className="address-card">{children}</div>
}

export default AddressCard
