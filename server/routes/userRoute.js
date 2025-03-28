import { Router } from "express";
import {
    getAllUserDetails,
    loginController,
    logoutController,
    registerController,
    switchUserToAdmin,
    userDetailsController,
} from "../controllers/userController.js";
import { validateToken } from "../middleware/validateToken.js";
import { adminAuthorizeMiddleware } from "../middleware/adminAuthorize.js";

export const userRouter = Router();

userRouter.post("/register", registerController);

userRouter.post("/login", loginController);

userRouter.get("/logout", logoutController);

userRouter.get("/user-details/:id", validateToken, userDetailsController);

userRouter.get(
    "/admin/all-users",
    validateToken,
    adminAuthorizeMiddleware,
    getAllUserDetails
);

userRouter.post(
    "/admin/switch-admin-status",
    validateToken,
    adminAuthorizeMiddleware,
    switchUserToAdmin
);
