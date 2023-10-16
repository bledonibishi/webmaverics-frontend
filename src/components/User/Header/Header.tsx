import React, { ReactNode, useState } from 'react'
// import './header.css'
import Navigation from '../Navbar/Navigation'
import SubNavigation from '../Navbar/SubNavigation'
import Logo from '@/assets/images/gjirafa50.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHeart,
  faSearch,
  faShoppingCart,
  faSignIn,
} from '@fortawesome/free-solid-svg-icons'

const Header = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false)

  const handleDropdownVisibility = (isVisible: boolean) => {
    setIsDropdownVisible(isVisible)
  }

  const handleLiMouseEnter = () => {
    setIsDropdownVisible(true)
  }

  const handleLiMouseLeave = () => {
    setIsDropdownVisible(false)
  }

  const handleDropdownMouseEnter = () => {
    // You may not need to do anything here, but you can add custom logic if necessary
  }

  const handleDropdownMouseLeave = () => {
    setIsDropdownVisible(false)
  }
  return (
    // <nav className="w-100 position-relative">
    <>
      <Navigation />
      <SubNavigation
        handleLiMouseLeave={handleLiMouseLeave}
        handleDropdownMouseLeave={handleDropdownMouseLeave}
        handleDropdownVisibility={handleDropdownVisibility}
        handleLiMouseEnter={handleLiMouseEnter}
        handleDropdownMouseEnter={handleDropdownMouseEnter}
      />
      {isDropdownVisible && <div className="overlay"></div>}
    </>
    // </nav>
  )
}

export default Header
