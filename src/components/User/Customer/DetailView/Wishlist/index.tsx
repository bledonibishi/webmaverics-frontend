import WrappingCard from '@/pages/Costumer/WrappingCard'
import { faChain, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import './style.css'
import { useGetWishlistProductsQuery } from '@/wishlist/store/wishlistAPI'
import LoadingBar from '@/ui/Loading/LoadingBar'
import { useDispatch, useSelector } from 'react-redux'
import { getWishlistProducts } from '@/wishlist/store/wishlistSlice'
import { RootState } from '@/store'
import { useAppDispatch, useAppSelector } from '@/hooks/hooks'

const Wishlist = () => {
  const dispatch = useAppDispatch()
  const wishlist = useAppSelector((state) => state.wishlist)
  console.log('wishlist', wishlist)

  useEffect(() => {
    dispatch(getWishlistProducts())
  }, [])

  const [location, setLocation] = useState('')
  const copyWishListUrl = () => {
    console.log('copyWishListUrl')
  }
  return (
    <>
      <WrappingCard marginBtm="20px">
        <div className="d-flex justify-content-between align-items-center">
          <p className="text-lg">Wishlist</p>
          <div className="d-flex">
            <button className="btn btn-secondary d-flex text-xs align-items-center">
              SHARE <FontAwesomeIcon className="pl-2" icon={faChain} />
            </button>
            <button
              onClick={() => setLocation('/deleteCartItems/2')}
              type="button"
              className="btn btn-secondary text-xs d-flex align-items-center whitespace-nowrap outline-none "
            >
              <span className="tablet:block pr-2">
                FSHIJ LISTËN E DËSHIRAVE
              </span>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </div>
      </WrappingCard>
      <WrappingCard>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4  mb-6">
          <div className="item-box">
            <div
              className="product-item bg-white overflow-hidden p-2 md:p-3 hover:shadow-md shadow-sm rounded relative"
              id="related-products"
              data-productid="160697"
            >
              <div className="picture relative px-4 pt-4">
                <a
                  className="relative block"
                  href="/apple-iphone-15-128gb-black"
                  title="Apple iPhone 15, 128GB, Black"
                >
                  <img
                    loading="lazy"
                    className="absolute top-0 right-0 bottom-0 left-0 m-auto transition-all duration-300 max-h-full max-w-full object-contain"
                    alt="Foto e Apple iPhone 15, 128GB, Black"
                  />
                </a>
              </div>
              <div className="details">
                <span className="product-title">
                  <a
                    className="text-sm md:text-base product-title-lines hover:underline"
                    title="Apple iPhone 15, 128GB, Black"
                    href="/apple-iphone-15-128gb-black"
                  >
                    Apple iPhone 15, 128GB, Black
                  </a>
                </span>
                <div className="add-info">
                  <div className="prices flex flex-col h-12 my-2">
                    <span className="price actual-price font-semibold text-gray-700 text-base md:text-xl">
                      1,099.50 €
                    </span>
                  </div>
                </div>
                <div className="buttons flex justify-evenly gap-2">
                  <button
                    aria-label="Shto në shportë"
                    className="h-10 product-box-add-to-cart-button flex items-center btn-primary-hover justify-center md:flex-grow hover:bg-primary hover:text-white w-1/2 focus:outline-none focus:border-none btn-simple btn-secondary focus:text-white"
                    // onclick="AjaxCart.addproducttocart_catalog('/addproducttocart/catalog/160697/1/1');return false;"
                  >
                    <span className="icon-cart-shopping-add icon-line-height text-xl md:hidden"></span>
                    <span className="hidden md:grid text-xs font-medium">
                      Shto në shportë
                    </span>
                  </button>
                  <button
                    name="updatecart"
                    className="h-10 flex items-center justify-center hover:bg-primary w-1/2 md:w-auto add-to-wishlist-button btn-primary-hover hover:text-white focus:outline-none btn btn-secondary focus:text-white"
                    // onclick="SendDeleteFromCartEvent('160697', 'Apple iPhone 15, 128GB, Black','1,099.50 €','1','wishlist'); $('#removefromcart215652').prop('checked', true).change();"
                  >
                    <input
                      type="checkbox"
                      className="hidden"
                      name="removefromcart"
                      id="removefromcart215652"
                      data-productid="160697"
                      value="215652"
                      aria-label="Largo"
                    />
                    <i className="icon-delete-trash text-xl"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </WrappingCard>
      {/* {isLoading ? <LoadingBar /> : 'data'} */}
    </>
  )
}

export default Wishlist
