import React, { ChangeEvent, useEffect, useState } from 'react'
import './style.css'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/hooks/hooks'
import { useGetCartProductsQuery } from '@/Cart/store/cartAPI'
import { getCartProducts } from '@/Cart/store/cartSlice'
import { CalculateTotalPrice } from '@/Cart/components/calculateTotalPrice'
import { getAllAddresses } from '@/store/addresses/addressesSlice'
import { fetchCountries } from '@/store/auth/authSlice'
import { Address } from '@/helpers/types'

type OpcBillinPropTypes = {
  handleContinue: (activeStep: string) => void
  handleAddressSelection: (address: string) => void
  sameAddress: boolean
  setSameAddress: React.Dispatch<React.SetStateAction<boolean>>
}

const OpcBilling: React.FC<OpcBillinPropTypes> = ({
  handleContinue,
  handleAddressSelection,
  sameAddress,
  setSameAddress,
}) => {
  const navigate = useNavigate()
  const [newAddress, setNewAddress] = useState<boolean>(false)
  const { addresses, loading } = useAppSelector((state) => state.address)
  const { countries, user } = useAppSelector((state) => state.auth)
  const [selectedType, setSelectedType] = useState<string>('Bussines')

  useEffect(() => {
    dispatch(fetchCountries())
  }, [])

  useEffect(() => {
    dispatch(getAllAddresses())
  }, [])

  const dispatch = useAppDispatch()

  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedType(event.target.value)
  }

  useEffect(() => {
    dispatch(getCartProducts())
  }, [])

  const handleAddressChange = (event: any) => {
    if (event.target.value === 'new') {
      setNewAddress(true)
    } else {
      handleAddressSelection(event.target.value)
    }
  }

  const handleSkip = () => {
    navigate('#opc-shipping_method')
  }

  return (
    <>
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
                  checked={sameAddress}
                  onChange={() => setSameAddress((state) => !state)}
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
                Zgjedh një adresë të faturimit nga lista juaj e adresave, ose
                shkruani një adresë të re.
              </label>
              <select
                name="billing_address_id"
                id="billing-address-select"
                className="address-select border truncate w-100"
                title=""
                onChange={handleAddressChange}
              >
                {addresses.map((address, index) => {
                  const countryName = countries?.find(
                    (item) => item._id === address.country
                  )?.name
                  const cityName = countries?.map(
                    (country) =>
                      country.cities.find(
                        (item: any) => item._id === address.city
                      )?.name
                  )
                  return (
                    <option
                      key={index}
                      className="selected-billing-address"
                      value={address.id}
                      data-clienttype="Individual"
                      data-firstname={address.name}
                      data-lastname={address.surname}
                      data-streetaddress="hamdi gashi"
                      data-city={address.name}
                      data-country={address.name}
                      data-email={address.email}
                      data-number={address.telephone}
                      data-company=""
                      data-fiscalnumber=""
                    >
                      {address.name + '' + address.surname}, {address.address},{' '}
                      {cityName}, {countryName} ...
                    </option>
                  )
                })}
                <option value="new">Të re</option>
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
                  <div className="edit-address  flex-col gap-4 tablet:grid tablet:grid-cols-2 mb-4">
                    <div className="w-100  flex-col col-span-2 tablet:grid tablet:grid-cols-2">
                      <span className="text-sm font-normal pb-1 text-xs text-gray-700 col-span-2">
                        Ju jeni duke blerë si:
                      </span>
                      <div className="w-100 col-span-1">
                        <div className="d-flex align-items-center  border rounded-3xl w-75">
                          <label
                            htmlFor="person"
                            className={`d-flex align-items-center py-2 justify-content-center flex-grow customer-type rounded-3xl cursor-pointer ${
                              selectedType === 'Person'
                                ? 'border border-primary text-primary'
                                : ''
                            }`}
                          >
                            <input
                              type="radio"
                              id="person"
                              value="Person"
                              checked={selectedType === 'Person'}
                              name="CustomerType"
                              className="cursor-pointer hidden"
                              data-gtm-form-interact-field-id="1"
                              onChange={handleRadioChange}
                            />
                            <label
                              className="cursor-pointer text-sm"
                              htmlFor="individual"
                            >
                              Individ
                            </label>
                          </label>
                          <label
                            htmlFor="bussines"
                            className={`d-flex align-items-center py-2 justify-content-center flex-grow customer-type rounded-3xl cursor-pointer ${
                              selectedType === 'Bussines'
                                ? 'border border-primary text-primary'
                                : ''
                            }`}
                          >
                            <input
                              type="radio"
                              id="bussines"
                              value="Bussines"
                              checked={selectedType === 'Bussines'}
                              name="CustomerType"
                              className="cursor-pointer hidden"
                              data-gtm-form-interact-field-id="2"
                              onChange={handleRadioChange}
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
                    <div
                      className={`inputs ${
                        selectedType === 'Bussines' ? 'd-flex' : 'hidden'
                      } flex-col `}
                    >
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
                    <div
                      className={`inputs ${
                        selectedType === 'Bussines' ? 'd-flex' : 'hidden'
                      } flex-col`}
                    >
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
                            className="add-add-address-button hidden  text-primary text-xs font-semibold hover:underline whitespace-nowrap"
                          >
                            <i className="icon-add-plus text-base font-semibold"></i>
                            Shto një të re
                          </button>
                        </div>
                      </div>
                      <div className="customer-address-field  position-relative">
                        <input
                          type="text"
                          data-val="true"
                          data-val-maxlength="Adresa tejkalon gjatësinë maksimale të lejuar"
                          data-val-maxlength-max="100"
                          data-val-regex="Adresa nuk është në formatin e duhur"
                          data-val-regex-pattern="^[ -ԯ]*$"
                          data-val-required="Hapësira 'Adresa' nuk duhet të jetë e zbrazët!"
                          className="w-100"
                          id="BillingNewAddress_Address1"
                          name="BillingNewAddress.Address1"
                          // value=""
                          placeholder="Adresa"
                        />
                      </div>
                      <span
                        className="field-validation-valid"
                        data-valmsg-for="BillingNewAddress.Address1"
                        data-valmsg-replace="true"
                      ></span>
                    </div>

                    <div className="inputs d-flex flex-col">
                      <div className="d-flex text-xs text-gray-700 pb-1.5">
                        <label htmlFor="BillingNewAddress_Email">E-mail</label>
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
                          className="w-100"
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
                          className="w-100"
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
          className="new-address-next-step-button btn btn-primary btn-primary-hover mt-3 shadow-sm"
          // onclick="Billing.save(); sendSelectedAddressEvent('invoice')"
          onClick={() =>
            handleContinue(sameAddress ? 'opc-shipping_method' : 'opc-shipping')
          }
        >
          Vazhdo
        </button>
        <div
          id="billing-please-wait"
          className="w-100 justify-content-center align-items-center hidden text-xs"
          style={{ display: 'none' }}
        >
          Duke u ngarkuar hapi i ardhshëm ...
          <span className="please-wait ml-2"></span>
        </div>
      </div>
    </>
  )
}

export default OpcBilling
