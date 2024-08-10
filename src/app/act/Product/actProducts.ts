import { createAsyncThunk } from "@reduxjs/toolkit";
import { IProduct, TRejected } from "../../../interfaces";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";
import Axiosinstance from "../../../config/axiosInstanse";

const actProducts = createAsyncThunk<IProduct[], void, TRejected>(
  "product/actProducts",
  async (_, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      const res = await Axiosinstance.get<IProduct[]>("/products");
      return res.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actProducts;
