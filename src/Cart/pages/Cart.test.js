import React, { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import './cart.css'
import { useDispatch, useSelector } from 'react-redux'
import {
  addToCart,
  decreaseQuantity,
  getCartProducts,
  removeProduct,
} from '../store/cartSlice'
import DataTable from 'react-data-table-component'
import { Button, FormGroup, Input } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import FlexImage from '../../assets/images/payment/flex.png'
import PaymentMethods from '../../assets/images/payment/llogot_pagese-split.png'
import './cart.css'
import LoadingBar from '../../ui/Loading/LoadingBar'
import { useGetCartProductsQuery } from '../store/cartAPI'

const Cart = () => {
  const dispatch = useDispatch()
  // const { cart } = useSelector((state) => state.cart)
  const { data: cart, isLoading, isError, error } = useGetCartProductsQuery()
  
  const user = useSelector((state) => state.auth.user)
  console.log('cartProducts', cart)

  const products = cart?.products

  const countProductsPrice = cart?.products.map((product) => product.price)

  const allProductsPrice = countProductsPrice?.reduce((acc, curr) => {
    if (typeof curr === 'number') {
      return (acc += curr)
    } else {
      return acc
    }
  }, 0)

  const tableColumns = React.useMemo(() => [
    {
      name: 'Product',
      selector: (row) => row.product,
      sortable: true,
      maxWidth: '600px',
      grow: 6,
      cell: (record) => {
        return (
          <div className="d-flex align-items-center">
            <div className="col-2">{record.product}</div>
            <div className="col-10">
              <div>
                {record.productDescription}
                <div
                  className="gjirafa-flex"
                  style={{ border: '1px solid #ccc' }}
                >
                  <div className="col-2">
                    <img src={FlexImage} alt="flex iamge" className="w-75" />
                  </div>
                  <div className="col-10">
                    <h6>Rri shlire me GjirafaFlex</h6>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Similique distinctio veritatis placeat corporis nostrum
                      nesciunt accusantium quasi asperiores amet cumque.
                    </p>
                    <small>
                      *Defektet përfshijnë vetëm ato fabrike, dhe jo dëmet
                      fizike që mund të i shkaktohen produktit.
                    </small>
                    <span className="d-flex">
                      <p className="d-flex">
                        <input type="radio" value="Po" placeholder="Po" />
                        Po
                      </p>
                      <p className="d-flex">
                        <input type="radio" />
                        Jo
                      </p>
                    </span>
                  </div>
                </div>
              </div>
              <div className="product-discount___price">
                <span className="d-flex">
                  <p>Zbritje:</p>
                  <p> -23 $</p>
                </span>
                <span className="d-flex">
                  <p>Nentotali:</p>
                  <p> 349 $</p>
                </span>
              </div>
            </div>
          </div>
        )
      },
    },
    {
      name: 'Price',
      selector: (row) => {
        row.price
      },
      sortable: true,

      cell: (record) => {
        return record.price
      },
    },
    {
      name: 'Quantity',
      selector: (row) => {
        row.product
      },
      sortable: true,
      cell: (record) => {
        return (
          <div className="q-container d-flex align-items-center">
            <button
              className=" q-inc__btn"
              onClick={() => dispatch(decreaseQuantity(record.productId))}
            >
              -
            </button>
            <input
              className="border-none q__niput"
              type="number"
              readOnly
              value={record.quantity}
              onFocus={(event) => {
                event.target.style.border = 'none' // Add border when focused
              }}
            />
            <button
              className="q-inc__btn"
              onClick={() =>
                dispatch(
                  addToCart({
                    userId: user.user?._id,
                    productId: record.productId,
                    quantity: 1,
                    price: record.price,
                  })
                )
              }
            >
              +
            </button>
          </div>
        )
      },
    },
    {
      name: 'Total Price',
      selector: (row) => {
        row.product
      },
      sortable: true,
      cell: (record) => {
        return record.totalPrice
      },
    },
    {
      name: '',
      button: true,
      cell: (record) => (
        <Button
          color="danger"
          outline
          style={{
            borderRadius: '50%',
            display: 'flex',
            width: '20px',
            height: '20px',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
          }}
          onClick={() => dispatch(decreaseQuantity(record.productId))}
        >
          <FontAwesomeIcon icon={faClose} />
        </Button>
      ),
    },
  ])
  const rowData = products?.map((product) => ({
    productId: product.product.id,
    product: product.product.imageCover,
    productDescription: product.product.description,
    price: product.product.price,
    quantity: product.quantity,
    totalPrice: product.price,
  }))

  const noDataComponent = () => {
    return (
      <div className="no-data-component text-center">
        <>You don't have any products yet.</>
      </div>
    )
  }

  return (
    <>
      {isLoading ? (
        <LoadingBar />
      ) : (
        <div className="cart-container">
          <div className="cart-left ">
            <h3 style={{ color: '#d7461b' }}>Permbajtjet e shportes</h3>
            <div>
              <DataTable
                title="Products"
                columns={tableColumns}
                data={rowData}
                pagination
                // onSelectedRowsChange={(rows) =>
                //   setSelectedRows(
                //     rows?.selectedRows?.map((row) => {
                //       return row.id
                //     })
                //   )
                // }
                // selectableRows
                // selectableRowsNoSelectAll
                noHeader
                noDataComponent={noDataComponent()}
              />
            </div>
          </div>
          <div className="cart-right  " style={{ background: '#fafafa' }}>
            <div className="gjirafa-flex" style={{ padding: '0' }}>
              <div className="col-2 mr-1">
                <img src={FlexImage} alt="flex iamge" className="w-100 " />
              </div>
              <div className="col-10">
                <h6>Rri shlire me GjirafaFlex</h6>
                <p>
                  GjirafaFLEX është shërbim shtesë që ne e ofrojmë si zgjidhje
                  të shpejtë nëse keni defekt me produktin brenda periudhës 1
                  vjeçare të garancionit. Do të thotë, ose merrni produkt të ri
                  ose merrni kredit në Gjirafa50 për vlerën e produktit. Pa
                  pasur nevojë për pritje tek serviset e autorizuara,
                  GjirafaFLEX ju mundëson zgjidhje aty për aty. Gjithashtu, nëse
                  nuk keni mundësi të e sjellni produktin për testim tek zyret
                  tona, vijmë e marrim ne, në adresën tuaj.
                </p>
                <small>
                  *Defektet përfshijnë vetëm ato fabrike, dhe jo dëmet fizike që
                  mund të i shkaktohen produktit.
                </small>
              </div>
            </div>
            <div className="payment-methods">
              <h6>Mundësitë e pagesave</h6>
              <img src={PaymentMethods} alt="" className="w-100" />
            </div>
            <FormGroup className="d-flex form-group">
              <Input
                className="gift__input"
                placeholder="Gift card dhe kodi promocional"
              />
              <button className="gift-cart__btn">Apliko</button>
            </FormGroup>
            <div className="sub-prices">
              <span>
                <p>Nentotali:</p>
                <p>372.00 $</p>
              </span>
              <span>
                <p>Duke përfshirë zbritjen</p>
                <p> -23.00 $</p>
              </span>
            </div>
            <span className="price">
              <p style={{ color: '#a0a0a0' }}>Gjithsej çmimi</p>
              <p>{allProductsPrice}.00 $ </p>
            </span>

            <div className="buttons">
              <span className="d-flex">
                <Button color="secondary" className="col-6 mr-2">
                  Kthehu tek produktet
                </Button>
                <Button className="col-6">Rillogarit</Button>
              </span>
              <Button className="pay-btn">Vazhdo tek pagesa</Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Cart
