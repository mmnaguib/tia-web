import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICartState, IProduct } from "../../interfaces";
import { addItemToCart } from "../../utils/cartFunction";

const initialState: ICartState = {
  items: localStorage.getItem("items")
    ? (JSON.parse(localStorage.getItem("items") as string) as IProduct[])
    : [],
};
// existing code

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
      state.items = state.items.filter((item) => item._id !== action.payload);
      localStorage.setItem("items", JSON.stringify(state.items));
    },
    updateProductQuantity: (
      state,
      action: PayloadAction<{ id: number | string; quantity: number }>
    ) => {
      const item = state.items.find((item) => item._id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
        localStorage.setItem("items", JSON.stringify(state.items));
      }
    },
  },
});

export const {
  addProductToCart,
  removeProductFromCart,
  updateProductQuantity,
} = CartSlice.actions;
export default CartSlice.reducer;
