import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
//   {
//     title: "",
//     price: 0,
//     priceDiscount: 0,
//     ratingsAverage: 0,
//     ratingsQuantity: 0,
//     summary: "",
//     description: "",
//     imageCoveer: "",
//     images: [],
//     details: [{}],
//   },

const initialState = {
  loading: false,
  products: [],
  error: "",
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    try {
      const response = await axios
        .get("/api/v1/products")
        .then((response) => response.data.data.products);

      // console.log("products", response);
      return response;
    } catch (err) {
      console.log("err", err);
    }
  }
);

export const getProductWithId = createAsyncThunk(
  "products/getProductWithId",
  async (id) => {
    try {
      console.log("id", id);
      const response = await axios
        .get(`/api/v1/products/${id}`)
        .then((res) => res.data.product);

      console.log("response", response);

      return response;
    } catch (err) {
      console.log("err", err);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.error = "";
      })
      .addCase(fetchProducts.rejected, (action, state) => {
        state.loading = false;
        state.products = [];
        state.error = action.error.message;
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        (state, action) => {
          state.loading = false;
          if (action.type === getProductWithId.fulfilled.type) {
            state.products = [action.payload];
          } else {
            state.products = action.payload;
          }
          state.error = "";
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.products = [];
          state.error = action.error.message;
        }
      );
  },
});

export default productSlice.reducer;
