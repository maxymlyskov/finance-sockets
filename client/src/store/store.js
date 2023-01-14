import { configureStore } from "@reduxjs/toolkit";
import tickersSlice from "./slices/tickersSlice";

export const store = configureStore({
  reducer: {
    tickers: tickersSlice,
  },
});
