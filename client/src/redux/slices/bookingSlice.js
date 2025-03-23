import {
    createBookingRequest,
    getBookingDetailsRequest,
} from "@/services/bookingsApi";
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
    }
);

export const getBookingDetailsFunction = createAsyncThunk(
    "getBookingDetails",
    async (thunkAPI) => {
        try {
            const response = await getBookingDetailsRequest();

            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(`Error! ${error.message || error}`);
        }
    }
);

export const bookingSlice = createSlice({
    name: "bookingSlice",
    initialState: {
        loading: false,
        error: null,
        lastBookedTickets: [],
        allBookings: [],
    },
    extraReducers: (builder) => {
        builder
            //CREATE EVENT (createBookingFunction)
            .addCase(createBookingFunction.pending, (state) => {
                state.loading = true;
            })
            .addCase(createBookingFunction.fulfilled, (state, action) => {
                (state.loading = false),
                    (state.lastBookedTickets = action.payload),
                    (state.error = null);
            })
            .addCase(createBookingFunction.rejected, (state, action) => {
                (state.loading = false), (state.error = action.payload);
            })

            // GET Single user Bookings (getBookingDetailsFunction)
            .addCase(getBookingDetailsFunction.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getBookingDetailsFunction.fulfilled, (state, action) => {
                state.loading = false;
                state.allBookings = action.payload;
            })
            .addCase(getBookingDetailsFunction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default bookingSlice.reducer;
