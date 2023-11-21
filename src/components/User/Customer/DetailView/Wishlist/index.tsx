import React from 'react'
import WrappingCard from '@/ui/WrappingCard'
import {
  faHeartBroken,
  faShoppingCart,
  faTrash,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './style.css'
import {
  useGetWishlistProductsQuery,
  useRemoveAllMutation,
  useRemoveProductMutation,
} from '@/wishlist/store/wishlistAPI'
import LoadingBar from '@/ui/Loading/LoadingBar'
import { toast } from 'react-toastify'
import { Image } from '@/helpers/helpers'

const Wishlist = () => {
  const [removeProduct] = useRemoveProductMutation()
  const { data, isLoading, refetch } = useGetWishlistProductsQuery()
  const [removeAll, { isLoading: removeAllLoading }] = useRemoveAllMutation()

  const deleteProductHandler = async (productID: string) => {
    try {
      await removeProduct(productID)
      refetch()
      toast.success('Product deleted from wishlist successfuly!')
    } catch (error) {
      console.log('error', error)
    }
  }

  const deleteAllHandler = async (event: any) => {
    event?.preventDefault()

    try {
      await removeAll()
      refetch()
      toast.success('All products deleted from wishlist successfully!')
    } catch (error) {
      console.log('error', error)
    }
  }

  if (removeAllLoading) {
    return <LoadingBar height="50px" size={'50px'} />
  }

  return (
    <>
      <WrappingCard marginBtm="20px" padding="12px">
        <div className="d-flex justify-content-between w-100 align-items-center  account-details-container tablet:mb-6">
          <span className="page-title pointer-events-none w-100 text-left account-details-page-title ">
            Wishlist
          </span>
          <button
            onClick={deleteAllHandler}
            type="button"
            style={{ border: 'none' }}
            className="text-xs d-flex w-25 text-end align-items-center md:whitespace-nowrap focus:outline-none hover:text-primary"
          >
            <span className="hidden tablet:block w-100">REMOVE WISHLIST</span>
            <i className="icon-delete-trash text-sm pl-2 hover:text-primary">
              <FontAwesomeIcon icon={faTrash} />
            </i>
          </button>
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
                          <Image
                            src={item.imageCover ? item.imageCover : ''}
                            alt="image cover"
                            className="position-absolute top-0 right-0 bottom-0 left-0 m-auto transition-all duration-300 max-h-full max-w-full object-contain"
                          />
                        </a>
                        {item.stock < 1 && (
                          <div className="position-absolute uppercase top-0 left-0 sold-out-productBox d-flex align-items-center justify-content-center text-center">
                            <a
                              className="w-100 h-100 text-center d-flex align-items-center justify-content-center"
                              href={`product/${item.id}`}
                            >
                              <span className="text-sm rounded px-2 py-1 bg-gray-100">
                                E shitur
                              </span>
                            </a>
                          </div>
                        )}
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
                          {item.stock < 1 ? (
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
                              className="h-10 product-box-add-to-cart-button d-flex align-items-center btn-primary-hover justify-content-center md:flex-grow hover:bg-primary hover:text-white w-50 focus:outline-none focus:border-none btn-simple btn-secondary focus:text-white"
                            >
                              <span className="icon-cart-shopping-add icon-line-height text-xl md:hidden"></span>
                              <span className="hidden md:grid text-xs font-medium">
                                Shto në shportë
                              </span>
                            </button>
                          )}
                          <button
                            style={{ border: 'none' }}
                            className="h-10 d-flex align-items-center justify-content-center hover:bg-primary  md:w-auto add-to-wishlist-button btn-primary-hover hover:text-white focus:outline-none btn btn-secondary focus:text-white"
                            onClick={() => deleteProductHandler(item.id)}
                          >
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
              <div className="no-data px-4 py-12 bg-white flex-col  rounded d-flex justify-content-between align-items-center ">
                <div className="d-flex justify-content-center align-items-center bg-with-opacity bg-opacity-25 rounded-full w-32 h-32 mb-5">
                  <i
                    className="icon-heart text-primary text-6xl"
                    style={{ opacity: '1' }}
                  >
                    <FontAwesomeIcon icon={faHeartBroken} />
                  </i>
                </div>
                <p className="font-medium text-base tablet:text-lg text-center break-words">
                  Your wishlist is empty!
                </p>
                <a
                  className="text-primary font-semibold text-base hover:underline"
                  href="/"
                >
                  Return to dashboard
                </a>
              </div>
            )}
          </form>
        </div>
      </WrappingCard>
    </>
  )
}

export default Wishlist
