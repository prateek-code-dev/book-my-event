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

        const result = await UserModel.findOne({ email });

        if (!result) {
            return next(handleError(400, `Email not found, please register!`));
        }

        const decodedPassword = await bcrypt.compare(password, result.password);

        // console.log(`decoded password`, decodedPassword);

        if (!decodedPassword) {
            return next(handleError(400, `Invalid email or password!`));
        }

        const tokenValue = await jwt.sign(
            { id: result._id, email: result.email, isAdmin: result.isAdmin },
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
                message: `${result.email} logged in successfully!`,
                data: result,
            });
    } catch (error) {
        return next(
            handleError(
                500,
                `Internal server error in login controller! ${error.message}`
            )
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

        const result = await UserModel.create({
            name,
            email,
            password: hashedPassword,
        });

        // console.log(`response`, response);

        return res.status(200).json({
            success: true,
            message: `${result.email} user created successfully`,
            data: result,
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
            .clearCookie("token")
            .json({ success: true, message: `Logout successful!` });
    } catch (error) {
        return next(
            handleError(
                500,
                `Internal server error in logout controller! ${error.message}`
            )
        );
    }
};

export const userDetailsController = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id) {
            return next(handleError(400, `Unauthorized Invalid credentials!`));
        }

        const result = await UserModel.findById(id);

        if (!result) {
            return next(handleError(400, `Unauthorized Invalid credentials!`));
        }

        return res.status(200).json({
            success: true,
            message: `${result.name} Welcome!`,
            data: result,
        });
    } catch (error) {
        return next(
            handleError(
                500,
                `Internal server error in user details controller! ${error.message}`
            )
        );
    }
};
