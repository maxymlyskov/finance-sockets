import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  saved: [],
};

export const tickersSlice = createSlice({
  name: "tickers",
  initialState,
  reducers: {
    getData: (state, { payload }) => {
      state.data = payload;
    },
    getSaved: (state, { payload }) => {
      state.saved = payload;
    },
  },
});

export const { getData, getSaved } = tickersSlice.actions;

export default tickersSlice.reducer;
