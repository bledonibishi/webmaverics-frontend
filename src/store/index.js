import { configureStore } from "@reduxjs/toolkit";

import todosReducer from "./todos/index";

// Automatically adds the thunk middleware and the Redux DevTools extension
const store = configureStore({
  // Automatically calls `combineReducers`
  reducer: {
    todos: todosReducer,
  },
});

export default store;
