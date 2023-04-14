import React from 'react';
import './PaymentCart.css';
import { Button, Col, Row } from 'reactstrap';
import DeliveryTruck from '../../../assets/images/delivery-truck.svg';
import Reiffeisen from '../../../assets/images/payment/reiffeisen.png';
import Teb from '../../../assets/images/payment/teb.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

function PaymentCart() {
  return (
    <div className="payment-cart">
      <div className="product-data">
        <div className="prices-container">
          <div className="product-price_inner">
            <Col>
              <h1>179.50$</h1>
              <small>*Perfshire TVSH-ne</small>
              <small>165.74 pa TVSH</small>
            </Col>
          </div>
          <div className="product-price_labels">
            <span className="price-labels">Risi</span>
            <span className="flag-icon">
              <img
                className=""
                src="https://flagpedia.net/data/flags/h80/al.webp"
              />
            </span>
          </div>
          <div className="product-price_info">
            <div>
              Disponueshmeria
              <br />
              <strong>Me shume se 10 artikuj</strong>
            </div>
            <div>
              <img src={DeliveryTruck} alt="" />
              Trasnporti:
              <br />
              <strong>24ore</strong>
            </div>
          </div>
          <div className="product-price_info--delivery">
            <p>Kur arrine produkti?</p>
          </div>
          <form>
            <div className="product-bank">
              <p>Paguaj me:</p>
              <div className="d-flex justify-content-evenly">
                <img src={Reiffeisen} alt="" />
                <img src={Teb} alt="" />
              </div>
              <p className="pt-3 mb-0 pb-0">
                Deri ne 12 keste pa kamat per vetem{' '}
                <strong>14.96$ ne muaj</strong>{' '}
              </p>
            </div>
            <div className="product-quantity">
              Sasia:{' '}
              <div className="quantity-changer">
                <a className="value-changer__decrease" href>
                  -
                </a>
                <input
                  type="text"
                  id="quantity"
                  name="quantity"
                  size="5"
                  disabled
                  value="1"
                />
                <a className="value-changer__increase" href>
                  +
                </a>
              </div>
            </div>
            <div className="with-gjflex" id="with_gjflex_product_view">
              <h6>E dua me gjirafa flex</h6>
              <div>
                <label for="gjflexyes_207922">
                  <input
                    type="radio"
                    name="product_data[207922][gjflex]"
                    id="gjflexyes_207922"
                    value="1"
                  />
                  <strong>Po</strong>
                </label>
                <label for="gjflexyes_207922" style={{ marginLeft: '20px' }}>
                  <input
                    type="radio"
                    name="product_data[207922][gjflex]"
                    id="gjflexyes_207922"
                    value="1"
                  />
                  <strong>Jo</strong>
                </label>
              </div>
            </div>

            <div className="product-buttons">
              <Button color="info" outline className="col-10 mr-2">
                Shto ne shporte
              </Button>
              <Button color="info" outline>
                <FontAwesomeIcon icon={faHeart} />{' '}
              </Button>
            </div>
          </form>
        </div>
        <div className="buy-now__div">
          <Button color="primary" className="col-12">
            BLEJ TANI
          </Button>
        </div>
        <div className="share-buttons"></div>
      </div>
    </div>
  );
}

export default PaymentCart;
