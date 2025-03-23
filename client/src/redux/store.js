import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/authSlice";
import { eventsSlice } from "./slices/eventSlice";
import { paymentSlice } from "./slices/paymentSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    event: eventsSlice.reducer,
    payment: paymentSlice.reducer,
  },
});
