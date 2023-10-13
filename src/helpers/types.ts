export type Product = {
  id: string
  title: string
  rating: number
  ratingsAverage: number
  ratingsQuantity: number
  brand: string
  details: []
  summary: string
  description: string
  imageCover: string
  images: []
  price: number
  category: string
  stock: number
  priceDiscount: number
  thumbnail: string
  productDetails: []
}

export type User = {
  refreshToken: string
  status: string
  token: string
  user: {
    name: string
    surname: string
    gender: string
    country: string
    cart: string
    city: string
    email: string
    id: string
    photo: string
    role: string
    wishlist?: string
    birthYear: number
    birthMonth: number
    birthDay: number
  }
}

export type SignupUserData = {
  name: string
  surname: string
  gender: string
  country: string
  city: string
  email: string
  password: string
  passwordConfirm: string
  birthYear: number
  birthMonth: number
  birthDay: number
}
export type LoginUserData = {
  email: string
  password: string
}

export type CartItemProduct = {
  product: Product
  quantity: number
  price: number
}

export type CartItem = {
  status: string
  results: number
  products: CartItemProduct[]
}

export type addToCartType = {
  productId: string
  quantity: number
  price: number
}

export type ProductItemTypes = {
  category: string
  description: string
  details: []
  id: string
  imageCover: string
  images: []
  price: number
  priceDiscount: number
  ratingsAverage: number
  ratingsQuantity: number
  stock: number
  summary: string
  title: string
}
