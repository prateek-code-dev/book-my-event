import { loginApiRequest, registerApiRequest } from "@/services/authApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Login Slice
export const loginDispatchFunction = createAsyncThunk(
  "authLogin",
  async (postData, thunkAPI) => {
    try {
      const response = await loginApiRequest(postData);

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(`Error! ${error.message || error}`);
    }
  },
);

export const registerDispatchFunction = createAsyncThunk(
  "authRegister",
  async (postData, thunkAPI) => {
    try {
      const response = await registerApiRequest(postData);

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(`Error! ${error.message || error}`);
    }
  },
);

// Reducer and action

export const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    loading: false,
    error: null,
    data: [],
  },

  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginDispatchFunction.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginDispatchFunction.fulfilled, (state, action) => {
        (state.loading = false),
          (state.data = action.payload),
          (state.error = null);
      })
      .addCase(loginDispatchFunction.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload);
      })

      //Register
      .addCase(registerDispatchFunction.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerDispatchFunction.fulfilled, (state, action) => {
        (state.loading = false),
          (state.data = action.payload),
          (state.error = null);
      })
      .addCase(registerDispatchFunction.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload);
      });
  },
});

export default authSlice.reducer;
