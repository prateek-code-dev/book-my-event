import { handleError } from "../helpers/handleError.js";
import { eventModel } from "../models/eventModel.js";

export const getAllEventsController = async (req, res, next) => {
    try {
        const result = await eventModel
            .find()
            .select("-createdAt -updatedAt -__v")
            .exec();

        if (!result) {
            return next(handleError(400, `Try again later`));
        }

        return res.status(200).json({
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
            eventOrganizer,
            eventGuests,
            eventMedia,
            eventTickets,
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
            eventOrganizer,
            eventGuests,
            eventMedia,
            eventTickets,
        });

        if (!result) {
            return next(handleError(400, `Please try later!`));
        }

        const filteredResult = {
            ...result._doc,
            createdAt: undefined,
            updatedAt: undefined,
            __v: undefined,
        };

        return res.status(200).json({
            success: true,
            message: `${result.eventName} Event created successfully!`,
            data: filteredResult,
        });
    } catch (error) {
        return next(
            handleError(500, `Internal server error! ${error.message}`)
        );
    }
};

export const getEventDetailsController = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await eventModel
            .findById(id)
            .select("-createdAt -updatedAt -__v");

        if (!result) {
            return next(handleError(400, `Try again later!`));
        }

        return res.status(200).json({
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

export const updateEventController = async (req, res, next) => {
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

        const result = await eventModel
            .findByIdAndUpdate(id, eventBody, {
                new: true,
            })
            .select("-createdAt -updatedAt -__v");

        return res.status(200).json({
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
