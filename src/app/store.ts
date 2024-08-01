import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./slices/AuthSlice";
import ProductSlice from "./slices/ProductSlice";
import CartSlice from "./slices/CartSlice";

const store = configureStore({
  reducer: {
    auth: AuthSlice,
    product: ProductSlice,
    cart: CartSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
