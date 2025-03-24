import Razorpay from "razorpay";
import { handleError } from "../helpers/handleError.js";
import crypto from "crypto";

export const razorPayPaymentController = async (req, res, next) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const { amount, currency, receipt, notes } = req.body;

    if (!amount || !currency || !receipt || !notes) {
      return next(handleError(400, `All payment fields are required!`));
    }

    const order = await instance.orders.create({
      amount: amount * 100,
      currency,
      receipt,
      notes,
    });

    if (!order) {
      return next(handleError(400, `Error in creating order! Try later!`));
    }
    // console.log("order", order);
    return res.status(200).json({
      success: true,
      message: `Payment successfull!`,
      data: order,
    });
  } catch (error) {
    return next(handleError(500, `Internal server error ${error.message}`));
  }
};

export const verifyPaymentController = async (req, res, next) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return next(handleError(400, `Error in processing payment. Try later!`));
    }

    const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);

    shasum.update(razorpay_order_id + "|" + razorpay_payment_id);

    const digest = shasum.digest("hex");

    // console.log("Generated signature", digest);
    // console.log("Razorpay signature", razorpay_signature);

    // Compare signatures
    if (digest === razorpay_signature) {
      // console.log(`Payment verified successfully!`)

      res.json({
        success: true,
        message: `Payment verified successfully!`,
      });
    } else {
      // console.log(`Payment verification failed!`);

      res.status(400).json({
        success: false,
        message: `Payment verification failed!`,
      });
    }
  } catch (error) {
    return next(handleError(500, `Internal server error! ${error}`));
  }
};

export const refundPaymentController = async (req, res, next) => {
  try {
    const { bookedPaymentId, refundAmount, refundNotes } = req.body;

    if (!bookedPaymentId || !refundAmount || !refundNotes) {
      return next(handleError(400, `All fields are required!`));
    }

    let instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    instance.payments.refund(bookedPaymentId, {
      amount: refundAmount,
      speed: "normal",
      notes: refundNotes,
      receipt: `Refund_${bookedPaymentId}_${new Date()}`,
    });

    return res.status(200).json({
      success: true,
      message: `Payment refund processed successfully!`,
    });
  } catch (error) {
    return next(handleError(500, `Internal server error! ${error}`));
  }
};
