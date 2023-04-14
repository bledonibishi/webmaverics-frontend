import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { getProductWithId } from '../../../store/products/productSlice';
import './CartDetailPage.css';
import LoadingBar from '../../../ui/Loading/LoadingBar';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import PaymentsMethodsLogos from '../../../assets/images/visa.png';

import Slider from 'react-slick';
import PaymentCart from '../../components/PaymentCart/PaymentCart';
import { Col, Row } from 'reactstrap';

function CartDetailPage() {
  const path = useLocation();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const [activeProdTitle, setActiveProdTitle] = useState('1');

  let firstNavItem = path.pathname.split('/')[1];
  const product =
    products.products && products.products.length > 0
      ? products.products[0]
      : null;
  console.log('product', product);
  const id = useLocation().pathname.split('/')[2];

  useEffect(() => {
    dispatch(getProductWithId(id));
  }, [id]);

  var settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const productDetailsTitles = [
    { id: '1', title: 'Pershkrimi' },
    { id: '2', title: 'Detajet' },
    { id: '3', title: 'Vlersimi' },
    { id: '4', title: 'Te ngjashme' },
  ];

  return (
    <>
      {products.loading && <LoadingBar />}
      {!products.loading && products.error ? (
        <div>Error: {products.error}</div>
      ) : null}
      <section className="container" style={{ padding: '20px 105px' }}>
        <div className="nav-history__section " style={{ height: '50px' }}>
          <a href="/">Home</a>
          <span className="ty-breadcrumbs__slash"></span>
          <a href="/">{firstNavItem}</a>
          <span className="ty-breadcrumbs__slash"></span>
          <a href>{product?.category}</a>
          <span className="ty-breadcrumbs__slash"></span>
          <a href>{product?.title}</a>
        </div>
        {product ? (
          <div className="d-flex">
            <div className="col-9">
              <Row>
                <div className=" col-5">
                  <div className="ty-product-bigpicture__img">
                    <Slider {...settings}>
                      {!products.loading &&
                        product.images.length > 0 &&
                        product.images.map((image) => (
                          <div
                            key={image}
                            style={{
                              width: '420px',
                              height: '420px',
                              background: 'blue',
                              display: 'flex',
                              alignItems: 'center',
                            }}
                            className="prova"
                          >
                            <img
                              style={{
                                maxHeight: '420px',
                                height: 'auto',
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
                      <label for="">Kodi i produktit</label>
                      <p>211027app</p>
                    </div>
                    <div className="grid-item">
                      <label for="">Kodi i produktit</label>
                      <p>211027app</p>
                    </div>
                    <div className="grid-item">
                      <label for="">Kodi i produktit</label>
                      <p>211027app</p>
                    </div>
                    <div className="grid-item">
                      <label for="">Kodi i produktit</label>
                      <p>211027app</p>
                    </div>
                    <div className="grid-item">
                      <label for="">Kodi i produktit</label>
                      <p>211027app</p>
                    </div>
                    <div className="grid-item">
                      <label for="">Kodi i produktit</label>
                      <p>211027app</p>
                    </div>
                    <div className="grid-item">
                      <label for="">Kodi i produktit</label>
                      <p>211027app</p>
                    </div>
                  </div>
                  <a href="#details" style={{ textDecoration: 'border' }}>
                    Shiko te gjitha specifikat
                  </a>
                  <hr className="w-100 p-0" />
                  <div className="grid-container">
                    <div className="grid-item">
                      <label for="">Cmimi i transportit</label>
                      <p>FALAS</p>
                    </div>
                    <div className="grid-item-column">
                      <label for="">Mundesia e pagesave:</label>
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
                      className={activeProdTitle === item.id ? 'active' : null}
                    >
                      <a href>{item.title}</a>
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
    </>
  );
}

export default CartDetailPage;
