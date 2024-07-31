import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IRegisterFormData, TRejected } from "../../../interfaces";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";

const actAuthRegister = createAsyncThunk<unknown, IRegisterFormData, TRejected>(
  "auth/actAuthRegister",
  async (formData: IRegisterFormData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post("/register", formData);
      return res.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actAuthRegister;
