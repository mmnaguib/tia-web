import { createAsyncThunk } from "@reduxjs/toolkit";
import { IProduct, TRejected } from "../../../interfaces";
import axios from "axios";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";

const actProducts = createAsyncThunk<IProduct[], void, TRejected>(
  "product/actProducts",
  async (_, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      const res = await axios.get<IProduct[]>("http://localhost:3005/products");
      return res.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actProducts;
