import { handleError } from "../helpers/handleError.js";
import { UserModel } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginController = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(handleError(400, `All fields are required!`));
        }

        const response = await UserModel.findOne({ email });

        if (!response) {
            return next(handleError(400, `Email not found, please register!`));
        }

        const decodedPassword = await bcrypt.compare(
            password,
            response.password
        );

        console.log(`decoded password`, decodedPassword);

        if (!decodedPassword) {
            return next(handleError(400, `Invalid email or password!`));
        }

        const tokenValue = await jwt.sign(
            { email },
            process.env.TOKEN_SECRET_KEY
        );

        if (!tokenValue) {
            return next(handleError(400, `Try again later!`));
        }

        // console.log("jwt token", token);

        return res
            .status(200)
            .cookie("token", tokenValue, { httpOnly: true })
            .json({
                success: true,
                message: `${response.email} logged in successfully!`,
            });
    } catch (error) {
        return next(
            handleError(500, `Internal server error in login controller!`)
        );
    }
};

export const registerController = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return next(handleError(400, `All fields are required!`));
        }

        const checkUserAlreadyExists = await UserModel.findOne({ email });

        if (checkUserAlreadyExists) {
            return next(handleError(400, `User already exists! Try Login`));
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        if (!hashedPassword) {
            return next(handleError(400, `Error please try later!`));
        }

        // console.log(`hashedPassword`, hashedPassword);

        const response = await UserModel.create({
            name,
            email,
            password: hashedPassword,
        });

        // console.log(`response`, response);

        return res.status(200).json({
            success: true,
            message: `${response.email} user created successfully`,
        });
    } catch (error) {
        return next(
            handleError(500, `Error in Register Controller ${error.message}`)
        );
    }
};

export const logoutController = async (req, res, next) => {
    try {
        return res
            .status(200)
            .clearCookie("session")
            .json({ success: true, message: `Logout successful!` });
    } catch (error) {
        return next(
            handleError(500, `Internal server error in logout controller!`)
        );
    }
};
