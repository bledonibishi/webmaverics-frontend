import WrappingCard from '@/ui/WrappingCard'
import {
  faChain,
  faHeart,
  faTrash,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import './style.css'
import {
  useGetWishlistProductsQuery,
  useRemoveProductMutation,
} from '@/wishlist/store/wishlistAPI'
import LoadingBar from '@/ui/Loading/LoadingBar'
import { useDispatch, useSelector } from 'react-redux'
import { getWishlistProducts } from '@/wishlist/store/wishlistSlice'
import { RootState } from '@/store'
import { useAppDispatch, useAppSelector } from '@/hooks/hooks'
import AppleImage from '@/assets/images/Img1Big.png'
import { toast } from 'react-toastify'
import { Image } from '@/helpers/helpers'

const Wishlist = () => {
  const dispatch = useAppDispatch()
  const wishlist = useAppSelector((state) => state.wishlist)
  const [removeProduct, { error }] = useRemoveProductMutation()
  const { data, isLoading, refetch } = useGetWishlistProductsQuery()
  console.log('wishlist', data)

  // const [location, setLocation] = useState('')
  // const copyWishListUrl = () => {
  //   console.log('copyWishListUrl')
  // }

  const deleteProductHandler = async (productID: string) => {
    try {
      await removeProduct(productID)
      refetch()
      toast.success('Product deleted from wishlist successfuly!')
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <>
      <WrappingCard marginBtm="20px" padding="12px">
        <div className="d-flex justify-content-between w-100 align-items-center  account-details-container tablet:mb-6">
          {/* <p className="text-lg">Wishlist</p> */}
          <span className="page-title pointer-events-none w-100 text-left account-details-page-title ">
            Wishlist{' '}
          </span>
          <div
            className="d-flex s  align-items-center cursor-pointer position-relative text-xs whitespace-nowrap mr-2 group hover:cursor-pointer hover:text-primary"
            // onclick="copyWishListUrl()"
          >
            <span className=" tablet:block group-hover:text-primary">
              SHARE
            </span>
            <input
              size={1}
              id="wishlistUrl"
              style={{ fontSize: '14px' }}
              className="hidden"
              value="http://gjirafa50.com/wishlist/42e684cf-7488-4874-8722-6e08b382fee2"
            />
            <i className="icon-link-url text-sm cursor-pointer ml-2 group-hover:text-primary">
              <FontAwesomeIcon className="" icon={faChain} />
            </i>
            <span
              id="copyToClipBoard"
              className="position-absolute z-0 right-6 top-0 p-2 bg-white rounded opacity-0 shadow-sm text-xs"
            >
              Linku është kopjuar
            </span>
          </div>
          <button
            //  onclick="setLocation('/deleteCartItems/2')"
            type="button"
            style={{ border: 'none' }}
            className="text-xs d-flex w-25 text-end align-items-center md:whitespace-nowrap focus:outline-none hover:text-primary"
          >
            <span className="hidden tablet:block w-100">
              FSHIJ LISTËN E DËSHIRAVE
            </span>
            <i
              className="icon-delete-trash text-sm pl-2 hover:text-primary"
              // onclick="sendRemoveListEvent('[{&quot;Sku&quot;:&quot;353070&quot;,&quot;Picture&quot;:{&quot;Id&quot;:0,&quot;ImageUrl&quot;:&quot;https://hhstsyoejx.gjirafa.net/gjirafa50core/images/587b8f29-bea5-4a53-b8b0-a09fc4b248de/587b8f29-bea5-4a53-b8b0-a09fc4b248de.jpeg&quot;,&quot;ThumbImageUrl&quot;:null,&quot;FullSizeImageUrl&quot;:null,&quot;ImageUrlWithoutExt&quot;:&quot;https://hhstsyoejx.gjirafa.net/gjirafa50core/images/587b8f29-bea5-4a53-b8b0-a09fc4b248de/587b8f29-bea5-4a53-b8b0-a09fc4b248de&quot;,&quot;Title&quot;:&quot;Shfaq detaje për Dëgjuese UGREEN HiTune T3, të bardha&quot;,&quot;AlternateText&quot;:&quot;Foto e Dëgjuese UGREEN HiTune T3, të bardha&quot;,&quot;CustomProperties&quot;:{}},&quot;ProductId&quot;:145969,&quot;ProductName&quot;:&quot;Dëgjuese UGREEN HiTune T3, të bardha&quot;,&quot;ProductSeName&quot;:&quot;degjuese-ugreen-hitune-t3-te-bardha&quot;,&quot;UnitPriceWithoutDiscount&quot;:&quot;25.50 €&quot;,&quot;UnitPrice&quot;:&quot;19.50 €&quot;,&quot;SubTotal&quot;:&quot;39.00 €&quot;,&quot;Discount&quot;:&quot;6.00 €&quot;,&quot;DiscountPercentage&quot;:&quot;-24%&quot;,&quot;MaximumDiscountedQty&quot;:null,&quot;Quantity&quot;:2,&quot;AllowedQuantities&quot;:[],&quot;AttributeInfo&quot;:&quot;&quot;,&quot;RecurringInfo&quot;:null,&quot;RentalInfo&quot;:null,&quot;AllowItemEditing&quot;:false,&quot;Warnings&quot;:[],&quot;Id&quot;:217337,&quot;CustomProperties&quot;:{}}]','wishlist')"
            >
              <FontAwesomeIcon icon={faTrash} />
            </i>
          </button>
          {/* <div className="d-flex"> */}
          {/* <button className="btn btn-secondary d-flex text-xs align-items-center">
              SHARE 
            </button> */}
          {/* <button
              onClick={() => setLocation('/deleteCartItems/2')}
              type="button"
              className="text-xs bg-transparent d-flex align-items-center md:whitespace-nowrap focus:outline-none hover:text-primary "
            >
              <span className="tablet:block pr-2">
                FSHIJ LISTËN E DËSHIRAVE
              </span>
              <FontAwesomeIcon icon={faTrash} />
            </button> */}
          {/* </div> */}
        </div>
      </WrappingCard>
      <WrappingCard padding="12px">
        <div className="wishlist-content">
          <form>
            {isLoading ? (
              <LoadingBar height="50px" size={'50px'} />
            ) : !isLoading && data?.length ? (
              <div className="grid grid-cols-2 gap-2 md:grid-cols-4  mb-6">
                {data.map((item) => (
                  <div className="item-box">
                    <div
                      className="product-item bg-white overflow-hidden p-2 md:p-3 hover:shadow-md shadow-sm rounded position-relative"
                      id="related-products"
                      data-productid="160697"
                    >
                      <div
                        className="position-absolute h-6 pr-3 pl-3 tablet:pl-0 z-10 w-100"
                        style={{ top: '0.625rem', left: '0' }}
                      >
                        <div
                          className="w-10 bg-primary discount__label d-flex justify-content-center align-items-center rounded position-absolute shadow-sm text-white text-xs font-medium"
                          style={{
                            height: '19px',
                            top: '1px',
                            right: '0.75rem',
                          }}
                        >
                          -24%
                        </div>
                      </div>
                      <div className="picture position-relative px-4 pt-4">
                        <a
                          className="relative block"
                          href={`/product/${item.id}`}
                          title="Apple iPhone 15, 128GB, Black"
                        >
                          {/* <img
                            loading="lazy"
                            src={AppleImage}
                            className="position-absolute top-0 right-0 bottom-0 left-0 m-auto transition-all duration-300 max-h-full max-w-full object-contain"
                            alt="Foto e Apple iPhone 15, 128GB, Black"
                          /> */}
                          <Image
                            src={item.imageCover ? item.imageCover : ''}
                            alt="image cover"
                            className="position-absolute top-0 right-0 bottom-0 left-0 m-auto transition-all duration-300 max-h-full max-w-full object-contain"
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
                            {item.title}
                          </a>
                        </span>
                        <div className="add-info">
                          <div className="prices d-flex flex-col h-12 my-2">
                            <span className="price actual-price font-semibold text-gray-700 text-base md:text-xl">
                              {item.price.toFixed(2)} €
                            </span>
                          </div>
                        </div>
                        <div className="buttons d-flex justify-content-evenly gap-2">
                          <button
                            aria-label="Shto në shportë"
                            className="h-10 product-box-add-to-cart-button d-flex align-items-center btn-primary-hover justify-content-center md:flex-grow hover:bg-primary hover:text-white w-50 focus:outline-none focus:border-none btn-simple btn-secondary focus:text-white"
                            // onclick="AjaxCart.addproducttocart_catalog('/addproducttocart/catalog/160697/1/1');return false;"
                          >
                            <span className="icon-cart-shopping-add icon-line-height text-xl md:hidden"></span>
                            <span className="hidden md:grid text-xs font-medium">
                              Shto në shportë
                            </span>
                          </button>
                          <button
                            // name="updatecart"
                            style={{ border: 'none' }}
                            className="h-10 d-flex align-items-center justify-content-center hover:bg-primary  md:w-auto add-to-wishlist-button btn-primary-hover hover:text-white focus:outline-none btn btn-secondary focus:text-white"
                            onClick={() => deleteProductHandler(item.id)}
                            // onclick="SendDeleteFromCartEvent('160697', 'Apple iPhone 15, 128GB, Black','1,099.50 €','1','wishlist'); $('#removefromcart215652').prop('checked', true).change();"
                          >
                            {/* <input
                              type="checkbox"
                              className="hidden"
                              name="removefromcart"
                              id="removefromcart215652"
                              // data-productid="160697"
                              value="215652"
                              // aria-label="Largo"
                            /> */}
                            <i className="icon-delete-trash text-xl">
                              <FontAwesomeIcon icon={faTrashCan} />
                            </i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="item-box h-auto">
                <p className=" text-center">
                  Nuk keni asnje product ne wishlist
                </p>
              </div>
            )}
          </form>
        </div>
      </WrappingCard>
      {/* {isLoading ? <LoadingBar /> : 'data'} */}
    </>
  )
}

export default Wishlist
