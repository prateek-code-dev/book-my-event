import {
    createEventRequest,
    getAllEventsRequest,
    updateEventRequest,
} from "@/services/eventsApi";
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

export const getAllEventsFunction = createAsyncThunk(
    "getAllEvents",
    async () => {
        try {
            const response = await getAllEventsRequest();

            return response;
        } catch (error) {
            throw error;
        }
    }
);

export const updateEventFunction = createAsyncThunk(
    "updateEvent",
    async ({ postData, id }) => {
        console.log("postData", postData);
        console.log("id", id);
        try {
            const response = await updateEventRequest(postData, id);

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
        allEventsData: [],
        lastUpdatedEvent: [],
    },
    extraReducers: (builder) => {
        builder
            //CREATE EVENT (createEventFunction)
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
            })

            //GET ALL EVENTS (getAllEventsFunction)
            .addCase(getAllEventsFunction.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getAllEventsFunction.fulfilled, (state, action) => {
                (state.loading = false),
                    (state.allEventsData = action.payload),
                    (state.error = null);
            })
            .addCase(getAllEventsFunction.rejected, (state, action) => {
                (state.loading = false), (state.error = action.payload);
            })

            //UPDATE SINGLE EVENT (updateEventFunction)
            .addCase(updateEventFunction.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(updateEventFunction.fulfilled, (state, action) => {
                (state.loading = false),
                    (state.lastUpdatedEvent = action.payload),
                    (state.error = null);
            })
            .addCase(updateEventFunction.rejected, (state, action) => {
                (state.loading = false), (state.error = action.payload);
            });
    },
});

export default eventsSlice.reducer;
