import { createAsyncThunk } from "@reduxjs/toolkit";
import { IProduct, TRejected } from "../../../interfaces";
import axios from "axios";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";

const actProduct = createAsyncThunk<
  IProduct,
  number | string | undefined,
  TRejected
>("product/actProduct", async (id: number | string | undefined, thunk) => {
  const { rejectWithValue } = thunk;
  try {
    const res = await axios.get<IProduct>(
      `http://localhost:5000/products/${id}`
    );
    return res.data;
  } catch (error) {
    return rejectWithValue(axiosErrorHandler(error));
  }
});

export default actProduct;
