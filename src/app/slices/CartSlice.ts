import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICartState, IProduct } from "../../interfaces";
import { addItemToCart } from "../../utils/cartFunction";

const initialState: ICartState = {
  items: localStorage.getItem("items")
    ? (JSON.parse(localStorage.getItem("items") as string) as IProduct[])
    : [],
};
const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart(
      state,
      action: PayloadAction<{ product: IProduct; quantity: number }>
    ) {
      const { product, quantity } = action.payload;
      state.items = addItemToCart(state.items, product, quantity);
      localStorage.setItem("items", JSON.stringify(state.items));
    },

    removeProductFromCart(state, action: PayloadAction<number | string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      localStorage.setItem("items", JSON.stringify(state.items));
    },
  },
});

export const { addProductToCart, removeProductFromCart } = CartSlice.actions;
export default CartSlice.reducer;
