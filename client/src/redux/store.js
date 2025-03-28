import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/authSlice";
import { eventsSlice } from "./slices/eventSlice";
import { paymentSlice } from "./slices/paymentSlice";
import { bookingSlice } from "./slices/bookingSlice";
import { userSlice } from "./slices/userSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        event: eventsSlice.reducer,
        payment: paymentSlice.reducer,
        booked: bookingSlice.reducer,
        allUsers: userSlice.reducer,
    },
});
