import { Router } from "express";
import {
    loginController,
    logoutController,
    registerController,
} from "../controllers/userController.js";
import { validateToken } from "../middleware/validateToken.js";

export const userRouter = Router();

userRouter.post("/register", registerController);

userRouter.post("/login", loginController);

userRouter.get("/logout", validateToken, logoutController);

userRouter.get("/user-profile");
