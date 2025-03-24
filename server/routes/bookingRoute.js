import { Router } from "express";
import {
    cancelBookingController,
    createBookingController,
    getAllBookingsController,
    getUserBookingsController,
} from "../controllers/bookingController.js";
import { validateToken } from "../middleware/validateToken.js";
import { adminAuthorizeMiddleware } from "../middleware/adminAuthorize.js";

export const bookingRouter = Router();

bookingRouter.post("/create-booking", validateToken, createBookingController);

bookingRouter.get("/booking-details", validateToken, getUserBookingsController);

bookingRouter.get(
    "/admin/all-bookings",
    validateToken,
    adminAuthorizeMiddleware,
    getAllBookingsController
);

bookingRouter.post(
    "/cancel-booking/",
    validateToken,
    cancelBookingController
);
