interface CartItemProduct {
  product: {
    discount: number
    price: number
    priceDiscount: number
  }
  quantity: number
}

const CalculateTotalPrice = (items: CartItemProduct[] | undefined) => {
  const VAT_RATE = 0.18

  console.log('items', items)

  const priceAfterDiscount = items?.reduce(
    (totalPrice: number, cartItem: CartItemProduct) => {
      const discountPercentage = cartItem.product.discount || 0
      const originalPrice = cartItem.product.price
      const discountedPrice =
        originalPrice - (originalPrice * discountPercentage) / 100
      return totalPrice + discountedPrice
    },
    0
  )

  const discountValueInEuros = items?.reduce(
    (totalDiscountInEuros: number, cartItem: CartItemProduct) => {
      const discountPercentage = cartItem.product.discount || 0
      const originalPrice = cartItem.product.price
      const discountedPrice =
        originalPrice - (originalPrice * discountPercentage) / 100
      const discountInEuros = originalPrice - discountedPrice
      return totalDiscountInEuros + discountInEuros
    },
    0
  )

  const totalTvsh = items
    ? items?.reduce((total: number, cartItem: CartItemProduct) => {
        return (
          total + cartItem.product.priceDiscount * cartItem.quantity * VAT_RATE
        )
      }, 0)
    : 0

  const totalPriceWithVAT = items?.reduce(
    (total: number, cartItem: CartItemProduct) => {
      return total + cartItem.product.priceDiscount * cartItem.quantity
    },
    0
  )

  const totalPriceWithoutVAT = items
    ? items.reduce((total: number, cartItem: CartItemProduct) => {
        const itemPrice = cartItem.product.price * cartItem.quantity
        return total + itemPrice
      }, 0)
    : 0

  const discountedTotalPriceWithoutVAT = totalPriceWithoutVAT - totalTvsh

  return {
    totalPriceWithoutVAT,
    totalPriceWithVAT,
    totalTvsh,
    discountValueInEuros,
    priceAfterDiscount,
    discountedTotalPriceWithoutVAT,
  }
}

export { CalculateTotalPrice }
