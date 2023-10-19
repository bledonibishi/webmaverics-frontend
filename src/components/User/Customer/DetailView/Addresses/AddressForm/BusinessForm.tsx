import React from 'react'
import { Col, Form, FormSelect, Row } from 'react-bootstrap'

const BusinessForm = () => {
  const cities = [
    'Zgjedhni qytetin',
    'Drenas',
    'Mitrovice',
    'Deqan',
    'Dragash',
    'Ferixaj',
    'Fushekosove',
    'Graqanice',
    'Gjakove',
    'Gjilan',
    'Ferizaj',
    'Peje',
    'Podujece',
    'Vushtrri',
    'Prishtine',
    'Obiliq',
    'Kaqanik',
    'Kamenice',
    'Kline',
    'Malisheve',
    'Lipjan',
    'Suhareke',
  ]
  return (
    <Form>
      <Row>
        <Col md="6">
          <div className="personal-info__input">
            <label>Name *</label>
            <input type="text" value={'bledon'} />
            <p className="text-danger pb-2 text-xs">
              Hapësira 'Emri' nuk duhet të jetë e zbrazët!
            </p>
          </div>
        </Col>
        <Col md="6">
          <div className="personal-info__input">
            <label>Lastname *</label>
            <input type="text" value={'bledon'} />
            <p className="text-danger pb-2 text-xs hidden">
              Hapësira 'Lastname' nuk duhet të jetë e zbrazët!
            </p>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md="6">
          <div className="personal-info__input">
            <label>Company *</label>
            <input type="text" value={'bledon'} />
            <p className="text-danger pb-2 text-xs hidden">
              Hapësira 'Emri' nuk duhet të jetë e zbrazët!
            </p>
          </div>
        </Col>
        <Col md="6">
          <div className="personal-info__input">
            <label>Fiscal number *</label>
            <input type="text" value={'bledon'} />
            <p className="text-danger pb-2 text-xs hidden">
              Hapësira 'Lastname' nuk duhet të jetë e zbrazët!
            </p>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md="6">
          <div className="personal-info__input">
            <label>Country *</label>
            <input type="text" value={'bledon'} />
            <FormSelect
              className="country-select"
              aria-label="Default select example"
            >
              <option className="selectCustom-option sort-options bg-white text-sm font-medium flex justify-center text-gray-600 light-dropdown-hover">
                Kosove
              </option>
              <option
                className="selectCustom-option sort-options bg-white text-sm font-medium flex justify-center text-gray-600 light-dropdown-hover"
                value="1"
              >
                Shqiperi
              </option>
              <option
                className="selectCustom-option sort-options bg-white text-sm font-medium flex justify-center text-gray-600 light-dropdown-hover"
                value="2"
              >
                Maqedoni
              </option>
            </FormSelect>
          </div>
        </Col>
        <Col md="6">
          <div className="personal-info__input">
            <label>City *</label>
            <input type="text" value={'bledon'} />
            <FormSelect
              className="cities-select"
              aria-label="Default select example"
            >
              {cities.map((city) => (
                <option className="selectCustom-option sort-options bg-white text-sm font-medium flex justify-center text-gray-600 light-dropdown-hover">
                  {city}
                </option>
              ))}
            </FormSelect>
          </div>
        </Col>
      </Row>
      <Col md="12">
        <div className="personal-info__input">
          <label>Address *</label>
          <input type="text" value={'bledon'} />
          <p className="text-danger pb-2 text-xs hidden">
            Hapësira 'Lastname' nuk duhet të jetë e zbrazët!
          </p>
        </div>
      </Col>
      <Row>
        <Col md="6">
          <div className="personal-info__input">
            <label>E-mail *</label>
            <input type="text" value={'bledon'} />
            <p className="text-danger pb-2 text-xs hidden">
              Hapësira 'Emri' nuk duhet të jetë e zbrazët!
            </p>
          </div>
        </Col>
        <Col md="6">
          <div className="personal-info__input">
            <label>Telephone number *</label>
            <input type="text" value={'bledon'} />
            <p className="text-danger pb-2 text-xs hidden">
              Hapësira 'Lastname' nuk duhet të jetë e zbrazët!
            </p>
          </div>
        </Col>
      </Row>
      <div className="add-address-footer">
        <button className="btn btn-primary">Ruaj</button>
      </div>
    </Form>
  )
}

export default BusinessForm