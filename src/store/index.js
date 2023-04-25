import { configureStore } from '@reduxjs/toolkit'

import todosReducer from './todos/todoSlice'
import filtersSlice from './filters/filterSlice'
import productSlice from './products/productSlice'
import authSlice from './auth/authSlice'

// Automatically adds the thunk middleware and the Redux DevTools extension
const store = configureStore({
  // Automatically calls `combineReducers`
  reducer: {
    todos: todosReducer,
    filters: filtersSlice,
    products: productSlice,
    auth: authSlice,
  },
})

export default store
