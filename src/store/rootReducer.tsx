import productSlice from './products/productSlice'
import authSlice from './auth/authSlice'
import wishlistSlice from '@/wishlist/store/wishlistSlice'
import { combineReducers } from 'redux'
import { productsAPI } from './products/RTKProductSlice'
import { cartsAPI } from '../Cart/store/cartAPI'
import { reducer as formReducer } from 'redux-form'
import cartSlice from '@/Cart/store/cartSlice'
import { wishlistsAPI } from '@/wishlist/store/wishlistAPI'
import addressesSlice from './addresses/addressesSlice'
import orderSlice from './orders/orderSlice'

const rootReducer = combineReducers({
  // todos: todosReducer,
  // filters: filtersSlice,
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
})

export default rootReducer
