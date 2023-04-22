import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  products: [],
  error: '',
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
});
