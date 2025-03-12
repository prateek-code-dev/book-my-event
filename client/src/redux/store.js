import { authSlice } from "./slices/authSlice";

import { configureStore } from "@reduxjs/toolkit";
import { eventsSlice } from "./slices/eventSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        event: eventsSlice.reducer,
    },
});
