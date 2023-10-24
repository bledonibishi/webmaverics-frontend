export type Product = {
  id: string
  title: string
  rating: number
  ratingsAverage: number
  ratingsQuantity: number
  brand: string
  discount: number
  tfTransport: boolean
  warranty: string
  isNew: boolean
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
  discount: number
  tfTransport: boolean
  isNew: boolean
  warranty: string
  stock: number
  summary: string
  title: string
}

export type Address = {
  id: string
  type: string
  name: string
  surname: string
  company?: string
  fiscalNumber?: string
  country: string
  city: string
  address: string
  email: string
  telephone: string
}
export type CreateAddress = {
  type: string
  name: string
  surname: string
  company?: string
  fiscalNumber?: string
  country: string
  city: string
  address: string
  email: string
  telephone: string
}

export type Rating = {
  title: string
  userID: string | SignupUserData
  productID: string | Product
  description: string
  rating: number
  createdAt: Date
  updatedAt: Date
}
export type RatingInput = {
  title: string
  userID: string | SignupUserData
  productID: string | Product
  description?: string
  rating: number
}

export type ChangePasswordInput = {
  passwordCurrent: string
  password: string
  passwordConfirm: string
}

export type AuthPromise = {
  status: string
  token: string
  refreshToken: string
  user: SignupUserData
}

export type OrderProduct = {
  productID: string | Product
  quantity: number
}

export type Order = {
  _id: string
  userID: string | SignupUserData
  products: OrderProduct[]
  status: 'pending' | 'processed' | 'completed' | 'admin'
  addressID: string | Address
  transportMode: string
  paymentMethod: string
  comments: string | null
  orderDate: string
  arrivalDate: string
  orderCode: string
  createdAt: string
  updatedAt: string
}
