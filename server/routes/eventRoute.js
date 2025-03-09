import { Router } from "express";
import {
    createEventController,
    getAllEventsController,
    getEventDetailsController,
    updateEventController,
} from "../controllers/eventController.js";
import { validateToken } from "../middleware/validateToken.js";

export const eventRouter = Router();

eventRouter.get("/all-events", validateToken, getAllEventsController);

eventRouter.post("/create-event", validateToken, createEventController);

eventRouter.get("/event-details/:id", validateToken, getEventDetailsController);

eventRouter.put("/update-event/:id", validateToken, updateEventController);
