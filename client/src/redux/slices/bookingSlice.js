import { createBookingRequest } from "@/services/bookingsApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const createBookingFunction = createAsyncThunk(
  "createBooking",
  async (postData, thunkAPI) => {
    try {
      const response = await createBookingRequest(postData);
      // console.log("response from createEventFunction", response);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(`Error! ${error.message || error}`);
    }
  },
);

export const bookingSlice = createSlice({
  name: "bookingSlice",
  initialState: {
    loading: false,
    error: null,
    bookedTickets: [],
  },
  extraReducers: (builder) => {
    builder
      //CREATE EVENT (createBookingFunction)
      .addCase(createBookingFunction.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBookingFunction.fulfilled, (state, action) => {
        (state.loading = false),
          (state.bookedTickets = action.payload),
          (state.error = null);
      })
      .addCase(createBookingFunction.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload);
      });
  },
});

export default bookingSlice.reducer;
