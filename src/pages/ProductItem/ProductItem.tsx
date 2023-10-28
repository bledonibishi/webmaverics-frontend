import React, { useEffect, useState } from 'react'
import Breadcrumb from '../Breadcrumb'
import ProductWrapper from './ProductWrapper'
import AuthorizedSeller from '@/assets/images/appleAuthorized.png'
import BestPrice from '@/assets/images/cmimimeimire.png'
import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAngleDown,
  faArrowDown,
  faCheck,
  faCreditCard,
  faHeart,
  faMoneyBillTransfer,
  faShoppingCart,
  faStar,
  faTruck,
} from '@fortawesome/free-solid-svg-icons'
import { useAppDispatch, useAppSelector } from '@/hooks/hooks'
import { getProductWithId } from '@/store/products/productSlice'
import { useLocation, useNavigate } from 'react-router-dom'
import LeftSlider from './LeftSlider'
import Img1 from '@/assets/images/productIMG1.png'
import TebImg from '@/assets/images/teb.png'
import RbkoImg from '@/assets/images/rbko.png'
import SliderTest from './Slider.test'
import SwipperSlider from './SwipperSlider'
import RatingModal from './RatingModal'
import Rating from 'react-rating-stars-component'
import { useGetRatingWithProductIdQuery } from '@/store/products/RTKProductSlice'
import { addToCartType } from '@/helpers/types'
import {
  useAddToCartQueryMutation,
  useGetCartProductsQuery,
} from '@/Cart/store/cartAPI'

const FullStar = () => <FontAwesomeIcon icon={faStar} />

