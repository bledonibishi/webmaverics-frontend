import { Image, formatDateToDDMMYYYY } from '@/helpers/helpers'
import { useGetAllWithUserQuery } from '@/store/returnRequests/returnRequestAPI'
import WrappingCard from '@/ui/WrappingCard'
import React, { useState } from 'react'
import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faRing } from '@fortawesome/free-solid-svg-icons'
import PaginationComponent from '@/helpers/Pagination'

const ReturnRequests = () => {
  const { data, error, isLoading } = useGetAllWithUserQuery()
  const [details, setDetails] = useState(
    Array(data?.length).fill({ state: false })
  )
  const [currentPage, setCurrentPage] = useState(1)
  const ordersPerPage = 5

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const indexOfLastOrder = currentPage * ordersPerPage
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage
  const currentData = data?.slice(indexOfFirstOrder, indexOfLastOrder)
  return (
    <>
      <WrappingCard marginBtm="20px" padding="12px">
        <div className="account-details-page-title account-details-container  tablet:mb-6">
          Kërkesat për kthim
        </div>
      </WrappingCard>
      <div className="page account-page return-request-list-page rounded">
        {data?.length ? (
          <div className="page-body d-flex flex-col gap-4 -mb-4">
            {currentData?.map((item, index) => (
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
            {currentData?.length ? (
              <WrappingCard padding="12px">
                <div className="w-100 d-flex justify-content-end">
                  <PaginationComponent
                    totalItems={data ? data.length : 0}
                    itemsPerPage={5}
                    onPageChange={handlePageChange}
                  />
                </div>
              </WrappingCard>
            ) : null}
          </div>
        ) : (
          <div className="page-body d-flex flex-col gap-4 -mb-4">
            <div className="no-data bg-white rounded shadow-md d-flex flex-col align-items-center justify-content-center px-4 py-5">
              <div className="w-32 h-32 rounded-full bg-gray-100 d-flex align-items-center justify-content-center mb-4">
                <i className="icon-notification text-6xl text-gray-600">
                  <FontAwesomeIcon icon={faBell} />
                </i>
              </div>
              <p className="font-medium text-base tablet:text-lg text-center break-words">
                Ju nuk keni bërë ndonjë kërkesë për njoftim të kthimit të stokut
                të ndonjë produkti.
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default ReturnRequests
