import { Router } from "express";
import {
    razorPayPaymentController,
    verifyPaymentController,
} from "../controllers/razorPayController.js";

export const razorPayPaymentRouter = Router();

razorPayPaymentRouter.post("/create-order", razorPayPaymentController);

razorPayPaymentRouter.post("/verify-payment", verifyPaymentController);
