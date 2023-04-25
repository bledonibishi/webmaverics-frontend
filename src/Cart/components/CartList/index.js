import React from 'react'
import CartItem from '../CartItem/CartItem'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchProducts } from '../../../store/products/productSlice'
import LoadingBar from '../../../ui/Loading/LoadingBar'

function index() {
  const dispatch = useDispatch()
  const products = useSelector((state) => state.products)
  console.log('products', products)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [])
  return (
    <div className="row p-3 justify-content-center">
      {products.loading && <LoadingBar />}
      {!products.loading && products.error ? (
        <div>Error: {products.error}</div>
      ) : null}
      {!products.loading &&
        products.products.length &&
        products.products.map((product) => (
          <CartItem
            brand={product.brand}
            category={product.category}
            description={product.description}
            discountPercentage={product.discountPercentage}
            images={product.images}
            id={product.id}
            price={product.price}
            rating={product.rating}
            stock={product.stock}
            thumbnail={product.thumbnail}
            title={product.title}
          />
        ))}
    </div>
  )
}

export default index
