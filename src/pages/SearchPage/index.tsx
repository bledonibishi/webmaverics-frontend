import React from 'react'
import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { useLocation } from 'react-router-dom'
import { useGetProductsQuery } from '@/store/products/RTKProductSlice'
import { Product, addToCartType } from '@/helpers/types'
import LoadingBar from '@/ui/Loading/LoadingBar'
import { Dropdown, DropdownButton } from 'react-bootstrap'
import CustomDropdown from './customDropdown'
import { useAddToCartQueryMutation, useGetCartProductsQuery } from '@/Cart/store/cartAPI'
import { toast } from 'react-toastify'
import useSocket from '@/hooks/useSocket'
import { useCreateProductMutation } from '@/wishlist/store/wishlistAPI'
import { title } from 'process'

const SearchComponent = () => {
  const socket = useSocket();
  const location = useLocation()
  const searchQuery = new URLSearchParams(location.search).get('q') || ''
  const { data, error, isLoading } = useGetProductsQuery()
  const [addToCartQuery, { isError, isSuccess }] =
    useAddToCartQueryMutation()
  const {
    data: cart,
    refetch,
    isLoading: cartLoading,
  } = useGetCartProductsQuery()
  const [createProduct] = useCreateProductMutation()


  if (isLoading) {
    return <LoadingBar />
  }
  const addToCartHandler = (items: addToCartType) => {
    console.log('items', items)
    addToCartQuery(items)
      // .unwrap()
      .then(() => {
        toast.success('Product added to cart!')
        refetch()
      })
      .catch((err) => console.log('err', err))
  }

  const createWishlistProductHandler = (productId: string) => {
    createProduct(productId)
      // .unwrap()
      .then(() => {
        socket?.emit('createWishlistProduct', { productId })
        toast.success('Product added to wishlist!')
      })
      .catch((err: any) => {
        console.log('err', error)
      })
  }


  if (error) {
    return <div>Error</div>
  }

  const searchResults = data?.filter((product: any) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div
      className="master-wrapper-content px-2 md:px-0 mx-auto"
      style={{ minHeight: '100vh' }}
    >
      <div className="master-column-wrapper my-6">
        <div className="page-title-top mb-3 md:mb-6 page-title pointer-events-none w-100 text-center md:text-left text-primary text-lg font-medium">
          Kërko
        </div>
        <div className="side-2 md:sticky md:top-20 mb-4 md:mb-0">
          <div
            id="product-filters-mobile"
            className="bg-white shadow-md md:rounded md:overflow-hidden  z-20 top-0 bg-white md:flex md:flex-col h-100 md:h-min w-5/6 md:w-full right-0"
          >
            <div className="d-flex align-items-center justify-content-between bg-gray-100 p-4 md:hidden">
              <span className="text-sm">Filterat e produkteve</span>
              <div id="close-product-filters">
                <i className="icon-close-cancel text-2xl text-gray-700"></i>
              </div>
            </div>

            <div className="active-filters-wrapper hidden">
              <div className="w-100 bg-white d-flex align-items-center px-4 py-2">
                <i className="icon-filter-drag text-gray-700 text-xl"></i>
                <span className="text-sm text-gray-700">Filterët aktiv</span>
              </div>
              <div className="active-filters d-flex px-4 pb-2 border-b flex-wrap"></div>
            </div>

            <div className="d-flex flex-col border-b p-4">
              <div className="d-flex align-items-center justify-content-between position-relative mb-4">
                <span className="text-sm">Në stok</span>
                <div className="toggle-btn-wrapper">
                  <input
                    type="checkbox"
                    id="inStockInput"
                    className="toggle-btn"
                  />
                  <div className="knobs"></div>
                  <div className="layer"></div>
                </div>
              </div>

              <div className="d-flex align-items-center justify-content-between position-relative">
                <span className="text-sm">24h</span>
                <div className="toggle-btn-wrapper">
                  <input
                    id="hasLocalStockInput"
                    type="checkbox"
                    className="toggle-btn"
                  />
                  <div className="knobs"></div>
                  <div className="layer"></div>
                </div>
              </div>
            </div>

            <div className="product-filter price-range-filter overflow-hidden">
              <div className="filter-title w-100  bg-white d-flex justify-content-between align-items-center border-b px-4 py-2.5 hover:cursor-pointer">
                <span className="text-sm text-gray-700 d-flex align-items-center">
                  <i className="icon-payment-money-usd text-gray-700 text-2xl pr-1"></i>
                  Filtro sipas çmimit
                </span>
                <i className="icon-chevron-line-up text-gray-600 text-lg transform transition-all"></i>
              </div>
              <div className="filter-content w-100  bg-white">
                <div className="p-4 border-b">
                  <ul className="d-flex flex-col price-ranges"></ul>
                  <div className="selected-price-range d-flex justify-content-around align-items-center">
                    <input
                      className="w-100 from-price"
                      name="priceChange"
                      min="9"
                      type="number"
                      placeholder="9"
                    />
                    <span className="text-sm text-gray-600 mx-2">to</span>
                    <input
                      className="w-100 to-price"
                      name="priceChange"
                      max="7795"
                      type="number"
                      placeholder="7795"
                    />
                  </div>
                  <span className="d-flex align-items-center text-xs text-gray-600 error-message my-2 flex-wrap">
                    Filtrimi mund të bëhet nga
                    <span className="text-primary mx-1">9 Euro</span>
                    deri në
                    <span className="text-primary mx-1">7795 Euro</span>
                  </span>
                  <div className="d-flex justify-content-end">
                    <button className="btn-simple py-1 px-2 border-primary hover:bg-primary hover:text-white text-primary submit-price-range w-100 ">
                      Apliko
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="product-filter product-spec-filter overflow-hidden">
              <div className="filter-title px-4 py-2.5 d-flex justify-content-between align-items-center select-none border-b text-left hover:cursor-pointer">
                <span className="text-sm text-gray-700 d-flex align-items-center">
                  {/* <icon className="icon-filter-drag text-gray-700 text-xl pr-1"></icon> */}
                  Filtro sipas cilësive
                </span>
                <i className="icon-chevron-line-up text-gray-600 text-lg md:block transform transition-all rotate-180"></i>
              </div>
              <div className="filter-content w-100  bg-white overflow-y-scroll max-h-64 scrollbar-modifier hidden">
                <ul className=" group product-spec-group select-none border-b">
                  <li className="px-4 py-2 name d-flex flex-row justify-content-between align-items-center hover:cursor-pointer">
                    <span className="sub-spec-name font-normal text-xs text-gray-600">
                      Lloji i memories
                    </span>
                    <i className="icon-chevron-line-down text-base text-gray-600 transform transition-all rotate-180"></i>
                  </li>
                  <label className="item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-375775 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="1"
                      data-option-id="375775"
                    />
                    <span className="text-xs text-gray-600 pl-3">
                      DDR5 SODIMM (slot)
                    </span>
                  </label>
                  <label className="item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-20 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="1"
                      data-option-id="20"
                    />
                    <span className="text-xs text-gray-600 pl-3">
                      LPDDR4 (në pllakë)
                    </span>
                  </label>
                  <label className="item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-12 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="1"
                      data-option-id="12"
                    />
                    <span className="text-xs text-gray-600 pl-3">
                      DDR4 SODIMM (slot)
                    </span>
                  </label>
                  <label className="item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-42 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="1"
                      data-option-id="42"
                    />
                    <span className="text-xs text-gray-600 pl-3">
                      LPDDR4X (në pllakë)
                    </span>
                  </label>
                  <label className="item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-44 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="1"
                      data-option-id="44"
                    />
                    <span className="text-xs text-gray-600 pl-3">
                      DDR4 SODIMM (port), LPDDR4 (në pllakë)
                    </span>
                  </label>
                  <label className="item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-377175 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="1"
                      data-option-id="377175"
                    />
                    <span className="text-xs text-gray-600 pl-3">
                      LPDDR5 (në pllakë)
                    </span>
                  </label>
                  <label className="item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-6 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="1"
                      data-option-id="6"
                    />
                    <span className="text-xs text-gray-600 pl-3">DDR4</span>
                  </label>
                  <label className="item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-18 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="1"
                      data-option-id="18"
                    />
                    <span className="text-xs text-gray-600 pl-3">
                      DDR4 SODIMM (slot), LPDDR4 (në pllakë)
                    </span>
                  </label>
                  <label className="item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-432382 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="1"
                      data-option-id="432382"
                    />
                    <span className="text-xs text-gray-600 pl-3">
                      DDR4-SDRAM
                    </span>
                  </label>
                  <label className="item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-50 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="1"
                      data-option-id="50"
                    />
                    <span className="text-xs text-gray-600 pl-3">GDDR6</span>
                  </label>
                </ul>
                <ul className=" group product-spec-group select-none border-b">
                  <li className="px-4 py-2 name d-flex flex-row justify-content-between align-items-center hover:cursor-pointer">
                    <span className="sub-spec-name font-normal text-xs text-gray-600">
                      Formati i diskut
                    </span>
                    <i className="icon-chevron-line-down text-base text-gray-600 transform transition-all rotate-180"></i>
                  </li>
                  <label className="item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-182204 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="36"
                      data-option-id="182204"
                    />
                    <span className="text-xs text-gray-600 pl-3">M.2 2280</span>
                  </label>
                  <label className="item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-182213 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="36"
                      data-option-id="182213"
                    />
                    <span className="text-xs text-gray-600 pl-3">M.2</span>
                  </label>
                </ul>
                <ul className=" group product-spec-group select-none border-b">
                  <li className="px-4 py-2 name d-flex flex-row justify-content-between align-items-center hover:cursor-pointer">
                    <span className="sub-spec-name font-normal text-xs text-gray-600">
                      Lloji i HD
                    </span>
                    <i className="icon-chevron-line-down text-base text-gray-600 transform transition-all"></i>
                  </li>
                  <label className="item d-flex align-items-center px-4 pb-2 hover:cursor-pointer hidden">
                    <input
                      id="attribute-option-182232 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="37"
                      data-option-id="182232"
                    />
                    <span className="text-xs text-gray-600 pl-3">SSD</span>
                  </label>
                  <label className="item d-flex align-items-center px-4 pb-2 hover:cursor-pointer hidden">
                    <input
                      id="attribute-option-379126 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="37"
                      data-option-id="379126"
                    />
                    <span className="text-xs text-gray-600 pl-3">Full HD</span>
                  </label>
                  <label className="item d-flex align-items-center px-4 pb-2 hover:cursor-pointer hidden">
                    <input
                      id="attribute-option-415690 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="37"
                      data-option-id="415690"
                    />
                    <span className="text-xs text-gray-600 pl-3">WQXGA</span>
                  </label>
                  <label className="item d-flex align-items-center px-4 pb-2 hover:cursor-pointer hidden">
                    <input
                      id="attribute-option-379615 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="37"
                      data-option-id="379615"
                    />
                    <span className="text-xs text-gray-600 pl-3">WQHD</span>
                  </label>
                  <label className="item d-flex align-items-center px-4 pb-2 hover:cursor-pointer hidden">
                    <input
                      id="attribute-option-381267 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="37"
                      data-option-id="381267"
                    />
                    <span className="text-xs text-gray-600 pl-3">WUXGA</span>
                  </label>
                  <label className="item d-flex align-items-center px-4 pb-2 hover:cursor-pointer hidden">
                    <input
                      id="attribute-option-380883 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="37"
                      data-option-id="380883"
                    />
                    <span className="text-xs text-gray-600 pl-3">HD+</span>
                  </label>
                  <label className="item d-flex align-items-center px-4 pb-2 hover:cursor-pointer hidden">
                    <input
                      id="attribute-option-381286 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="37"
                      data-option-id="381286"
                    />
                    <span className="text-xs text-gray-600 pl-3">HD</span>
                  </label>
                </ul>
                <ul className=" group product-spec-group select-none border-b">
                  <li className="px-4 py-2 name d-flex flex-row justify-content-between align-items-center hover:cursor-pointer">
                    <span className="sub-spec-name font-normal text-xs text-gray-600">
                      Pesha [g]
                    </span>
                    <i className="icon-chevron-line-down text-base text-gray-600 transform transition-all"></i>
                  </li>
                  <label className="hidden item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-182382 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="45"
                      data-option-id="182382"
                    />
                    <span className="text-xs text-gray-600 pl-3">350</span>
                  </label>
                </ul>
                <ul className=" group product-spec-group select-none border-b">
                  <li className="px-4 py-2 name d-flex flex-row justify-content-between align-items-center hover:cursor-pointer">
                    <span className="sub-spec-name font-normal text-xs text-gray-600">
                      Sistemi operativ
                    </span>
                    <i className="icon-chevron-line-down text-base text-gray-600 transform transition-all"></i>
                  </li>
                  <label className="hidden item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-183782 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="46"
                      data-option-id="183782"
                    />
                    <span className="text-xs text-gray-600 pl-3">FreeDOS</span>
                  </label>
                  <label className="hidden item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-372719 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="46"
                      data-option-id="372719"
                    />
                    <span className="text-xs text-gray-600 pl-3">
                      Windows 11 Home
                    </span>
                  </label>
                  <label className="hidden item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-374044 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="46"
                      data-option-id="374044"
                    />
                    <span className="text-xs text-gray-600 pl-3">
                      Windows 11 Pro
                    </span>
                  </label>
                  <label className="hidden item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-183748 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="46"
                      data-option-id="183748"
                    />
                    <span className="text-xs text-gray-600 pl-3">Nuk ka</span>
                  </label>
                  <label className="hidden item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-183789 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="46"
                      data-option-id="183789"
                    />
                    <span className="text-xs text-gray-600 pl-3">
                      Pa sistem operativ
                    </span>
                  </label>
                  <label className="hidden item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-183688 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="46"
                      data-option-id="183688"
                    />
                    <span className="text-xs text-gray-600 pl-3">
                      Windows 10 Pro
                    </span>
                  </label>
                  <label className="hidden item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-444866 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="46"
                      data-option-id="444866"
                    />
                    <span className="text-xs text-gray-600 pl-3">FreDOS</span>
                  </label>
                  <label className="hidden item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-453995 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="46"
                      data-option-id="453995"
                    />
                    <span className="text-xs text-gray-600 pl-3">FreeDOS,</span>
                  </label>
                </ul>
                <ul className=" group product-spec-group select-none border-b">
                  <li className="px-4 py-2 name d-flex flex-row justify-content-between align-items-center hover:cursor-pointer">
                    <span className="sub-spec-name font-normal text-xs text-gray-600">
                      Pesha [kg]
                    </span>
                    <i className="icon-chevron-line-down text-base text-gray-600 transform transition-all"></i>
                  </li>
                  <label className="hidden item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-185204 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="58"
                      data-option-id="185204"
                    />
                    <span className="text-xs text-gray-600 pl-3">1.4</span>
                  </label>
                  <label className="hidden item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-185396 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="58"
                      data-option-id="185396"
                    />
                    <span className="text-xs text-gray-600 pl-3">2.4</span>
                  </label>
                  <label className="hidden item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-351307 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="58"
                      data-option-id="351307"
                    />
                    <span className="text-xs text-gray-600 pl-3">1.65</span>
                  </label>
                  <label className="hidden item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-185206 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="58"
                      data-option-id="185206"
                    />
                    <span className="text-xs text-gray-600 pl-3">2.3</span>
                  </label>
                  <label className="hidden item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-185210 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="58"
                      data-option-id="185210"
                    />
                    <span className="text-xs text-gray-600 pl-3">1.62</span>
                  </label>
                  <label className="hidden item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-349423 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="58"
                      data-option-id="349423"
                    />
                    <span className="text-xs text-gray-600 pl-3">2.25</span>
                  </label>
                  <label className="hidden item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-185570 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="58"
                      data-option-id="185570"
                    />
                    <span className="text-xs text-gray-600 pl-3">1.12</span>
                  </label>
                  <label className="hidden item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-184518 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="58"
                      data-option-id="184518"
                    />
                    <span className="text-xs text-gray-600 pl-3">1,7</span>
                  </label>
                  <label className="hidden item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-184927 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="58"
                      data-option-id="184927"
                    />
                    <span className="text-xs text-gray-600 pl-3">2,23</span>
                  </label>
                  <label className="hidden item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-185041 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="58"
                      data-option-id="185041"
                    />
                    <span className="text-xs text-gray-600 pl-3">1,89</span>
                  </label>
                  <label className="hidden item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-185397 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="58"
                      data-option-id="185397"
                    />
                    <span className="text-xs text-gray-600 pl-3">1.26</span>
                  </label>
                  <label className="hidden item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-455030 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="58"
                      data-option-id="455030"
                    />
                    <span className="text-xs text-gray-600 pl-3">2.10</span>
                  </label>
                  <label className="hidden item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-455041 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="58"
                      data-option-id="455041"
                    />
                    <span className="text-xs text-gray-600 pl-3">1.97</span>
                  </label>
                  <label className="hidden item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-184496 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="58"
                      data-option-id="184496"
                    />
                    <span className="text-xs text-gray-600 pl-3">2.98</span>
                  </label>
                  <label className="hidden item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-184512 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="58"
                      data-option-id="184512"
                    />
                    <span className="text-xs text-gray-600 pl-3">1,58</span>
                  </label>
                  <label className="hidden item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-185193 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="58"
                      data-option-id="185193"
                    />
                    <span className="text-xs text-gray-600 pl-3">1.1</span>
                  </label>
                  <label className="hidden item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-185222 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="58"
                      data-option-id="185222"
                    />
                    <span className="text-xs text-gray-600 pl-3">1.25</span>
                  </label>
                  <label className="hidden item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-185405 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="58"
                      data-option-id="185405"
                    />
                    <span className="text-xs text-gray-600 pl-3">1.24</span>
                  </label>
                  <label className="hidden item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-342514 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="58"
                      data-option-id="342514"
                    />
                    <span className="text-xs text-gray-600 pl-3">1.81</span>
                  </label>
                  <label className="hidden item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-439668 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="58"
                      data-option-id="439668"
                    />
                    <span className="text-xs text-gray-600 pl-3">2.315</span>
                  </label>
                  <label className="hidden item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-184287 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="58"
                      data-option-id="184287"
                    />
                    <span className="text-xs text-gray-600 pl-3">1,43</span>
                  </label>
                  <label className="hidden item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-184408 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="58"
                      data-option-id="184408"
                    />
                    <span className="text-xs text-gray-600 pl-3">1,65</span>
                  </label>
                  <label className="hidden item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-184454 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="58"
                      data-option-id="184454"
                    />
                    <span className="text-xs text-gray-600 pl-3">2,45</span>
                  </label>
                  <label className="hidden item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-184455 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="58"
                      data-option-id="184455"
                    />
                    <span className="text-xs text-gray-600 pl-3">1</span>
                  </label>
                  <label className="hidden item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-184659 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="58"
                      data-option-id="184659"
                    />
                    <span className="text-xs text-gray-600 pl-3">1,32</span>
                  </label>
                  <label className="hidden item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-184800 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="58"
                      data-option-id="184800"
                    />
                    <span className="text-xs text-gray-600 pl-3">1,95</span>
                  </label>
                  <label className="hidden item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-185181 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="58"
                      data-option-id="185181"
                    />
                    <span className="text-xs text-gray-600 pl-3">1.3</span>
                  </label>
                  <label className="hidden item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-185223 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="58"
                      data-option-id="185223"
                    />
                    <span className="text-xs text-gray-600 pl-3">2.1</span>
                  </label>
                  <label className="hidden item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-185457 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="58"
                      data-option-id="185457"
                    />
                    <span className="text-xs text-gray-600 pl-3">1.18</span>
                  </label>
                  <label className="hidden item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-185553 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="58"
                      data-option-id="185553"
                    />
                    <span className="text-xs text-gray-600 pl-3">1.78</span>
                  </label>
                  <label className="hidden item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-185768 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="58"
                      data-option-id="185768"
                    />
                    <span className="text-xs text-gray-600 pl-3">1.66</span>
                  </label>
                  <label className="hidden item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-185854 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="58"
                      data-option-id="185854"
                    />
                    <span className="text-xs text-gray-600 pl-3">1.38</span>
                  </label>
                  <label className="hidden item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-345054 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="58"
                      data-option-id="345054"
                    />
                    <span className="text-xs text-gray-600 pl-3">0,597</span>
                  </label>
                  <label className="hidden item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-399351 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="58"
                      data-option-id="399351"
                    />
                    <span className="text-xs text-gray-600 pl-3">2.26</span>
                  </label>
                  <label className="hidden item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-455407 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="58"
                      data-option-id="455407"
                    />
                    <span className="text-xs text-gray-600 pl-3">2.23</span>
                  </label>
                  <label className="hidden item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-456776 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="58"
                      data-option-id="456776"
                    />
                    <span className="text-xs text-gray-600 pl-3">1.36</span>
                  </label>
                  <label className="hidden item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-184477 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="58"
                      data-option-id="184477"
                    />
                    <span className="text-xs text-gray-600 pl-3">1,28</span>
                  </label>
                  <label className="hidden item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-184510 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="58"
                      data-option-id="184510"
                    />
                    <span className="text-xs text-gray-600 pl-3">1,31</span>
                  </label>
                  <label className="hidden item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-184678 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="58"
                      data-option-id="184678"
                    />
                    <span className="text-xs text-gray-600 pl-3">1,63</span>
                  </label>
                  <label className="hidden item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-184741 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="58"
                      data-option-id="184741"
                    />
                    <span className="text-xs text-gray-600 pl-3">1,76</span>
                  </label>
                  <label className="hidden item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-184984 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="58"
                      data-option-id="184984"
                    />
                    <span className="text-xs text-gray-600 pl-3">0,31</span>
                  </label>
                  <label className="hidden item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-185180 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="58"
                      data-option-id="185180"
                    />
                    <span className="text-xs text-gray-600 pl-3">1.2</span>
                  </label>
                  <label className="hidden item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-185192 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="58"
                      data-option-id="185192"
                    />
                    <span className="text-xs text-gray-600 pl-3">1.35</span>
                  </label>
                  <label className="hidden item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-185212 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="58"
                      data-option-id="185212"
                    />
                    <span className="text-xs text-gray-600 pl-3">1.69</span>
                  </label>
                  <label className="hidden item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-185231 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="58"
                      data-option-id="185231"
                    />
                    <span className="text-xs text-gray-600 pl-3">2.02</span>
                  </label>
                  <label className="hidden item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-185235 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="58"
                      data-option-id="185235"
                    />
                    <span className="text-xs text-gray-600 pl-3">1.6</span>
                  </label>
                  <label className="hidden item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-185426 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="58"
                      data-option-id="185426"
                    />
                    <span className="text-xs text-gray-600 pl-3">1.55</span>
                  </label>
                  <label className="hidden item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-185429 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="58"
                      data-option-id="185429"
                    />
                    <span className="text-xs text-gray-600 pl-3">1.74</span>
                  </label>
                  <label className="hidden item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-185462 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="58"
                      data-option-id="185462"
                    />
                    <span className="text-xs text-gray-600 pl-3">1.5</span>
                  </label>
                  <label className="hidden item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-185463 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="58"
                      data-option-id="185463"
                    />
                    <span className="text-xs text-gray-600 pl-3">1.75</span>
                  </label>
                  <label className="hidden item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-185495 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="58"
                      data-option-id="185495"
                    />
                    <span className="text-xs text-gray-600 pl-3">0.47</span>
                  </label>
                  <label className="hidden item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-185516 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="58"
                      data-option-id="185516"
                    />
                    <span className="text-xs text-gray-600 pl-3">1.77</span>
                  </label>
                  <label className="hidden item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-185540 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="58"
                      data-option-id="185540"
                    />
                    <span className="text-xs text-gray-600 pl-3">0.5</span>
                  </label>
                  <label className="hidden item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-185597 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="58"
                      data-option-id="185597"
                    />
                    <span className="text-xs text-gray-600 pl-3">1.39</span>
                  </label>
                  <label className="hidden item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-185611 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="58"
                      data-option-id="185611"
                    />
                    <span className="text-xs text-gray-600 pl-3">1.19</span>
                  </label>
                  <label className="hidden item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-185615 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="58"
                      data-option-id="185615"
                    />
                    <span className="text-xs text-gray-600 pl-3">2,25</span>
                  </label>
                  <label className="hidden item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-185650 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="58"
                      data-option-id="185650"
                    />
                    <span className="text-xs text-gray-600 pl-3">2,49</span>
                  </label>
                  <label className="hidden item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-185736 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="58"
                      data-option-id="185736"
                    />
                    <span className="text-xs text-gray-600 pl-3">1,93</span>
                  </label>
                  <label className="hidden item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-185850 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="58"
                      data-option-id="185850"
                    />
                    <span className="text-xs text-gray-600 pl-3">1.67</span>
                  </label>
                  <label className="hidden item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-185865 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="58"
                      data-option-id="185865"
                    />
                    <span className="text-xs text-gray-600 pl-3">1.09</span>
                  </label>
                  <label className="hidden item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-343734 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="58"
                      data-option-id="343734"
                    />
                    <span className="text-xs text-gray-600 pl-3">1,06</span>
                  </label>
                  <label className="hidden item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-370562 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="58"
                      data-option-id="370562"
                    />
                    <span className="text-xs text-gray-600 pl-3">1.7</span>
                  </label>
                  <label className="hidden item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-388793 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="58"
                      data-option-id="388793"
                    />
                    <span className="text-xs text-gray-600 pl-3">0.91</span>
                  </label>
                  <label className="hidden item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-398477 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="58"
                      data-option-id="398477"
                    />
                    <span className="text-xs text-gray-600 pl-3">1.53</span>
                  </label>
                  <label className="hidden item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-445499 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="58"
                      data-option-id="445499"
                    />
                    <span className="text-xs text-gray-600 pl-3">2.49</span>
                  </label>
                  <label className="hidden item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-455399 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="58"
                      data-option-id="455399"
                    />
                    <span className="text-xs text-gray-600 pl-3">1.43</span>
                  </label>
                  <label className="hidden item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-456782 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="58"
                      data-option-id="456782"
                    />
                    <span className="text-xs text-gray-600 pl-3">3.60</span>
                  </label>
                  <label className="hidden item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-457488 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="58"
                      data-option-id="457488"
                    />
                    <span className="text-xs text-gray-600 pl-3">1.190</span>
                  </label>
                  <label className="hidden item d-flex align-items-center px-4 pb-2 hover:cursor-pointer">
                    <input
                      id="attribute-option-459261 bg-gray checkbox-bg"
                      type="checkbox"
                      data-spec-id="58"
                      data-option-id="459261"
                    />
                    <span className="text-xs text-gray-600 pl-3">1.06</span>
                  </label>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="center-2">
          <div className="page search-page">
            <div className="page-body">
              <div className="search-input hidden">
                <form method="get" action="/search">
                  <div className="fieldset">
                    <div className="form-fields">
                      <div className="basic-search">
                        <div className="inputs">
                          <label htmlFor="q">Kërko fjalët kyçe:</label>
                          <input
                            className="search-text"
                            type="text"
                            id="q"
                            name="q"
                            value="laptop lenovo"
                          />
                        </div>
                        <div className="inputs reversed">
                          <input
                            type="checkbox"
                            data-val="true"
                            data-val-required="The Kërkim i avancuar field is required."
                            id="advs"
                            name="advs"
                            value="true"
                          />
                          <label htmlFor="advs">Kërkim i avancuar</label>
                        </div>
                      </div>
                      <div
                        className="advanced-search"
                        id="advanced-search-block"
                        style={{ display: 'none' }}
                      >
                        <div className="inputs reversed">
                          <input
                            type="checkbox"
                            data-val="true"
                            data-val-required="The Kërko në përshkrim të produktit field is required."
                            id="sid"
                            name="sid"
                            value="true"
                          />
                          <label htmlFor="sid">
                            Kërko në përshkrim të produktit
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="buttons">
                    <button type="submit" className="button-1 search-button">
                      Kërko
                    </button>
                  </div>
                  <input name="advs" type="hidden" value="false" />
                  <input name="sid" type="hidden" value="false" />
                </form>
              </div>
              <div className="product-selectors d-flex align-items-center h-10 sticky top-[3.4rem] md:top-0 md:relative z-50 mb-4 bg-gray-100">
                <div className="d-flex w-100  gap-2 flex-col md:flex-row justify-content-between">
                  <div className=" md:flex align-items-center">
                    <span className="d-flex gap-1 text-xs font-medium text-gray-700 align-items-center whitespace-nowrap">
                      <span id="search-total-hits-count">
                        {searchResults?.length}
                      </span>
                      {searchResults?.length && searchResults?.length > 1
                        ? 'produkte të gjetura për'
                        : 'product i gjetur për'}

                      <span>"{searchQuery}"</span>
                    </span>
                  </div>
                  <div className="d-flex gap-2">
                    <div className="select shadow-sm w-100  md:w-52">
                      <div className="selectWrapper">
                        <div className="selectCustom js-selectCustom">
                          <CustomDropdown />
                        </div>
                      </div>
                    </div>
                    {/* <div
                      id="product-filters"
                      className="bg-white z-20 shadow-sm border border-primary rounded d-flex md:hidden align-items-center justify-content-center cursor-pointer px-4 text-xs font-medium text-primary"
                    >
                      <i className="icon-filter-drag text-xl pr-1"></i>
                      Filtro
                    </div> */}
                  </div>
                </div>
              </div>
              <div className="search-results d-flex flex-col">
                <div className="products-container">
                  <div className="products-wrapper">
                    <div className="product-grid">
                      <div className="item-grid grid md:grid-cols-4 gap-2 grid-cols-2">
                        <div
                          className="item-box"
                          id="item-box-74551"
                          data-position="1"
                        >
                          <div
                            className="product-item bg-white p-2 md:p-3 position-relative shadow-sm hover:shadow-md rounded h-100 overflow-hidden d-flex flex-col justify-content-between"
                            data-productid="74551"
                          >
                            {searchResults?.map((result) => (
                              <div
                                className="product-item bg-white p-2 md:p-3 position-relative shadow-sm hover:shadow-md rounded h-100 overflow-hidden d-flex flex-col justify-content-between"
                                data-productid="74551"
                              >
                                <div className="position-absolute h-6 top-2.5 left-0 pr-3 pl-3 tablet:pl-0 d-flex tablet:flex-row gap-1 tablet:gap-0 tablet:items-center tablet:flex-wrap z-10 w-100 flex-row">
                                  <div className="w-10 h-[19px] bg-primary discount__label d-flex justify-content-center align-items-center rounded position-absolute right-3 top-[1px] shadow-sm text-white text-xs font-medium">
                                    -17%
                                  </div>
                                </div>
                                <div className="picture position-relative px-4 pt-6">
                                  <a
                                    className="position-relative block"
                                    href={`product/${result.id}`}
                                    title="Shfaq detaje për Laptop Lenovo IdeaPad Gaming 3 15ACH6, 15.6'', AMD Ryzen 5, 16GB RAM, 512 GB SSD, NVIDIA GeForce RTX 3060, i zi"
                                  >
                                    <img
                                      loading="lazy"
                                      className="position-absolute top-0 right-0 bottom-0 left-0 m-auto transition-all duration-300 max-h-full max-w-full object-contain"
                                      alt="Foto e Laptop Lenovo IdeaPad Gaming 3 15ACH6, 15.6'', AMD Ryzen 5, 16GB RAM, 512 GB SSD, NVIDIA GeForce RTX 3060, i zi"
                                      src="https://hhstsyoejx.gjirafa.net/gjirafa50core/images/489504/thumb/489504.jpeg"
                                      srcSet="https://hhstsyoejx.gjirafa.net/gjirafa50core/images/489504/489504.webp?w=190"
                                    />
                                  </a>
                                </div>
                                <div className="details d-flex flex-col h-100 justify-content-between pb-2">
                                  <h2 className="product-title">
                                    <a
                                      className="text-gray-700  md:text-base product-title-lines hover:underline"
                                      title="Apple iPhone 15, 128GB, Black"
                                      //  onclick="produceClickedProductEvent('',160697)"
                                      href={`product/${result.id}`}
                                    >
                                      {title}
                                    </a>
                                  </h2>
                                  <div className="prices d-flex flex-col h-12 position-relative">
                                    <span className="price font-semibold text-gray-700 text-base md:text-xl">
                                      {result.priceDiscount.toFixed(2)} €
                                    </span>
                                    <span className="price old-price text-gray-600 font-medium text-sm line-through">
                                      {result.price.toFixed(2)} €
                                    </span>
                                  </div>
                                  <div className="d-flex flex-col pt-2 justify-content-between lg:flex-row">
                                    <span className="text-xs text-gray-600">
                                      Përfshirë TVSH
                                    </span>
                                  </div>
                                </div>
                                <div className="buttons d-flex justify-evenly gap-2">
                                  <button

                                    onClick={() =>
                                      addToCartHandler({ productId: result.id, quantity: 1, price: result.priceDiscount })
                                    }
                                    aria-label="Shto në shportë"
                                    id="add-to-cart-(74551)"
                                    className="product-box-add-to-cart-button d-flex gap-2 align-items-center btn-primary-hover hover:bg-primary hover:text-white justify-content-center md:flex-grow w-1/2 focus:outline-none focus:border-none focus:text-white btn-simple btn-secondary"
                                  >
                                    <i className="icon-cart-shopping icon-line-height text-2xl md:hidden">
                                      <FontAwesomeIcon icon={faShoppingCart} />
                                    </i>
                                    <span className="hidden md:grid text-xs font-medium">
                                      Shto në shportë
                                    </span>
                                  </button>
                                  <button
                                    type="button"
                                    id="add-to-wishlisht-(74551)"
                                    value="Shto në listën e dëshirave"
                                    title="Shto në listën e dëshirave"
                                    style={{ border: 'none' }}
                                    onClick={() => createWishlistProductHandler(result.id)}
                                    className="group hover:bg-primary w-1/2 md:w-auto add-to-wishlist-button btn-primary-hover hover:text-white focus:outline-none btn btn-secondary focus:text-white"
                                  >
                                    <i className="icon-heart icon-line-height text-2xl group-hover:text-white">
                                      <FontAwesomeIcon icon={faHeart} />
                                    </i>
                                  </button>
                                </div>
                              </div>
                            ))}

                            <div className="picture position-relative px-4 pt-6">
                              <a
                                className="position-relative block"
                                href="/kompjuter-laptop-server/laptop-6/gaming-14/laptop-lenovo-ideapad-gaming-3-15ach6-156-amd-ryzen-5-16gb-ram-512-gb-ssd-nvidia-geforce-rtx-3060-i-zi"
                                title="Shfaq detaje për Laptop Lenovo IdeaPad Gaming 3 15ACH6, 15.6'', AMD Ryzen 5, 16GB RAM, 512 GB SSD, NVIDIA GeForce RTX 3060, i zi"
                              >
                                <img
                                  loading="lazy"
                                  className="position-absolute top-0 right-0 bottom-0 left-0 m-auto transition-all duration-300 max-h-full max-w-full object-contain"
                                  alt="Foto e Laptop Lenovo IdeaPad Gaming 3 15ACH6, 15.6'', AMD Ryzen 5, 16GB RAM, 512 GB SSD, NVIDIA GeForce RTX 3060, i zi"
                                  src="https://hhstsyoejx.gjirafa.net/gjirafa50core/images/489504/thumb/489504.jpeg"
                                  srcSet="https://hhstsyoejx.gjirafa.net/gjirafa50core/images/489504/489504.webp?w=190"
                                />
                              </a>
                            </div>
                            <div className="details d-flex flex-col h-100 justify-content-between pb-2">
                              <h2 className="product-title">
                                <a
                                  className="text-gray-700 text-sm md:text-base product-title-lines hover:underline"
                                  title="Laptop Lenovo IdeaPad Gaming 3 15ACH6, 15.6'', AMD Ryzen 5, 16GB RAM, 512 GB SSD, NVIDIA GeForce RTX 3060, i zi"
                                  href="/kompjuter-laptop-server/laptop-6/gaming-14/laptop-lenovo-ideapad-gaming-3-15ach6-156-amd-ryzen-5-16gb-ram-512-gb-ssd-nvidia-geforce-rtx-3060-i-zi"
                                >
                                  Laptop Lenovo IdeaPad Gaming 3 15ACH6, 15.6'',
                                  AMD Ryzen 5, 16GB RAM, 512 GB SSD, NVIDIA
                                  GeForce RTX 3060, i zi
                                </a>
                              </h2>
                              <div className="prices d-flex flex-col h-12 position-relative">
                                <span className="price font-semibold text-gray-700 text-base md:text-xl">
                                  999.50 €
                                </span>
                                <span className="price old-price text-gray-600 font-medium text-sm line-through">
                                  1,192.50 €
                                </span>
                              </div>
                              <div className="d-flex flex-col pt-2 justify-content-between lg:flex-row">
                                <span className="text-xs text-gray-600">
                                  Përfshirë TVSH
                                </span>
                              </div>
                            </div>
                            <div className="buttons d-flex justify-evenly gap-2">
                              <button
                                aria-label="Shto në shportë"
                                id="add-to-cart-(74551)"
                                className="product-box-add-to-cart-button d-flex gap-2 align-items-center btn-primary-hover hover:bg-primary hover:text-white justify-content-center md:flex-grow w-1/2 focus:outline-none focus:border-none focus:text-white btn-simple btn-secondary"
                              >
                                <i className="icon-cart-shopping icon-line-height text-2xl md:hidden">
                                  <FontAwesomeIcon icon={faShoppingCart} />
                                </i>
                                <span className="hidden md:grid text-xs font-medium">
                                  Shto në shportë
                                </span>
                              </button>
                              <button
                                type="button"
                                id="add-to-wishlisht-(74551)"
                                value="Shto në listën e dëshirave"
                                title="Shto në listën e dëshirave"
                                className="group hover:bg-primary w-1/2 md:w-auto add-to-wishlist-button btn-primary-hover hover:text-white focus:outline-none btn btn-secondary focus:text-white"
                              >
                                <i className="icon-heart icon-line-height text-2xl group-hover:text-white">
                                  <FontAwesomeIcon icon={faHeart} />
                                </i>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div
                          className="item-box"
                          id="item-box-74551"
                          data-position="1"
                        >
                          <div
                            className="product-item bg-white p-2 md:p-3 position-relative shadow-sm hover:shadow-md rounded h-100 overflow-hidden d-flex flex-col justify-content-between"
                            data-productid="74551"
                          >
                            <div className="position-absolute h-6 top-2.5 left-0 pr-3 pl-3 tablet:pl-0 d-flex tablet:flex-row gap-1 tablet:gap-0 tablet:items-center tablet:flex-wrap z-10 w-100 flex-row">
                              <div className="w-10 h-[19px] bg-primary discount__label d-flex justify-content-center align-items-center rounded position-absolute right-3 top-[1px] shadow-sm text-white text-xs font-medium">
                                -17%
                              </div>
                            </div>
                            <div className="picture position-relative px-4 pt-6">
                              <a
                                className="position-relative block"
                                href="/kompjuter-laptop-server/laptop-6/gaming-14/laptop-lenovo-ideapad-gaming-3-15ach6-156-amd-ryzen-5-16gb-ram-512-gb-ssd-nvidia-geforce-rtx-3060-i-zi"
                                title="Shfaq detaje për Laptop Lenovo IdeaPad Gaming 3 15ACH6, 15.6'', AMD Ryzen 5, 16GB RAM, 512 GB SSD, NVIDIA GeForce RTX 3060, i zi"
                              >
                                <img
                                  loading="lazy"
                                  className="position-absolute top-0 right-0 bottom-0 left-0 m-auto transition-all duration-300 max-h-full max-w-full object-contain"
                                  alt="Foto e Laptop Lenovo IdeaPad Gaming 3 15ACH6, 15.6'', AMD Ryzen 5, 16GB RAM, 512 GB SSD, NVIDIA GeForce RTX 3060, i zi"
                                  src="https://hhstsyoejx.gjirafa.net/gjirafa50core/images/489504/thumb/489504.jpeg"
                                  srcSet="https://hhstsyoejx.gjirafa.net/gjirafa50core/images/489504/489504.webp?w=190"
                                />
                              </a>
                            </div>
                            <div className="details d-flex flex-col h-100 justify-content-between pb-2">
                              <h2 className="product-title">
                                <a
                                  className="text-gray-700 text-sm md:text-base product-title-lines hover:underline"
                                  title="Laptop Lenovo IdeaPad Gaming 3 15ACH6, 15.6'', AMD Ryzen 5, 16GB RAM, 512 GB SSD, NVIDIA GeForce RTX 3060, i zi"
                                  href="/kompjuter-laptop-server/laptop-6/gaming-14/laptop-lenovo-ideapad-gaming-3-15ach6-156-amd-ryzen-5-16gb-ram-512-gb-ssd-nvidia-geforce-rtx-3060-i-zi"
                                >
                                  Laptop Lenovo IdeaPad Gaming 3 15ACH6, 15.6'',
                                  AMD Ryzen 5, 16GB RAM, 512 GB SSD, NVIDIA
                                  GeForce RTX 3060, i zi
                                </a>
                              </h2>
                              <div className="prices d-flex flex-col h-12 position-relative">
                                <span className="price font-semibold text-gray-700 text-base md:text-xl">
                                  999.50 €
                                </span>
                                <span className="price old-price text-gray-600 font-medium text-sm line-through">
                                  1,192.50 €
                                </span>
                              </div>
                              <div className="d-flex flex-col pt-2 justify-content-between lg:flex-row">
                                <span className="text-xs text-gray-600">
                                  Përfshirë TVSH
                                </span>
                              </div>
                            </div>
                            <div className="buttons d-flex justify-evenly gap-2">
                              <button
                                aria-label="Shto në shportë"
                                id="add-to-cart-(74551)"
                                className="product-box-add-to-cart-button d-flex gap-2 align-items-center btn-primary-hover hover:bg-primary hover:text-white justify-content-center md:flex-grow w-1/2 focus:outline-none focus:border-none focus:text-white btn-simple btn-secondary"
                              >
                                <i className="icon-cart-shopping icon-line-height text-2xl md:hidden">
                                  <FontAwesomeIcon icon={faShoppingCart} />
                                </i>
                                <span className="hidden md:grid text-xs font-medium">
                                  Shto në shportë
                                </span>
                              </button>
                              <button
                                type="button"
                                id="add-to-wishlisht-(74551)"
                                value="Shto në listën e dëshirave"
                                title="Shto në listën e dëshirave"
                                className="group hover:bg-primary w-1/2 md:w-auto add-to-wishlist-button btn-primary-hover hover:text-white focus:outline-none btn btn-secondary focus:text-white"
                              >
                                <i className="icon-heart icon-line-height text-2xl group-hover:text-white">
                                  <FontAwesomeIcon icon={faHeart} />
                                </i>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div
                          className="item-box"
                          id="item-box-74551"
                          data-position="1"
                        >
                          <div
                            className="product-item bg-white p-2 md:p-3 position-relative shadow-sm hover:shadow-md rounded h-100 overflow-hidden d-flex flex-col justify-content-between"
                            data-productid="74551"
                          >
                            <div className="position-absolute h-6 top-2.5 left-0 pr-3 pl-3 tablet:pl-0 d-flex tablet:flex-row gap-1 tablet:gap-0 tablet:items-center tablet:flex-wrap z-10 w-100 flex-row">
                              <div className="w-10 h-[19px] bg-primary discount__label d-flex justify-content-center align-items-center rounded position-absolute right-3 top-[1px] shadow-sm text-white text-xs font-medium">
                                -17%
                              </div>
                            </div>
                            <div className="picture position-relative px-4 pt-6">
                              <a
                                className="position-relative block"
                                href="/kompjuter-laptop-server/laptop-6/gaming-14/laptop-lenovo-ideapad-gaming-3-15ach6-156-amd-ryzen-5-16gb-ram-512-gb-ssd-nvidia-geforce-rtx-3060-i-zi"
                                title="Shfaq detaje për Laptop Lenovo IdeaPad Gaming 3 15ACH6, 15.6'', AMD Ryzen 5, 16GB RAM, 512 GB SSD, NVIDIA GeForce RTX 3060, i zi"
                              >
                                <img
                                  loading="lazy"
                                  className="position-absolute top-0 right-0 bottom-0 left-0 m-auto transition-all duration-300 max-h-full max-w-full object-contain"
                                  alt="Foto e Laptop Lenovo IdeaPad Gaming 3 15ACH6, 15.6'', AMD Ryzen 5, 16GB RAM, 512 GB SSD, NVIDIA GeForce RTX 3060, i zi"
                                  src="https://hhstsyoejx.gjirafa.net/gjirafa50core/images/489504/thumb/489504.jpeg"
                                  srcSet="https://hhstsyoejx.gjirafa.net/gjirafa50core/images/489504/489504.webp?w=190"
                                />
                              </a>
                            </div>
                            <div className="details d-flex flex-col h-100 justify-content-between pb-2">
                              <h2 className="product-title">
                                <a
                                  className="text-gray-700 text-sm md:text-base product-title-lines hover:underline"
                                  title="Laptop Lenovo IdeaPad Gaming 3 15ACH6, 15.6'', AMD Ryzen 5, 16GB RAM, 512 GB SSD, NVIDIA GeForce RTX 3060, i zi"
                                  href="/kompjuter-laptop-server/laptop-6/gaming-14/laptop-lenovo-ideapad-gaming-3-15ach6-156-amd-ryzen-5-16gb-ram-512-gb-ssd-nvidia-geforce-rtx-3060-i-zi"
                                >
                                  Laptop Lenovo IdeaPad Gaming 3 15ACH6, 15.6'',
                                  AMD Ryzen 5, 16GB RAM, 512 GB SSD, NVIDIA
                                  GeForce RTX 3060, i zi
                                </a>
                              </h2>
                              <div className="prices d-flex flex-col h-12 position-relative">
                                <span className="price font-semibold text-gray-700 text-base md:text-xl">
                                  999.50 €
                                </span>
                                <span className="price old-price text-gray-600 font-medium text-sm line-through">
                                  1,192.50 €
                                </span>
                              </div>
                              <div className="d-flex flex-col pt-2 justify-content-between lg:flex-row">
                                <span className="text-xs text-gray-600">
                                  Përfshirë TVSH
                                </span>
                              </div>
                            </div>
                            <div className="buttons d-flex justify-evenly gap-2">
                              <button
                                aria-label="Shto në shportë"
                                id="add-to-cart-(74551)"
                                className="product-box-add-to-cart-button d-flex gap-2 align-items-center btn-primary-hover hover:bg-primary hover:text-white justify-content-center md:flex-grow w-1/2 focus:outline-none focus:border-none focus:text-white btn-simple btn-secondary"
                              >
                                <i className="icon-cart-shopping icon-line-height text-2xl md:hidden">
                                  <FontAwesomeIcon icon={faShoppingCart} />
                                </i>
                                <span className="hidden md:grid text-xs font-medium">
                                  Shto në shportë
                                </span>
                              </button>
                              <button
                                type="button"
                                id="add-to-wishlisht-(74551)"
                                value="Shto në listën e dëshirave"
                                title="Shto në listën e dëshirave"
                                className="group hover:bg-primary w-1/2 md:w-auto add-to-wishlist-button btn-primary-hover hover:text-white focus:outline-none btn btn-secondary focus:text-white"
                              >
                                <i className="icon-heart icon-line-height text-2xl group-hover:text-white">
                                  <FontAwesomeIcon icon={faHeart} />
                                </i>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div
                          className="item-box"
                          id="item-box-74551"
                          data-position="1"
                        >
                          <div
                            className="product-item bg-white p-2 md:p-3 position-relative shadow-sm hover:shadow-md rounded h-100 overflow-hidden d-flex flex-col justify-content-between"
                            data-productid="74551"
                          >
                            <div className="position-absolute h-6 top-2.5 left-0 pr-3 pl-3 tablet:pl-0 d-flex tablet:flex-row gap-1 tablet:gap-0 tablet:items-center tablet:flex-wrap z-10 w-100 flex-row">
                              <div className="w-10 h-[19px] bg-primary discount__label d-flex justify-content-center align-items-center rounded position-absolute right-3 top-[1px] shadow-sm text-white text-xs font-medium">
                                -17%
                              </div>
                            </div>
                            <div className="picture position-relative px-4 pt-6">
                              <a
                                className="position-relative block"
                                href="/kompjuter-laptop-server/laptop-6/gaming-14/laptop-lenovo-ideapad-gaming-3-15ach6-156-amd-ryzen-5-16gb-ram-512-gb-ssd-nvidia-geforce-rtx-3060-i-zi"
                                title="Shfaq detaje për Laptop Lenovo IdeaPad Gaming 3 15ACH6, 15.6'', AMD Ryzen 5, 16GB RAM, 512 GB SSD, NVIDIA GeForce RTX 3060, i zi"
                              >
                                <img
                                  loading="lazy"
                                  className="position-absolute top-0 right-0 bottom-0 left-0 m-auto transition-all duration-300 max-h-full max-w-full object-contain"
                                  alt="Foto e Laptop Lenovo IdeaPad Gaming 3 15ACH6, 15.6'', AMD Ryzen 5, 16GB RAM, 512 GB SSD, NVIDIA GeForce RTX 3060, i zi"
                                  src="https://hhstsyoejx.gjirafa.net/gjirafa50core/images/489504/thumb/489504.jpeg"
                                  srcSet="https://hhstsyoejx.gjirafa.net/gjirafa50core/images/489504/489504.webp?w=190"
                                />
                              </a>
                            </div>
                            <div className="details d-flex flex-col h-100 justify-content-between pb-2">
                              <h2 className="product-title">
                                <a
                                  className="text-gray-700 text-sm md:text-base product-title-lines hover:underline"
                                  title="Laptop Lenovo IdeaPad Gaming 3 15ACH6, 15.6'', AMD Ryzen 5, 16GB RAM, 512 GB SSD, NVIDIA GeForce RTX 3060, i zi"
                                  href="/kompjuter-laptop-server/laptop-6/gaming-14/laptop-lenovo-ideapad-gaming-3-15ach6-156-amd-ryzen-5-16gb-ram-512-gb-ssd-nvidia-geforce-rtx-3060-i-zi"
                                >
                                  Laptop Lenovo IdeaPad Gaming 3 15ACH6, 15.6'',
                                  AMD Ryzen 5, 16GB RAM, 512 GB SSD, NVIDIA
                                  GeForce RTX 3060, i zi
                                </a>
                              </h2>
                              <div className="prices d-flex flex-col h-12 position-relative">
                                <span className="price font-semibold text-gray-700 text-base md:text-xl">
                                  999.50 €
                                </span>
                                <span className="price old-price text-gray-600 font-medium text-sm line-through">
                                  1,192.50 €
                                </span>
                              </div>
                              <div className="d-flex flex-col pt-2 justify-content-between lg:flex-row">
                                <span className="text-xs text-gray-600">
                                  Përfshirë TVSH
                                </span>
                              </div>
                            </div>
                            <div className="buttons d-flex justify-evenly gap-2">
                              <button
                                aria-label="Shto në shportë"
                                id="add-to-cart-(74551)"
                                className="product-box-add-to-cart-button d-flex gap-2 align-items-center btn-primary-hover hover:bg-primary hover:text-white justify-content-center md:flex-grow w-1/2 focus:outline-none focus:border-none focus:text-white btn-simple btn-secondary"
                              >
                                <i className="icon-cart-shopping icon-line-height text-2xl md:hidden">
                                  <FontAwesomeIcon icon={faShoppingCart} />
                                </i>
                                <span className="hidden md:grid text-xs font-medium">
                                  Shto në shportë
                                </span>
                              </button>
                              <button
                                type="button"
                                id="add-to-wishlisht-(74551)"
                                value="Shto në listën e dëshirave"
                                title="Shto në listën e dëshirave"
                                className="group hover:bg-primary w-1/2 md:w-auto add-to-wishlist-button btn-primary-hover hover:text-white focus:outline-none btn btn-secondary focus:text-white"
                              >
                                <i className="icon-heart icon-line-height text-2xl group-hover:text-white">
                                  <FontAwesomeIcon icon={faHeart} />
                                </i>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div
                          className="item-box"
                          id="item-box-74551"
                          data-position="1"
                        >
                          <div
                            className="product-item bg-white p-2 md:p-3 position-relative shadow-sm hover:shadow-md rounded h-100 overflow-hidden d-flex flex-col justify-content-between"
                            data-productid="74551"
                          >
                            <div className="position-absolute h-6 top-2.5 left-0 pr-3 pl-3 tablet:pl-0 d-flex tablet:flex-row gap-1 tablet:gap-0 tablet:items-center tablet:flex-wrap z-10 w-100 flex-row">
                              <div className="w-10 h-[19px] bg-primary discount__label d-flex justify-content-center align-items-center rounded position-absolute right-3 top-[1px] shadow-sm text-white text-xs font-medium">
                                -17%
                              </div>
                            </div>
                            <div className="picture position-relative px-4 pt-6">
                              <a
                                className="position-relative block"
                                href="/kompjuter-laptop-server/laptop-6/gaming-14/laptop-lenovo-ideapad-gaming-3-15ach6-156-amd-ryzen-5-16gb-ram-512-gb-ssd-nvidia-geforce-rtx-3060-i-zi"
                                title="Shfaq detaje për Laptop Lenovo IdeaPad Gaming 3 15ACH6, 15.6'', AMD Ryzen 5, 16GB RAM, 512 GB SSD, NVIDIA GeForce RTX 3060, i zi"
                              >
                                <img
                                  loading="lazy"
                                  className="position-absolute top-0 right-0 bottom-0 left-0 m-auto transition-all duration-300 max-h-full max-w-full object-contain"
                                  alt="Foto e Laptop Lenovo IdeaPad Gaming 3 15ACH6, 15.6'', AMD Ryzen 5, 16GB RAM, 512 GB SSD, NVIDIA GeForce RTX 3060, i zi"
                                  src="https://hhstsyoejx.gjirafa.net/gjirafa50core/images/489504/thumb/489504.jpeg"
                                  srcSet="https://hhstsyoejx.gjirafa.net/gjirafa50core/images/489504/489504.webp?w=190"
                                />
                              </a>
                            </div>
                            <div className="details d-flex flex-col h-100 justify-content-between pb-2">
                              <h2 className="product-title">
                                <a
                                  className="text-gray-700 text-sm md:text-base product-title-lines hover:underline"
                                  title="Laptop Lenovo IdeaPad Gaming 3 15ACH6, 15.6'', AMD Ryzen 5, 16GB RAM, 512 GB SSD, NVIDIA GeForce RTX 3060, i zi"
                                  href="/kompjuter-laptop-server/laptop-6/gaming-14/laptop-lenovo-ideapad-gaming-3-15ach6-156-amd-ryzen-5-16gb-ram-512-gb-ssd-nvidia-geforce-rtx-3060-i-zi"
                                >
                                  Laptop Lenovo IdeaPad Gaming 3 15ACH6, 15.6'',
                                  AMD Ryzen 5, 16GB RAM, 512 GB SSD, NVIDIA
                                  GeForce RTX 3060, i zi
                                </a>
                              </h2>
                              <div className="prices d-flex flex-col h-12 position-relative">
                                <span className="price font-semibold text-gray-700 text-base md:text-xl">
                                  999.50 €
                                </span>
                                <span className="price old-price text-gray-600 font-medium text-sm line-through">
                                  1,192.50 €
                                </span>
                              </div>
                              <div className="d-flex flex-col pt-2 justify-content-between lg:flex-row">
                                <span className="text-xs text-gray-600">
                                  Përfshirë TVSH
                                </span>
                              </div>
                            </div>
                            <div className="buttons d-flex justify-evenly gap-2">
                              <button
                                aria-label="Shto në shportë"
                                id="add-to-cart-(74551)"
                                className="product-box-add-to-cart-button d-flex gap-2 align-items-center btn-primary-hover hover:bg-primary hover:text-white justify-content-center md:flex-grow w-1/2 focus:outline-none focus:border-none focus:text-white btn-simple btn-secondary"
                              >
                                <i className="icon-cart-shopping icon-line-height text-2xl md:hidden">
                                  <FontAwesomeIcon icon={faShoppingCart} />
                                </i>
                                <span className="hidden md:grid text-xs font-medium">
                                  Shto në shportë
                                </span>
                              </button>
                              <button
                                type="button"
                                id="add-to-wishlisht-(74551)"
                                value="Shto në listën e dëshirave"
                                title="Shto në listën e dëshirave"
                                className="group hover:bg-primary w-1/2 md:w-auto add-to-wishlist-button btn-primary-hover hover:text-white focus:outline-none btn btn-secondary focus:text-white"
                              >
                                <i className="icon-heart icon-line-height text-2xl group-hover:text-white">
                                  <FontAwesomeIcon icon={faHeart} />
                                </i>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div
                          className="item-box"
                          id="item-box-74551"
                          data-position="1"
                        >
                          <div
                            className="product-item bg-white p-2 md:p-3 position-relative shadow-sm hover:shadow-md rounded h-100 overflow-hidden d-flex flex-col justify-content-between"
                            data-productid="74551"
                          >
                            <div className="position-absolute h-6 top-2.5 left-0 pr-3 pl-3 tablet:pl-0 d-flex tablet:flex-row gap-1 tablet:gap-0 tablet:items-center tablet:flex-wrap z-10 w-100 flex-row">
                              <div className="w-10 h-[19px] bg-primary discount__label d-flex justify-content-center align-items-center rounded position-absolute right-3 top-[1px] shadow-sm text-white text-xs font-medium">
                                -17%
                              </div>
                            </div>
                            <div className="picture position-relative px-4 pt-6">
                              <a
                                className="position-relative block"
                                href="/kompjuter-laptop-server/laptop-6/gaming-14/laptop-lenovo-ideapad-gaming-3-15ach6-156-amd-ryzen-5-16gb-ram-512-gb-ssd-nvidia-geforce-rtx-3060-i-zi"
                                title="Shfaq detaje për Laptop Lenovo IdeaPad Gaming 3 15ACH6, 15.6'', AMD Ryzen 5, 16GB RAM, 512 GB SSD, NVIDIA GeForce RTX 3060, i zi"
                              >
                                <img
                                  loading="lazy"
                                  className="position-absolute top-0 right-0 bottom-0 left-0 m-auto transition-all duration-300 max-h-full max-w-full object-contain"
                                  alt="Foto e Laptop Lenovo IdeaPad Gaming 3 15ACH6, 15.6'', AMD Ryzen 5, 16GB RAM, 512 GB SSD, NVIDIA GeForce RTX 3060, i zi"
                                  src="https://hhstsyoejx.gjirafa.net/gjirafa50core/images/489504/thumb/489504.jpeg"
                                  srcSet="https://hhstsyoejx.gjirafa.net/gjirafa50core/images/489504/489504.webp?w=190"
                                />
                              </a>
                            </div>
                            <div className="details d-flex flex-col h-100 justify-content-between pb-2">
                              <h2 className="product-title">
                                <a
                                  className="text-gray-700 text-sm md:text-base product-title-lines hover:underline"
                                  title="Laptop Lenovo IdeaPad Gaming 3 15ACH6, 15.6'', AMD Ryzen 5, 16GB RAM, 512 GB SSD, NVIDIA GeForce RTX 3060, i zi"
                                  href="/kompjuter-laptop-server/laptop-6/gaming-14/laptop-lenovo-ideapad-gaming-3-15ach6-156-amd-ryzen-5-16gb-ram-512-gb-ssd-nvidia-geforce-rtx-3060-i-zi"
                                >
                                  Laptop Lenovo IdeaPad Gaming 3 15ACH6, 15.6'',
                                  AMD Ryzen 5, 16GB RAM, 512 GB SSD, NVIDIA
                                  GeForce RTX 3060, i zi
                                </a>
                              </h2>
                              <div className="prices d-flex flex-col h-12 position-relative">
                                <span className="price font-semibold text-gray-700 text-base md:text-xl">
                                  999.50 €
                                </span>
                                <span className="price old-price text-gray-600 font-medium text-sm line-through">
                                  1,192.50 €
                                </span>
                              </div>
                              <div className="d-flex flex-col pt-2 justify-content-between lg:flex-row">
                                <span className="text-xs text-gray-600">
                                  Përfshirë TVSH
                                </span>
                              </div>
                            </div>
                            <div className="buttons d-flex justify-evenly gap-2">
                              <button
                                aria-label="Shto në shportë"
                                id="add-to-cart-(74551)"
                                className="product-box-add-to-cart-button d-flex gap-2 align-items-center btn-primary-hover hover:bg-primary hover:text-white justify-content-center md:flex-grow w-1/2 focus:outline-none focus:border-none focus:text-white btn-simple btn-secondary"
                              >
                                <i className="icon-cart-shopping icon-line-height text-2xl md:hidden">
                                  <FontAwesomeIcon icon={faShoppingCart} />
                                </i>
                                <span className="hidden md:grid text-xs font-medium">
                                  Shto në shportë
                                </span>
                              </button>
                              <button
                                type="button"
                                id="add-to-wishlisht-(74551)"
                                value="Shto në listën e dëshirave"
                                title="Shto në listën e dëshirave"
                                className="group hover:bg-primary w-1/2 md:w-auto add-to-wishlist-button btn-primary-hover hover:text-white focus:outline-none btn btn-secondary focus:text-white"
                              >
                                <i className="icon-heart icon-line-height text-2xl group-hover:text-white">
                                  <FontAwesomeIcon icon={faHeart} />
                                </i>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div
                          className="item-box"
                          id="item-box-74551"
                          data-position="1"
                        >
                          <div
                            className="product-item bg-white p-2 md:p-3 position-relative shadow-sm hover:shadow-md rounded h-100 overflow-hidden d-flex flex-col justify-content-between"
                            data-productid="74551"
                          >
                            <div className="position-absolute h-6 top-2.5 left-0 pr-3 pl-3 tablet:pl-0 d-flex tablet:flex-row gap-1 tablet:gap-0 tablet:items-center tablet:flex-wrap z-10 w-100 flex-row">
                              <div className="w-10 h-[19px] bg-primary discount__label d-flex justify-content-center align-items-center rounded position-absolute right-3 top-[1px] shadow-sm text-white text-xs font-medium">
                                -17%
                              </div>
                            </div>
                            <div className="picture position-relative px-4 pt-6">
                              <a
                                className="position-relative block"
                                href="/kompjuter-laptop-server/laptop-6/gaming-14/laptop-lenovo-ideapad-gaming-3-15ach6-156-amd-ryzen-5-16gb-ram-512-gb-ssd-nvidia-geforce-rtx-3060-i-zi"
                                title="Shfaq detaje për Laptop Lenovo IdeaPad Gaming 3 15ACH6, 15.6'', AMD Ryzen 5, 16GB RAM, 512 GB SSD, NVIDIA GeForce RTX 3060, i zi"
                              >
                                <img
                                  loading="lazy"
                                  className="position-absolute top-0 right-0 bottom-0 left-0 m-auto transition-all duration-300 max-h-full max-w-full object-contain"
                                  alt="Foto e Laptop Lenovo IdeaPad Gaming 3 15ACH6, 15.6'', AMD Ryzen 5, 16GB RAM, 512 GB SSD, NVIDIA GeForce RTX 3060, i zi"
                                  src="https://hhstsyoejx.gjirafa.net/gjirafa50core/images/489504/thumb/489504.jpeg"
                                  srcSet="https://hhstsyoejx.gjirafa.net/gjirafa50core/images/489504/489504.webp?w=190"
                                />
                              </a>
                            </div>
                            <div className="details d-flex flex-col h-100 justify-content-between pb-2">
                              <h2 className="product-title">
                                <a
                                  className="text-gray-700 text-sm md:text-base product-title-lines hover:underline"
                                  title="Laptop Lenovo IdeaPad Gaming 3 15ACH6, 15.6'', AMD Ryzen 5, 16GB RAM, 512 GB SSD, NVIDIA GeForce RTX 3060, i zi"
                                  href="/kompjuter-laptop-server/laptop-6/gaming-14/laptop-lenovo-ideapad-gaming-3-15ach6-156-amd-ryzen-5-16gb-ram-512-gb-ssd-nvidia-geforce-rtx-3060-i-zi"
                                >
                                  Laptop Lenovo IdeaPad Gaming 3 15ACH6, 15.6'',
                                  AMD Ryzen 5, 16GB RAM, 512 GB SSD, NVIDIA
                                  GeForce RTX 3060, i zi
                                </a>
                              </h2>
                              <div className="prices d-flex flex-col h-12 position-relative">
                                <span className="price font-semibold text-gray-700 text-base md:text-xl">
                                  999.50 €
                                </span>
                                <span className="price old-price text-gray-600 font-medium text-sm line-through">
                                  1,192.50 €
                                </span>
                              </div>
                              <div className="d-flex flex-col pt-2 justify-content-between lg:flex-row">
                                <span className="text-xs text-gray-600">
                                  Përfshirë TVSH
                                </span>
                              </div>
                            </div>
                            <div className="buttons d-flex justify-evenly gap-2">
                              <button
                                aria-label="Shto në shportë"
                                id="add-to-cart-(74551)"
                                className="product-box-add-to-cart-button d-flex gap-2 align-items-center btn-primary-hover hover:bg-primary hover:text-white justify-content-center md:flex-grow w-1/2 focus:outline-none focus:border-none focus:text-white btn-simple btn-secondary"
                              >
                                <i className="icon-cart-shopping icon-line-height text-2xl md:hidden">
                                  <FontAwesomeIcon icon={faShoppingCart} />
                                </i>
                                <span className="hidden md:grid text-xs font-medium">
                                  Shto në shportë
                                </span>
                              </button>
                              <button
                                type="button"
                                id="add-to-wishlisht-(74551)"
                                value="Shto në listën e dëshirave"
                                title="Shto në listën e dëshirave"
                                className="group hover:bg-primary w-1/2 md:w-auto add-to-wishlist-button btn-primary-hover hover:text-white focus:outline-none btn btn-secondary focus:text-white"
                              >
                                <i className="icon-heart icon-line-height text-2xl group-hover:text-white">
                                  <FontAwesomeIcon icon={faHeart} />
                                </i>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div
                          className="item-box"
                          id="item-box-74551"
                          data-position="1"
                        >
                          <div
                            className="product-item bg-white p-2 md:p-3 position-relative shadow-sm hover:shadow-md rounded h-100 overflow-hidden d-flex flex-col justify-content-between"
                            data-productid="74551"
                          >
                            <div className="position-absolute h-6 top-2.5 left-0 pr-3 pl-3 tablet:pl-0 d-flex tablet:flex-row gap-1 tablet:gap-0 tablet:items-center tablet:flex-wrap z-10 w-100 flex-row">
                              <div className="w-10 h-[19px] bg-primary discount__label d-flex justify-content-center align-items-center rounded position-absolute right-3 top-[1px] shadow-sm text-white text-xs font-medium">
                                -17%
                              </div>
                            </div>
                            <div className="picture position-relative px-4 pt-6">
                              <a
                                className="position-relative block"
                                href="/kompjuter-laptop-server/laptop-6/gaming-14/laptop-lenovo-ideapad-gaming-3-15ach6-156-amd-ryzen-5-16gb-ram-512-gb-ssd-nvidia-geforce-rtx-3060-i-zi"
                                title="Shfaq detaje për Laptop Lenovo IdeaPad Gaming 3 15ACH6, 15.6'', AMD Ryzen 5, 16GB RAM, 512 GB SSD, NVIDIA GeForce RTX 3060, i zi"
                              >
                                <img
                                  loading="lazy"
                                  className="position-absolute top-0 right-0 bottom-0 left-0 m-auto transition-all duration-300 max-h-full max-w-full object-contain"
                                  alt="Foto e Laptop Lenovo IdeaPad Gaming 3 15ACH6, 15.6'', AMD Ryzen 5, 16GB RAM, 512 GB SSD, NVIDIA GeForce RTX 3060, i zi"
                                  src="https://hhstsyoejx.gjirafa.net/gjirafa50core/images/489504/thumb/489504.jpeg"
                                  srcSet="https://hhstsyoejx.gjirafa.net/gjirafa50core/images/489504/489504.webp?w=190"
                                />
                              </a>
                            </div>
                            <div className="details d-flex flex-col h-100 justify-content-between pb-2">
                              <h2 className="product-title">
                                <a
                                  className="text-gray-700 text-sm md:text-base product-title-lines hover:underline"
                                  title="Laptop Lenovo IdeaPad Gaming 3 15ACH6, 15.6'', AMD Ryzen 5, 16GB RAM, 512 GB SSD, NVIDIA GeForce RTX 3060, i zi"
                                  href="/kompjuter-laptop-server/laptop-6/gaming-14/laptop-lenovo-ideapad-gaming-3-15ach6-156-amd-ryzen-5-16gb-ram-512-gb-ssd-nvidia-geforce-rtx-3060-i-zi"
                                >
                                  Laptop Lenovo IdeaPad Gaming 3 15ACH6, 15.6'',
                                  AMD Ryzen 5, 16GB RAM, 512 GB SSD, NVIDIA
                                  GeForce RTX 3060, i zi
                                </a>
                              </h2>
                              <div className="prices d-flex flex-col h-12 position-relative">
                                <span className="price font-semibold text-gray-700 text-base md:text-xl">
                                  999.50 €
                                </span>
                                <span className="price old-price text-gray-600 font-medium text-sm line-through">
                                  1,192.50 €
                                </span>
                              </div>
                              <div className="d-flex flex-col pt-2 justify-content-between lg:flex-row">
                                <span className="text-xs text-gray-600">
                                  Përfshirë TVSH
                                </span>
                              </div>
                            </div>
                            <div className="buttons d-flex justify-evenly gap-2">
                              <button
                                aria-label="Shto në shportë"
                                id="add-to-cart-(74551)"
                                className="product-box-add-to-cart-button d-flex gap-2 align-items-center btn-primary-hover hover:bg-primary hover:text-white justify-content-center md:flex-grow w-1/2 focus:outline-none focus:border-none focus:text-white btn-simple btn-secondary"
                              >
                                <i className="icon-cart-shopping icon-line-height text-2xl md:hidden">
                                  <FontAwesomeIcon icon={faShoppingCart} />
                                </i>
                                <span className="hidden md:grid text-xs font-medium">
                                  Shto në shportë
                                </span>
                              </button>
                              <button
                                type="button"
                                id="add-to-wishlisht-(74551)"
                                value="Shto në listën e dëshirave"
                                title="Shto në listën e dëshirave"
                                className="group hover:bg-primary w-1/2 md:w-auto add-to-wishlist-button btn-primary-hover hover:text-white focus:outline-none btn btn-secondary focus:text-white"
                              >
                                <i className="icon-heart icon-line-height text-2xl group-hover:text-white">
                                  <FontAwesomeIcon icon={faHeart} />
                                </i>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div
                          className="item-box"
                          id="item-box-74551"
                          data-position="1"
                        >
                          <div
                            className="product-item bg-white p-2 md:p-3 position-relative shadow-sm hover:shadow-md rounded h-100 overflow-hidden d-flex flex-col justify-content-between"
                            data-productid="74551"
                          >
                            <div className="position-absolute h-6 top-2.5 left-0 pr-3 pl-3 tablet:pl-0 d-flex tablet:flex-row gap-1 tablet:gap-0 tablet:items-center tablet:flex-wrap z-10 w-100 flex-row">
                              <div className="w-10 h-[19px] bg-primary discount__label d-flex justify-content-center align-items-center rounded position-absolute right-3 top-[1px] shadow-sm text-white text-xs font-medium">
                                -17%
                              </div>
                            </div>
                            <div className="picture position-relative px-4 pt-6">
                              <a
                                className="position-relative block"
                                href="/kompjuter-laptop-server/laptop-6/gaming-14/laptop-lenovo-ideapad-gaming-3-15ach6-156-amd-ryzen-5-16gb-ram-512-gb-ssd-nvidia-geforce-rtx-3060-i-zi"
                                title="Shfaq detaje për Laptop Lenovo IdeaPad Gaming 3 15ACH6, 15.6'', AMD Ryzen 5, 16GB RAM, 512 GB SSD, NVIDIA GeForce RTX 3060, i zi"
                              >
                                <img
                                  loading="lazy"
                                  className="position-absolute top-0 right-0 bottom-0 left-0 m-auto transition-all duration-300 max-h-full max-w-full object-contain"
                                  alt="Foto e Laptop Lenovo IdeaPad Gaming 3 15ACH6, 15.6'', AMD Ryzen 5, 16GB RAM, 512 GB SSD, NVIDIA GeForce RTX 3060, i zi"
                                  src="https://hhstsyoejx.gjirafa.net/gjirafa50core/images/489504/thumb/489504.jpeg"
                                  srcSet="https://hhstsyoejx.gjirafa.net/gjirafa50core/images/489504/489504.webp?w=190"
                                />
                              </a>
                            </div>
                            <div className="details d-flex flex-col h-100 justify-content-between pb-2">
                              <h2 className="product-title">
                                <a
                                  className="text-gray-700 text-sm md:text-base product-title-lines hover:underline"
                                  title="Laptop Lenovo IdeaPad Gaming 3 15ACH6, 15.6'', AMD Ryzen 5, 16GB RAM, 512 GB SSD, NVIDIA GeForce RTX 3060, i zi"
                                  href="/kompjuter-laptop-server/laptop-6/gaming-14/laptop-lenovo-ideapad-gaming-3-15ach6-156-amd-ryzen-5-16gb-ram-512-gb-ssd-nvidia-geforce-rtx-3060-i-zi"
                                >
                                  Laptop Lenovo IdeaPad Gaming 3 15ACH6, 15.6'',
                                  AMD Ryzen 5, 16GB RAM, 512 GB SSD, NVIDIA
                                  GeForce RTX 3060, i zi
                                </a>
                              </h2>
                              <div className="prices d-flex flex-col h-12 position-relative">
                                <span className="price font-semibold text-gray-700 text-base md:text-xl">
                                  999.50 €
                                </span>
                                <span className="price old-price text-gray-600 font-medium text-sm line-through">
                                  1,192.50 €
                                </span>
                              </div>
                              <div className="d-flex flex-col pt-2 justify-content-between lg:flex-row">
                                <span className="text-xs text-gray-600">
                                  Përfshirë TVSH
                                </span>
                              </div>
                            </div>
                            <div className="buttons d-flex justify-evenly gap-2">
                              <button
                                aria-label="Shto në shportë"
                                id="add-to-cart-(74551)"
                                className="product-box-add-to-cart-button d-flex gap-2 align-items-center btn-primary-hover hover:bg-primary hover:text-white justify-content-center md:flex-grow w-1/2 focus:outline-none focus:border-none focus:text-white btn-simple btn-secondary"
                              >
                                <i className="icon-cart-shopping icon-line-height text-2xl md:hidden">
                                  <FontAwesomeIcon icon={faShoppingCart} />
                                </i>
                                <span className="hidden md:grid text-xs font-medium">
                                  Shto në shportë
                                </span>
                              </button>
                              <button
                                type="button"
                                id="add-to-wishlisht-(74551)"
                                value="Shto në listën e dëshirave"
                                title="Shto në listën e dëshirave"
                                className="group hover:bg-primary w-1/2 md:w-auto add-to-wishlist-button btn-primary-hover hover:text-white focus:outline-none btn btn-secondary focus:text-white"
                              >
                                <i className="icon-heart icon-line-height text-2xl group-hover:text-white">
                                  <FontAwesomeIcon icon={faHeart} />
                                </i>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div
                          className="item-box"
                          id="item-box-74551"
                          data-position="1"
                        >
                          <div
                            className="product-item bg-white p-2 md:p-3 position-relative shadow-sm hover:shadow-md rounded h-100 overflow-hidden d-flex flex-col justify-content-between"
                            data-productid="74551"
                          >
                            <div className="position-absolute h-6 top-2.5 left-0 pr-3 pl-3 tablet:pl-0 d-flex tablet:flex-row gap-1 tablet:gap-0 tablet:items-center tablet:flex-wrap z-10 w-100 flex-row">
                              <div className="w-10 h-[19px] bg-primary discount__label d-flex justify-content-center align-items-center rounded position-absolute right-3 top-[1px] shadow-sm text-white text-xs font-medium">
                                -17%
                              </div>
                            </div>
                            <div className="picture position-relative px-4 pt-6">
                              <a
                                className="position-relative block"
                                href="/kompjuter-laptop-server/laptop-6/gaming-14/laptop-lenovo-ideapad-gaming-3-15ach6-156-amd-ryzen-5-16gb-ram-512-gb-ssd-nvidia-geforce-rtx-3060-i-zi"
                                title="Shfaq detaje për Laptop Lenovo IdeaPad Gaming 3 15ACH6, 15.6'', AMD Ryzen 5, 16GB RAM, 512 GB SSD, NVIDIA GeForce RTX 3060, i zi"
                              >
                                <img
                                  loading="lazy"
                                  className="position-absolute top-0 right-0 bottom-0 left-0 m-auto transition-all duration-300 max-h-full max-w-full object-contain"
                                  alt="Foto e Laptop Lenovo IdeaPad Gaming 3 15ACH6, 15.6'', AMD Ryzen 5, 16GB RAM, 512 GB SSD, NVIDIA GeForce RTX 3060, i zi"
                                  src="https://hhstsyoejx.gjirafa.net/gjirafa50core/images/489504/thumb/489504.jpeg"
                                  srcSet="https://hhstsyoejx.gjirafa.net/gjirafa50core/images/489504/489504.webp?w=190"
                                />
                              </a>
                            </div>
                            <div className="details d-flex flex-col h-100 justify-content-between pb-2">
                              <h2 className="product-title">
                                <a
                                  className="text-gray-700 text-sm md:text-base product-title-lines hover:underline"
                                  title="Laptop Lenovo IdeaPad Gaming 3 15ACH6, 15.6'', AMD Ryzen 5, 16GB RAM, 512 GB SSD, NVIDIA GeForce RTX 3060, i zi"
                                  href="/kompjuter-laptop-server/laptop-6/gaming-14/laptop-lenovo-ideapad-gaming-3-15ach6-156-amd-ryzen-5-16gb-ram-512-gb-ssd-nvidia-geforce-rtx-3060-i-zi"
                                >
                                  Laptop Lenovo IdeaPad Gaming 3 15ACH6, 15.6'',
                                  AMD Ryzen 5, 16GB RAM, 512 GB SSD, NVIDIA
                                  GeForce RTX 3060, i zi
                                </a>
                              </h2>
                              <div className="prices d-flex flex-col h-12 position-relative">
                                <span className="price font-semibold text-gray-700 text-base md:text-xl">
                                  999.50 €
                                </span>
                                <span className="price old-price text-gray-600 font-medium text-sm line-through">
                                  1,192.50 €
                                </span>
                              </div>
                              <div className="d-flex flex-col pt-2 justify-content-between lg:flex-row">
                                <span className="text-xs text-gray-600">
                                  Përfshirë TVSH
                                </span>
                              </div>
                            </div>
                            <div className="buttons d-flex justify-evenly gap-2">
                              <button
                                aria-label="Shto në shportë"
                                id="add-to-cart-(74551)"
                                className="product-box-add-to-cart-button d-flex gap-2 align-items-center btn-primary-hover hover:bg-primary hover:text-white justify-content-center md:flex-grow w-1/2 focus:outline-none focus:border-none focus:text-white btn-simple btn-secondary"
                              >
                                <i className="icon-cart-shopping icon-line-height text-2xl md:hidden">
                                  <FontAwesomeIcon icon={faShoppingCart} />
                                </i>
                                <span className="hidden md:grid text-xs font-medium">
                                  Shto në shportë
                                </span>
                              </button>
                              <button
                                type="button"
                                id="add-to-wishlisht-(74551)"
                                value="Shto në listën e dëshirave"
                                title="Shto në listën e dëshirave"
                                className="group hover:bg-primary w-1/2 md:w-auto add-to-wishlist-button btn-primary-hover hover:text-white focus:outline-none btn btn-secondary focus:text-white"
                              >
                                <i className="icon-heart icon-line-height text-2xl group-hover:text-white">
                                  <FontAwesomeIcon icon={faHeart} />
                                </i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div >

                      <div className="skeleton-item-grid grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-5">
                        <template id="card-template">
                          <div className="item-box">
                            <div className="product-item bg-white p-2 md:p-3 position-relative shadow-sm hover:shadow-md rounded h-100 overflow-hidden d-flex flex-col justify-content-between skeleton">
                              <div className="picture position-relative rounded bg-gray-100 mb-1 skeleton-animation bg-gray-300">
                                <a className="position-relative block bg-gray-100 z-10 skeleton-animation">
                                  <img
                                    className="position-absolute top-0 right-0 bottom-0 left-0 m-auto transition-all duration-300 max-h-full max-w-full bg-gray-100 skeleton-animation object-contain"
                                    src=""
                                  />
                                </a>
                              </div>
                              <div className="details d-flex flex-col h-100 justify-content-between pb-2">
                                <span className="h-8 bg-gray-100 block rounded skeleton-animation mb-2"></span>
                                <div className="prices d-flex flex-col w-1/2">
                                  <span className="block bg-gray-100 h-4 mb-2 rounded skeleton-animation"></span>
                                  <span className="block bg-gray-100 h-4 mb-2 rounded skeleton-animation"></span>
                                </div>
                                <div className="block bg-gray-100 h-4 rounded skeleton-animation"></div>
                              </div>
                              <div className="buttons d-flex justify-evenly gap-2">
                                <button className="product-box-add-to-cart-button d-flex gap-2 align-items-center justify-content-center md:flex-grow w-1/2 btn-simple btn-secondary h-10 skeleton-animation"></button>
                                <button
                                  type="button"
                                  className="w-1/2 md:w-auto add-to-wishlist-button btn btn-secondary h-10 skeleton-animation"
                                ></button>
                              </div>
                            </div>
                          </div>
                        </template>
                      </div>
                    </div >
                  </div >
                </div >
                <div className="d-flex flex-col justify-content-center align-items-center mt-5"></div>
                <div
                  className="load-more-products-categories"
                  style={{ display: 'none' }}
                ></div>
              </div >
            </div >
          </div >
        </div >
      </div >
    </div >
  )
}

export default SearchComponent
