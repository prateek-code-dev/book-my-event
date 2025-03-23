import { Router } from "express";
import {
  loginController,
  logoutController,
  registerController,
  userDetailsController,
} from "../controllers/userController.js";
import { validateToken } from "../middleware/validateToken.js";

export const userRouter = Router();

userRouter.post("/register", registerController);

userRouter.post("/login", loginController);

userRouter.get("/logout", logoutController);

userRouter.get("/user-details/:id", validateToken, userDetailsController);
