import React, { useState } from 'react'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap'
import Rating from 'react-rating'
import {
  faHeart,
  faShoppingCart,
  faStar,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './ProductItem.css'
import { useDispatch, useSelector } from 'react-redux'
import { useCreateProductMutation } from '../../../../wishlist/store/wishlistAPI'
import { useNavigate } from 'react-router-dom'
import { ProductItemTypes, addToCartType } from '@/helpers/types'
import useSocket from '@/hooks/useSocket'
// import ImageTwentyFour from '@/assets/images/local-stock-ks.png'
// import NewItem from '@/assets/images/newproduct-1.png'
import { useAddToCartQueryMutation } from '@/Cart/store/cartAPI'
import { ToastContainer, toast } from 'react-toastify'

type AddToCart = {
  id: string
  price: number
  quantity: number
}

const ProductItem: React.FC<ProductItemTypes> = ({
  id,
  category,
  title,
  images,
  stock,
  ratingsQuantity,
  description,
  price,
  priceDiscount,
  summary,
}) => {
  const socket = useSocket()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // const user = useSelector((state) => state.auth.user)
  const [createProduct, { error }] = useCreateProductMutation()
  const [addToCartQuery, { isError, isLoading, isSuccess }] =
    useAddToCartQueryMutation()

  const addToCartHandler = (items: addToCartType) => {
    console.log('items', items)
    addToCartQuery(items)
      // .unwrap()
      .then(() => {
        toast('Product added to cart!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })
        socket?.emit('cartUpdated', { product: items.productId })
      })
      .catch((err) => console.log('err', err))
  }

  const createWishlistProductHandler = (productId: string) => {
    createProduct(productId)
      // .unwrap()
      .then(() => {
        socket?.emit('createWishlistProduct', { productId })
        toast('Wow so easy!')
      })
      .catch((err) => {
        console.log('err', error)
      })
  }

  const [shoppingCartModal, setShoppingCartModal] = useState(false)
  const toggleShoppingCartModal = () => setShoppingCartModal((state) => !state)
  const starStyle = { color: '#FFD700' }

  const truncatedText =
    description?.length > 50
      ? `${description.substring(0, 50)}...`
      : description

  const goToProductHandler = () => {
    navigate(`/product/${id}`)
  }

  return (
    <>
      <div className="item-box w-100 p-0">
        <div className="product-item bg-white p-2 md:p-3 relative shadow-sm hover:shadow-md rounded h-full overflow-hidden d-flex flex-col justify-between">
          <div className="h-6 top-2.5 left-0 tablet:pl-0 d-flex tablet:flex-row gap-1 tablet:gap-0 tablet:items-center tablet:flex-wrap z-10 w-full flex-row justify-content-between">
            <div className="d-flex">
              <div className="pointer-events-none d-flex items-center tablet:pl-3">
                {/* <img
                  src={NewItem}
                  // className="w-100 h-100"
                  style={{ width: '55px', height: '19px' }}
                  alt=""
                /> */}
              </div>
              <div className="pointer-events-none d-flex items-center tablet:pl-3">
                {/* <img
                  src={ImageTwentyFour}
                  alt=""
                  style={{ width: '55px', height: '19px' }}
                /> */}
              </div>
            </div>
            <div className="w-10 pl-1 pr-1 h-[19px] bg-primary discount__label d-flex justify-content-center items-center rounded  right-3 shadow-sm text-white text-xs font-medium">
              -20%
            </div>
          </div>
          <div className="picture relative px-4 pt-6">
            <a href={`/product/${id}`} className="position-relative d-block">
              <img src="" alt="product-image" className="w-100 h-100" />
            </a>
          </div>
          <div className="details d-flex flex-col h-full justify-content-between pb-2">
            <h2 className="product-title">
              <a
                className="text-gray-700  md:text-base product-title-lines hover:underline"
                title="Apple iPhone 15, 128GB, Black"
                //  onclick="produceClickedProductEvent('',160697)"
                href="/celular-tablet-navigim/celular-3/touchscreen-4/apple-iphone-15-128gb-black"
              >
                {title}
              </a>
            </h2>
            <div className="prices d-flex flex-col h-12 position-relative">
              <span className="price font-semibold text-gray-700 text-base md:text-xl">
                {priceDiscount.toFixed(2)} €
              </span>
              <small>
                <del>{price.toFixed(2)} $</del>
              </small>
            </div>
            <div className="flex flex-col pt-2 justify-between lg:flex-row">
              <span className="text-xs text-gray-600">Përfshirë TVSH</span>
            </div>
          </div>
          <div className="buttons d-flex justify-content-evenly gap-2">
            <button
              aria-label="Shto në shportë"
              id="add-to-cart-(160697)"
              //  onclick="sendAddToCartEvent('160697', `Apple iPhone 15, 128GB, Black`, '1099,50', 'cart');AjaxCart.addproducttocart_catalog(`/addproducttocart/catalog/160697/1/1`);produceConvertedObjectEvent(['160697'], 'Add_To_Cart');return false;"
              onClick={() =>
                addToCartHandler({ productId: id, quantity: 1, price })
              }
              className="align-items-center d-flex gap-2 items-center btn-primary-hover hover:bg-primary hover:text-white justify-content-center md:flex-grow w-75 focus:outline-none focus:border-none focus:text-white btn-simple btn-secondary"
            >
              <FontAwesomeIcon
                icon={faShoppingCart}
                className="icon-cart-shopping icon-line-height text-2xl md:hidden hidden"
              />
              <span className=" md:grid text-xs font-medium">
                Shto në shportë
              </span>
            </button>
            <button
              type="button"
              id="add-to-wishlisht-(160697)"
              value="Shto në listën e dëshirave"
              style={{ border: 'none' }}
              title="Shto në listën e dëshirave"
              //  onclick="sendAddToCartEvent('160697', `Apple iPhone 15, 128GB, Black`, '1099,50', 'wishlist');AjaxCart.addproducttocart_catalog(`/addproducttocart/catalog/160697/2/1`);return false;"
              className="group hover:bg-primary w-25 md:w-auto add-to-wishlist-button  btn-primary-hover hover:text-white focus:outline-none btn btn-secondary focus:text-white"
            >
              <FontAwesomeIcon
                icon={faHeart}
                className="icon-heart text-2xl group-hover:text-white border-none"
              />
            </button>
          </div>
        </div>
      </div>

      {shoppingCartModal && (
        <Modal
          className="modal-dialog-centered"
          isOpen={shoppingCartModal}
          toggle={toggleShoppingCartModal}
          size="lg"
        >
          <ModalHeader toggle={toggleShoppingCartModal}>
            <p>Producti u shtua ne shporte</p>
          </ModalHeader>
          <ModalBody>
            <div className="d-flex align-items-center">
              <div className="content-image col-1">
                {/* <img
                  className="w-75 h-75 "
                  src={thumbnail && thumbnail}
                  alt=""
                /> */}
              </div>
              <strong className="col-9">{description && description}</strong>
              <p className="col-2">1 x ${price && price}</p>
            </div>
          </ModalBody>
          <ModalFooter className="addToCartModalFooter">
            <div>
              <p>Ju keni 1 product(e) ne shporten tuaj</p>
              <Button className="secondary" onClick={toggleShoppingCartModal}>
                Kthehu tek produktet
              </Button>
            </div>
            <div className="footer_div">
              <strong>Totali ne shporte ${price && price}</strong>
              <Button color="warning">Beje porosine</Button>
            </div>
          </ModalFooter>
        </Modal>
      )}
    </>
  )
}

export default ProductItem