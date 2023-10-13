import { configureStore } from '@reduxjs/toolkit'
import { productsAPI } from './products/RTKProductSlice'
// import { cartsAPI } from '../Cart/store/cartAPI'
// import { wishlistsAPI } from '../wishlist/store/wishlistAPI'
import rootReducer from '@/store/rootReducer'
import { cartsAPI } from '@/Cart/store/cartAPI'

// Automatically adds the thunk middleware and the Redux DevTools extension
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      productsAPI.middleware,
      cartsAPI.middleware
      //     wishlistsAPI.middleware
    )
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
