import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthState, TLoginResponse } from "../../interfaces";
import actAuthLogin from "./act/actLogin";
import actAuthRegister from "./act/actRegister";

const initialState: IAuthState = {
  user: null,
  accessToken: null,
  loading: "idle",
  error: null,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetUI: (state) => {
      state.loading = "idle";
      state.error = null;
    },
    authLogout: (state) => {
      state.user = null;
      state.accessToken = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actAuthLogin.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(
      actAuthLogin.fulfilled,
      (state, action: PayloadAction<TLoginResponse>) => {
        (state.loading = "succeed"), (state.user = action.payload.user);
        state.accessToken = action.payload.accessToken;
      }
    );
    builder.addCase(
      actAuthLogin.rejected,
      (state, action: PayloadAction<string | undefined>) => {
        state.loading = "failed";
        state.error = action.payload || "An unexpected error occurred";
      }
    );

    builder.addCase(actAuthRegister.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(actAuthRegister.fulfilled, (state) => {
      state.loading = "succeed";
    });
    builder.addCase(
      actAuthRegister.rejected,
      (state, action: PayloadAction<string | undefined>) => {
        state.loading = "failed";
        state.error = action.payload || "An unexpected error occurred";
      }
    );
  },
});
export const { resetUI, authLogout } = AuthSlice.actions;
export default AuthSlice.reducer;
