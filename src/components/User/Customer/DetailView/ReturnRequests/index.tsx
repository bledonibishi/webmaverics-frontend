import { Image, formatDateToDDMMYYYY } from '@/helpers/helpers'
import { useGetAllWithUserQuery } from '@/store/returnRequests/returnRequestAPI'
import WrappingCard from '@/ui/WrappingCard'
import React, { useState } from 'react'
import './style.css'

const ReturnRequests = () => {
  const { data, error, isLoading } = useGetAllWithUserQuery()
  const [details, setDetails] = useState(
    Array(data?.length).fill({ state: false })
  )
  console.log('getAllWithUser', data)
  return (
    <>
      <WrappingCard marginBtm="20px" padding="12px">
        <div className="account-details-page-title account-details-container  tablet:mb-6">
          Kërkesat për kthim
        </div>
      </WrappingCard>
      <div className="page account-page return-request-list-page rounded">
        <div className="page-body d-flex flex-col gap-4 -mb-4">
          {data?.map((item, index) => (
            <div
              key={index}
              className="section request-item details position-relative rounded bg-white rounded shadow-md text-sm font-medium text-gray-700"
            >
              <div className="w-100 d-flex justify-content-between align-items-center p-2 tablet:p-4">
                <ul className="d-flex flex-col text-xs tablet:text-sm">
                  <li className="d-flex gap-2">
                    <label className="text-gray-600">Kërkesa:</label>
                    <span className="font-medium">{item.requestId}</span>
                  </li>
                  <li className="d-flex gap-2">
                    <label className="text-gray-600">Data e kërkesës:</label>
                    <span className="font-medium">
                      {formatDateToDDMMYYYY(item.requestDate)}
                    </span>
                  </li>
                  <li className="d-flex gap-2">
                    <label className="text-gray-600">Statusi:</label>
                    <span className="text-yellow-status font-medium">
                      {item.returningStatus}
                    </span>
                  </li>
                </ul>
                <div className="toggle-return-order-details tablet:flex items-baseline cursor-pointer">
                  <a
                    onClick={() =>
                      setDetails((prevDetails) => {
                        const newDetails = [...prevDetails]
                        newDetails[index] = {
                          ...newDetails[index],
                          state: !newDetails[index]?.state,
                        }
                        return newDetails
                      })
                    }
                    className="w-100 d-flex items-baseline gap-2 text-center text-gray-700 hover:text-primary btn-simple capitalize"
                  >
                    <span className="">Detajet</span>
                    {details[index] && details[index].state ? (
                      <i className="fas text-xs fa-chevron-up"></i>
                    ) : (
                      <i className="fas text-xs fa-chevron-down"></i>
                    )}
                  </a>
                </div>
              </div>
              {details[index] &&
                details[index].state &&
                item.productsDetails.map((product) => (
                  <div
                    className={`return-order-details border-t ${
                      details[index] && details[index].state
                        ? 'slidedown'
                        : 'slideup'
                    }`}
                  >
                    <div className=" p-3 tablet:p-4 d-flex gap-2 tablet:gap-0 tablet:justify-between">
                      <div className="d-flex align-items-start gap-2 tablet:gap-4 overflow-hidden">
                        <div
                          title="Karikues HP, Smart Adapter, 65W"
                          className="d-flex items-center justify-center rounded tablet:w-16 tablet:h-16 w-10 h-10 bg-white p-1 border border-gray-300"
                        >
                          <a
                            href="karikues-hp-65w"
                            className="w-100 h-100 d-flex justify-content-center align-items-center rounded col-span-1 overflow-hidden"
                            style={{ minWidth: '40px' }}
                          >
                            <Image
                              src={
                                product.product.imageCover
                                  ? product.product.imageCover
                                  : ''
                              }
                              alt="productImage"
                              className="max-h-full max-w-full"
                            />
                          </a>
                        </div>
                        <ul className="text-xs d-flex flex-col overflow-hidden">
                          <li className="text-sm font-medium mb-2 truncate">
                            <a href="karikues-hp-65w">
                              {product.product.title}
                            </a>
                          </li>
                          <li className="d-flex gap-1 overflow-hidden">
                            <label className="text-gray-600 whitespace-nowrap">
                              Arsyeja e kthimit:
                            </label>
                            <span className="font-medium truncate">
                              Kam ndërruar mendjeKam ndërruar mendje
                            </span>
                          </li>
                          <li className="d-flex gap-1 overflow-hidden">
                            <label className="whitespace-nowrap text-gray-600">
                              Veprimi i kthimit:
                            </label>
                            <span className="font-medium">Kthim</span>
                          </li>
                          <li className="d-flex gap-1">
                            <label className="whitespace-nowrap text-gray-600">
                              Sasia:
                            </label>
                            <span className="font-medium">1</span>
                          </li>
                        </ul>
                      </div>
                      <div className="font-semibold text-sm tablet:text-base whitespace-nowrap">
                        35.50 €
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>
        <div className="pager mt-4">
          <div className="d-flex flex-col tablet:flex-wrap gap-4 tablet:flex-row tablet:justify-between bg-white rounded shadow-md p-3 md:p-4 text-base">
            <ul className="d-flex items-center"></ul>
            <div className="hidden tablet:flex gap-2 tablet:gap-4 items-center">
              <form
                method="get"
                id="page-size-form"
                className="d-flex gap-2"
                action=""
              >
                <select
                  className="mr-1 hidden"
                  id="option-select"
                  data-val="true"
                  data-val-required="The PageSize field is required."
                  name="PageSize"
                >
                  <option value="5">5</option>
                  <option value="7">7</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                </select>
                <div className="select rounded d-flex items-center">
                  <div
                    className="selectCustom select js-selectCustom d-flex items-center"
                    style={{
                      paddingLeft: '4px',
                      paddingRight: '0',
                      height: '28px',
                      width: '52px',
                    }}
                  >
                    <div
                      className="selectCustom-trigger d-flex justify-content-between items-center text-sm text-gray-700 bg-white font-medium filter-products-categories"
                      style={{ height: '24px', width: '32px' }}
                    >
                      <span>7</span>
                      <i className="icon-chevron-line-down text-base text-gray-600 pl-1"></i>
                    </div>
                    <div
                      className="selectCustom-options bg-white shadow-md"
                      style={{ top: '44px' }}
                    >
                      <div
                        className="selectCustom-option sort-options bg-white text-sm font-medium d-flex justify-center text-gray-600 light-dropdown-hover"
                        data-value="5"
                        data-text="5"
                      >
                        5
                      </div>
                      <div
                        className="selectCustom-option sort-options bg-white text-sm font-medium d-flex justify-center text-gray-600 light-dropdown-hover"
                        data-value="7"
                        data-text="7"
                      >
                        7
                      </div>
                      <div
                        className="selectCustom-option sort-options bg-white text-sm font-medium d-flex justify-center text-gray-600 light-dropdown-hover"
                        data-value="10"
                        data-text="10"
                      >
                        10
                      </div>
                      <div
                        className="selectCustom-option sort-options bg-white text-sm font-medium d-flex justify-center text-gray-600 light-dropdown-hover"
                        data-value="20"
                        data-text="20"
                      >
                        20
                      </div>
                      <div
                        className="selectCustom-option sort-options bg-white text-sm font-medium d-flex justify-center text-gray-600 light-dropdown-hover"
                        data-value="50"
                        data-text="50"
                      >
                        50
                      </div>
                    </div>
                  </div>
                </div>
              </form>
              <p className="total-summary w-100 text-sm whitespace-nowrap">
                Kërkesat 1-1 prej 1 në total.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ReturnRequests
