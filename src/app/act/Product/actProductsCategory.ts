import { createAsyncThunk } from "@reduxjs/toolkit";
import { IProduct, TRejected } from "../../../interfaces";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";
import Axiosinstance from "../../../config/axiosInstanse";

const actProductsCategory = createAsyncThunk<IProduct[], string, TRejected>(
  "product/actProductsCategory",
  async (categoryName: string, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      const res = await Axiosinstance.get<IProduct[]>(
        `/catProducts?categoryName=${categoryName}`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actProductsCategory;
