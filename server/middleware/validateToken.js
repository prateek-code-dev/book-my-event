import jwt from "jsonwebtoken";
import { handleError } from "../helpers/handleError.js";

export const validateToken = async (req, res, next) => {
    try {
        const { token } = req.cookie;

        const result = jwt.verify(token, process.env.TOKEN_SECRET_KEY);

        if (!result) {
            return handleError(400, `Invalid Credentials!`);
        }

        next();
    } catch (error) {
        return handleError(400, `Invalid Credentials!`);
    }
};
