import { Address } from '@/helpers/types'
import React from 'react'

type InfoTypes = {
  transportAddress: Address | undefined
  shippingMethod: string
}

const ShippingInfo: React.FC<InfoTypes> = ({
  transportAddress,
  shippingMethod,
}) => {
  return (
    <div className="shipping-info-wrap pb-3 last:pb-0">
      <div className="shipping-info">
        <div className="title">
          <span className="d-flex  pb-3 md:pb-4 text-sm text-gray-700 font-medium">
            Adresa e transportit:
          </span>
        </div>
        <ul className="info-list text-sm text-gray-700">
          <li className="name truncate capitalize">
            <span className="font-medium">Name:</span>
            {transportAddress?.name}
          </li>
          <li className="email truncate">
            <span className="font-medium">Email:</span>
            {transportAddress?.email}
          </li>
          <li className="phone truncate">
            <span className="font-medium">Telephone:</span>
            {transportAddress?.telephone}
          </li>
          <li className="address1 truncate">
            <span className="font-medium">Address:</span>
            {transportAddress?.address}
          </li>
          <li className="city-state-zip">
            <span className="font-medium">City:</span>
            {transportAddress?.city}
          </li>
          <li className="country">
            <span className="font-medium">Country:</span>
            {transportAddress?.country}
          </li>
          <li className="country">
            <span className="font-medium">Transport method:</span>
            {shippingMethod}
          </li>
        </ul>
      </div>
    </div>
  )
}

export default ShippingInfo
