import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { productsAPI } from './products/RTKProductSlice'
import { cartsAPI } from '../Cart/store/cartAPI'
import { wishlistsAPI } from '@/wishlist/store/wishlistAPI'
import { returnRequestsAPI } from './returnRequests/returnRequestAPI'
import productSlice from './products/productSlice'
import authSlice from './auth/authSlice'
import wishlistSlice from '@/wishlist/store/wishlistSlice'
import cartSlice from '@/Cart/store/cartSlice'
import addressesSlice from './addresses/addressesSlice'
import orderSlice from './orders/orderSlice'

const rootReducer = combineReducers({
  products: productSlice,
  auth: authSlice,
  form: formReducer,
  cart: cartSlice,
  wishlist: wishlistSlice,
  address: addressesSlice,
  orders: orderSlice,
  [productsAPI.reducerPath]: productsAPI.reducer,
  [cartsAPI.reducerPath]: cartsAPI.reducer,
  [wishlistsAPI.reducerPath]: wishlistsAPI.reducer,
  [returnRequestsAPI.reducerPath]: returnRequestsAPI.reducer,
})

export default rootReducer
