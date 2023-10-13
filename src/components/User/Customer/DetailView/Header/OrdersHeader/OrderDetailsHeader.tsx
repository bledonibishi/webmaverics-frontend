import React from 'react'

const OrderDetailsHeader = () => {
  const order = {
    id: '212527',
    date: '12.03.2022',
    shipmentDate: '13 mars - 14 mars',
    image: 'test.png',
    price: 19.5,
    quantity: 1,
    transport: 'Free transport',
    total: 39.0,
    discount: 20.0,
    tax: 2.97,
    gjirafaFlex: 1.5,
  }

  const transportMode = {
    status: 'submitted',
    mode: 'gjirafaSwift',
  }

  const paymentMode = {
    status: 'payed',
    mode: 'Paguaj me para në dorë',
  }

  const transportAddress = {
    name: 'Bledon',
    lastname: 'Ibishi',
    address: 'Hamdi gashi',
    city: 'vushtrri',
    country: 'kosove',
    email: 'bledonibishi1@gmail.com',
    telephone: '045223091',
  }
  const billingAddress = {
    name: 'Bledon',
    lastname: 'Ibishi',
    address: 'Hamdi gashi',
    city: 'vushtrri',
    country: 'kosove',
    email: 'bledonibishi1@gmail.com',
    telephone: '045223091',
  }

  const commentAboutOrder = {
    comment: 'bledonibishi',
  }

  return (
    <div className="d-flex align-items-center justify-content-between">
      <p>Porosia:#</p>
    </div>
  )
}

export default OrderDetailsHeader
