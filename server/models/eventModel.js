import mongoose, { Schema } from "mongoose";

const eventSchema = new mongoose.Schema(
    {
        eventName: {
            type: String,
            required: true,
        },
        eventDescription: {
            type: String,
            required: true,
        },
        eventOrganizers: {
            type: Array,
            required: false,
            default: [],
        },
        eventGuests: {
            type: Array,
            required: false,
            default: [],
        },
        eventAddress: {
            type: String,
            required: true,
        },
        eventCity: {
            type: String,
            required: true,
        },
        eventPinCode: {
            type: String,
            required: true,
            minLength: [6, "PIN code must be exactly 6 digits"],
            maxLength: [6, "PIN code must be exactly 6 digits"],
        },
        eventDate: {
            type: String,
            required: true,
        },
        eventTime: {
            type: String,
            required: true,
        },
        eventMedia: {
            type: Array,
            required: false,
        },
        eventTickets: {
            type: Array,
            required: false,
            default: [],
        },
    },
    { timestamps: true }
);

// Create a compound unique index (e.g., unique event by name, date, and pincode)
eventSchema.index(
    { eventName: 1, eventPinCode: 1, eventDate: 1 },
    { unique: true }
);

export const eventModel = new mongoose.model("events", eventSchema);
