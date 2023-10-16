import React, { useState } from 'react'
import './style.css'
import { useNavigate } from 'react-router-dom'

const OpcBilling = () => {
  const navigate = useNavigate()
  const [newAddress, setNewAddress] = useState<boolean>(false)

  const gotoShippingMethod = () => {
    navigate('/onepagecheckout/opc-shipping_method')
  }
  return (
    <ol className="opc rounded " id="checkout-steps">
      <li
        id="opc-billing"
        className="tab-section allow bg-white shadow-md active"
      >
        <div className="step-title d-flex justify-content-between p-3 border-b border-gray-300 text-sm">
          <div className="d-flex items-center">
            <span className="number">1</span>
            <h6 className="title ml-4 mb-0">Adresa e faturimit</h6>
          </div>
          <p className="back-link">
            <a
              href="#"
              className="text-primary font-medium m-2 p-2 editbutton hidden"
              // onclick="Checkout.back(); return false; "
            >
              Ndrysho
            </a>
          </p>
        </div>
        <div id="checkout-step-billing" className="step a-item p-4">
          <form
            id="co-billing-form"
            action=""
            //  noValidate="novalidate"
          >
            <div id="checkout-billing-load">
              <div className="checkout-data">
                <div className="section ship-to-same-address mb-6">
                  <div className="selector d-flex items-center">
                    <input
                      type="checkbox"
                      // checked="checked"
                      data-val="true"
                      data-val-required="The ShipToSameAddress field is required."
                      id="ShipToSameAddress"
                      name="ShipToSameAddress"
                      value="true"
                    />
                    <label
                      className="text-sm text-gray-700 pl-4"
                      htmlFor="ShipToSameAddress"
                    >
                      Transporto në të njejtën adresë
                    </label>
                  </div>
                </div>
                <div className="section select-billing-address mb-6 d-flex flex-col gap-2 p-2 bg-gray-100">
                  <label
                    htmlFor="billing-address-select"
                    className="text-sm text-gray-600 px-0.5"
                  >
                    Zgjedh një adresë të faturimit nga lista juaj e adresave,
                    ose shkruani një adresë të re.
                  </label>
                  <select
                    name="billing_address_id"
                    id="billing-address-select"
                    className="address-select border truncate w-100"
                    title=""
                  >
                    <option
                      className="selected-billing-address"
                      value="73846"
                      data-clienttype="Individual"
                      data-firstname="bledon"
                      data-lastname="ibishi"
                      data-streetaddress="hamdi gashi"
                      data-city="Vushtrri"
                      data-country="Kosovë"
                      data-email="bledonibishi1@gmail.com"
                      data-number="045224091"
                      data-company=""
                      data-fiscalnumber=""
                    >
                      bledon ibishi, hamdi gashi, Vushtrri, Kosovë ...
                    </option>
                    <option
                      className="selected-billing-address"
                      value="541648"
                      data-clienttype="Individual"
                      data-firstname="bledon"
                      data-lastname="ibishi"
                      data-streetaddress="hamdi gashi"
                      data-city="Vushtrri"
                      data-country="Kosovë"
                      data-email="bledonibishi1@gmail.com"
                      data-number="045224091"
                      data-company=""
                      data-fiscalnumber=""
                    >
                      bledon ibishi, hamdi gashi, Vushtrri, Kosovë ...
                    </option>
                    <option value="" onClick={() => setNewAddress(true)}>
                      Të re
                    </option>
                  </select>
                  <span className="d-flex flex-col p-2">
                    <a
                      className="text-gray-600 text-sm hover:underline edit-current-billing-address"
                      href=""
                    >
                      Ndrysho adresën ekzistuese
                    </a>
                    <span className="text-xs text-gray-600 pt-1">
                      *Kliko linkun për të ndryshuar adresën aktuale
                    </span>
                  </span>
                </div>
                {newAddress && (
                  <div
                    className={`section new-billing-address`}
                    id="billing-new-address-form"
                  >
                    <div className="enter-address">
                      <input
                        className="address-id"
                        type="hidden"
                        data-val="true"
                        data-val-required="The Id field is required."
                        id="BillingNewAddress_Id"
                        name="BillingNewAddress.Id"
                        value="0"
                      />
                      <div className="edit-address d-flex flex-col gap-4 tablet:grid tablet:grid-cols-2 mb-4">
                        <div className="w-full d-flex flex-col col-span-2 tablet:grid tablet:grid-cols-2">
                          <span className="text-sm font-normal pb-1 text-xs text-gray-700 col-span-2">
                            Ju jeni duke blerë si:
                          </span>
                          <div className="w-full col-span-1">
                            <div className="d-flex align-items-center  border rounded-3xl w-3/4">
                              <label
                                htmlFor="individual"
                                className="d-flex align-items-center  justify-content-center customer-type flex-grow rounded-3xl py-2 cursor-pointer border border-primary text-primary"
                              >
                                <input
                                  type="radio"
                                  id="individual"
                                  value="Individual"
                                  name="CustomerType"
                                  className="cursor-pointer hidden"
                                />
                                <label
                                  className="cursor-pointer text-sm"
                                  htmlFor="individual"
                                >
                                  Individ
                                </label>
                              </label>
                              <label
                                htmlFor="business"
                                className="d-flex align-items-center  justify-content-center customer-type flex-grow rounded-3xl py-2 cursor-pointer "
                              >
                                <input
                                  type="radio"
                                  id="business"
                                  value="Business"
                                  name="CustomerType"
                                  className="cursor-pointer hidden"
                                />
                                <label
                                  className="cursor-pointer text-sm"
                                  htmlFor="business"
                                >
                                  Biznes
                                </label>
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="inputs d-flex flex-col col-span-1">
                          <div className="d-flex text-xs text-gray-700 pb-1.5">
                            <label htmlFor="BillingNewAddress_FirstName">
                              Emri
                            </label>
                            <span className="required">*</span>
                          </div>
                          <div className="customer-address-field position-relative">
                            <input
                              type="text"
                              data-val="true"
                              data-val-maxlength="Emri tejkalon gjatësinë maksimale të lejuar"
                              data-val-maxlength-max="50"
                              data-val-regex="Emri nuk është në formatin e duhur"
                              data-val-regex-pattern="^[ -ԯ]*$"
                              data-val-required="Hapësira 'Emri' nuk duhet të jetë e zbrazët!"
                              id="BillingNewAddress_FirstName"
                              name="BillingNewAddress.FirstName"
                              value="bledon"
                              placeholder="Emri"
                            />
                          </div>
                          <span
                            className="field-validation-valid"
                            data-valmsg-for="BillingNewAddress.FirstName"
                            data-valmsg-replace="true"
                          ></span>
                        </div>
                        <div className="inputs d-flex flex-col col-span-1">
                          <div className="d-flex text-xs text-gray-700 pb-1.5">
                            <label htmlFor="BillingNewAddress_LastName">
                              Mbiemri
                            </label>
                            <span className="required">*</span>
                          </div>
                          <div className="customer-address-field position-relative">
                            <input
                              type="text"
                              data-val="true"
                              data-val-maxlength="Mbiemri tejkalon gjatësinë maksimale të lejuar"
                              data-val-maxlength-max="50"
                              data-val-regex="Mbiemri nuk është në formatin e duhur"
                              data-val-regex-pattern="^[ -ԯ]*$"
                              data-val-required="Hapësira 'Mbiemri' nuk duhet të jetë e zbrazët!"
                              id="BillingNewAddress_LastName"
                              name="BillingNewAddress.LastName"
                              value="ibishi"
                              placeholder="Mbiemri"
                            />
                          </div>
                          <span
                            className="field-validation-valid"
                            data-valmsg-for="BillingNewAddress.LastName"
                            data-valmsg-replace="true"
                          ></span>
                        </div>
                        <div className="inputs hidden d-flex flex-col">
                          <div className="d-flex text-xs text-gray-700 pb-1.5">
                            <label htmlFor="BillingNewAddress_Company">
                              Kompania
                            </label>
                          </div>
                          <div className="customer-address-field position-relative">
                            <input
                              className="company-input"
                              type="text"
                              data-val="true"
                              data-val-maxlength="Kompania tejkalon gjatësinë maksimale të lejuar"
                              data-val-maxlength-max="100"
                              data-val-regex="Kompania  nuk është në formatin e duhur"
                              data-val-regex-pattern="^[ -ԯ]*$"
                              id="BillingNewAddress_Company"
                              name="BillingNewAddress.Company"
                              value=""
                              placeholder="Kompania"
                            />
                          </div>
                          <span
                            className="field-validation-valid"
                            data-valmsg-for="BillingNewAddress.Company"
                            data-valmsg-replace="true"
                          ></span>
                        </div>
                        <div className="inputs hidden d-flex flex-col">
                          <div className="d-flex text-xs text-gray-700 pb-1.5">
                            <label htmlFor="BillingNewAddress_FiscalNumber">
                              Numri fiskal
                            </label>
                          </div>
                          <div className="customer-address-field position-relative">
                            <input
                              className="fiscalnumber-input"
                              type="text"
                              data-val="true"
                              data-val-maxlength="Numri fiskal tejkalon gjatësinë maksimale të lejuar"
                              data-val-maxlength-max="50"
                              data-val-regex="Numri fiskal nuk është në formatin e duhur"
                              data-val-regex-pattern="^[A-z0-9]*$"
                              id="BillingNewAddress_FiscalNumber"
                              name="BillingNewAddress.FiscalNumber"
                              value=""
                              placeholder="Numri fiskal"
                            />
                          </div>
                          <span
                            className="field-validation-valid"
                            data-valmsg-for="BillingNewAddress.FiscalNumber"
                            data-valmsg-replace="true"
                          ></span>
                        </div>
                        <div className="inputs d-flex flex-col">
                          <div className="d-flex text-xs text-gray-700 pb-1.5">
                            <label htmlFor="BillingNewAddress_CountryId">
                              Shteti
                            </label>
                            <span className="required">*</span>
                          </div>
                          <select
                            id="country-select"
                            data-trigger="country-select"
                            data-url="/country/getstatesbycountryid"
                            data-stateprovince="#BillingNewAddress_StateProvinceId"
                            data-loading="#states-loading-progress"
                            className=""
                            data-val="true"
                            data-val-required="Shteti është i obligueshëm."
                            name="BillingNewAddress.CountryId"
                          >
                            <option
                              // selected="selected"
                              value="250"
                            >
                              Kosovë
                            </option>
                          </select>
                          <span
                            className="field-validation-valid"
                            data-valmsg-for="BillingNewAddress.CountryId"
                            data-valmsg-replace="true"
                          ></span>
                        </div>
                        <div className="inputs d-flex flex-col">
                          <div className="d-flex text-xs text-gray-700 pb-1.5">
                            <label htmlFor="BillingNewAddress_StateProvinceId">
                              Qyteti
                            </label>
                            <span className="required">*</span>
                          </div>
                          <select
                            id="state-select"
                            data-trigger="state-select"
                            className=""
                            name="BillingNewAddress.StateProvinceId"
                          >
                            <option value="0">Zgjedhni qytetin</option>
                            <option value="1986">Drenas</option>
                            <option value="1985">Mitrovica Veriore</option>
                            <option value="1844">Deçan</option>
                            <option value="1846">Dragash</option>
                            <option value="1842">Ferizaj</option>
                            <option value="1850">Fushë Kosovë</option>
                            <option value="1871">Graçanicë</option>
                            <option value="1839">Gjakovë</option>
                            <option value="1841">Gjilan</option>
                            <option value="1867">Hani i Elezit</option>
                            <option value="1847">Istog</option>
                            <option value="1869">Junik</option>
                            <option value="1848">Kaçanik</option>
                            <option value="1851">Kamenicë</option>
                            <option value="1849">Klinë</option>
                            <option value="1870">Kllokoti</option>
                            <option value="1853">Leposaviq</option>
                            <option value="1854">Lipjan</option>
                            <option value="1866">Malishevë</option>
                            <option value="1868">Mamushë</option>
                            <option value="1852">Mitrovicë</option>
                            <option value="1855">Novobërdë</option>
                            <option value="1856">Obiliq</option>
                            <option value="1873">Partesh</option>
                            <option value="1840">Pejë</option>
                            <option value="1858">Podujevë</option>
                            <option value="1837">Prishtinë</option>
                            <option value="1838">Prizren</option>
                            <option value="1857">Rahovec</option>
                            <option value="1872">Ranillug</option>
                            <option value="1859">Skënderaj</option>
                            <option value="1843">Suharekë</option>
                            <option value="1861">Shtërpcë</option>
                            <option value="1860">Shtime</option>
                            <option value="1862">Viti</option>
                            <option value="1863">Vushtrri</option>
                            <option value="1864">Zubin Potok</option>
                            <option value="1865">Zveçan</option>
                          </select>
                          <span
                            id="states-loading-progress"
                            style={{ display: 'none' }}
                            className="please-wait"
                          >
                            Prisni
                          </span>
                          <span
                            className="field-validation-valid"
                            data-valmsg-for="BillingNewAddress.StateProvinceId"
                            data-valmsg-replace="true"
                          ></span>
                        </div>
                        <div className="inputs col-span-2 d-flex flex-col">
                          <div className="d-flex text-xs text-gray-700 pb-1.5">
                            <label
                              className="whitespace-nowrap"
                              htmlFor="BillingNewAddress_Address1"
                            >
                              Adresa
                            </label>
                            <span className="required">*</span>
                            <div className="add-button d-flex w-100 justify-end">
                              <button
                                type="button"
                                id="add-address-button"
                                className="add-add-address-button   text-primary text-xs font-semibold hover:underline whitespace-nowrap"
                              >
                                <i className="icon-add-plus text-base font-semibold"></i>
                                Shto një të re
                              </button>
                            </div>
                          </div>
                          <div className="customer-address-field position-relative">
                            <input
                              type="text"
                              data-val="true"
                              data-val-maxlength="Adresa tejkalon gjatësinë maksimale të lejuar"
                              data-val-maxlength-max="100"
                              data-val-regex="Adresa nuk është në formatin e duhur"
                              data-val-regex-pattern="^[ -ԯ]*$"
                              data-val-required="Hapësira 'Adresa' nuk duhet të jetë e zbrazët!"
                              id="BillingNewAddress_Address1"
                              name="BillingNewAddress.Address1"
                              value=""
                              placeholder="Adresa"
                            />
                          </div>
                          <span
                            className="field-validation-valid"
                            data-valmsg-for="BillingNewAddress.Address1"
                            data-valmsg-replace="true"
                          ></span>
                        </div>
                        <div className="address2 inputs col-span-2 d-flex flex-col hidden">
                          <div className="d-flex text-xs text-gray-700 pb-1.5">
                            <label htmlFor="BillingNewAddress_Address2">
                              Adresa 2
                            </label>
                          </div>
                          <div className="customer-address-field position-relative">
                            <input
                              type="text"
                              data-val="true"
                              data-val-maxlength="Adresa 2 tejkalon gjatësinë maksimale të lejuar"
                              data-val-maxlength-max="100"
                              data-val-regex="Adresa 2 nuk është në formatin e duhur"
                              data-val-regex-pattern="^[ -ԯ]*$"
                              id="BillingNewAddress_Address2"
                              name="BillingNewAddress.Address2"
                              value=""
                              placeholder="Adresa 2"
                            />
                          </div>
                          <span
                            className="field-validation-valid"
                            data-valmsg-for="BillingNewAddress.Address2"
                            data-valmsg-replace="true"
                          ></span>
                        </div>
                        <div className="inputs d-flex flex-col">
                          <div className="d-flex text-xs text-gray-700 pb-1.5">
                            <label htmlFor="BillingNewAddress_Email">
                              E-mail
                            </label>
                            <span className="required">*</span>
                          </div>
                          <div className="customer-address-field position-relative">
                            <input
                              type="email"
                              data-val="true"
                              data-val-email="E-mail i gabuar"
                              data-val-maxlength="E-mail tejkalon gjatësinë maksimale të lejuar"
                              data-val-maxlength-max="100"
                              data-val-required="Hapësira 'E-mail' nuk duhet të jetë e zbrazët!"
                              id="BillingNewAddress_Email"
                              name="BillingNewAddress.Email"
                              value="bledonibishi1@gmail.com"
                              placeholder="E-mail"
                            />
                          </div>
                          <span
                            className="field-validation-valid"
                            data-valmsg-for="BillingNewAddress.Email"
                            data-valmsg-replace="true"
                          ></span>
                        </div>
                        <div className="inputs d-flex flex-col">
                          <div className="d-flex text-xs text-gray-700 pb-1.5">
                            <label htmlFor="BillingNewAddress_PhoneNumber">
                              Numri i telefonit
                            </label>
                            <span className="required">*</span>
                          </div>
                          <div className="customer-address-field position-relative">
                            <input
                              type="tel"
                              data-val="true"
                              data-val-regex="Numri i telefonit nuk është i vlefshëm"
                              data-val-regex-pattern="^\+?[0-9]{7,13}$"
                              data-val-required="Hapësira 'Numri i telefonit' nuk duhet të jetë e zbrazët."
                              id="BillingNewAddress_PhoneNumber"
                              name="BillingNewAddress.PhoneNumber"
                              value=""
                              placeholder="Numri i telefonit"
                            />
                          </div>
                          <span
                            className="field-validation-valid"
                            data-valmsg-for="BillingNewAddress.PhoneNumber"
                            data-valmsg-replace="true"
                          ></span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <input name="ShipToSameAddress" type="hidden" value="false" />
          </form>
          <div
            className="buttons d-flex align-items-end flex-col"
            id="billing-buttons-container"
            style={{ opacity: '1' }}
          >
            <button
              id="edit-address-button"
              type="button"
              className="button-1 bg-primary rounded h-10 text-white uppercase text-base w-100 shadow-sm"
              style={{ display: 'none' }}
              // onClick="Billing.editAddress('https://gjirafa50.com/checkout/GetAddressById/'); return false;"
            >
              Ndrysho
            </button>
            <button
              id="delete-address-button"
              type="button"
              className="button-1 bg-primary rounded h-10 text-white uppercase text-base w-100 shadow-sm"
              style={{ display: 'none' }}
              //  onclick="Billing.deleteAddress('https://gjirafa50.com/checkout/DeleteEditAddress/'); return false;"
            >
              Fshij
            </button>
            <button
              id="save-address-button"
              type="button"
              className="button-1 bg-primary rounded h-10 text-white uppercase text-base w-100 shadow-sm"
              style={{ display: 'none' }}
              //  onclick="Billing.saveEditAddress('https://gjirafa50.com/checkout/SaveEditAddress/'); return false;"
            >
              Ruaj
            </button>
            <button
              id="next-step"
              type="button"
              name="save"
              className="new-address-next-step-button btn btn-primary btn-primary-hover  shadow-sm"
              // onclick="Billing.save(); sendSelectedAddressEvent('invoice')"
              onClick={() => gotoShippingMethod()}
            >
              Vazhdo
            </button>
            <div
              id="billing-please-wait"
              className="w-100 d-flex justify-content-center align-items-center hidden text-xs"
              style={{ display: 'none' }}
            >
              Duke u ngarkuar hapi i ardhshëm ...
              <span className="please-wait ml-2"></span>
            </div>
          </div>
        </div>
      </li>
      <li
        id="opc-shipping"
        className="tab-section bg-white shadow-md rounded-t"
      >
        <div className="step-title d-flex justify-content-between align-items-center  p-3 border-b border-gray-300 text-sm">
          <div className="d-flex items-center">
            <span className="number">2</span>
            <h6 className="title ml-4 mb-0">Adresa e transportit</h6>
          </div>
          <p className="back-link">
            <a
              href="#"
              className="text-primary font-medium m-2 p-2 hidden editbutton"
              //  onclick="Checkout.back(); return false; "
            >
              Ndrysho
            </a>
          </p>
        </div>
        <div
          id="checkout-step-shipping"
          className="step a-item p-4"
          style={{ display: 'none' }}
        >
          <form action="" id="co-shipping-form">
            <div id="checkout-shipping-load"></div>
          </form>
          <div
            className="buttons d-flex items-end flex-col"
            id="shipping-buttons-container"
          >
            <button
              type="button"
              className="new-address-next-step-button btn btn-primary btn-primary-hover shadow-sm"
              // onclick="Shipping.save(); sendSelectedAddressEvent('transport')"
            >
              Vazhdo
            </button>
            <div
              id="shipping-please-wait"
              className="w-full d-flex justify-content-center align-items-center  text-xs"
            >
              Duke u ngarkuar hapi i ardhshëm ...
              <span className="please-wait ml-2"></span>
            </div>
          </div>
        </div>
      </li>
      <li id="opc-shipping_method" className="bg-white shadow-md tab-section">
        <div className="step-title flex justify-between items-center p-3 border-b border-gray-300 text-sm">
          <div className="d-flex items-center">
            <span className="number">3</span>
            <h6 className="title mb-0 ml-4">Mënyra e transportit</h6>
          </div>
          <p className="back-link">
            <a
              href="#"
              className="text-primary font-medium m-2 p-2 editbutton hidden"
              // onclick="Checkout.back(); return false; "
            >
              Ndrysho
            </a>
          </p>
        </div>
        <div
          id="checkout-step-shipping-method"
          className="step a-item p-4"
          style={{ display: 'none' }}
        >
          <form id="co-shipping-method-form" action="">
            <div id="checkout-shipping-method-load">
              <div className="checkout-data">
                <div
                  className="section shipping-method"
                  id="shipping-methods-form"
                >
                  <div className="method-list flex flex-col items-center">
                    <label
                      data-shipping-method="STANDARD - Transport falas"
                      htmlFor="shippingoption_0"
                      className="method-name flex gap-4 items-baseline border rounded p-2 mb-6 border-primary shadow-halo"
                    >
                      <span>
                        <input
                          id="shippingoption_0"
                          type="radio"
                          name="shippingoption"
                          value="STANDARD - Transport falas___Shipping.FixedByWeightByTotal"
                        />
                      </span>

                      <label
                        className="text-sm text-gray-700 text-left"
                        htmlFor="shippingoption_0"
                      >
                        STANDARD - Transport falas
                        <span className="method-description">
                          <p className="text-sm text-gray-600 pt-3">
                            Në cilëndo pikë në Kosovë, porositë që bëhen do të
                            dorëzohen brenda ditëve të shkruara më larte. Për
                            kohë të limituar të gjitha format e transportit për
                            të gjitha produktet do të jenë FALAS! Ju lutemi të
                            shkruani informatat me kujdes që porosia të arrijë
                            në vendin e duhur sa më shpejt.
                          </p>
                        </span>
                      </label>
                    </label>
                    <label
                      data-shipping-method="Merre në zyret e Gjirafa50"
                      htmlFor="shippingoption_1"
                      className="method-name flex gap-4 items-baseline border rounded p-2 mb-6 "
                    >
                      <span>
                        <input
                          id="shippingoption_1"
                          type="radio"
                          name="shippingoption"
                          value="Merre në zyret e Gjirafa50___Shipping.FixedByWeightByTotal"
                        />
                      </span>

                      <label
                        className="text-sm text-gray-700 text-left"
                        htmlFor="shippingoption_1"
                      >
                        Merre në zyret e Gjirafa50
                        <span className="method-description">
                          <p className="text-sm text-gray-600 pt-3">
                            Merreni porosinë tuaj në zyret tona pasi të pranoni
                            konfirmimin se porosia juaj është bërë gati. Afati
                            për pranimin e porosisë është 3 ditë pune pas
                            njoftimit të pranuar.
                          </p>
                        </span>
                      </label>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="buttons flex flex-col items-end"
              id="shipping-method-buttons-container"
            >
              <button
                type="button"
                className="shipping-method-next-step-button btn btn-primary btn-primary-hover shadow-sm"
                // onclick="ShippingMethod.save(); sendTransportMethodEvent();"
              >
                Vazhdo
              </button>
              <div
                id="shipping-method-please-wait"
                className="w-full flex justify-center items-center text-xs"
                style={{ display: 'none' }}
              >
                Duke u ngarkuar hapi i ardhshëm ...
                <span className="please-wait ml-2"></span>
              </div>
            </div>
          </form>
        </div>
      </li>
      <li id="opc-payment_method" className="tab-section bg-white shadow-md">
        <div className="step-title flex justify-between items-center p-3 border-b border-gray-300 text-sm">
          <div className="d-flex items-center">
            <span className="number">4</span>
            <h6 className="title mb-0 ml-4">Mënyra e pagesës</h6>
          </div>
          <p className="back-link">
            <a
              href="#"
              className="text-primary font-medium m-2 p-2 hidden editbutton"
              // onclick="Checkout.back(); return false; "
            >
              Ndrysho
            </a>
          </p>
        </div>
        <div
          id="checkout-step-payment-method"
          className="step a-item p-4"
          style={{ display: 'none' }}
        >
          <form action="" id="co-payment-method-form">
            <div id="checkout-payment-method-load">Payment is not required</div>
          </form>
          <div
            className="buttons flex flex-col items-end"
            id="payment-method-buttons-container"
          >
            <button
              type="button"
              name="save"
              className="payment-method-next-step-button btn btn-primary btn-primary-hover shadow-sm"
              // onclick="PaymentMethod.save(); sendPaymentMethodEvent();"
            >
              Vazhdo
            </button>
            <div
              id="payment-method-please-wait"
              className="w-full flex justify-center items-center text-xs"
              style={{ display: 'none' }}
            >
              Duke u ngarkuar hapi i ardhshëm ...
              <span className="please-wait ml-2"></span>
            </div>
          </div>
        </div>
      </li>
      <li
        id="opc-payment_info"
        className="tab-section bg-white shadow-md rounded-b"
      >
        <div className="step-title flex justify-between items-center p-3 border-b border-gray-300 text-sm">
          <div className="d-flex items-center">
            <span className="number">5</span>
            <h6 className="title mb-0 ml-4">Të dhëna për dërgesë dhe pagesë</h6>
          </div>
          <p className="back-link">
            <a
              href="#"
              className="text-primary font-medium m-2 p-2 hidden editbutton"
            >
              Ndrysho
            </a>
            {/* onclick="Checkout.back(); return false; " */}
          </p>
        </div>
        <div
          id="checkout-step-payment-info"
          className="step a-item p-4"
          style={{ display: 'none' }}
        >
          <form action="" id="co-payment-info-form">
            <div
              id="checkout-payment-info-load"
              className="mb-5 flex flex-col text-left text-sm"
            >
              checkout.paymentisnotrequired
            </div>
            <div className="customer-entered-delivery-date mb-5 flex flex-col">
              <label
                htmlFor="datepicker"
                className="text-sm text-gray-600 mb-2"
              >
                Për datë tjetër të arritjes së porosisë, mund të e caktoni atë
                këtu:
              </label>
              <div className="d-flex items-center">
                <label className="relative flex items-center w-min cursor-pointer">
                  <input
                    name="customer-entered-delivery-date"
                    className="cursor-pointer"
                    data-toggle="datepicker"
                    placeholder="DD.MM.YYYY"
                  />
                  <i className="icon-calendar-event-month text-xl text-gray-600 absolute right-2"></i>
                </label>
                <i className="icon-close-cancel text-lg text-gray-600 ml-2 cursor-pointer hidden"></i>
              </div>
              <span
                id="validation-for-customer-entered-delivery-date"
                className="text-[#e15726] text-sm p-1"
              ></span>
            </div>
            <div className="d-flex flex-col w-full bg-gray-100 p-2 rounded mb-4">
              <div className="d-flex flex-col text-left">
                <label
                  htmlFor="order-comment"
                  className="text-sm text-gray-600"
                >
                  Ju mund të lini ndonjë koment këtu:
                </label>
                <textarea
                  className="border rounded border-gray-100"
                  id="order-comment"
                  name="order-comment"
                  rows={3}
                  cols={60}
                  maxLength={160}
                ></textarea>
              </div>
            </div>
            <div className="terms-of-service py-1 flex items-center justify-start gap-2">
              <input
                id="termsofservice"
                type="checkbox"
                name="termsofservice"
              />
              <label
                htmlFor="termsofservice"
                className="text-xs md:text-sm text-left"
              >
                Duke klikuar këtë, unë i pranoj Kushtet e Përdorimit.
              </label>
              <a className="read text-primary" id="read-terms">
                (Lexo këtu)
              </a>
            </div>
            <div
              id="terms-of-service-warning-box"
              title="Kushtet e përdorimit"
              style={{ display: 'none' }}
            >
              <p>
                Ju lusim që të pranoni Termet dhe Kushtet e Përdorimit në mënyrë
                që të mund ta bëni porosinë.
              </p>
            </div>
          </form>
          <div
            className="buttons flex flex-col items-end"
            id="payment-info-buttons-container"
          >
            <button
              type="button"
              className="payment-info-next-step-button btn btn-primary btn-primary-hover shadow-sm"
            >
              Konfirmo
            </button>
            <div
              id="payment-info-please-wait"
              className="w-full flex justify-center items-center text-xs"
              style={{ display: 'none' }}
            >
              Duke bërë porosinë
              <span className="please-wait ml-2"></span>
            </div>
          </div>
        </div>
      </li>
    </ol>
  )
}

export default OpcBilling
