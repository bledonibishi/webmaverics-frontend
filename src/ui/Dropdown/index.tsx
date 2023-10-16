import React, { ReactNode, useState } from 'react'
import {
  Menu,
  MenuItem,
  MenuButton,
  MenuDirection,
  MenuState,
  MenuAlign,
} from '@szhsin/react-menu'
import '@szhsin/react-menu/dist/index.css'
import '@szhsin/react-menu/dist/transitions/slide.css'
import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { CartItemProduct } from '@/helpers/types'
import { useDeleteCartProductMutation } from '@/Cart/store/cartAPI'
import { useNavigate } from 'react-router-dom'

type DropdownProps = {
  children?: ReactNode
  buttonContent?: string
  icon?: React.ReactNode
  cartItemProducts?: CartItemProduct[] | undefined
  menuItems?: string[]
  placement?: string
  logout?: () => void
  direction: MenuDirection | undefined
  menuClassName: string
  align: MenuAlign | undefined
  handleDeleteCartProduct: (productId: number | string) => void
}

const CustomDropdown = ({
  icon,
  cartItemProducts,
  menuItems,
  buttonContent,
  logout,
  direction,
  menuClassName,
  align,
  handleDeleteCartProduct,
}: DropdownProps) => {
  const navigate = useNavigate()
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null)

  const cartItemClassName = ({ hover }: any) =>
    hover ? 'my-menuCartItem-hover' : 'my-menuCartItem'

  const menuItemClassName = ({ hover }: any) =>
    hover ? 'my-menuitem-hover' : 'my-menuitem'

  // const handleDeleteCartProduct = (productId: number | string) => {
  //   deleteProduct(productId)
  // }
  const gotoCart = () => {
    navigate('/cart')
  }

  return (
    <Menu
      menuButton={
        <span className="d-flex align-items-center cursor-pointer nav-btn">
          {buttonContent}
          {icon}
        </span>
      }
      menuClassName={menuClassName}
      transition
      align={align}
      direction={direction}

      // gap={direction === 'left' ? -40 : 0}
      // shift={direction === 'left' ? 35 : 0}
    >
      {cartItemProducts?.length ? (
        <div className="w-100">
          <div style={{ borderBottom: '1px solid #ccc' }}>
            <small className="header-productItem">
              You have {cartItemProducts.length} product(s) in your cart
            </small>
          </div>
          {cartItemProducts?.map((item, index) => (
            <MenuItem key={index} className={cartItemClassName}>
              <div className="d-flex justify-content-between align-items-center w-100">
                <div className="product-image col-3 position-relative d-block">
                  <img
                    src={item.product.imageCover}
                    alt="IMG"
                    // className="w-100 h-100"
                  />
                </div>
                <div
                  className="col-8 pr-1"
                  style={{ display: 'flex', flexDirection: 'column' }}
                >
                  <h6>{item.product.title}</h6>
                  <small>Qmimi per njesi: {item.product.price}€</small>
                  <small>Sasia: {item.quantity}</small>
                </div>
                <div className="cartItem_action">
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    onClick={() => handleDeleteCartProduct(item.product.id)}
                  />{' '}
                </div>
              </div>
            </MenuItem>
          ))}
          <div className="text-gray-500 d-flex w-100 justify-content-center align-items-center">
            Sasia:
            <p className="text-gray-700 ">
              {cartItemProducts.map((item) => item.price)}
            </p>
          </div>
          <div className="buttons d-flex justify-content-center px-4 pb-4">
            <input
              type="button"
              value="Shko në shportë"
              className="cart-button w-100 btn btn-primary btn-primary-hover text-sm"
              onClick={gotoCart}
            />
          </div>
        </div>
      ) : (
        menuItems?.map((item, index) => (
          <MenuItem className={menuItemClassName} onClick={logout} key={index}>
            {item}
          </MenuItem>
        ))
      )}
    </Menu>
  )
}

export default CustomDropdown
