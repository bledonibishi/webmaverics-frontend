import { Address } from '@/helpers/types'
import React from 'react'

type InfoTypes = {
  selectedAddress: Address | undefined
  paymentMethod: string
}

const BillingInfo: React.FC<InfoTypes> = ({
  selectedAddress,
  paymentMethod,
}) => {
  return (
    <div className="billing-info-wrap pb-3 last:pb-0">
      <div className="billing-info">
        <div className="title">
          <span className="d-flex pb-3 md:pb-4 text-sm text-gray-700 font-medium">
            Adresa e faturimit:
          </span>
        </div>
        <ul className="info-list text-sm text-gray-700">
          <li className="name capitalize truncate">
            <span className="font-medium">Name:</span>
            {selectedAddress?.name}
          </li>
          <li className="email truncate">
            <span className="font-medium">Email:</span>
            {selectedAddress?.email}
          </li>
          <li className="phone truncate">
            <span className="font-medium">Telephone:</span>
            {selectedAddress?.telephone}
          </li>
          <li className="address1 truncate ">
            <span className="font-medium">Address:</span>
            {selectedAddress?.address}
          </li>
          <li className="city-state-zip">
            <span className="font-medium">City:</span>
            {selectedAddress?.city}
          </li>
          <li className="country">
            <span className="font-medium">Country:</span>
            {selectedAddress?.country}
          </li>
          <li className="country">
            <span className="font-medium">Payment method:</span>
            {paymentMethod}
          </li>
        </ul>
      </div>
    </div>
  )
}

export default BillingInfo
