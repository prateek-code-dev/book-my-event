import { Router } from "express";
import {
  razorPayPaymentController,
  refundPaymentController,
  verifyPaymentController,
} from "../controllers/razorPayController.js";

export const razorPayPaymentRouter = Router();

razorPayPaymentRouter.post("/create-order", razorPayPaymentController);

razorPayPaymentRouter.post("/verify-payment", verifyPaymentController);

razorPayPaymentRouter.post("/refund", refundPaymentController);
