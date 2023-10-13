import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const AddressesHeader = () => {
  const navigate = useNavigate()

  const navigateHandler = () => {
    navigate('/customer/add-address')
  }

  return (
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
  )
}

export default AddressesHeader
