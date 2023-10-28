import { useAppSelector } from '@/hooks/hooks'
import { useGetRatingsWithUserIdQuery } from '@/store/products/RTKProductSlice'
import WrappingCard from '@/ui/WrappingCard'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import Rating from 'react-rating-stars-component'

const FullStar = () => <FontAwesomeIcon icon={faStar} />

const ProductReview = () => {
  const { user } = useAppSelector((state) => state.auth)
  const { data: userReviews } = useGetRatingsWithUserIdQuery(
    user?.user.id || ''
  )
  console.log('userReviews', userReviews)
  return (
    <div>
      <WrappingCard marginBtm="20px" padding="12px">
        <div className="d-flex justify-content-between orders-header">
          <p className="text-lg">My ratings</p>
        </div>
      </WrappingCard>
      <WrappingCard marginBtm={'20px'} padding="12px">
        {userReviews?.length ? (
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4  mb-6">
            {userReviews?.map((item, index) => (
              <div className="item-box" key={index}>
                <div
                  className="product-item bg-white overflow-hidden p-2 md:p-3 hover:shadow-md shadow-sm rounded position-relative"
                  id="related-products"
                  data-productid="160697"
                >
                  <div className="picture position-relative px-4 pt-4">
                    <a
                      className="relative block"
                      href="/apple-iphone-15-128gb-black"
                      title="Apple iPhone 15, 128GB, Black"
                    >
                      <img
                        loading="lazy"
                        src={
                          typeof item.productID === 'string'
                            ? ''
                            : item.productID.imageCover || undefined
                        }
                        className="position-absolute top-0 right-0 bottom-0 left-0 m-auto transition-all duration-300 max-h-full max-w-full object-contain"
                        alt="Foto e Apple iPhone 15, 128GB, Black"
                      />
                    </a>
                  </div>
                  <div className="details">
                    <span className="product-title">
                      <a
                        className="text-sm md:text-base product-title-lines hover:underline"
                        title="Apple iPhone 15, 128GB, Black"
                        // href="/apple-iphone-15-128gb-black"
                      >
                        {typeof item.productID === 'string'
                          ? ''
                          : item.productID.title}
                      </a>
                    </span>
                    {/* <div className="add-info">
                      <div className="prices d-flex flex-col h-12 my-2">
                        <span className="price actual-price font-semibold text-gray-700 text-base md:text-xl">
                          {typeof item.userID === 'string'
                            ? ''
                            : item.userID.name}
                        </span>
                      </div>
                    </div> */}
                    <div className="buttons d-flex justify-content-evenly gap-2">
                      <Rating
                        count={5}
                        size={24}
                        value={item.rating}
                        color="#ccc"
                        edit={false}
                        activeColor="#f8b400"
                        char={FullStar}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-data bg-white rounded  d-flex flex-col align-items-center justify-content-center px-4 py-10">
            <div className="w-32 h-32 rounded-full bg-gray-100 d-flex align-items-center justify-content-center mb-4">
              <i className="icon-star text-6xl text-gray-600">
                <FontAwesomeIcon icon={faStar} />
              </i>
            </div>
            <p className="font-medium text-base tablet:text-lg text-center break-words">
              Ende nuk keni bërë ndonjë vlerësim për ndonjë produkt.
            </p>
          </div>
        )}
      </WrappingCard>
    </div>
  )
}

export default ProductReview
