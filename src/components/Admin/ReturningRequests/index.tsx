import PaginationComponent from '@/helpers/Pagination'
import { Image, formatDateToDDMMYYYY } from '@/helpers/helpers'
import { ReturnRequest } from '@/helpers/types'
import {
  useGetAllQuery,
  useGetAllWithUserQuery,
  useUpdateStatusMutation,
} from '@/store/returnRequests/returnRequestAPI'
import LoadingBar from '@/ui/Loading/LoadingBar'
import WrapperWIthSpacing from '@/ui/WrapperWIthSpacing'
import WrappingCard from '@/ui/WrappingCard'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const ReturningRequests = () => {
  const [loading, setLoading] = useState(false)
  const { data, error, isLoading, refetch } = useGetAllQuery()
  const [updateStatus] = useUpdateStatusMutation()
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
  const currentRequests = data?.slice(indexOfFirstOrder, indexOfLastOrder)

  const updateStatusHandler = async (e: any, id: string, action: string) => {
    e.preventDefault()
    setLoading(true)

    try {
      console.log('Before API call')
      const response = await updateStatus({ id, action })

      if ('error' in response) {
        console.error('Error response:', response.error)
      } else if (
        'data' in response &&
        'status' in response.data &&
        'message' in response.data
      ) {
        if (response.data?.status === 'success') {
          refetch()
          setLoading(false)
          // toast.success(response.data?.message);
        } else {
          console.error('Unexpected success response:', response.data)
          // Handle unexpected success cases
        }
      }
    } catch (error) {
      console.log('Error during API call:', error)
    } finally {
      console.log('Finally block')
      // setLoading(false)
    }
  }

  return (
    <WrapperWIthSpacing>
      <div className="page-title-top mb-3 md:mb-6 page-title pointer-events-none w-100 text-start md:text-left text-primary text-lg font-medium">
        Return requests
      </div>

      <div className="page account-page return-request-list-page rounded">
        <div className="page-body d-flex flex-col gap-4 -mb-4">
          {currentRequests?.map((item: ReturnRequest, index: number) => (
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
                    <span
                      className={`${item.returningStatus} font-medium d-flex align-items-center justify-content-center`}
                    >
                      {!loading ? (
                        item.returningStatus
                      ) : (
                        <LoadingBar height="10px" size={10} />
                      )}
                    </span>
                  </li>
                </ul>
                <div className="toggle-return-order-details w-25 d-flex justify-content-between align-items-center tablet:flex items-baseline cursor-pointer">
                  <div className="d-flex align-items-center w-75">
                    <a
                      href=""
                      onClick={(e) =>
                        updateStatusHandler(e, item._id, 'approve')
                      }
                      className="pr-2 approved"
                    >
                      Approve
                    </a>
                    <a
                      href=""
                      onClick={(e) => updateStatusHandler(e, item._id, 'deny')}
                      className="pr-2 rejected"
                    >
                      Deny
                    </a>
                    <a
                      href=""
                      onClick={(e) =>
                        updateStatusHandler(e, item._id, 'setPending')
                      }
                      className="pending"
                    >
                      Pending
                    </a>
                  </div>
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
                    className="w-100 d-flex align-items-center justify-content-end items-baseline gap-2 text-center text-gray-700 hover:text-primary btn-simple capitalize"
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
                      <div className="font-semibold text-sm tablet:text-base d-flex flex-col whitespace-nowrap">
                        <div>35.50 €</div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ))}
          {currentRequests?.length ? (
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
      </div>
    </WrapperWIthSpacing>
  )
}

export default ReturningRequests
