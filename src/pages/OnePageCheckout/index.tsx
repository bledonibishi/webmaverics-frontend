import WrapperWIthSpacing from '@/ui/WrapperWIthSpacing'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import OpcBilling from './OpcBilling'
import OpcShippingMethod from './OpcShippingMethod'
import OpcPaymentMethod from './OpcPaymentMethod'
import OpcPaymentInfo from './OpcPaymentInfo'
import { useAppDispatch, useAppSelector } from '@/hooks/hooks'
import {
  useClearCartMutation,
  useGetCartProductsQuery,
} from '@/Cart/store/cartAPI'
import { getCartProducts } from '@/Cart/store/cartSlice'
import { CalculateTotalPrice } from '@/Cart/components/calculateTotalPrice'
import OpcShipping from './OpcShipping'
import OrderDropdown from './orderDropdown'
import { getAllAddresses } from '@/store/addresses/addressesSlice'
import axiosInstance from '@/api/axiosInstance'
import { Address } from '@/helpers/types'
import { createOrder } from '@/store/orders/orderSlice'
import { formatISODateRange1date, generateOrderCode } from '@/helpers/helpers'
import { useStripe } from '@stripe/react-stripe-js'
import Sidebar from './Sidebar'

const OnePageCheckout = () => {
  const dispatch = useAppDispatch()
  const stripe = useStripe()
  const stepRef = useRef(null)
  const navigate = useNavigate()
  const { data: cart, refetch } = useGetCartProductsQuery()
  const [clearCart] = useClearCartMutation()
  const { addresses, loading } = useAppSelector((state) => state.address)
  const [activeStep, setActiveStep] = useState<string>('opc-billing')
  const [stepChanges, setStepChanges] = useState<string[]>([])
  const [selectedAddress, setSelectedAddress] = useState<Address>(addresses[0])
  const [sameAddress, setSameAddress] = useState<boolean>(false)
  const [transportAddress, setTransportAddress] = useState<Address>(
    selectedAddress ?? addresses[0]
  )
  const [shippingMethod, setShippingMethod] = useState<string>(
    'STANDARD - Transport(free)'
  )
  const [paymentMethod, setPaymentMethod] = useState<string>('TEB Bank')

  useEffect(() => {
    dispatch(getAllAddresses())
    dispatch(getCartProducts())
  }, [])

  useEffect(() => {
    if (addresses.length) {
      setSelectedAddress(addresses[0])
    }
  }, [addresses])

  useEffect(() => {
    if (sameAddress) {
      setTransportAddress(selectedAddress)
    }
  }, [sameAddress])

  const handleAddressSelection = (address: string) => {
    const selAddress = addresses.find((item) => item.id === address)
    if (selAddress) {
      setSelectedAddress(selAddress)
    }
  }
  const handleTransportAddress = (address: string) => {
    const selAddress = addresses.find((item) => item.id === address)
    if (selAddress) {
      setTransportAddress(selAddress)
    }
  }

  const totalPriceInfo = CalculateTotalPrice(cart?.products)
  const { totalPriceWithVAT, totalTvsh } = totalPriceInfo

  const handleContinue = (activeStep: string) => {
    setStepChanges([...stepChanges, activeStep])
    setActiveStep(activeStep)
    window.scrollTo({
      top: 100,
      behavior: 'smooth',
    })
  }
  const handleStepChange = (step: string) => {
    setStepChanges(stepChanges.filter((s) => s !== step))
  }

  useEffect(() => {
    const fragment = window.location.hash
    if (fragment) {
      const step = fragment.replace('#', '')
      setActiveStep(step)
    }
  }, [])

  useEffect(() => {
    window.location.hash = `#${activeStep}`
  }, [activeStep])

  useEffect(() => {
    window.addEventListener('popstate', () => {
      const fragment = window.location.hash
      if (fragment) {
        const step = fragment.replace('#', '')
        setActiveStep(step)
      }
    })
  }, [])

  // const createOrderHandler = async () => {
  //   let addressID: string | Address
  //   let billingAddress: string | Address
  //   let totalPrice: number
  //   let transportMode: string

  //   if (totalPriceWithVAT) {
  //     totalPrice = totalPriceWithVAT
  //   } else {
  //     totalPrice = 0
  //   }

  //   if (shippingMethod) {
  //     transportMode = shippingMethod
  //   } else {
  //     transportMode = ''
  //   }

  //   if (selectedAddress) {
  //     addressID = selectedAddress?.id
  //   } else {
  //     addressID = ''
  //   }
  //   if (transportAddress) {
  //     billingAddress = transportAddress?.id
  //   } else {
  //     billingAddress = ''
  //   }

  //   if (cart && cart.products) {
  //     const products = cart.products.map((item) => ({
  //       product: item.product.id,
  //       quantity: item.quantity,
  //     }))
  //     const orderCode = generateOrderCode()

  //     const body = {
  //       products: products.flat(),
  //       status: 'pending',
  //       addressID,
  //       billingAddress,
  //       // addressID: selectedAddress?.id,
  //       transportMode,
  //       paymentMethod: paymentMethod,
  //       arrivalDate: '2023-11-8',
  //       totalOrderPrice: totalPrice,
  //       transportModeStatus: 'Nuk është transportuar ende',
  //       paymentMethodStatus: 'Në pritje',
  //       tvsh: totalTvsh,
  //       orderCode: orderCode,
  //     }

  //     try {
  //       if (body.paymentMethod === 'Paguaj me para në dorë') {
  //         const response = await dispatch(createOrder(body))
  //         if (response.meta.requestStatus === 'fulfilled') {
  //           clearCart({})
  //           refetch()
  //           navigate('/checkout/completed', {
  //             state: { orderResponse: response },
  //           })
  //         }
  //       } else {
  //         // if (!stripe || !elements) {
  //         //   return
  //         // }

  //         const session = await axiosInstance.post(
  //           `api/v1/payments/checkout-session`,
  //           body
  //         )

  //         await stripe.redirectToCheckout({
  //           sessionId: session.data.session.id,
  //         })
  //       }
  //     } catch (error) {
  //       console.log('error', error)
  //     }
  //   } else {
  //   }
  // }
  const createOrderHandler = async () => {
    try {
      const totalPrice = totalPriceWithVAT || 0
      const transportMode = shippingMethod || ''
      const addressID = selectedAddress?.id || ''
      const billingAddress = transportAddress?.id || ''

      if (!cart || !cart.products) {
        return
      }

      const products = cart.products.map((item) => ({
        product: item.product.id,
        quantity: item.quantity,
      }))

      const orderCode = generateOrderCode()

      const body = {
        products: products.flat(),
        status: 'pending',
        addressID,
        billingAddress,
        transportMode,
        paymentMethod: paymentMethod,
        arrivalDate: formatISODateRange1date(2),
        totalOrderPrice: totalPrice,
        transportModeStatus: 'Nuk është transportuar ende',
        paymentMethodStatus: 'Në pritje',
        tvsh: totalTvsh,
        orderCode,
      }

      if (body.paymentMethod === 'Paguaj me para në dorë') {
        const response = await dispatch(createOrder(body))

        if (response.meta.requestStatus === 'fulfilled') {
          clearCart({})
          refetch()
          navigate('/checkout/completed', {
            state: { orderResponse: response },
          })
        }
      } else {
        const session = await axiosInstance.post(
          `api/v1/payments/checkout-session`,
          body
        )

        await stripe.redirectToCheckout({
          sessionId: session.data.session.id,
        })
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <WrapperWIthSpacing>
      <div className="page-title-top mb-3 md:mb-6 page-title pointer-events-none w-100 text-start md:text-left text-primary text-lg font-medium">
        Blerje e sigurtë
      </div>
      <div className="position-relative">
        <div className="center-3" ref={stepRef}>
          <div className="d-flex md:flex-row flex-col">
            <div className="page checkout-page flex-grow">
              <div className="page-body checkout-data mb-5">
                <ol className="opc rounded" id="checkout-steps">
                  <OrderDropdown
                    number={1}
                    isActive={activeStep === 'opc-billing'}
                    title="Adresa e faturimit"
                    urlLink="opc-billing"
                    isChangable={stepChanges.includes('opc-billing')}
                    onChange={handleStepChange}
                  >
                    <OpcBilling
                      handleContinue={handleContinue}
                      selectedAddress={selectedAddress}
                      handleAddressSelection={handleAddressSelection}
                      setSameAddress={setSameAddress}
                      sameAddress={sameAddress}
                      setSelectedAddress={setSelectedAddress}
                    />
                  </OrderDropdown>
                  <OrderDropdown
                    number={2}
                    isActive={activeStep === 'opc-shipping'}
                    title="Transport address"
                    urlLink="opc-shipping"
                    isChangable={stepChanges.includes('opc-shipping')}
                    onChange={handleStepChange}
                  >
                    <OpcShipping
                      handleContinue={handleContinue}
                      handleTransportAddress={handleTransportAddress}
                      transportAddress={transportAddress}
                      setTransportAddress={setTransportAddress}
                    />
                  </OrderDropdown>
                  <OrderDropdown
                    isActive={activeStep === 'opc-shipping_method'}
                    number={3}
                    urlLink="opc-shipping_method"
                    title="Address method"
                    isChangable={stepChanges.includes('opc-shipping_method')}
                    onChange={handleStepChange}
                  >
                    <OpcShippingMethod
                      handleContinue={handleContinue}
                      setShippingMethod={setShippingMethod}
                      shippingMethod={shippingMethod}
                    />
                  </OrderDropdown>
                  <OrderDropdown
                    number={4}
                    isActive={activeStep === 'opc-payment_method'}
                    title="Payment method"
                    urlLink="opc-payment_method"
                    isChangable={stepChanges.includes('opc-payment_method')}
                    onChange={handleStepChange}
                  >
                    <OpcPaymentMethod
                      handleContinue={handleContinue}
                      paymentMethod={paymentMethod}
                      setPaymentMethod={setPaymentMethod}
                    />
                  </OrderDropdown>
                  <OrderDropdown
                    number={5}
                    isActive={activeStep === 'opc-payment_info'}
                    title="Address and payment info"
                    urlLink="opc-payment_info"
                    isChangable={stepChanges.includes('opc-payment_info')}
                    onChange={handleStepChange}
                  >
                    <OpcPaymentInfo
                      handleContinue={handleContinue}
                      paymentMethod={paymentMethod}
                      createOrderHandler={createOrderHandler}
                    />
                  </OrderDropdown>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <Sidebar
          cart={cart}
          selectedAddress={selectedAddress}
          transportAddress={transportAddress}
          paymentMethod={paymentMethod}
          shippingMethod={shippingMethod}
        />
      </div>
    </WrapperWIthSpacing>
  )
}

export default OnePageCheckout
