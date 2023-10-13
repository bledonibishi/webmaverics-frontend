import React from 'react'
import './style.css'
import AddressCard from './AddressCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFileEdit,
  faPlus,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons'
import WrappingCard from '@/pages/Costumer/WrappingCard'
import { useNavigate } from 'react-router-dom'

const Addresses = () => {
  const navigate = useNavigate()

  const navigateHandler = () => {
    navigate('/customer/add-address')
  }
  const addressess = [
    {
      address: 'Hamdi gashi',
      name: 'Bledon',
      surname: 'Ibishi',
      houseNr: 31,
      city: 'Vushtrri',
      country: 'Kosove',
      telephone: '045224091',
      email: 'bledonibishi1@gmail.com',
    },
    {
      address: 'Hamdi gashi',
      name: 'Bledon',
      surname: 'Ibishi',
      houseNr: 31,
      city: 'Vushtrri',
      country: 'Kosove',
      telephone: '045224091',
      email: 'bledonibishi1@gmail.com',
    },
  ]
  return (
    <>
      <WrappingCard marginBtm="20px">
        <div className="d-flex align-items-center justify-content-between account-details-container">
          <div className="text-base font-medium">Adresat</div>
          <button
            type="button"
            className="add-address-button text-primary text-xs font-semibold"
            onClick={navigateHandler}
          >
            <FontAwesomeIcon icon={faPlus} className="pr-1" />
            Shto një të re
          </button>
        </div>
      </WrappingCard>
      <WrappingCard>
        <div className="address-container">
          {addressess.map((item) => (
            <AddressCard>
              <div className="d-flex">
                <div className="col-md-10 text-sm ">
                  <p className="fw-bold">{item.address}</p>
                  <p>{item.name + ' ' + item.surname}</p>
                  <p>Nr {item.houseNr}</p>
                  <p>{item.city + ', ' + item.country}</p>
                  <p>{item.telephone}</p>
                  <p>{item.email}</p>
                </div>
                <div className="col-md-2 d-flex">
                  <FontAwesomeIcon icon={faFileEdit} />
                  <FontAwesomeIcon icon={faTrashCan} />
                </div>
              </div>
            </AddressCard>
          ))}
        </div>
      </WrappingCard>
    </>
  )
}

export default Addresses
