import React, { useEffect, useState } from 'react'
import '../SearchPage/style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowDown,
  faChevronCircleDown,
  faChevronDown,
  faChevronUp,
  faHeart,
  faShoppingCart,
} from '@fortawesome/free-solid-svg-icons'
import { useLocation, useParams } from 'react-router-dom'
import {
  useGetProductCategoriesQuery,
  useGetProductsQuery,
} from '@/store/products/RTKProductSlice'
import { Product, ProductCategory } from '@/helpers/types'
import LoadingBar from '@/ui/Loading/LoadingBar'
import { Dropdown, DropdownButton } from 'react-bootstrap'
import CustomDropdown from '../SearchPage/customDropdown'
import { Image, getCategoryNameById } from '@/helpers/helpers'
import ImageTwentyFour from '@/assets/images/tfTransport.png'
import NewItem from '@/assets/images/newproduct-1.png'
import Breadcrumb from '../Breadcrumb'

const SearchByCategory = () => {
  const { categoryGroup, category } = useParams()
  const location = useLocation()
  const routeCategories = categoryGroup?.split('-')
  const searchQuery = new URLSearchParams(location.search).get('q') || ''
  const { data: categories } = useGetProductCategoriesQuery()
  const [filterByPrice, setFilterByPrice] = useState(true)
  const [filterByManufacturer, setFilterByManufacturer] = useState(true)
  const { data, error, isLoading } = useGetProductsQuery()
  const [sortOption, setSortOption] = useState('relevance')
  const [showNewProducts, setShowNewProducts] = useState<boolean>(false)
  const [showDiscountedProducts, setShowDiscountedProducts] =
    useState<boolean>(false)
  const [inStock, setInStock] = useState(false)
  const [tfTransport, setTfTransport] = useState(false)
  const [minPrice, setMinPrice] = useState<number>(0)
  const [maxPrice, setMaxPrice] = useState<number>(7999)
  const [filteredData, setFilteredData] = useState<Product[] | undefined>([])
  const [selectedManufacturers, setSelectedManufacturers] = useState<string[]>(
    []
  )

  const handleManufacturerChange = (manufacturer: string) => {
    if (selectedManufacturers.includes(manufacturer)) {
      setSelectedManufacturers(
        selectedManufacturers.filter((item) => item !== manufacturer)
      )
    } else {
      setSelectedManufacturers([...selectedManufacturers, manufacturer])
    }
  }

  const filterProductsByCategory = (
    product: Product,
    productCategoryName: string,
    productTags: string[]
  ) => {
    if (category) {
      return (
        productCategoryName.includes(category.toLowerCase()) ||
        productTags.some((tag: string) => tag.includes(category.toLowerCase()))
      )
    } else if (routeCategories && routeCategories.length > 0) {
      return (
        routeCategories.some((routeCategory) =>
          productCategoryName.includes(routeCategory.toLowerCase())
        ) ||
        routeCategories.some((routeCategory) =>
          productTags.some((tag: string) =>
            tag.includes(routeCategory.toLowerCase())
          )
        )
      )
    } else {
      return (
        ['computer', 'laptop', 'server'].some((defaultCategory) =>
          productCategoryName.includes(defaultCategory.toLowerCase())
        ) ||
        ['computer', 'laptop', 'server'].some((defaultCategory) =>
          productTags.some((tag: string) =>
            tag.includes(defaultCategory.toLowerCase())
          )
        )
      )
    }
  }

  const filterProducts = (product: Product) => {
    const inStockCondition = inStock ? product.stock : true
    const tfTransportCondition = tfTransport ? product.tfTransport : true
    const productCategoryName = getCategoryNameById(
      categories as ProductCategory[],
      product.category
    ).toLowerCase()
    const productTags: string[] = product.tags.map((tag: string) =>
      tag.toLowerCase()
    )
    const titleMatch = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    const isNewCondition = showNewProducts ? product.isNew : true
    const hasDiscountCondition = showDiscountedProducts
      ? product.discount > 0
      : true
    const manufacturerSelected =
      selectedManufacturers.length === 0 ||
      selectedManufacturers.some(
        (selectedManufacturer) =>
          selectedManufacturer.toLowerCase() === product.brand.toLowerCase()
      )
    const isInRange = product.price >= minPrice && product.price <= maxPrice

    return (
      titleMatch &&
      isNewCondition &&
      hasDiscountCondition &&
      isInRange &&
      filterProductsByCategory(product, productCategoryName, productTags) &&
      manufacturerSelected
    )
  }

  useEffect(() => {
    if (data && categories) {
      const filteredProducts = data.filter(filterProducts)

      filteredProducts.sort((a, b) => {
        if (sortOption === 'priceHighToLow') {
          return b.price - a.price
        } else if (sortOption === 'priceLowToHigh') {
          return a.price - b.price
        } else if (sortOption === 'newProducts') {
          return a.isNew && !b.isNew ? -1 : !a.isNew && b.isNew ? 1 : 0
        } else if (sortOption === 'hasDiscount') {
          return a.discount > 0 && b.discount <= 0
            ? -1
            : a.discount <= 0 && b.discount > 0
            ? 1
            : 0
        } else {
          return 0
        }
      })

      setFilteredData(filteredProducts)
    }
  }, [
    data,
    searchQuery,
    showNewProducts,
    showDiscountedProducts,
    minPrice,
    maxPrice,
    sortOption,
    categories,
    category,
    selectedManufacturers,
    inStock,
    tfTransport,
  ])

  const handleApplyPriceFilter = () => {
    if (data) {
      const filteredProducts = data.filter(filterProducts)

      filteredProducts.sort((a, b) => {
        if (sortOption === 'priceHighToLow') {
          return b.price - a.price
        } else if (sortOption === 'priceLowToHigh') {
          return a.price - b.price
        } else {
          return 0
        }
      })

      setFilteredData(filteredProducts)
    }
  }

  const manufacturers = [
    'Acer',
    'Alienware',
    'Apple',
    'ASRock',
    'ASU',
    'ASUS',
    'Banana Pi',
    'CZC',
    'Dell',
    'Fujitsu',
    'Game X',
    'GIGABYTE',
    'HAL3000',
    'HP',
    'HP1',
    'Intel',
    'Lenovo',
    'Lynx',
    'Morele.net',
    'MSI',
    'OMEN by HP',
    'Radxa',
    'Raspberry Pi',
    'ScreenShield',
    'Umax',
    'Zotac',
  ]

  if (isLoading) {
    return (
      <div
        className="master-wrapper-content px-2 md:px-0 mx-auto"
        style={{ minHeight: '60vh' }}
      >
        <div className="master-column-wrapper my-6">
          <LoadingBar height="50px" size={50} />
        </div>
      </div>
    )
  }

  if (error) {
    return <div>Error</div>
  }

  return (
    <div
      className="master-wrapper-content px-2 md:px-0 mx-auto"
      // style={{ minHeight: '100vh' }}
    >
      <div className="master-column-wrapper my-6">
        <Breadcrumb />

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

            <div className="d-flex flex-col border-b p-3">
              <div className="d-flex align-items-center justify-content-between position-relative mb-3">
                <span className="text-sm">Available in stock</span>
                <div className="toggle-btn-wrapper">
                  <input
                    type="checkbox"
                    id="inStockInput"
                    className="toggle-btn"
                    onClick={() => setInStock((state) => !state)}
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
                    onClick={() => setTfTransport((state) => !state)}
                  />
                  <div className="knobs"></div>
                  <div className="layer"></div>
                </div>
              </div>
            </div>

            <div className="product-filter price-range-filter overflow-hidden">
              <div
                onClick={() => setFilterByPrice((state) => !state)}
                className="filter-title cursor-pointer w-100  bg-white d-flex justify-content-between align-items-center border-b px-3 py-2 hover:cursor-pointer"
              >
                <span
                  className="text-sm text-gray-700 d-flex align-items-center"
                  onClick={() => setFilterByPrice(true)}
                >
                  <i className="icon-payment-money-usd text-gray-700 text-2xl"></i>
                  Filter by price
                </span>
                <i className="icon-chevron-line-up text-gray-600 text-sm transform transition-all">
                  {filterByPrice ? (
                    <FontAwesomeIcon icon={faChevronUp} />
                  ) : (
                    <FontAwesomeIcon icon={faChevronDown} />
                  )}
                </i>
              </div>
              {filterByPrice && (
                <div className="filter-content w-100  bg-white">
                  <div className="p-3 border-b">
                    <ul className="d-flex flex-col price-ranges"></ul>
                    <div className="selected-price-range d-flex justify-content-around align-items-center">
                      <input
                        className="w-100 from-price"
                        name="priceChange"
                        min="9"
                        type="number"
                        value={minPrice}
                        onChange={(e) => setMinPrice(Number(e.target.value))}
                      />
                      <span className="text-sm text-gray-600 mx-2">to</span>
                      <input
                        className="w-100 to-price"
                        name="priceChangeMax"
                        max="7795"
                        type="number"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                      />
                    </div>
                    <span className="d-flex align-items-center text-xs text-gray-600 error-message my-2 flex-wrap">
                      Filtrimi mund të bëhet nga
                      <span className="text-primary mx-1">9 Euro</span>
                      deri në
                      <span className="text-primary mx-1">7795 Euro</span>
                    </span>
                    <div className="d-flex justify-content-end">
                      <button
                        onClick={handleApplyPriceFilter}
                        className="btn-simple py-1 px-2 border-primary hover:bg-primary hover:text-white text-primary submit-price-range w-100 "
                      >
                        Apliko
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="product-filter product-spec-filter overflow-hidden">
              <div
                onClick={() =>
                  setFilterByManufacturer((state: boolean) => !state)
                }
                className="filter-title cursor-pointer px-3 py-2 d-flex justify-content-between align-items-center select-none border-b text-left hover:cursor-pointer"
              >
                <span className="text-sm text-gray-700 d-flex align-items-center">
                  Filter by manufacturer
                </span>
                <i className="icon-chevron-line-up text-gray-600 text-sm transform transition-all">
                  {filterByManufacturer ? (
                    <FontAwesomeIcon icon={faChevronUp} />
                  ) : (
                    <FontAwesomeIcon icon={faChevronDown} />
                  )}
                </i>
              </div>
              {filterByManufacturer && (
                <div
                  className="filter-content w-100  bg-white overflow-y-scroll max-h-64 scrollbar-modifier"
                  style={{ maxHeight: '16rem' }}
                >
                  <ul className=" product-manufacturer-group select-none">
                    {manufacturers.map((item: string) => (
                      <li className="item d-flex align-items-center border-b px-3 py-2 hover:cursor-pointer ">
                        <input
                          id={`attribute-manufacturer-${item}`}
                          type="checkbox"
                          data-manufacturer-id={item}
                          onChange={() => handleManufacturerChange(item)}
                          checked={selectedManufacturers.includes(item)}
                        />
                        <label
                          className="text-gray-600 text-xs pl-2"
                          htmlFor={`attribute-manufacturer-${item}`}
                        >
                          {item}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
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
                        {filteredData?.length}
                      </span>
                      {filteredData?.length && filteredData?.length > 1
                        ? 'produkte të gjetura për'
                        : 'product i gjetur për'}

                      <span>"{searchQuery}"</span>
                    </span>
                  </div>
                  <div className="d-flex gap-2">
                    <div className="select shadow-sm w-100  md:w-52">
                      <div className="selectWrapper">
                        <div className="selectCustom js-selectCustom">
                          <CustomDropdown
                            sortOption={sortOption}
                            setSortOption={setSortOption}
                            setShowNewProducts={setShowNewProducts}
                            setShowDiscountedProducts={
                              setShowDiscountedProducts
                            }
                          />
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
                        {filteredData?.map((result) => (
                          <div
                            className="item-box"
                            id="item-box-74551"
                            data-position="1"
                          >
                            <div
                              className="product-item bg-white p-2 md:p-3 position-relative shadow-sm hover:shadow-md rounded h-100 overflow-hidden d-flex flex-col justify-content-between"
                              data-productid="74551"
                            >
                              {/* <div className="position-absolute h-6 top-2.5 left-0 pr-3 pl-3 tablet:pl-0 d-flex tablet:flex-row gap-1 tablet:gap-0 tablet:items-center tablet:flex-wrap z-10 w-100 flex-row"> */}
                              {/* <div className="w-10 h-[19px] bg-primary discount__label d-flex justify-content-center align-items-center rounded position-absolute right-3 top-[1px] shadow-sm text-white text-xs font-medium">
                                  -17%
                                </div> */}
                              <div className="h-6 top-2.5 left-0 tablet:pl-0 d-flex tablet:flex-row gap-1 tablet:gap-0 tablet:items-center tablet:flex-wrap z-10 w-full flex-row justify-content-between">
                                <div className="d-flex">
                                  {result.isNew && (
                                    <div className="pointer-events-none d-flex items-center tablet:pl-3">
                                      <img
                                        src={NewItem}
                                        // className="w-100 h-100"
                                        style={{
                                          width: '55px',
                                          height: '19px',
                                        }}
                                        alt=""
                                      />
                                    </div>
                                  )}
                                  {result.tfTransport && (
                                    <div className="pointer-events-none d-flex items-center tablet:pl-3">
                                      <img
                                        src={ImageTwentyFour}
                                        alt=""
                                        style={{
                                          width: '55px',
                                          height: '19px',
                                        }}
                                      />
                                    </div>
                                  )}
                                </div>
                                {result.discount !== 0 && (
                                  <div className="w-10 pl-1 pr-1 h-[19px] bg-primary discount__label d-flex justify-content-center items-center rounded  right-3 shadow-sm text-white text-xs font-medium">
                                    -{result.discount}%
                                  </div>
                                )}
                                {/* </div> */}
                              </div>
                              <div className="picture position-relative px-4 pt-6">
                                <a
                                  className="position-relative block"
                                  href={`/product/${result.id}`}
                                  title="Shfaq detaje për Laptop Lenovo IdeaPad Gaming 3 15ACH6, 15.6'', AMD Ryzen 5, 16GB RAM, 512 GB SSD, NVIDIA GeForce RTX 3060, i zi"
                                >
                                  <Image
                                    src={
                                      result.imageCover ? result.imageCover : ''
                                    }
                                    alt="cover image"
                                    className="position-absolute top-0 right-0 bottom-0 left-0 m-auto transition-all duration-300 max-h-full max-w-full object-contain"
                                  />
                                </a>
                                {result.stock < 1 && (
                                  <div className="position-absolute uppercase top-0 left-0 sold-out-productBox d-flex align-items-center justify-content-center text-center">
                                    <a
                                      className="w-100 h-100 text-center d-flex align-items-center justify-content-center"
                                      href={`product/${result.id}`}
                                    >
                                      <span className="text-sm rounded px-2 py-1 bg-gray-100">
                                        E shitur
                                      </span>
                                    </a>
                                  </div>
                                )}
                              </div>
                              <div className="details d-flex flex-col h-100 justify-content-between pb-2">
                                <h2 className="product-title">
                                  <a
                                    className="text-gray-700 text-sm md:text-base product-title-lines hover:underline"
                                    title="Laptop Lenovo IdeaPad Gaming 3 15ACH6, 15.6'', AMD Ryzen 5, 16GB RAM, 512 GB SSD, NVIDIA GeForce RTX 3060, i zi"
                                    href={`/product/${result.id}`}
                                  >
                                    {result.title}
                                  </a>
                                </h2>
                                <div className="prices d-flex flex-col h-12 position-relative">
                                  <span className="price font-semibold text-gray-700 text-base md:text-xl">
                                    {result.priceDiscount
                                      ? Math.round(
                                          result.priceDiscount
                                        )?.toLocaleString()
                                      : Math.round(
                                          result.price
                                        )?.toLocaleString()}
                                    .00 €
                                  </span>
                                  {result.priceDiscount && (
                                    <span className="price old-price text-gray-600 font-medium text-sm line-through">
                                      {result.price?.toFixed(2)} €
                                    </span>
                                  )}
                                </div>
                                <div className="d-flex flex-col pt-2 justify-content-between lg:flex-row">
                                  <span className="text-xs text-gray-600">
                                    Përfshirë TVSH
                                  </span>
                                </div>
                              </div>
                              <div className="buttons d-flex justify-evenly gap-2">
                                {result.stock < 1 ? (
                                  <button
                                    className="disabled:opacity-60 pointer-events-none d-flex flex-grow align-items-center justify-content-center gap-2 uppercase btn-simple btn-secondary"
                                    disabled={true}
                                    aria-label="JASHTË STOKU"
                                  >
                                    <i className="icon-cart-shopping-cancel text-gray-700 text-2xl">
                                      <FontAwesomeIcon icon={faShoppingCart} />
                                    </i>
                                    <span className="text-xs text-gray-700 hidden md:flex font-medium">
                                      JASHTË STOKU
                                    </span>
                                  </button>
                                ) : (
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
                                )}

                                <button
                                  type="button"
                                  id="add-to-wishlisht-(74551)"
                                  value="Shto në listën e dëshirave"
                                  title="Shto në listën e dëshirave"
                                  style={{ border: 'none' }}
                                  className="group hover:bg-primary w-1/2 md:w-auto add-to-wishlist-button btn-primary-hover hover:text-white focus:outline-none btn btn-secondary focus:text-white"
                                >
                                  <i className="icon-heart icon-line-height text-2xl group-hover:text-white">
                                    <FontAwesomeIcon icon={faHeart} />
                                  </i>
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

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
                    </div>
                  </div>
                </div>
                <div className="d-flex flex-col justify-content-center align-items-center mt-5"></div>
                <div
                  className="load-more-products-categories"
                  style={{ display: 'none' }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchByCategory
