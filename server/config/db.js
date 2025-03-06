import mongoose from "mongoose";

export const dbConnect = async () => {
    try {
        const response = await mongoose.connect(process.env.MONGO_URL);

        // console.log(`response`, response);

        if (response) {
            console.log(`DB Connected`);
        }
    } catch (error) {
        return console.log(`Error connecting DB ${error}`);
    }
};
