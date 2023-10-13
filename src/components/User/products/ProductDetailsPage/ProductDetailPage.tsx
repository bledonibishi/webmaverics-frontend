import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { Col, Row } from 'reactstrap'
import './ProductDetailPage.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import PaymentsMethodsLogos from '@/assets/images/payment/llogot_pagese-split.png'
import { useGetProductByIdQuery } from '../../../../store/products/RTKProductSlice'
import { useAppDispatch, useAppSelector } from '@/hooks/hooks'
import { getProductWithId } from '@/store/products/productSlice'
import LoadingBar from '@/ui/Loading/LoadingBar'
import PaymentCart from '../productItem/PaymentCart/PaymentCart'
import Slider from 'react-slick'
import Breadcrumb from '@/pages/Breadcrumb'

const ProductDetailPage = () => {
  const dispatch = useAppDispatch()
  const path = useLocation()
  const id = useLocation().pathname.split('/')[2]
  let firstNavItem = path.pathname.split('/')[1]
  const { product, loading, error } = useAppSelector((state) => state.products)

  useEffect(() => {
    dispatch(getProductWithId(id))
  }, [])

  // const {
  //   data: products,
  //   isError: isProductError,
  //   isLoading: isProductLoading,
  //   error,
  // } = useGetProductByIdQuery(id)

  // const productError = error?.data.message

  const [activeProdTitle, setActiveProdTitle] = useState('1')

  var settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  const productDetailsTitles = [
    { id: '1', title: 'Pershkrimi' },
    { id: '2', title: 'Detajet' },
    { id: '3', title: 'Vlersimi' },
    { id: '4', title: 'Te ngjashme' },
  ]

  return (
    <>
      {loading && <LoadingBar height={'90vh'} size={50} />}
      {!loading && error ? (
        <div>Error: {error}</div>
      ) : (
        <section className="container" style={{ padding: '20px 105px' }}>
          {/* <div className="nav-history__section " style={{ height: '50px' }}>
            <a href="/">Home</a>
            <span className="ty-breadcrumbs__slash"></span>
            <a href="/">{firstNavItem}</a>
            <span className="ty-breadcrumbs__slash"></span>
            <a>{product?.category}</a>
            <span className="ty-breadcrumbs__slash"></span>
            <a>{product?.title}</a>
          </div> */}
          <Breadcrumb />
          {product ? (
            <div className="d-flex">
              <div className="col-9">
                <Row>
                  <div className=" col-5">
                    <div className="ty-product-bigpicture__img">
                      <Slider {...settings}>
                        {!loading &&
                          product?.images.length > 0 &&
                          product?.images.map((image: any) => (
                            <div
                              key={image}
                              style={{
                                width: '420px',
                                height: '420px',
                                background: 'blue',
                                display: 'flex',
                                alignItems: 'center',
                                backgroundColor: '#ccc',
                              }}
                              className="prova"
                            >
                              <img
                                style={{
                                  maxHeight: '420px',
                                  height: '100%',
                                  width: '100%',
                                }}
                                src={image}
                                alt="Product Image"
                              />
                            </div>
                          ))}
                      </Slider>
                    </div>
                  </div>
                  <div className=" col-7 pl-5">
                    <h1 className="product-title">{product.title}</h1>
                    <div className="grid-container">
                      <div className="grid-item">
                        <label htmlFor="test">Kodi i produktit</label>
                        <p>211027app</p>
                      </div>
                      <div className="grid-item">
                        <label htmlFor="">Kodi i produktit</label>
                        <p>211027app</p>
                      </div>
                      <div className="grid-item">
                        <label htmlFor="">Kodi i produktit</label>
                        <p>211027app</p>
                      </div>
                      <div className="grid-item">
                        <label htmlFor="">Kodi i produktit</label>
                        <p>211027app</p>
                      </div>
                      <div className="grid-item">
                        <label htmlFor="">Kodi i produktit</label>
                        <p>211027app</p>
                      </div>
                      <div className="grid-item">
                        <label htmlFor="">Kodi i produktit</label>
                        <p>211027app</p>
                      </div>
                      <div className="grid-item">
                        <label htmlFor="">Kodi i produktit</label>
                        <p>211027app</p>
                      </div>
                    </div>
                    <a href="#details" style={{ textDecoration: 'border' }}>
                      Shiko te gjitha specifikat
                    </a>
                    <hr className="w-100 p-0" />
                    <div className="grid-container">
                      <div className="grid-item">
                        <label htmlFor="">Cmimi i transportit</label>
                        <p>FALAS</p>
                      </div>
                      <div className="grid-item-column">
                        <label htmlFor="">Mundesia e pagesave:</label>
                        <span>
                          <img
                            className="w-100 h-100"
                            src={PaymentsMethodsLogos}
                            alt=""
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                </Row>
                <div style={{ height: '200px' }}></div>
                <div id="details" className="all-details__div">
                  <ul className="product-details__tab">
                    {productDetailsTitles.map((item) => (
                      <li
                        key={item.id}
                        onClick={() => setActiveProdTitle(item.id)}
                        className={activeProdTitle === item.id ? 'active' : ''}
                      >
                        <a>{item.title}</a>
                      </li>
                    ))}
                  </ul>

                  <div className="product-details__content pl-4 pr-4">
                    {activeProdTitle === '1' && (
                      <>
                        <p className="pd-subheader">Pershkrimi i produktit</p>
                        <p>{product.description}</p>
                      </>
                    )}
                    {activeProdTitle === '2' && (
                      <>
                        <p className="pd-subheader">Detajet Teknike</p>
                        <p>Details table</p>
                      </>
                    )}
                    {activeProdTitle === '3' && (
                      <>
                        <p className="pd-subheader">Vleresimet</p>
                        <p>Asnje postim i gjetur</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <Col>
                <PaymentCart />
              </Col>
            </div>
          ) : null}
        </section>
      )}
    </>
  )
}

export default ProductDetailPage
