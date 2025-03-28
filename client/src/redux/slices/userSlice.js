import { getAllUserDetailsRequest } from "@/services/userApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const allUserDetailsFunction = createAsyncThunk(
    "allUsersData",
    async (thunkAPI) => {
        try {
            const response = await getAllUserDetailsRequest();

            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(`Error! ${error.message || error}`);
        }
    }
);

export const userSlice = createSlice({
    name: "userSlice",
    initialState: {
        loading: false,
        error: null,
        data: [],
    },
    extraReducers: (builder) => {
        builder
            .addCase(allUserDetailsFunction.pending, (state, action) => {
                state.loading = true;
            })

            .addCase(allUserDetailsFunction.fulfilled, (state, action) => {
                (state.loading = false), (state.data = action.payload);
            })

            .addCase(allUserDetailsFunction.rejected, (state, action) => {
                (state.loading = false), (state.error = action.payload);
            });
    },
});

export default userSlice.reducer;
