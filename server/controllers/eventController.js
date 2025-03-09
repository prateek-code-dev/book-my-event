import { handleError } from "../helpers/handleError.js";
import { eventModel } from "../models/eventModel.js";

export const getAllEventsController = async (req, res) => {
    try {
        const result = await eventModel.find().exec();

        if (!result) {
            return next(handleError(400, `Try again later`));
        }

        res.status(200).json({
            success: true,
            message: `All events list`,
            data: result,
        });
    } catch (error) {
        return next(handleError(500, `Internal server error ${error.message}`));
    }
};

export const createEventController = async (req, res, next) => {
    try {
        const {
            eventName,
            eventDescription,
            eventAddress,
            eventCity,
            eventPinCode,
            eventDate,
            eventTime,
        } = req.body;

        if (
            !eventName ||
            !eventDescription ||
            !eventAddress ||
            !eventCity ||
            !eventPinCode ||
            !eventDate ||
            !eventTime
        ) {
            return next(handleError(400, `All fields are required!`));
        }

        const result = await eventModel.create({
            eventName,
            eventDescription,
            eventAddress,
            eventCity,
            eventPinCode,
            eventDate,
            eventTime,
        });

        if (!result) {
            return next(handleError(400, `Please try later!`));
        }

        res.status(200).json({
            success: true,
            message: `${result.eventName} Event created successfully!`,
            data: result,
        });
    } catch (error) {
        return next(
            handleError(500, `Internal server error! ${error.message}`)
        );
    }
};

export const getEventDetailsController = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await eventModel.findById(id);

        if (!result) {
            return next(handleError(400, `Try again later!`));
        }

        res.status(200).json({
            success: true,
            message: `${result.eventName} event details`,
            data: result,
        });
    } catch (error) {
        return next(
            handleError(500, `Internal server error! ${error.message}`)
        );
    }
};

export const updateEventController = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            eventName,
            eventDescription,
            eventAddress,
            eventCity,
            eventPinCode,
            eventDate,
            eventTime,
        } = req.body;

        if (
            !eventName ||
            !eventDescription ||
            !eventAddress ||
            !eventCity ||
            !eventPinCode ||
            !eventDate ||
            !eventTime
        ) {
            return next(handleError(400, `All fields are required!`));
        }

        const eventBody = req.body;

        const result = await eventModel.findByIdAndUpdate(id, eventBody, {
            new: true,
        });

        res.status(200).json({
            success: true,
            message: `Event updated successfully!`,
            data: result,
        });
    } catch (error) {
        return next(
            handleError(400, `Internal server error! ${error.message}`)
        );
    }
};
