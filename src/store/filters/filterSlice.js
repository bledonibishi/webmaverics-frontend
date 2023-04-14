import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: [
    {
      filterName: "",
      value: "",
    },
  ],
  reducers: {
    setFilter: (state, action) => {
      return "Set filter method";
    },
  },
});

export const { setFilter } = filtersSlice.actions;

export default filtersSlice.reducer;
