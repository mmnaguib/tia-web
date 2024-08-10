import { createAsyncThunk } from "@reduxjs/toolkit";
import { IProduct, TRejected } from "../../../interfaces";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";
import Axiosinstance from "../../../config/axiosInstanse";

const actProduct = createAsyncThunk<
  IProduct,
  number | string | undefined,
  TRejected
>("product/actProduct", async (id: number | string | undefined, thunk) => {
  const { rejectWithValue } = thunk;
  try {
    const res = await Axiosinstance.get<IProduct>(`/products/${id}`);
    return res.data;
  } catch (error) {
    return rejectWithValue(axiosErrorHandler(error));
  }
});

export default actProduct;
