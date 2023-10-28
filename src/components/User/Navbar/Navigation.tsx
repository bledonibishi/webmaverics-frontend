import React, { useEffect, useRef, useState } from 'react'
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
import LoadingBar from '@/ui/Loading/LoadingBar'
import { useNavigate } from 'react-router-dom'
import { useGetProductsQuery } from '@/store/products/RTKProductSlice'
import { Product } from '@/helpers/types'
import { Image } from '@/helpers/helpers'

const Navigation = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const dropdownRef = useRef<HTMLDivElement | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Product[] | undefined>(
    undefined
  )
  const [test, setTest] = useState(false)
  const [loading, setLoading] = useState(false)
  const { data } = useGetProductsQuery()
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

  useEffect(() => {
    const closeDropdownOnOutsideClick = (event: any): void => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setTest(false)
      }
    }

    document.addEventListener('click', closeDropdownOnOutsideClick)

    return () => {
      document.removeEventListener('click', closeDropdownOnOutsideClick)
    }
  }, [])

  const handleDeleteCartProduct = async (productId: number | string) => {
    console.log('productId', productId)

    try {
      await deleteProduct(productId)
      refetch()
    } catch (error) {
      console.log('error', error)
    }
  }

  const goToLogin = () => {
    navigate('/login/identifier')
  }

  const searchHandler = () => {
    navigate('/search')
  }

  const handleSearchChange = (event: any) => {
    const query = event.target.value
    setSearchQuery(query)

    if (query.trim() === '') {
      setSearchResults([])
      setTest(false)
    } else {
      const filteredResults = data?.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      )
      setSearchResults(filteredResults)
      setTest(true)
    }
  }

  const handleSearchSubmit = (event: any) => {
    event.preventDefault()
    if (searchQuery.trim() === '') return

    navigate(`/search?q=${searchQuery}`)
  }

  return (
    <div className="w-100 bg-black-dark sticky z-10" id="header-menu-mobile">
      <div className="d-flex flex-col md:flex-row justify-content-center md:justify-start align-items-center bg-gray-700 md:py-0">
        <span
          id="topbar"
          className="d-flex align-items-center w-100 justify-content-center text-center text-gray-300 text-xs font-medium h-10"
        >
          Mbështetu tek ne. Dërgesa 100% të sigurta, kudo në Kosovë.
        </span>
      </div>
      <div
        className="py-2 d-flex md:h-66rem justify-content-between bg-black-900 responsive-wrapper text-white hover-effect md:h-auto md:items-center"
        // style={{ height: '6.6rem' }}
        id="header-menu"
      >
        <div className="d-flex " style={{ width: '49%' }}>
          <div className="position-relative menu-toggle nav-i-animation ml-2">
            <i
              className="icon-menu-three-lines text-2xl text-white i-bg-effect"
              id="scroll-anim-icon-menu"
            ></i>
          </div>
          <div className="md:relative navbar-logo z-10">
            <a href="/">
              <img
                className="h-8"
                width="110"
                height="32"
                alt="Gjirafa50"
                src={Logo}
              />
            </a>
          </div>
        </div>
        {user ? (
          <div
            className="w-[55%] d-flex justify-content-end flex-row"
            style={{ width: '55%' }}
          >
            <div className="header-links mr-4 md:mr-0 d-flex authenticated">
              {/* <div
                id="account__dropdown"
                className="d-flex max-w-username align-items-center cursor-pointer i-bg-effect px-1"
                title="Llogaria ime"
              >
                <i className="icon-account-profile-user-circle text-3xl">
                  <FontAwesomeIcon icon={faSignIn} />
                </i>
                <span className="text-sm hidden md:inline-block overflow-hidden text-ellipsis capitalize ml-1">
                  {user.user.name}
                </span>
              </div> */}
              <div
                id="account__dropdown"
                className="d-flex max-w-username align-items-center cursor-pointer i-bg-effect px-1"
                title="Llogaria ime"
              >
                <CustomDropdown
                  buttonContent={user.user.name}
                  icon={<FontAwesomeIcon icon={faSignIn} />}
                  menuItems={['Profile info', 'Orders', 'Wishlist', 'Logout']}
                  logout={onLogout}
                  direction="bottom"
                  menuClassName="profile-menu"
                  align="center"
                  hasCartNumber={false}
                  handleDeleteCartProduct={handleDeleteCartProduct}
                />
              </div>
              <a
                title="Lista e dëshirave"
                href={`/customer/wishlist`}
                aria-label="Check the items in your wishlist"
                className="ico-wishlist d-flex align-items-center i-bg-effect"
              >
                <span className="wishlist-label icon-heart text-white text-3xl px-1">
                  <FontAwesomeIcon icon={faHeart} />
                </span>
              </a>
              {/* <span
                title="Shporta e blerjes"
                id="topcartlink"
                className="ico-cart nav-i-animation i-bg-effect position-relative"
              >
                <span className="icon-cart-shopping text-white md:text-white text-3xl">
                  <FontAwesomeIcon icon={faShoppingCart} />
                </span>
                <span className="cart-qty animate-flip bg-primary rounded-full position-absolute top-0 right-0">
                  2
                </span>
              </span> */}
              <CustomDropdown
                cartItemProducts={cart?.products}
                icon={<FontAwesomeIcon icon={faShoppingCart} />}
                direction="bottom"
                menuClassName={'my-menu'}
                hasCartNumber={true}
                align="end"
                handleDeleteCartProduct={handleDeleteCartProduct}
              />
              <div
                id="account__card"
                className="account-card rounded shadow-md bg-white hidden"
              >
                <div className="d-flex flex-col text-left p-3">
                  <div className="bg-primary bg-opacity-10 px-2 py-1 rounded-md d-flex md:hidden capitalize mb-4">
                    <span className="w-36 truncate text-primary font-medium text-sm">
                      bledon
                    </span>
                  </div>
                  <a
                    href="/customer/info"
                    className="anchor-links link-hover-effect group"
                  >
                    <i className="icon-account-profile-edit text-gray-600 text-2xl icon-line-height group-hover:text-primary"></i>
                    Të dhënat e profilit
                  </a>
                  <hr className="hr" />
                  <a
                    className="anchor-links link-hover-effect group"
                    href="/order/history"
                  >
                    <i className="icon-megaphone text-gray-600 text-2xl icon-line-height group-hover:text-primary"></i>
                    Porositë
                  </a>
                  <a
                    className="anchor-links link-hover-effect group"
                    href="/wishlist"
                  >
                    <i className="icon-heart text-gray-600 text-2xl icon-line-height group-hover:text-primary"></i>
                    Lista e dëshirave
                  </a>
                  <hr className="hr" />
                  <a
                    className="anchor-links link-hover-effect group ico-logout"
                    href="/logout?returnUrl=%2F"
                  >
                    <i className="icon-arrow-logout text-gray-600 text-2xl icon-line-height group-hover:text-primary"></i>
                    Çkyçu
                  </a>
                </div>
              </div>
            </div>
            {/* <div
              id="flyout-cart"
              className="flyout-cart rounded bg-white shadow-md hidden"
            >
              <div className="d-flex count text-xs text-gray-600 border-b border-gray-300 px-4 pt-4 pb-2 mb-2">
                Ju keni <a href="/cart">&nbsp;2 produkt(e)&nbsp; </a> në
                shportën tuaj.{' '}
              </div>
              <div className="item first d-flex align-items-center px-4 pb-2">
                <a
                  className="w-10 h-10 d-flex justify-content-center align-items-center small-image-container"
                  href="/degjuese-ugreen-hitune-t3-te-bardha"
                  title="Shfaq detaje për Dëgjuese UGREEN HiTune T3, të bardha"
                >
                  <img
                    className="max-h-full max-w-full position-relative"
                    alt="Foto e Dëgjuese UGREEN HiTune T3, të bardha"
                    src="https://hhstsyoejx.gjirafa.net/gjirafa50core/images/587b8f29-bea5-4a53-b8b0-a09fc4b248de/587b8f29-bea5-4a53-b8b0-a09fc4b248de.jpeg"
                    srcSet="https://hhstsyoejx.gjirafa.net/gjirafa50core/images/587b8f29-bea5-4a53-b8b0-a09fc4b248de/587b8f29-bea5-4a53-b8b0-a09fc4b248de.webp?w=40"
                    title="Shfaq detaje për Dëgjuese UGREEN HiTune T3, të bardha"
                  />
                </a>
                <div className="product d-flex flex-col w-100 pl-2">
                  <div className="name d-flex justify-content-between">
                    <a
                      title="Dëgjuese UGREEN HiTune T3, të bardha"
                      className="text-sm text-gray-700 truncate hover:underline w-60"
                      href="/degjuese-ugreen-hitune-t3-te-bardha"
                    >
                      Dëgjuese UGREEN HiTune T3, të bardha
                    </a>
                    <input
                      type="checkbox"
                      className="hidden"
                      name="flyout-removefromcart"
                      id="flyout-removefromcart216586"
                      data-productid="145969"
                      value="216586"
                      aria-label="Largo"
                    />
                    <button
                      name="updatecart"
                      className="icon-delete-trash text-xl text-gray-700 icon-line-height hover:text-primary"
                    ></button>
                  </div>
                  <div className="d-flex flex-col justify-content-between text-xs text-gray-600">
                    <div className="price">
                      Çmimi për njësi:{' '}
                      <span className="text-gray-700">19.50 €</span>
                    </div>
                    <div className="quantity">
                      Sasia: <span className="text-gray-700">1</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item d-flex align-items-center px-4 pb-2">
                <a
                  className="w-10 h-10 d-flex justify-content-center align-items-center small-image-container"
                  href="/maus-logitech-g-pro-x-superlight-i-bardhe"
                  title="Shfaq detaje për Maus Logitech G Pro X Superlight, i bardhë"
                >
                  <img
                    className="max-h-full max-w-full position-relative"
                    alt="Foto e Maus Logitech G Pro X Superlight, i bardhë"
                    src="https://hhstsyoejx.gjirafa.net/gjirafa50core/images/4b2bb16f-11a7-482f-a01c-4cc873512f87/4b2bb16f-11a7-482f-a01c-4cc873512f87.jpeg"
                    srcSet="https://hhstsyoejx.gjirafa.net/gjirafa50core/images/4b2bb16f-11a7-482f-a01c-4cc873512f87/4b2bb16f-11a7-482f-a01c-4cc873512f87.webp?w=40"
                    title="Shfaq detaje për Maus Logitech G Pro X Superlight, i bardhë"
                  />
                </a>
                <div className="product d-flex flex-col w-100 pl-2">
                  <div className="name d-flex justify-content-between">
                    <a
                      title="Maus Logitech G Pro X Superlight, i bardhë"
                      className="text-sm text-gray-700 truncate hover:underline w-60"
                      href="/maus-logitech-g-pro-x-superlight-i-bardhe"
                    >
                      Maus Logitech G Pro X Superlight, i bardhë
                    </a>
                    <input
                      type="checkbox"
                      className="hidden"
                      name="flyout-removefromcart"
                      id="flyout-removefromcart216583"
                      data-productid="14559"
                      value="216583"
                      aria-label="Largo"
                    />
                    <button
                      name="updatecart"
                      className="icon-delete-trash text-xl text-gray-700 icon-line-height hover:text-primary"
                    ></button>
                  </div>
                  <div className="d-flex flex-col justify-content-between text-xs text-gray-600">
                    <div className="price">
                      Çmimi për njësi:{' '}
                      <span className="text-gray-700">119.50 €</span>
                    </div>
                    <div className="quantity">
                      Sasia: <span className="text-gray-700">1</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-center align-items-center py-2 border-t border-gray-300 text-gray-600 text-xs">
                Total:{' '}
                <span className="text-sm font-semibold text-gray-700 pl-1">
                  138.99 €
                </span>
              </div>
              <div className="buttons d-flex justify-content-center px-4 pb-4">
                <input
                  type="button"
                  value="Shko në shportë"
                  className="cart-button w-100 btn btn-primary btn-primary-hover text-sm"
                />
              </div>
            </div> */}
          </div>
        ) : (
          <div
            className="w-[55%] d-flex justify-content-end flex-row"
            style={{ width: '55%' }}
          >
            <div className="header-links mr-4 md:mr-0 d-flex authenticated">
              <div
                id="account__dropdown"
                className="d-flex max-w-username align-items-center cursor-pointer i-bg-effect px-1"
                title="Llogaria ime"
                onClick={goToLogin}
              >
                <i className="icon-account-profile-user-circle text-3xl">
                  <FontAwesomeIcon icon={faSignIn} />
                </i>
                <span className="text-sm hidden md:inline-block overflow-hidden text-ellipsis capitalize ml-1"></span>
              </div>

              <a
                title="Lista e dëshirave"
                href={`/customer/wishlist`}
                aria-label="Check the items in your wishlist"
                className="ico-wishlist d-flex align-items-center i-bg-effect"
              >
                <span className="wishlist-label icon-heart text-white text-3xl px-1">
                  <FontAwesomeIcon icon={faHeart} />
                </span>
              </a>
              {/* <span
                title="Shporta e blerjes"
                id="topcartlink"
                className="ico-cart nav-i-animation i-bg-effect position-relative"
              >
                <span className="icon-cart-shopping text-white md:text-white text-3xl">
                  <FontAwesomeIcon icon={faShoppingCart} />
                </span>
                <span className="cart-qty animate-flip bg-primary rounded-full position-absolute top-0 right-0">
                  2
                </span>
              </span> */}
              <CustomDropdown
                cartItemProducts={cart?.products}
                icon={<FontAwesomeIcon icon={faShoppingCart} />}
                direction="bottom"
                menuClassName={'my-menu'}
                align="end"
                handleDeleteCartProduct={handleDeleteCartProduct}
              />
              <div
                id="account__card"
                className="account-card rounded shadow-md bg-white hidden"
              >
                <div className="d-flex flex-col text-left p-3">
                  <div className="bg-primary bg-opacity-10 px-2 py-1 rounded-md d-flex md:hidden capitalize mb-4">
                    <span className="w-36 truncate text-primary font-medium text-sm">
                      bledon
                    </span>
                  </div>
                  <a
                    href="/customer/info"
                    className="anchor-links link-hover-effect group"
                  >
                    <i className="icon-account-profile-edit text-gray-600 text-2xl icon-line-height group-hover:text-primary"></i>
                    Të dhënat e profilit
                  </a>
                  <hr className="hr" />
                  <a
                    className="anchor-links link-hover-effect group"
                    href="/order/history"
                  >
                    <i className="icon-megaphone text-gray-600 text-2xl icon-line-height group-hover:text-primary"></i>
                    Porositë
                  </a>
                  <a
                    className="anchor-links link-hover-effect group"
                    href="/wishlist"
                  >
                    <i className="icon-heart text-gray-600 text-2xl icon-line-height group-hover:text-primary"></i>
                    Lista e dëshirave
                  </a>
                  <hr className="hr" />
                  <a
                    className="anchor-links link-hover-effect group ico-logout"
                    href="/logout?returnUrl=%2F"
                  >
                    <i className="icon-arrow-logout text-gray-600 text-2xl icon-line-height group-hover:text-primary"></i>
                    Çkyçu
                  </a>
                </div>
              </div>
            </div>
            {/* <div
              id="flyout-cart"
              className="flyout-cart rounded bg-white shadow-md hidden"
            >
              <div className="d-flex count text-xs text-gray-600 border-b border-gray-300 px-4 pt-4 pb-2 mb-2">
                Ju keni <a href="/cart">&nbsp;2 produkt(e)&nbsp; </a> në
                shportën tuaj.{' '}
              </div>
              <div className="item first d-flex align-items-center px-4 pb-2">
                <a
                  className="w-10 h-10 d-flex justify-content-center align-items-center small-image-container"
                  href="/degjuese-ugreen-hitune-t3-te-bardha"
                  title="Shfaq detaje për Dëgjuese UGREEN HiTune T3, të bardha"
                >
                  <img
                    className="max-h-full max-w-full position-relative"
                    alt="Foto e Dëgjuese UGREEN HiTune T3, të bardha"
                    src="https://hhstsyoejx.gjirafa.net/gjirafa50core/images/587b8f29-bea5-4a53-b8b0-a09fc4b248de/587b8f29-bea5-4a53-b8b0-a09fc4b248de.jpeg"
                    srcSet="https://hhstsyoejx.gjirafa.net/gjirafa50core/images/587b8f29-bea5-4a53-b8b0-a09fc4b248de/587b8f29-bea5-4a53-b8b0-a09fc4b248de.webp?w=40"
                    title="Shfaq detaje për Dëgjuese UGREEN HiTune T3, të bardha"
                  />
                </a>
                <div className="product d-flex flex-col w-100 pl-2">
                  <div className="name d-flex justify-content-between">
                    <a
                      title="Dëgjuese UGREEN HiTune T3, të bardha"
                      className="text-sm text-gray-700 truncate hover:underline w-60"
                      href="/degjuese-ugreen-hitune-t3-te-bardha"
                    >
                      Dëgjuese UGREEN HiTune T3, të bardha
                    </a>
                    <input
                      type="checkbox"
                      className="hidden"
                      name="flyout-removefromcart"
                      id="flyout-removefromcart216586"
                      data-productid="145969"
                      value="216586"
                      aria-label="Largo"
                    />
                    <button
                      name="updatecart"
                      className="icon-delete-trash text-xl text-gray-700 icon-line-height hover:text-primary"
                    ></button>
                  </div>
                  <div className="d-flex flex-col justify-content-between text-xs text-gray-600">
                    <div className="price">
                      Çmimi për njësi:{' '}
                      <span className="text-gray-700">19.50 €</span>
                    </div>
                    <div className="quantity">
                      Sasia: <span className="text-gray-700">1</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item d-flex align-items-center px-4 pb-2">
                <a
                  className="w-10 h-10 d-flex justify-content-center align-items-center small-image-container"
                  href="/maus-logitech-g-pro-x-superlight-i-bardhe"
                  title="Shfaq detaje për Maus Logitech G Pro X Superlight, i bardhë"
                >
                  <img
                    className="max-h-full max-w-full position-relative"
                    alt="Foto e Maus Logitech G Pro X Superlight, i bardhë"
                    src="https://hhstsyoejx.gjirafa.net/gjirafa50core/images/4b2bb16f-11a7-482f-a01c-4cc873512f87/4b2bb16f-11a7-482f-a01c-4cc873512f87.jpeg"
                    srcSet="https://hhstsyoejx.gjirafa.net/gjirafa50core/images/4b2bb16f-11a7-482f-a01c-4cc873512f87/4b2bb16f-11a7-482f-a01c-4cc873512f87.webp?w=40"
                    title="Shfaq detaje për Maus Logitech G Pro X Superlight, i bardhë"
                  />
                </a>
                <div className="product d-flex flex-col w-100 pl-2">
                  <div className="name d-flex justify-content-between">
                    <a
                      title="Maus Logitech G Pro X Superlight, i bardhë"
                      className="text-sm text-gray-700 truncate hover:underline w-60"
                      href="/maus-logitech-g-pro-x-superlight-i-bardhe"
                    >
                      Maus Logitech G Pro X Superlight, i bardhë
                    </a>
                    <input
                      type="checkbox"
                      className="hidden"
                      name="flyout-removefromcart"
                      id="flyout-removefromcart216583"
                      data-productid="14559"
                      value="216583"
                      aria-label="Largo"
                    />
                    <button
                      name="updatecart"
                      className="icon-delete-trash text-xl text-gray-700 icon-line-height hover:text-primary"
                    ></button>
                  </div>
                  <div className="d-flex flex-col justify-content-between text-xs text-gray-600">
                    <div className="price">
                      Çmimi për njësi:{' '}
                      <span className="text-gray-700">119.50 €</span>
                    </div>
                    <div className="quantity">
                      Sasia: <span className="text-gray-700">1</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-center align-items-center py-2 border-t border-gray-300 text-gray-600 text-xs">
                Total:{' '}
                <span className="text-sm font-semibold text-gray-700 pl-1">
                  138.99 €
                </span>
              </div>
              <div className="buttons d-flex justify-content-center px-4 pb-4">
                <input
                  type="button"
                  value="Shko në shportë"
                  className="cart-button w-100 btn btn-primary btn-primary-hover text-sm"
                />
              </div>
            </div> */}
          </div>
        )}

        <div
          className="position-absolute m-auto left-4 right-4 md:top-36rem md:top-auto md:left-0 md:right-0 search-box-inp  md:w-1/2 transition-all duration-300 z-50"
          // style={{ top: '3.6rem' }}
        >
          <form
            id="small-search-box-form"
            className="d-flex justify-content-between align-items-center w-100"
            onSubmit={handleSearchSubmit}
          >
            <input
              type="text"
              className="search-box-text text-white focus:outline-none focus:text-white small-searchtermss w-100 ui-autocomplete-input"
              id="small-searchterms"
              autoComplete="off"
              name="q"
              placeholder="Kërko produkte"
              aria-label="Kërko produkte"
              onChange={handleSearchChange}
              value={searchQuery}
            />
            <button
              title="Kërko"
              style={{ border: 'none' }}
              type="submit"
              className="icon-search-find-alt text-2xl cursor-pointer w-10 h-10"
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </form>
        </div>
        {test && (
          <div ref={dropdownRef}>
            <ul
              id="ui-id-1"
              className="ui-menu ui-widget ui-widget-content ui-autocomplete ui-front"
              style={{ width: '512px', top: '54.5px', left: '384px' }}
            >
              {loading ? (
                <LoadingBar height="50px" size={'50px'} />
              ) : // <li className="ui-menu-item">
              //   <a
              //     className="bg-white rounded border border-transparent hover:border-primary ui-menu-item-wrapper"
              //     id="ui-id-26"
              //     tabIndex={-1}
              //   >
              //     <span className=" mr-2 d-flex align-items-center justify-content-center search-autocomplete-image">
              //       <img src="https://hhstsyoejx.gjirafa.net/gjirafa50core/images/4de9dff8-29d0-4e59-a87e-4bbc89d17e30/thumb/4de9dff8-29d0-4e59-a87e-4bbc89d17e30.jpeg" />{' '}
              //     </span>
              //     <span>Apple 20W USB-C Power Adapter</span>
              //   </a>
              // </li>
              searchResults?.length ? (
                searchResults?.map((result) => (
                  <li className="ui-menu-item" key={result.id}>
                    <a
                      className="bg-white rounded border border-transparent hover:border-primary ui-menu-item-wrapper"
                      id={`ui-id-${result.id}`}
                      tabIndex={-1}
                    >
                      <span className="mr-2 d-flex align-items-center justify-content-center search-autocomplete-image">
                        {/* <img src={result.imageCover} alt={result.title} /> */}
                        {/* <img
                          src="https://hhstsyoejx.gjirafa.net/gjirafa50core/images/4de9dff8-29d0-4e59-a87e-4bbc89d17e30/thumb/4de9dff8-29d0-4e59-a87e-4bbc89d17e30.jpeg"
                          alt={result.title}
                        /> */}
                        <Image
                          src={result.imageCover ? result.imageCover : ''}
                          alt="imageCover"
                          className=""
                        />
                      </span>
                      <span>{result.title}</span>
                    </a>
                  </li>
                ))
              ) : (
                <li className="ui-menu-item text-center py-3">
                  Cannot find anything!
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
      <div
        className="ajax-loading-block-window"
        style={{ display: 'none' }}
      ></div>
      <div
        id="dialog-notifications-success"
        title="Njoftim"
        style={{ display: 'none' }}
      ></div>
      <div
        id="dialog-notifications-error"
        title="Gabim"
        style={{ display: 'none' }}
      ></div>
      <div
        id="dialog-notifications-warning"
        title="Paralajmërim"
        style={{ display: 'none' }}
      ></div>
      <div
        id="bar-notification"
        className="bar-notification-container"
        data-close="Mbyll"
      ></div>
    </div>
  )
}

export default Navigation