const ProductItem = () => {
  const dispatch = useAppDispatch()
  const path = useLocation()
  const navigate = useNavigate()
  const id = useLocation().pathname.split('/')[2]
  const [activeProdTitle, setActiveProdTitle] = useState('1')
  const { product, loading, error } = useAppSelector((state) => state.products)
  const { data: productRatings } = useGetRatingWithProductIdQuery(id)
  console.log('productRatings', productRatings)

  const { user } = useAppSelector((state) => state.auth)
  const [ratingsModal, setRatingsModal] = useState<boolean>(false)
  const [selectedImage, setSelectedImage] = useState<string>(Img1)

  const [addToCartQuery, { isError, isLoading, isSuccess }] =
    useAddToCartQueryMutation()

  const {
    data: cart,
    refetch,
    isLoading: cartLoading,
  } = useGetCartProductsQuery()

  console.log('product', product)

  const handleImageChange = (newImage: string) => {
    console.log('newImage', newImage)
    setSelectedImage(newImage)
  }

  console.log('selectedImage', selectedImage)

  useEffect(() => {
    dispatch(getProductWithId(id))
  }, [])

  const productDetailsTitles = [
    { id: '1', title: 'Description' },
    { id: '2', title: 'Details' },
    { id: '3', title: 'Ratings' },
  ]

  const addToCartHandler = (items: addToCartType) => {
    addToCartQuery(items)
      // .unwrap()
      .then(() => {
        refetch()
        navigate('/cart')
      })
      .catch((err) => console.log('err', err))
  }
  return (
    <div className="p-0 container">
      <div className="pt-3">
        <Breadcrumb />
      </div>
      <ProductWrapper className="p-4">
        <div className="d-flex product-info-all md:flex-row">
          <div
            className="w-100 md:w-50 d-flex align-items-center justify-content-center position-relative md:pr-3"
            id="product-img-wrapper"
          >
            <div className="position-absolute top-0 left-0 md:left-16 d-flex align-items-center justify-content-center z-10">
              <img src={AuthorizedSeller} alt="" style={{ width: '100px' }} />
            </div>

            <span className="w-36 position-absolute top-0 right-0 md:right-6 d-flex align-items-center justify-content-center z-10">
              <img src={BestPrice} alt="" style={{ width: '100px' }} />
            </span>
            {/* <div
              className="md:flex flex-col mr-6 thumb-slider-container "
              style={{ width: '50px', height: '400px' }}
              id="thumb-slider"
            >
              <LeftSlider
                selectedImage={selectedImage}
                onImageChange={handleImageChange}
              />
            </div>
            <div className="swiper product-picture-slider w-100 mb-5 swiper-initialized swiper-horizontal swiper-pointer-events swiper-backface-hidden">
              <img src={selectedImage} className="w-100 h-100" alt="" />
            </div> */}
            <SwipperSlider images={product?.images} />
          </div>

          <div className="overview product-details w-100 md:w-50 text-gray-700 md:pl-3">
            <div className="manufacturers md:grid">
              <span className="value d-flex align-items-center">
                <a
                  className="text-gray-700 text-xs underline"
                  href="/search?q=apple"
                >
                  Apple
                </a>
              </span>
            </div>

            <div className="product-name">
              <h1 className="text-left text-xl pb-1">{product?.title}</h1>

              <div className="text-gray-600 align-items-center d-flex whitespace-nowrap flex-wrap pb-2">
                <div className="product-reviews-overview d-flex flex-row align-items-center text-sm">
                  <div className="product-no-reviews d-flex align-items-center">
                    <span
                      className="d-flex text-gray-700 align-items-center text-xs font-medium open-product-review-popup underline"
                      id="add-new-ajax"
                    >
                      Vlerëso
                    </span>
                  </div>
                </div>

                <span className="text-xs font-medium text-gray-700 text-left d-flex align-items-center">
                  <i className="separator icon-separator text-[5px] mx-2 d-flex align-items-center text-gray-700 icon-line-height"></i>
                  Garancioni:
                  <span className=" ml-1">1 vit</span>
                </span>

                <span className="text-xs font-medium text-gray-700 text-left d-flex align-items-center">
                  <i className="separator icon-separator text-[5px] mx-2 d-flex align-items-center text-gray-700 icon-line-height"></i>
                  Origjina e brendit:
                  <span
                    className="d-flex justify-content-center align-items-center ml-1 rounded-md"
                    style={{ height: '1.2rem', width: '1.2rem' }}
                  >
                    <img
                      className="rounded-md position-relative"
                      src={
                        'https://hhstsyoejx.gjirafa.net/gjirafa50core/flags/us.svg'
                      }
                      title="USA and Canada"
                    />
                  </span>
                </span>

                <span className="text-xs text-gray-700 font-medium cursor-pointer d-flex align-items-center">
                  <i className="separator icon-separator text-[5px] mx-2 d-flex align-items-center text-gray-700 icon-line-height"></i>
                  Kodi:
                  <input
                    //  onClick="copyProductCode()"
                    id="product-code-copy"
                    className="ml-1 underline text-xs font-medium"
                    value="272523app"
                    aria-label="Kodi"
                  />
                </span>
              </div>
            </div>

            <div className="prices w-100 py-1 d-flex rounded product-price text-gray-700">
              <div className="d-flex flex-col justify-content-start">
                <div className="d-flex flex-col pr-2">
                  <div className="hidden non-discounted-price line-through text-sm text-gray-600 price-without-discount-value-160697"></div>
                  <div className="min-w-[100px]">
                    <div
                      id="price-value-160697"
                      className="product-price-160697  text-2xl fw-bold text-gray-700 price-value-160697"
                    >
                      {product?.price.toFixed(2)} €
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex flex-col justify-content-end pl-2 pb-1 text-gray-600 font-medium">
                <span className="product-discount" style={{ fontSize: '9px' }}>
                  Përfshirë TVSH-në
                </span>
                <span style={{ fontSize: '9px' }}>Pa TVSH 931.78 €</span>
              </div>
            </div>

            {product?.discount !== 0 && (
              <div className="d-flex align-items-center gap-2 text-xs font-medium text-primary build-product-section hidden">
                <div className="d-flex align-items-center justify-center">
                  Ju kurseni{' '}
                  <span className="ml-1 bundle-discount-value-160697">
                    {' '}
                    -{product?.discount} %{' '}
                  </span>
                </div>
                <span className="hidden bg-primary rounded-md bg-opacity-10 d-flex w-10 align-items-center justify-content-center px-1.5 discount-percentage-value-160697"></span>
              </div>
            )}

            <div className="d-flex align-items-center pt-2 mb-1">
              <span className="qty-label text-xs text-gray-600 whitespace-nowrap">
                Pagesa me keste
              </span>
              <hr className="w-full bg-gray-100 ml-2" />
            </div>

            {/* <div className="w-full d-flex border rounded align-items-center justify-content-between px-2 h-[40px] mt-2">
              <div className="d-flex align-items-center text-xs font-medium">
                <img
                  src="https://gjirafa50core.blob.gjirafa.tech/logo/kepPayment.svg"
                  alt="gjirafa"
                  style={{ width: '100px' }}
                />
                <span
                  id="installment-price-btn"
                  className="text-primary font-bold px-2 whitespace-nowrap min-w-[95px]"
                >
                  42.85 €/muaj
                </span>
                për 36 muaj
                <span className="hidden md:flex">
                  - GjirafaPayPlan with KEP
                </span>
              </div>
              <a
                className="open-kep-popup see-more text-gray-600 hover:text-primary text-xs font-medium d-flex align-items-center"
                // href="#kep-popup"
              >
                Më shumë
                <i className="icon-chevron-line-right text-xl">
                  <FontAwesomeIcon icon={faAngleDown} />
                </i>
              </a>
            </div> */}

            <div
              className="returning-wrapper fieldset mfp-hide rounded d-flex justify-start flex-col bg-white w-full md:w-[600px]"
              id="open-kep-popup"
            ></div>

            <div className="border gap-2 d-flex flex-wrap align-items-center rounded px-2 py-1 font-medium text-xs mt-2 relative">
              <img
                width="44"
                src={RbkoImg}
                alt="Raifeissen Bank"
                style={{ width: '44px' }}
              />{' '}
              <img
                width="44"
                src={TebImg}
                alt="Teb Bank"
                style={{ width: '44px' }}
              />{' '}
              deri në 12 këste pa kamatë për vetëm{' '}
              <span className="text-primary font-bold installment-price-value-160697">
                91.62 €/muaj
              </span>
            </div>

            <div className="w-full d-flex flex-col pb-2">
              <div className="d-flex align-items-center pt-2 mb-1">
                <label
                  className="qty-label text-xs text-gray-600"
                  // for="addtocart_160697_AddToCart_EnteredQuantity"
                >
                  Sasia
                </label>
                <hr className="w-full bg-gray-100 ml-2" />
              </div>
              <div className="d-flex align-items-center">
                <div className="d-flex align-items-center">
                  <input
                    type="button"
                    value="-"
                    className="qtyminus minus rounded-tl rounded-bl outline-none focus:ring-primary bg-white text-gray-600 text-lg border"
                    data-quantity="decrease"
                  />
                  <input
                    type="number"
                    value="1"
                    pattern="[0-9]"
                    // onkeypress="return event.charCode >= 48 &amp;&amp; event.charCode <= 57"
                    id="product_enteredQuantity_160697"
                    className="quantity quantity-in-product border qty outline-none focus:ring-2 focus:ring-primary"
                    aria-label="Shkruani një sasi"
                    data-val="true"
                    data-val-required="The Sasia field is required."
                    name="addtocart_160697.AddToCart.EnteredQuantity"
                  />
                  <input
                    name="__Invariant"
                    type="hidden"
                    value="addtocart_160697.AddToCart.EnteredQuantity"
                  />
                  <input
                    type="button"
                    value="+"
                    className="qtyplus p-0 plus rounded-tr rounded-br outline-none focus:ring-primary bg-white text-gray-600 text-lg border"
                    data-quantity="increase"
                  />
                </div>

                <div className="availability text-left">
                  <div className="stock d-flex flex-col">
                    <div
                      className="value d-flex"
                      id="stock-availability-value-160697"
                    >
                      <div className="d-flex flex-col pl-2 justify-content-center px-2  bg-opacity-10 rounded-md ml-2">
                        <span className="text-xs text-primary font-medium">
                          Vetëm edhe 10
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              id="free-shipping-160697"
              className="delivery free-shipping d-flex flex-col pb-2"
            >
              <div className="d-flex align-items-center pt-2 mb-1">
                <span className="label text-xs text-gray-600">Transporti</span>
                <hr className="w-100 bg-gray-100 ml-2" />
              </div>
              <div className="d-flex justify-content-between align-items-start">
                <div className="d-flex align-items-start">
                  <i className="icon-truck-delivery-shipping text-primary text-2xl p-2 rounded bg-gray-100">
                    <FontAwesomeIcon icon={faTruck} />
                  </i>
                  <div className="d-flex align-items-start flex-wrap">
                    <div className="d-flex flex-col justify-content-center pl-2 text-xs font-medium pr-2 mr-2 tablet:border-r">
                      <span className="text-gray-700 text-xs">
                        Transport 24h
                      </span>
                      <div>
                        Koha e arritjes së produktit:
                        <span>- Prishtinë</span>
                      </div>
                      12 tetor 2023 - 13 tetor 2023
                      <div></div>
                    </div>
                    <div className="d-flex flex-col justify-content-center pl-2 text-xs font-medium">
                      <div>Kosovë, të tjera</div>
                      <div>13 tetor 2023 - 14 tetor 2023</div>
                    </div>
                  </div>
                </div>
                <a
                  className="open-kep-popup see-more text-gray-600 hover:text-primary text-xs font-medium d-flex align-items-center"
                  // href="#kep-popup"
                >
                  Më shumë
                  <i className="icon-chevron-line-right text-xl">
                    <FontAwesomeIcon icon={faAngleDown} />
                  </i>
                </a>
              </div>
            </div>

            {/* <div
              id="free-shipping-160697"
              className="delivery free-shipping d-flex flex-col pb-2"
            >
              <div className="d-flex align-items-center pt-2 mb-1">
                <span className="label text-xs text-gray-600">Transporti</span>
                <hr className="w-full bg-gray-100 ml-2" />
              </div>
              <div className="d-flex justify-content-between items-start">
                <div className="d-flex items-start">
                  <i className="icon-truck-delivery-shipping text-primary text-2xl p-2 rounded bg-gray-100">
                    <FontAwesomeIcon icon={faTruck} />
                  </i>
                  <div className="d-flex items-start ">
                    <div className="pl-2 md:pr-0 mr-4 text-xs font-medium">
                      Data e dërgesës për këtë produkt është e pacaktuar. Për më
                      shumë informata na kontaktoni në livechat.
                    </div>
                  </div>
                </div>
                <a className="see-more text-gray-600 hover:text-primary text-xs font-medium d-flex align-items-center whitespace-nowrap">
                  Më shumë
                  <i className="icon-chevron-line-down text-xl">
                    <FontAwesomeIcon icon={faAngleDown} />
                  </i>
                </a>
              </div>
            </div> */}

            {/* <div className="d-flex flex-col justify-content-center bg-white slideup see-more-content">
              <div className="d-flex flex-col">
                <span className="text-sm text-gray-700 mt-4">
                  Koha e arritjes së produktit::{' '}
                </span>
                <span className="text-xs text-gray-600">E pacaktuar</span>
              </div>
            </div> */}

            <div className="d-flex flex-col justify-content-center pb-4">
              <div className="d-flex align-items-center pt-2 mb-1">
                <span className="text-xs text-gray-600 whitespace-nowrap">
                  Pagesa të sigurta
                </span>
                <hr className="w-full bg-gray-100 ml-2" />
              </div>
              <div className="d-flex md:flex-row flex-wrap align-items-start align-items-center justify-content-between">
                <div className="d-flex align-items-center mb-2 md:mb-0 md:mr-2">
                  <i className="icon-paymnet-money-coins-alt rounded bg-gray-100 p-2 text-2xl text-primary">
                    <FontAwesomeIcon icon={faTruck} />
                  </i>
                  <span className="text-xs pl-2 font-medium whitespace-nowrap">
                    Paguaj me para në dorë
                  </span>
                </div>
                <div className="d-flex align-items-center mb-2 md:mb-0 md:mr-2">
                  <i className="icon-payment-credit-card-alt rounded bg-gray-100 p-2 text-2xl text-primary">
                    <FontAwesomeIcon icon={faCreditCard} />
                  </i>
                  <span className="text-xs pl-2 font-medium whitespace-nowrap">
                    Paguaj online
                  </span>
                </div>
                <div className="d-flex align-items-center md:mr-2">
                  <i className="icon-paymennt-credit-cards rounded bg-gray-100 p-2 text-2xl text-primary">
                    <FontAwesomeIcon icon={faMoneyBillTransfer} />
                  </i>
                  <span className="text-xs pl-2 font-medium whitespace-nowrap">
                    Paguaj me transfer bankar
                  </span>
                </div>
              </div>
            </div>

            <div
              id="product-overview-buttons"
              className="overview-buttons d-flex bg-white w-100 px-2 right-0 md:px-0  md:relative bottom-0 z-50 pt-3 pb-3 md:mb-0 md:py-0 gap-4 justify-content-end"
              //   position-fixed
            >
              {/* <button
                id="buy-now-btn-container"
                type="button"
                style={{ display: 'none' }}
                className="btn btn-primary  btn-primary-hover w-100 focus:outline-none d-flex justify-content-center align-items-center hidden gap-2 text-sm"
                // style="display: none;"
              >
                <i className="icon-check-badge icon-line-height text-2xl"></i>
                Blej tani
              </button> */}
              <div className="w-100">
                <button
                  type="button"
                  className="open-buynow-popup btn btn-primary btn-primary-hover w-100 focus:outline-none d-flex align-items-center justify-content-center gap-2"
                  onClick={() =>
                    addToCartHandler({
                      productId: product?.id ?? '',
                      quantity: 1,
                      price: product?.price ?? 0,
                    })
                  }
                  //  href="#buynow-popup"
                >
                  <i className="icon-check-badge text-2xl d-flex align-items-center justify-content-center gap-2 icon-line-height">
                    <FontAwesomeIcon icon={faCheck} />
                  </i>
                  <span className="uppercase text-xs md:text-sm">
                    Blej tani
                  </span>
                </button>
              </div>
              <button
                type="button"
                id="add-to-cart-button-160697"
                className="w-100 add-to-cart-button btn btn-secondary btn-secondary-hover md:w-100 focus:outline-none d-flex justify-content-center"
                data-productid="160697"
                aria-label="Shto në shportë"

                // onclick="sendAddToCartEvent(`160697`,`Apple iPhone 15, 128GB, Black`,`1099,50`,`cart`);
                //                     AjaxCart.addproducttocart_details('/addproducttocart/details/160697/1', '#product-details-form');
                //                     produceConvertedObjectEvent(['160697'], 'Add_To_Cart');
                //                     return false;"
              >
                <i className="icon-cart-shopping-add text-2xl icon-line-height">
                  <FontAwesomeIcon icon={faShoppingCart} />
                </i>
                <span className="text-xs md:text-sm md:flex ml-2">
                  Shto në shportë
                </span>
              </button>
              <button
                type="button"
                id="add-to-wishlist-button-160697"
                className="add-to-wishlist-button btn btn-secondary btn-secondary-hover focus:outline-none  md:flex"
                data-productid="160697"
                //  onclick="AjaxCart.addproducttocart_details('/addproducttocart/details/160697/2', '#product-details-form');return false;"
              >
                <i className="icon-heart text-2xl icon-line-height">
                  <FontAwesomeIcon icon={faHeart} />
                </i>
              </button>
            </div>
          </div>
        </div>
      </ProductWrapper>
      <ProductWrapper className="p-0">
        <div id="details" className="all-details__div">
          <ul className="product-details__tab">
            {productDetailsTitles.map((item) => (
              <li
                key={item.id}
                onClick={() => setActiveProdTitle(item.id)}
                className={activeProdTitle === item.id ? 'active' : ''}
              >
                <a>{item.title}</a>
              </li>
            ))}
          </ul>

          <div className="product-details__content p-3 md:p-6">
            {activeProdTitle === '1' && (
              <div className="tab1 text-sm">{product?.description}</div>
            )}
            {activeProdTitle === '2' && (
              <div className="d-flex flex-col position-relative">
                <div
                  className="grid grid-cols-1  md:grid-cols-2"
                  id="product-specifications-split-page"
                >
                  {product?.details.map((product, index) => (
                    <div className="d-flex flex-grow" key={index}>
                      <div className="spec-name pl-2 py-2 m-0 text-xs text-left font-medium">
                        {product.key}:
                      </div>
                      <div className="spec-value py-2 m-0 text-xs">
                        {product.value}{' '}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeProdTitle === '3' && (
              <div className="product-reviews">
                <div className="d-flex pb-6 justify-content-around border-b">
                  <div className="d-flex align-items-center text-center flex-col ratingsAndReviews">
                    <span className="text-primary text-4xl font-bold md:mb-0 d-flex align-items-center">
                      {productRatings?.length}
                      <i className="icon-star text-sm">
                        <FullStar />
                        {/* <FontAwesomeIcon /> */}
                      </i>
                    </span>
                    <p>{productRatings?.length} Ratings</p>
                  </div>
                  <div className="d-flex justify-content-center align-items-center">
                    <button
                      id="display-product-review-modal"
                      onClick={() => setRatingsModal(true)}
                      className="btn text-primary border rounded border-primary  hover:bg-primary transition-all duration-150 hover:text-white text-sm open-product-review-popup"
                    >
                      Shto vlerësimin tuaj
                    </button>
                  </div>
                </div>
                <div className="product-review-list">
                  {productRatings?.map((productItem, index) => (
                    <div className="product-review-item mt-4" key={index}>
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="inline-block text-base font-semibold capitalize-first-letter">
                          {typeof productItem.productID === 'string'
                            ? ''
                            : productItem.productID.title}{' '}
                        </span>
                        <Rating
                          count={5}
                          size={24}
                          value={productItem.rating}
                          color="#ccc"
                          edit={false}
                          activeColor="#f8b400"
                          char={FullStar}
                        />
                      </div>
                      <div className="review-item-head d-flex align-items-center divide-dashed">
                        <span className="pr-1 text-xs capitalize-first-letter">
                          {typeof productItem.userID === 'string'
                            ? ''
                            : productItem.userID.name}
                        </span>
                        <span className="text-xs text-gray-700">
                          22.10.2023 11:48 e paradites
                        </span>
                      </div>
                      <div className="review-content text-left">
                        <div className="review-text flex items-center my-2">
                          <div className="text-body capitalize-first-letter flex-grow text-sm">
                            {productItem.description}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </ProductWrapper>

      {ratingsModal && (
        <RatingModal
          show={ratingsModal}
          onHide={() => setRatingsModal(false)}
          userID={user?.user.id || ''}
          productID={id}
        />
      )}
    </div>
  )
}

export default ProductItem

{
  /* 

<div className="page-body p-6">
    
        <div className="write-review" id="review-form">

            <form method="post" id="product-review-modal-form" action="/productreviews/160697">
                <input type="number" name="productId" value="160697" hidden="">
                <input name="add-review" value="true" hidden="">

                <div className="message-error validation-summary-errors"><ul><li>Vetëm përdoruesit e regjistruar mund të shkruajnë vlerësime</li>
</ul></div>

                <div className="fieldset">
                    <div className="form-fields">
                        <div className="inputs mb-4 w-full">
                            <span className="flex">
                                <label for="AddProductReview_Title">Titulli:</label>
                                <span className="required">*</span>
                            </span>
                            <input className="review-title w-full" disabled="disabled" type="text" id="AddProductReview_Title" name="AddProductReview.Title" value="">
                            <span className="field-validation-valid" data-valmsg-for="AddProductReview.Title" data-valmsg-replace="true"></span>
                        </div>
                        <div className="inputs mb-4">
                            <span className="flex">
                                <label for="AddProductReview_ReviewText">Përshkrimi:</label>
                                <span className="required">*</span>
                            </span>
                            <textarea className="review-text w-full" id="AddProductReview_ReviewText" name="AddProductReview.ReviewText" disabled="disabled"></textarea>
                            <span className="field-validation-valid" data-valmsg-for="AddProductReview.ReviewText" data-valmsg-replace="true"></span>
                        </div>
                        <div className="review-rating d-flex flex-col mb-5">
                            <div className="name-description text-sm text-gray-700 flex">
                                <label for="AddProductReview_Rating">Vlerësime:</label>
                                <span className="required">*</span>
                            </div>
                            <div className="rating-wrapper d-flex align-items-center justify-start rounded-md w-min">
                                <div className="rating-options d-flex align-items-center">
                                    <div>
                                        <input className="mr-1 opacity-0 input-star" value="1" type="radio" id="addproductrating_1" aria-label="Keq" data-val="true" data-val-required="The Vlerësime field is required." name="AddProductReview.Rating">
                                        <i className="stars-rating mdi icon-star text-lg text-gray-400 absolute -ml-4"></i>
                                    </div>
                                    <div>
                                        <input className="mr-1 opacity-0 input-star" value="2" type="radio" id="addproductrating_2" aria-label="Jo mirë" name="AddProductReview.Rating">
                                        <i className="stars-rating mdi icon-star text-lg text-gray-400 absolute -ml-4"></i>
                                    </div>
                                    <div>
                                        <input className="mr-1 opacity-0 input-star" value="3" type="radio" id="addproductrating_3" aria-label="Mire, por edhe jo i shkëlqyer" name="AddProductReview.Rating">
                                        <i className="stars-rating mdi icon-star text-lg text-gray-400 absolute -ml-4"></i>
                                    </div>
                                    <div>
                                        <input className="mr-1 opacity-0 input-star" value="4" type="radio" id="addproductrating_4" aria-label="Mirë" name="AddProductReview.Rating">
                                        <i className="stars-rating mdi icon-star text-lg text-gray-400 absolute -ml-4"></i>
                                    </div>
                                    <div>
                                        <input className="mr-1 opacity-0 input-star" value="5" type="radio" id="addproductrating_5" aria-label="I shkëlqyer" name="AddProductReview.Rating">
                                        <i className="stars-rating mdi icon-star text-lg text-gray-400 absolute -ml-4"></i>
                                    </div>
                                    <script>
                                        var stars = document.getElementsByClassName('icon-star');
                                        var inputStar = document.querySelectorAll('.input-star');
                                        inputStar.forEach(function (star) {
                                            star.removeAttribute('checked');
                                        });

                                        $('.stars-rating').on('click', function (e) {
                                            inputStar.forEach(function (e) {
                                                e.removeAttribute('checked');
                                            });
                                            var indexStar = $(this).index('.stars-rating');
                                            for (i = 0; i < stars.length; i++) {
                                                if (i === indexStar) {
                                                    inputStar[indexStar].setAttribute('checked', true);
                                                }
                                                if (i > indexStar) {
                                                    stars[i].classList.remove('text-primary')
                                                    stars[i].classList.add('text-gray-400')
                                                }
                                                else {
                                                    stars[i].classList.add('text-primary')
                                                    stars[i].classList.remove('text-gray-400')
                                                }
                                            }
                                        });
                                    </script>
                                </div>
                            </div>
                            <span className="field-validation-valid" data-valmsg-for="AddProductReview.Rating" data-valmsg-replace="true"></span>
                        </div>

                    </div>
                </div>
                <div className="buttons">
                    <button id="add-review-modal-submit-btn" name="add-review" className="write-product-review-buttoni btn btn-primary btn-primary-hover w-full" onclick="return false;" disabled="">
                        Vlerëso
                    </button>
                </div>
            <input name="__RequestVerificationToken" type="hidden" value="CfDJ8BavmJPrX4dBnzAs_5ATawwx-G966mc16XeOOKU0YaUeehxT3M4SJMb8VQMZZ5hez5Twc7IgCTGkYMBFENZK9HmjVrcrKHfFI-K2HtVy4-qya70TNz9nFCuxEYyvYaPSs1Ub0OhHwMknhLzqLSjYFJk"></form>
        </div>

    
</div>*/
}
