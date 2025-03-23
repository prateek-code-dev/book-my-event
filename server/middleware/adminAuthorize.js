import { handleError } from "../helpers/handleError.js";

export const adminAuthorizeMiddleware = async (req, res, next) => {
    try {
        const userDetails = req.user;

        // console.log("userDetails", userDetails);

        if (!userDetails.isAdmin) {
            return next(
                handleError(400, `Unauthorized! Invalid admin access!`)
            );
        }

        next();
    } catch (error) {
        return next(handleError(500, `Internal server error ${error}`));
    }
};
