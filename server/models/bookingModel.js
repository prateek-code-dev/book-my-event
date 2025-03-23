import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "events",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    ticketType: {
      type: String,
      required: true,
    },
    ticketCount: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "booked",
    },
    paymentId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const bookingModel = new mongoose.model("bookings", bookingSchema);
