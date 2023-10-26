import React, { ReactNode, useContext, useRef, useState } from 'react'
import {
  Menu,
  MenuItem,
  MenuButton,
  MenuDirection,
  MenuState,
  MenuAlign,
  ControlledMenu,
  useClick,
} from '@szhsin/react-menu'
import '@szhsin/react-menu/dist/index.css'
import '@szhsin/react-menu/dist/transitions/slide.css'
import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { CartItemProduct } from '@/helpers/types'
import { useDeleteCartProductMutation, useGetCartProductsQuery } from '@/Cart/store/cartAPI'
import { useNavigate } from 'react-router-dom'
import { CalculateTotalPrice } from '@/Cart/components/calculateTotalPrice';

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
  hasCartNumber?: boolean
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
  hasCartNumber,
  handleDeleteCartProduct,
}: DropdownProps) => {
  const navigate = useNavigate()
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const ref = useRef(null)
  const [isOpen, setOpen] = useState(false)
  const anchorProps = useClick(isOpen, setOpen)
  const {
    data: cart,
    refetch,
    isLoading: cartLoading,
  } = useGetCartProductsQuery()

  // ... rest of your component ...

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen) // Toggle the menu open/closed state
  }

  console.log('cartItemProducts', cartItemProducts)

  const cartItemClassName = ({ hover }: any) =>
    hover ? 'my-menuCartItem-hover' : 'my-menuCartItem'

  const menuItemClassName = ({ hover }: any) =>
    hover ? 'my-menuitem-hover' : 'my-menuitem'

  const gotoCart = () => {
    navigate('/cart')
    setOpen(false)
  }


  const totalPriceInfo = CalculateTotalPrice(cart?.products)
  const {
    totalPriceWithoutVAT,
    totalPriceWithVAT,
    totalTvsh,
    discountValueInEuros,
    priceAfterDiscount,
    discountedTotalPriceWithoutVAT,
  } = totalPriceInfo

  console.log('menuClassName', menuClassName)

  return (
    <>
      <a type="button" ref={ref} {...anchorProps}>
        <span
          title="Shporta e blerjes"
          id="topcartlink"
          className="ico-cart nav-i-animation i-bg-effect position-relative"
        >
          <span className="icon-cart-shopping text-white md:text-white text-xl">
            {buttonContent}
            {icon}
          </span>
          {hasCartNumber && (
            <span className="cart-qty animate-flip bg-primary rounded-full position-absolute top-0 right-0">
              {cartItemProducts?.length || 0}
            </span>
          )}
        </span>
      </a>
      <ControlledMenu
        state={isOpen ? 'open' : 'closed'}
        anchorRef={ref}
        onClose={() => setOpen(false)}
        // menuButton={
        //   <span
        //     title="Shporta e blerjes"
        //     id="topcartlink"
        //     className="ico-cart nav-i-animation i-bg-effect position-relative"
        //   >
        //     <span className="icon-cart-shopping text-white md:text-white text-xl">
        //       {buttonContent}
        //       {icon}
        //     </span>
        //     {hasCartNumber && (
        //       <span className="cart-qty animate-flip bg-primary rounded-full position-absolute top-0 right-0">
        //         {cartItemProducts?.length || 0}
        //       </span>
        //     )}
        //   </span>
        // }
        menuClassName={menuClassName}
        transition
        align={align}
        direction={direction}
      >
        {cartItemProducts ? (
          cartItemProducts?.length > 0 ? (
            <div className="w-100">
              <div className="pb-2" style={{ borderBottom: '1px solid #ccc' }}>
                <small className="header-productItem ">
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
                        className="w-100 h-100"
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
              <div
                className="text-gray-500 d-flex w-100 justify-content-center align-items-center py-2"
                style={{ borderTop: '1px solid #ccc' }}
              >
                Total:
                <p className="text-gray-700 fw-bold pl-2">
                  {/* version original */}
                  {/* {cartItemProducts.map((item) => item.price)} */}
                  {totalPriceWithVAT?.toFixed(2)} €
                </p>
              </div>
              <div className="buttons d-flex justify-content-center px-4 ">
                <input
                  type="button"
                  value="Shko në shportë"
                  className="cart-button w-100 btn btn-primary btn-primary-hover text-sm"
                  onClick={gotoCart}
                />
              </div>
            </div>
          ) : (
            <MenuItem>Nuk keni ndonje product</MenuItem>
          )
        ) : (
          menuItems?.map((item, index) => (
            <MenuItem
              className={menuItemClassName}
              onClick={logout}
              key={index}
            >
              {item}
            </MenuItem>
          ))
        )}
      </ControlledMenu>
    </>
  )
}

export default CustomDropdown
