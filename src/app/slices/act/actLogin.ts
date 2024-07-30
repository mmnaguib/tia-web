import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ILoginFormData, TLoginResponse } from "../../../interfaces";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";

type TRejected = {
  rejectValue: string;
};
const actAuthLogin = createAsyncThunk<
  TLoginResponse,
  ILoginFormData,
  TRejected
>("auth/actAuthLogin", async (formData: ILoginFormData, thunk) => {
  const { rejectWithValue } = thunk;
  try {
    const res = await axios.post<TLoginResponse>("/login", formData);
    return res.data;
  } catch (error) {
    return rejectWithValue(axiosErrorHandler(error));
  }
});

export default actAuthLogin;
