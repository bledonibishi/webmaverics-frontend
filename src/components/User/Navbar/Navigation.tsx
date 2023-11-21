import React, { useEffect, useRef, useState } from 'react'
import Logo from '@/assets/images/gjirafa50.png'
import { useQueryClient } from 'react-query'
import { Input, InputGroup, InputGroupText } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHeart,
  faReorder,
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
import LoadingModal from './LoadingModal'
import SidebarNavigation from './Sidebar'

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
  const [loadingModal, setLoadingModal] = useState(false)
  const [menu, setMenu] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
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

  const onLogout = async () => {
    setLoading(true)
    try {
      await dispatch(logout())
      dispatch(reset())
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setLoadingModal(true)
      setTimeout(() => {
        navigate('/')
        setLoading(false)
        setLoadingModal(false)
      }, 1500)
    }
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
    navigate('/login/identifier?useAnotherAccount=True')
  }

  const handleSearchChange = (event: any) => {
    const query = event.target.value
    setSearchQuery(query)

    if (query.trim() === '') {
      setSearchResults([])
      setTest(false)
    } else {
      const filteredResults = data?.filter((product: Product) =>
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
    <>
      <div
        className={`w-100 bg-black-dark sticky z-10 ${
          menu ? 'sidebar-menu-active test-ovfl' : ''
        }`}
        id="header-menu-mobile"
      >
        <div className="d-flex flex-col md:flex-row justify-content-center md:justify-start align-items-center bg-gray-700 md:py-0">
          <span
            id="topbar"
            className="d-flex align-items-center w-100 justify-content-center text-center text-gray-300 text-xs font-medium h-10"
          >
            Mbështetu tek ne. Dërgesa 100% të sigurta, kudo në Kosovë.
          </span>
        </div>
        <div
          className="position-relative py-2 d-flex md:h-66rem justify-content-between bg-black-900 responsive-wrapper text-white hover-effect md:h-auto md:items-center"
          id="header-menu"
        >
          <div className="d-flex " style={{ width: '49%' }}>
            <div
              className="position-relative cursor-pointer menu-toggle nav-i-animation ml-2"
              onClick={() => setSidebarOpen(true)}
            >
              <i
                className="icon-menu-three-lines cursor-pointer text-2xl text-white i-bg-effect"
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
            <ul
              className={` transition-all duration-300 -left-full ${
                sidebarOpen
                  ? 'mobile-sidebar-menu-active d-block'
                  : 'mobile-sidebar-menu md:hidden'
              }  `}
            >
              <SidebarNavigation
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
              />
            </ul>
          </div>
          {user ? (
            <div
              className="w-[55%] d-flex justify-content-end flex-row"
              style={{ width: '55%' }}
            >
              <div className="header-links mr-4 md:mr-0 d-flex authenticated">
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
            </div>
          )}

          <div className="position-absolute m-auto left-4 right-4 md:top-36rem md:top-auto md:left-0 md:right-0 search-box-inp  md:w-1/2 transition-all duration-300 z-50">
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
            <div
              ref={dropdownRef}
              className="position-absolute m-auto left-4 right-4  md:left-0 md:right-0 search-box-inp md:w-1/2 transition-all duration-300 z-50"
              style={{ top: '100%' }}
            >
              <ul
                id="ui-id-1"
                className="ui-menu ui-widget ui-widget-content w-100 ui-autocomplete ui-front scrollbar-modifier"
                style={{ top: '100%' }}
              >
                {loading ? (
                  <LoadingBar height="50px" size={'50px'} />
                ) : searchResults?.length ? (
                  searchResults?.slice(0, 10).map((result) => (
                    <li className="ui-menu-item" key={result.id}>
                      <a
                        className="bg-white rounded border border-transparent hover:border-primary ui-menu-item-wrapper"
                        id={`ui-id-${result.id}`}
                        href={`/product/${result.id}`}
                        tabIndex={-1}
                      >
                        <span className="mr-2 d-flex align-items-center justify-content-center search-autocomplete-image">
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
        {loadingModal && (
          <LoadingModal
            show={loadingModal}
            onHide={() => setLoadingModal(false)}
          />
        )}
      </div>
    </>
  )
}

export default Navigation
