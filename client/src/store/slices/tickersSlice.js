import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

export const tickersSlice = createSlice({
  name: "tickers",
  initialState,
  reducers: {
    getData: (state, { payload }) => {
      state.data = payload;
    },
  },
});

export const { getData } = tickersSlice.actions;

export default tickersSlice.reducer;
