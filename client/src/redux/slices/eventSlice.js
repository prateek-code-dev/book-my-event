import { createEventRequest } from "@/services/eventsApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const createEventFunction = createAsyncThunk(
    "createEvent",
    async (postData) => {
        try {
            const response = await createEventRequest(postData);
            // console.log("response from createEventFunction", response);
            return response;
        } catch (error) {
            throw error;
        }
    }
);

export const eventsSlice = createSlice({
    name: "eventsSlice",
    initialState: {
        loading: false,
        error: null,
        lastCreatedEventData: [],
    },
    extraReducers: (builder) => {
        builder
            .addCase(createEventFunction.pending, (state) => {
                state.loading = true;
            })
            .addCase(createEventFunction.fulfilled, (state, action) => {
                (state.loading = false),
                    (state.lastCreatedEventData = action.payload),
                    (state.error = null);
            })
            .addCase(createEventFunction.rejected, (state, action) => {
                (state.loading = false), (state.error = action.payload);
            });
    },
});

export default eventsSlice.reducer;
