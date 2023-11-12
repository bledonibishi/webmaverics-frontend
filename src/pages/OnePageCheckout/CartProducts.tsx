import { Image } from '@/helpers/helpers'
import { CartItem } from '@/helpers/types'
import React from 'react'

const CartProducts = ({ cart }: { cart: CartItem }) => {
  return (
    <div className="cart bg-white rounded shadow-md mb-3">
      <span className="d-flex  border-b w-100 p-3 md:p-4 text-sm text-gray-700 font-medium">
        Produktet në shportë: ({cart?.products.length})
      </span>

      <div className="px-4 pb-2 max-h-80 overflow-y-scroll scrollbar-modifier">
        {cart?.products.map((item: any, index: number) => (
          <div
            key={index}
            className="d-flex  border-b last:border-none border-gray-300 justify-content-between align-items-center flex-row position-relative py-2 gap-4 product-info"
          >
            <a
              href={`/product/${item.product.id}`}
              className="w-10 h-10 d-flex small-image-container d-flex justify-content-center align-items-center"
            >
              <Image
                src={item.product.imageCover ? item.product.imageCover : ''}
                alt="product image"
                className="max-w-full max-h-full position-relative"
              />
            </a>
            <div className="d-flex  justify-content-between align-items-start flex-col w-100">
              <div className="product product-title-lines">
                <a
                  product-id="14559"
                  href={`/product/${item.product.id}`}
                  className="text-sm hover:text-primary product-name"
                >
                  {item.product.title}
                </a>
              </div>

              <div className="d-flex  justify-content-start align-items-center w-100 text-xs text-gray-600">
                <span className="product-quantity text-xs">
                  {item.quantity}
                  <span className="px-2">x</span>
                </span>

                <span className="product-unit-price">
                  {(item.product.priceDiscount
                    ? item.product.priceDiscount
                    : item.product.price
                  ).toLocaleString()}{' '}
                  €
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CartProducts
