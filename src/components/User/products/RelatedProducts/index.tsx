import axiosInstance from '@/api/axiosInstance'
import { Image } from '@/helpers/helpers'
import { Product } from '@/helpers/types'
import { faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'

type RelatedProductsType = {
  product: Product | null
}

const RelatedProducts: React.FC<RelatedProductsType> = ({ product }) => {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  console.log('relatedProducts', relatedProducts)

  useEffect(() => {
    const getRelatedProducts = async () => {
      await axiosInstance
        .get(`api/v1/products/relatedProducts/${product?.id}`)
        .then((res) => setRelatedProducts(res.data))
    }

    getRelatedProducts()
  }, [product?.id])

  return (
    <div id="relatedProducts">
      <div className="related-products-grid product-grid ">
        <div className="d-flex flex-col justify-between mb-8 border-b border-gray-300 pb-3 position-relative">
          <span className="position-absolute h-0.5 rounded-tl-sm rounded-tr-sm w-12 bottom-0 left-0 bg-primary"></span>
          <div className="d-flex align-items-center text-sm md:text-lg">
            <p className="text-gray-700 font-semibold">Produkte të ngjashme:</p>
          </div>
        </div>
        <div className="item-grid d-grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-5 pt-3">
          {relatedProducts.map((item, index) => (
            <div className="item-box md:w-auto">
              <div
                // onclick="PrepareSearchResultClickEvent(this, 'Mauspad Yenkee SPEED TOP, S, i zi')"
                className="product-item bg-white p-2 md:p-3 position-relative shadow-sm hover:shadow-md rounded h-100 overflow-hidden d-flex flex-col justify-content-between"
                data-productid="7563"
              >
                {item.discount !== 0 && (
                  <div
                    //  onclick="SendSearchResultsClickEvent(this, 'Mauspad Yenkee SPEED TOP, S, i zi')"
                    className="position-absolute h-6 top-2.5 left-0 pr-3 pl-3 tablet:pl-0 d-flex tablet:flex-row gap-1 tablet:gap-0 tablet:items-center tablet:flex-wrap z-10 w-100 flex-row"
                  >
                    <div className="w-10 h-[19px] bg-primary discount__label d-flex justify-content-center align-items-center rounded position-absolute right-3 top-[1px] shadow-sm text-white text-xs font-medium">
                      -{item.discount}%
                    </div>
                  </div>
                )}

                <div
                  className="picture position-relative px-4 pt-6"
                  // onclick="produceClickedProductEvent('',7563)"
                >
                  <a
                    className="position-relative d-block"
                    href="/gaming-16/aksesore-90/maus-2/aksesore-92/mauspad/mauspad-yenkee-speed-top-s-i-zi"
                    title="Shfaq detaje për Mauspad Yenkee SPEED TOP, S, i zi"
                  >
                    <Image
                      src={item.imageCover ? item.imageCover : ''}
                      alt="imageCover"
                      className="position-absolute top-0 right-0 bottom-0 left-0 m-auto transition-all duration-300 max-h-full max-w-full object-contain"
                    />
                  </a>
                </div>

                <div className="details d-flex flex-col h-100 justify-between pb-2">
                  <h2 className="product-title">
                    <a
                      className="text-gray-700 text-sm md:text-base product-title-lines hover:underline"
                      title={`${item.title}`}
                      // onclick="produceClickedProductEvent('',7563)"
                      href={`product/${item.id}`}
                    >
                      {item.title}
                    </a>
                  </h2>

                  <div className="prices d-flex flex-col h-12 position-relative">
                    {item.priceDiscount ? (
                      <>
                        <span className="price font-semibold text-gray-700 text-base md:text-xl">
                          {item.priceDiscount?.toFixed(2)} €
                        </span>
                        <span className="price old-price text-gray-600 font-medium text-sm line-through">
                          {item.price?.toFixed(2)} €
                        </span>
                      </>
                    ) : (
                      <span className="price font-semibold text-gray-700 text-base md:text-xl">
                        {item.price?.toFixed(2)} €
                      </span>
                    )}
                  </div>

                  <div className="d-flex flex-col pt-2 justify-between lg:flex-row">
                    <span className="text-xs text-gray-600">
                      Përfshirë TVSH
                    </span>
                  </div>
                </div>
                <div className="buttons d-flex justify-content-evenly gap-2">
                  <button
                    aria-label="Shto në shportë"
                    id="add-to-cart-(7563)"
                    //  onclick="sendAddToCartEvent('7563', `Mauspad Yenkee SPEED TOP, S, i zi`, '4,5000', 'cart');AjaxCart.addproducttocart_catalog(`/addproducttocart/catalog/7563/1/1`);produceConvertedObjectEvent(['7563'], 'Add_To_Cart');return false;"
                    className="product-box-add-to-cart-button d-flex gap-2 align-items-center btn-primary-hover hover:bg-primary hover:text-white justify-content-center md:flex-grow w-75 focus:outline-none focus:border-none focus:text-white btn-simple btn-secondary"
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
                    id="add-to-wishlisht-(7563)"
                    value="Shto në listën e dëshirave"
                    title="Shto në listën e dëshirave"
                    style={{ border: 'none' }}
                    // onclick="sendAddToCartEvent('7563', `Mauspad Yenkee SPEED TOP, S, i zi`, '4,5000', 'wishlist');AjaxCart.addproducttocart_catalog(`/addproducttocart/catalog/7563/2/1`);return false;"
                    className="group hover:bg-primary w-25 md:w-auto add-to-wishlist-button btn-primary-hover hover:text-white focus:outline-none btn btn-secondary focus:text-white"
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
              <div className="product-item bg-white p-2 md:p-3 relative shadow-sm hover:shadow-md rounded h-100 overflow-hidden d-flex flex-col justify-between skeleton">
                <div className="picture relative rounded bg-gray-100 mb-1 skeleton-animation bg-gray-300">
                  <a className="relative block bg-gray-100 z-10 skeleton-animation">
                    <img
                      className="position-absolute top-0 right-0 bottom-0 left-0 m-auto transition-all duration-300 max-h-full max-w-full bg-gray-100 skeleton-animation object-contain"
                      src=""
                    />
                  </a>
                </div>
                <div className="details d-flex flex-col h-100 justify-content-between pb-2">
                  <span className="h-8 bg-gray-100 block rounded skeleton-animation mb-2"></span>
                  <div className="prices d-flex flex-col w-50">
                    <span className="block bg-gray-100 h-4 mb-2 rounded skeleton-animation"></span>
                    <span className="block bg-gray-100 h-4 mb-2 rounded skeleton-animation"></span>
                  </div>
                  <div className="block bg-gray-100 h-4 rounded skeleton-animation"></div>
                </div>
                <div className="buttons d-flex justify-content-evenly gap-2">
                  <button className="product-box-add-to-cart-button d-flex gap-2 align-items-center justify-content-center md:flex-grow w-50 btn-simple btn-secondary h-10 skeleton-animation"></button>
                  <button
                    type="button"
                    className="w-50 md:w-auto add-to-wishlist-button btn btn-secondary h-10 skeleton-animation"
                  ></button>
                </div>
              </div>
            </div>
          </template>
        </div>

        <div className="load-more-products">
          <div className="d-flex flex-col justify-content-center align-items-center mt-5">
            {relatedProducts.length ? (
              relatedProducts?.length >= 10 ? (
                <button
                  data-page-infinite="2"
                  className="border load-more-products-btn border-primary btn d-flex align-items-center text-primary bg-white font-medium shadow-md group hover:bg-primary focus:outline-none hover:text-white"
                >
                  SHFAQ MË SHUMË PRODUKTE
                  <span className="icon-chevron-line-down text-primary text-xl pl-1 group-hover:text-white icon-line-height"></span>
                </button>
              ) : (
                <span
                  data-empty=""
                  className="hidden py-2 px-4 text-primary font-medium text-sm uppercase d-flex align-items-center group"
                  style={{ display: 'none' }}
                >
                  Fundi i rezultateve
                </span>
              )
            ) : (
              <span
                data-empty=""
                className="hidden py-2 px-4 text-primary font-medium text-sm uppercase d-flex align-items-center group"
                style={{ display: 'none' }}
              >
                Nuk ka
              </span>
            )}
          </div>

          <div
            className="load-more-products-categories"
            style={{ display: 'none' }}
          ></div>
        </div>
      </div>
    </div>
  )
}

export default RelatedProducts
