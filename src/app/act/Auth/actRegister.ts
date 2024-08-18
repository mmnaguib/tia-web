import { createAsyncThunk } from "@reduxjs/toolkit";
import { TRejected } from "../../../interfaces";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";
import Axiosinstance from "../../../config/axiosInstanse";

const actAuthRegister = createAsyncThunk<unknown, FormData, TRejected>(
  "auth/actAuthRegister",
  async (formData: FormData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await Axiosinstance.post("/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actAuthRegister;
