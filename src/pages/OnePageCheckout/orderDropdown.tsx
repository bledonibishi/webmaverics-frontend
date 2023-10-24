import React, { FC, ReactNode } from 'react'
import './style.css'

type OrderDropdownPropTypes = {
  number: number
  title: string
  isChangable: boolean
  children: ReactNode
  isActive: boolean
  onChange: (step: string) => void
  urlLink: string
}

const OrderDropdown: FC<OrderDropdownPropTypes> = ({
  number,
  urlLink,
  title,
  isChangable,
  children,
  isActive,
  onChange,
}) => {
  return (
    <li
      id="opc-billing"
      className={`tab-section allow bg-white ${
        number === 1 ? 'mt-0' : ''
      } shadow-md ${isActive ? 'active' : ''}`}
    >
      <div className="step-title d-flex justify-content-between p-3 border-b border-gray-300 text-sm">
        <div className="d-flex items-center">
          <span className="number">{number}</span>
          <h6 className="title ml-4 mb-0">{title}</h6>
        </div>
        <p className="back-link">
          {isChangable && (
            <a
              href={urlLink}
              className={`text-primary font-medium m-2 p-2 editbutton ${
                isChangable ? '' : 'hidden'
              }`}
              //   onClick={(e) => {
              //     e.preventDefault()
              //     onChange(urlLink)
              //   }}
            >
              Change
            </a>
          )}
        </p>
      </div>
      {isActive && (
        <div id="checkout-step-billing" className="step a-item p-4">
          {children}
        </div>
      )}
    </li>
  )
}

export default OrderDropdown
