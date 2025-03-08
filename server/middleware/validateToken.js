import jwt from "jsonwebtoken";
import { handleError } from "../helpers/handleError.js";

export const validateToken = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return next(handleError(400, `Invalid Credentials!`));
        }

        const result = jwt.verify(token, process.env.TOKEN_SECRET_KEY);

        if (!result) {
            return next(handleError(400, `Invalid Credentials!`));
        }

        req.user = result;

        next();
    } catch (error) {
        return next(handleError(400, `Invalid Credentials!`));
    }
};
