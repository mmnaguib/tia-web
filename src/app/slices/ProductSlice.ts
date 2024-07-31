import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct, IProductsState } from "../../interfaces";
import actProducts from "../act/Product/actProducts";
import actProduct from "../act/Product/actProduct";

const initialState: IProductsState = {
  products: [],
  loading: "idle",
  error: null,
  product: {
    title: "",
    description: "",
    price: "",
    quantity: 0,
    brand: "",
    category: {
      name: "",
      image: "",
    },
    inStock: 0,
    images: [],
    colors: [],
    sizes: [],
    rating: {
      rate: 0,
      count: 0,
    },
  },
};

const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actProducts.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(
      actProducts.fulfilled,
      (state, action: PayloadAction<IProduct[]>) => {
        state.loading = "succeed";
        state.products = action.payload;
      }
    );
    builder.addCase(
      actProducts.rejected,
      (state, action: PayloadAction<string | undefined>) => {
        state.loading = "failed";
        state.error = action.payload || "An unexpected error occurred";
      }
    );

    builder.addCase(actProduct.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(
      actProduct.fulfilled,
      (state, action: PayloadAction<IProduct>) => {
        state.loading = "succeed";
        state.product = action.payload;
      }
    );
    builder.addCase(
      actProduct.rejected,
      (state, action: PayloadAction<string | undefined>) => {
        state.loading = "failed";
        state.error = action.payload || "An unexpected error occurred";
      }
    );
  },
});

export default ProductSlice.reducer;
