import { Router } from "express";
import {
    createEventController,
    deleteEventController,
    getAllEventsController,
    getEventDetailsController,
    updateEventController,
} from "../controllers/eventController.js";
import { validateToken } from "../middleware/validateToken.js";
import { adminAuthorizeMiddleware } from "../middleware/adminAuthorize.js";

export const eventRouter = Router();

eventRouter.post("/all-events", validateToken, getAllEventsController);

eventRouter.post(
    "/create-event",
    validateToken,
    adminAuthorizeMiddleware,
    createEventController
);

eventRouter.get("/event-details/:id", validateToken, getEventDetailsController);

eventRouter.put(
    "/update-event/:id",
    validateToken,
    adminAuthorizeMiddleware,
    updateEventController
);

eventRouter.delete(
    "/delete-event/:id",
    validateToken,
    adminAuthorizeMiddleware,
    deleteEventController
);
