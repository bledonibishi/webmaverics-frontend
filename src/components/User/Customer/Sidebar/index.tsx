import React, { Dispatch, SetStateAction } from 'react'
import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHeart,
  faLocation,
  faLocationPin,
  faLock,
  faReorder,
  faRing,
  faRotateBack,
  faStar,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

type sidebarProps = {
  onLinkClick: (link: string) => void
  activeLink: string
}

const Sidebar = ({ onLinkClick, activeLink }: sidebarProps) => {
  return (
    <div className="costumer-sidebar">
      <div className="costumer-sidebar__header">
        <p className="text-lg m-0">Tung bledon</p>
        <p className="text-sm pb-3">Faleminderit që je pjesë e Gjirafa50</p>
      </div>
      <div className="costumer-sidebar__body">
        <ul className="list flex-col gap-2 p-0 m-0">
          <li>
            <Link
              to={`/customer/info`}
              onClick={() => onLinkClick('info')}
              className={`customer-nav anchor-links link-hover-effect group customer-info ${
                activeLink === 'info' ? 'active-link-effect text-primary' : ''
              }`}
            >
              <FontAwesomeIcon icon={faUser} />
              Të dhënat personale
            </Link>
          </li>
          <li>
            <Link
              to="/customer/addresses"
              onClick={() => onLinkClick('addresses')}
              className={`customer-nav anchor-links link-hover-effect group customer-info ${
                activeLink === 'addresses' ||
                activeLink === 'add-address' ||
                activeLink === 'edit-address'
                  ? 'active-link-effect text-primary'
                  : ''
              }`}
            >
              <FontAwesomeIcon icon={faLocationPin} />
              Adresat
            </Link>
          </li>
          <li>
            <Link
              to="/customer/orders"
              onClick={() => onLinkClick('orders')}
              className={`customer-nav anchor-links link-hover-effect group customer-info ${
                activeLink === 'orders' || activeLink === 'orderdetails'
                  ? 'active-link-effect text-primary'
                  : ''
              }`}
            >
              <FontAwesomeIcon icon={faReorder} />
              Porosite
            </Link>
          </li>
          <li>
            <Link
              to="/customer/wishlist"
              onClick={() => onLinkClick('wishlist')}
              className={`customer-nav anchor-links link-hover-effect group customer-info ${
                activeLink === 'wishlist'
                  ? 'active-link-effect text-primary'
                  : ''
              }`}
            >
              <FontAwesomeIcon icon={faHeart} />
              Lista e deshirave
            </Link>
          </li>
          <li>
            <a
              href="/customer/return-requests"
              onClick={() => onLinkClick('return-requests')}
              className={`customer-nav anchor-links link-hover-effect group customer-info ${
                activeLink === 'return-requests'
                  ? 'active-link-effect text-primary'
                  : ''
              }`}
            >
              <FontAwesomeIcon icon={faRotateBack} />
              Kerkesat per kthim
            </a>
          </li>
          <li>
            <a
              href="/customer/returned-products"
              onClick={() => onLinkClick('returned-products')}
              className={`customer-nav anchor-links link-hover-effect group customer-info ${
                activeLink === 'returned-products'
                  ? 'active-link-effect text-primary'
                  : ''
              }`}
            >
              <FontAwesomeIcon icon={faRing} />
              Produktet e kthyera ne stok
            </a>
          </li>
          <li>
            <a
              href="/"
              className={`customer-nav anchor-links link-hover-effect group customer-info ${
                activeLink === 'changePassword'
                  ? 'active-link-effect text-primary'
                  : ''
              }`}
            >
              <FontAwesomeIcon icon={faLock} />
              Ndrysho fjalekalimin
            </a>
          </li>
          <li>
            <a
              href="/customer/productreviews"
              onClick={() => onLinkClick('productreviews')}
              className={`customer-nav anchor-links link-hover-effect group customer-info ${
                activeLink === 'productreviews'
                  ? 'active-link-effect text-primary'
                  : ''
              }`}
            >
              <FontAwesomeIcon icon={faStar} />
              Vleresimet
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
