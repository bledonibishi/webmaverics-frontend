import React from 'react'
import Logo from '@/assets/images/gjirafa50.png'
import { useQueryClient } from 'react-query'
import { Input, InputGroup, InputGroupText } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHeart,
  faSearch,
  faShoppingCart,
  faSignIn,
} from '@fortawesome/free-solid-svg-icons'
import { useAppDispatch, useAppSelector } from '@/hooks/hooks'
import CustomDropdown from '@/ui/Dropdown'
import { logout, reset } from '@/store/auth/authSlice'
import {
  useDeleteCartProductMutation,
  useGetCartProductsQuery,
} from '@/Cart/store/cartAPI'

const Navigation = () => {
  const dispatch = useAppDispatch()
  const { user, isSuccess, error, message, isLoading, countries } =
    useAppSelector((state) => state.auth)
  const [deleteProduct, { isLoading: deleteProductLoading }] =
    useDeleteCartProductMutation()
  const {
    data: cart,
    refetch,
    isLoading: cartLoading,
  } = useGetCartProductsQuery()

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
  }

  const handleDeleteCartProduct = async (productId: number | string) => {
    const queryClient = useQueryClient()

    try {
      await deleteProduct(productId)

      queryClient.invalidateQueries('getCartProducts')

      await queryClient.refetchQueries('getCartProducts')
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <div className="header-container">
      <div className="container d-flex header-div">
        <div className="logo-header__div">
          <a href="/">
            <img src={Logo} alt="Logo" />
          </a>
        </div>
        <div className="w-50">
          <InputGroup>
            <Input
              placeholder="username"
              style={{
                background: '#444',
                color: '#fff',
                border: 'none',
              }}
            />
            <InputGroupText
              addonType="append"
              className="border-none"
              style={{ background: '#444', border: 'none' }}
            >
              <FontAwesomeIcon
                icon={faSearch}
                style={{ marginRight: '5px', color: '#fff' }}
              />
            </InputGroupText>
          </InputGroup>
        </div>

        <div className="d-flex align-items-center">
          {user ? (
            <>
              <CustomDropdown
                buttonContent={user.user.name}
                icon={<FontAwesomeIcon icon={faSignIn} />}
                menuItems={['Profile info', 'Orders', 'Wishlist', 'Logout']}
                logout={onLogout}
                direction="bottom"
                menuClassName="profile-menu"
                align="center"
                handleDeleteCartProduct={handleDeleteCartProduct}
              />

              <a href={`/customer/wishlist`} className="nav-btn">
                <FontAwesomeIcon icon={faHeart} />
              </a>

              <CustomDropdown
                cartItemProducts={cart?.products}
                icon={<FontAwesomeIcon icon={faShoppingCart} />}
                direction="bottom"
                menuClassName={'my-menu'}
                align="end"
                handleDeleteCartProduct={handleDeleteCartProduct}
              />
            </>
          ) : (
            <>
              <a
                href="/login/identifier"
                // onClick={() => setLoginModal(true)}
                // style={{ color: '#ffffff' }}
                className="pr-4 nav-btn"
              >
                <FontAwesomeIcon icon={faSignIn} />
              </a>
              <a href={`/customer/wishlist`} className="pr-4 nav-btn">
                <FontAwesomeIcon icon={faHeart} />
              </a>
              <a
                // href=''
                // onClick={() => setLoginModal(true)}
                // style={{ color: '#ffffff' }}
                className="pr-4 nav-btn"
              >
                <FontAwesomeIcon icon={faShoppingCart} />
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navigation
