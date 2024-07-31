import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./slices/AuthSlice";
import ProductSlice from "./slices/ProductSlice";

const store = configureStore({
  reducer: {
    auth: AuthSlice,
    product: ProductSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
