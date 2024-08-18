import { createAsyncThunk } from "@reduxjs/toolkit";
import { ILoginFormData, TLoginResponse, TRejected } from "../../../interfaces";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";
import Axiosinstance from "../../../config/axiosInstanse";

const actAuthLogin = createAsyncThunk<
  TLoginResponse,
  ILoginFormData,
  TRejected
>("auth/actAuthLogin", async (formData: ILoginFormData, thunk) => {
  const { rejectWithValue } = thunk;
  try {
    const res = await Axiosinstance.post<TLoginResponse>("/login", formData);
    return res.data;
  } catch (error) {
    return rejectWithValue(axiosErrorHandler(error));
  }
});

export default actAuthLogin;
