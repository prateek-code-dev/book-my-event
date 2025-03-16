import { Router } from "express";
import {
    createEventController,
    getAllEventsController,
    getEventDetailsController,
    updateEventController,
} from "../controllers/eventController.js";
import { validateToken } from "../middleware/validateToken.js";
import { adminAuthorizeMiddleware } from "../middleware/adminAuthorize.js";

export const eventRouter = Router();

eventRouter.get(
    "/all-events",
    validateToken,
    adminAuthorizeMiddleware,
    getAllEventsController
);

eventRouter.post(
    "/create-event",
    validateToken,
    adminAuthorizeMiddleware,
    createEventController
);

eventRouter.get(
    "/event-details/:id",
    validateToken,
    adminAuthorizeMiddleware,
    getEventDetailsController
);

eventRouter.put(
    "/update-event/:id",
    validateToken,
    adminAuthorizeMiddleware,
    updateEventController
);
