import Asus from '../../assets/images/asus.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRemove, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './style.css'
import {
  useGetWishlistProductsQuery,
  useRemoveAllMutation,
  useRemoveProductMutation,
} from '../store/wishlistAPI'
import useSocket from '../../hooks/useSocket'
import LoadingBar from '../../ui/Loading/LoadingBar'

const Wishlist = () => {
  const socket = useSocket()
  const { refetch, isError, isLoading, data } = useGetWishlistProductsQuery()
  const [removeAll, { error: removeAllError, isSuccess: removeAllSuccess }] =
    useRemoveAllMutation()
  const [removeProduct, { error, isSuccess }] = useRemoveProductMutation()

  const removeProductHandler = (productId) => {
    removeProduct(productId)
      .unwrap()
      .then(() => {
        socket.emit('removeWishlistProduct', { productId })
        refetch()
      })
      .catch((err) => {
        console.log('err', err)
      })
  }

  const removeAllHandler = () => {
    removeAll()
      .unwrap()
      .then(() => {
        socket.emit('removeAllWishlistProducts')
        refetch()
      })
      .catch((err) => {
        console.log('err', err)
      })
  }

  return (
    <>
      {isLoading ? (
        <LoadingBar />
      ) : (
        <div className="wishlist-container container">
          <h3
            className="mb-3"
            style={{
              color: '#E65228',
              margin: '25px 0 10px',
              fontSize: '24px',
            }}
          >
            Permbajtja e listes se deshirave
          </h3>
          <span className="d-flex justify-content-end align-items-center">
            <p className="m-0 pr-3">Fshij listen e deshirave</p>
            <FontAwesomeIcon
              icon={faRemove}
              className="p-0"
              onClick={() => removeAllHandler()}
            />
          </span>
          <hr />
          {data && data.products.length ? (
            data.products.map((product) => (
              <div className="wishlist-item" key={product?.id}>
                <div className="item-action">
                  <span className="d-flex justify-content-end align-items-center">
                    <p className="m-0 pr-3">Remove</p>
                    <FontAwesomeIcon
                      icon={faRemove}
                      className="p-0"
                      onClick={() => removeProductHandler(product?._id)}
                    />
                  </span>
                </div>
                <div className="item-info">
                  <div className="item-image col-2 mr-5 ">
                    <img className="w-100" src={Asus} alt="item image" />
                  </div>
                  <div className="item-description col-9">
                    <p>{product?.title}</p>
                    <p>{product?.price}.00 €</p>
                    <small>{product?.description}</small>
                  </div>
                </div>
                <div className="item-handlers">
                  <button>SHIKO DETAJET</button>
                  <button>
                    <FontAwesomeIcon icon={faShoppingCart} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="fw-bold text-center">No data</p>
          )}
        </div>
      )}
    </>
  )
}

export default Wishlist
