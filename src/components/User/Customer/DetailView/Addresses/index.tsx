import React, { useEffect } from 'react'
import './style.css'
import AddressCard from './AddressCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFileEdit,
  faPlus,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons'
import WrappingCard from '@/ui/WrappingCard'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/hooks/hooks'
import {
  deleteAddress,
  getAllAddresses,
} from '@/store/addresses/addressesSlice'
import LoadingBar from '@/ui/Loading/LoadingBar'

const Addresses = () => {
  const dispatch = useAppDispatch()
  const { addresses, loading } = useAppSelector((state) => state.address)
  console.log('addresses', addresses)
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getAllAddresses())
  }, [])

  const navigateHandler = () => {
    navigate('/customer/add-address')
  }
  const navigatEditeHandler = (addressID: string) => {
    navigate(`/customer/add-address/${addressID}`)
  }

  const handleAddressDeletion = async (addressID: string) => {
    try {
      await dispatch(deleteAddress(addressID))
    } catch (error) {
      console.log('error', error)
    }
  }

  // const addressess = [
  //   {
  //     address: 'Hamdi gashi',
  //     name: 'Bledon',
  //     surname: 'Ibishi',
  //     houseNr: 31,
  //     city: 'Vushtrri',
  //     country: 'Kosove',
  //     telephone: '045224091',
  //     email: 'bledonibishi1@gmail.com',
  //   },
  //   {
  //     address: 'Hamdi gashi',
  //     name: 'Bledon',
  //     surname: 'Ibishi',
  //     houseNr: 31,
  //     city: 'Vushtrri',
  //     country: 'Kosove',
  //     telephone: '045224091',
  //     email: 'bledonibishi1@gmail.com',
  //   },
  // ]
  return (
    <>
      <WrappingCard marginBtm="20px" padding="12px">
        <div className="d-flex align-items-center  justify-content-between account-details-container">
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
      <WrappingCard padding="12px">
        {loading ? (
          <LoadingBar height="40px" size={'40px'} />
        ) : addresses.length ? (
          <div className="address-container">
            {addresses.map((item, index) => (
              <AddressCard key={index}>
                <div className="d-flex">
                  <div className="col-md-10 text-sm ">
                    <p className="fw-bold">{item.address}</p>
                    <p>{item.name + ' ' + item.surname}</p>
                    {/* <p>Nr {item.houseNr}</p> */}
                    <p>{item.city + ', ' + item.country}</p>
                    <p>{item.telephone}</p>
                    <p>{item.email}</p>
                  </div>
                  <div className="col-md-2 d-flex">
                    <FontAwesomeIcon
                      icon={faFileEdit}
                      className="cursor-pointer"
                      onClick={() => navigatEditeHandler(item.id)}
                    />
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      className="cursor-pointer"
                      onClick={() => handleAddressDeletion(item.id)}
                    />
                  </div>
                </div>
              </AddressCard>
            ))}
          </div>
        ) : (
          <p className="text-center w-100">You dont have any address</p>
        )}
      </WrappingCard>
    </>
  )
}

export default Addresses
