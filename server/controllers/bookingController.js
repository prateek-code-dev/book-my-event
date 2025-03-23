import { handleError } from "../helpers/handleError.js";
import { bookingModel } from "../models/bookingModel.js";
import { eventModel } from "../models/eventModel.js";

export const createBookingController = async (req, res, next) => {
    try {
        const {
            event,
            ticketType,
            ticketCount,
            totalAmount,

            paymentId,
        } = req.body;

        if (
            !event ||
            !ticketType ||
            !ticketCount ||
            !totalAmount ||
            !paymentId
        ) {
            return next(handleError(400, `All fields are required!`));
        }

        const bookingDetails = {
            event,
            user: req.user.id, // user details from validateToken
            ticketType,
            ticketCount,
            totalAmount,
            status: "booked",
            paymentId,
        };

        // console.log("bookingDetails", bookingDetails);

        const result = await bookingModel.create(bookingDetails);
        // console.log("result", result);

        if (!result) {
            return next(
                handleError(400, `Error! creating booking, Try Later!`)
            );
        }

        // For decreasing ticket count in events
        const eventResult = await eventModel.updateOne(
            {
                _id: result.event,
                "eventTickets.name": ticketType,
            },
            {
                $inc: {
                    "eventTickets.$.booked": Number(ticketCount),
                    "eventTickets.$.limit": -Number(ticketCount),
                },
            },
            { new: true }
        );

        if (!eventResult) {
            return next(handleError(400, `Error! updating tickets in events!`));
        }

        // console.log("result", result);

        return res.status(200).json({
            success: true,
            message: `Booking created successfully!`,
            data: result,
        });
    } catch (error) {
        console.log("error", error);
        return next(
            handleError(500, `Internal server error! ${error || error.message}`)
        );
    }
};

export const getUserBookingsController = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const result = await bookingModel
            .find({ user: userId })
            .populate("user")
            .populate("event")
            .exec();

        if (!result) {
            return next(handleError(400, `Error! getting booking details`));
        }

        console.log("result", result);

        res.status(200).json({
            success: true,
            message: `Booking details!`,
            data: result,
        });
    } catch (error) {
        return next(
            handleError(500, `Internal server error! ${error.message || error}`)
        );
    }
};

export const getAllBookingsController = async (req, res, next) => {
    try {
        const result = await bookingModel
            .find({})
            .populate("user")
            .populate("event");

        if (!result) {
            return next(
                handleError(400, `Error! in getting all the bookings details`)
            );
        }

        return res.status(200).json({
            success: true,
            message: `All users booking details!`,
            data: result,
        });
    } catch (error) {
        return next(
            handleError(500, `Internal server error! ${error.message}`)
        );
    }
};

export const cancelBookingController = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await bookingModel.findByIdAndUpdate(
            id,
            {
                status: "cancelled",
            },
            { new: true }
        );

        if (!result) {
            return next(
                handleError(400, `Error! cancelling booking, try again later!`)
            );
        }

        return res.status(200).json({
            success: true,
            message: `Successfully! booking cancelled!`,
            data: result,
        });
    } catch (error) {
        return next(handleError(500, `Internal server error! ${error}`));
    }
};
