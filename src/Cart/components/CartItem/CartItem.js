import React from 'react'
import { Button, Card, CardBody, CardHeader } from 'reactstrap'
import Macbook from '../../../assets/images/0.png'
import Rating from 'react-rating'
import {
  faHeart,
  faShoppingCart,
  faStar,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './CartItem.css'

const CartItem = (props) => {
  const {
    brand,
    category,
    description,
    discountPercentage,
    images,
    price,
    rating,
    stock,
    thumbnail,
    id,
    title,
  } = props
  const starStyle = { color: '#FFD700' }

  const discountValue = price % discountPercentage

  const discountPrice = price - discountValue
  const truncatedText =
    description?.length > 50
      ? `${description.substring(0, 50)}...`
      : description

  return (
    <Card
      // style={{ width: "240px", height: "auto" }}
      className="mx-1 cart-item col-2 p-0 mb-3 overflow-hidden"
    >
      <CardHeader style={{ background: '#fff', padding: 0 }}>
        <div
          className="p-0"
          style={{ maxHeight: '240px', height: '240px', minWidth: '240px' }}
        >
          <a href={`/product/${id}`}>
            <img className="w-100 h-100" src={thumbnail} alt="Product image" />
          </a>
        </div>
      </CardHeader>
      <CardBody>
        <p>{truncatedText}</p>
        <div className="d-flex align-items-center cart-price__div">
          <h4 className="mb-0">{price} $</h4>
          <small>
            <del>{discountPrice.toFixed(2)} $</del>
          </small>
        </div>
        <div className="item-rating__div ">
          <small>Perfshire TVSH-ne</small>
          <Rating
            fullSymbol={<FontAwesomeIcon icon={faStar} style={starStyle} />}
            emptySymbol={<FontAwesomeIcon icon={faStar} />}
          />
        </div>
        <div className="card-actions__div">
          <Button to={`/product/${id}`} className="col-6">
            Shiko detajet
          </Button>
          <Button className="col-3">
            <FontAwesomeIcon icon={faShoppingCart} />
          </Button>
          <Button className="col-3">
            <FontAwesomeIcon icon={faHeart} />
          </Button>
        </div>
      </CardBody>
    </Card>
  )
}

export default CartItem
