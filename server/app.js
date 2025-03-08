import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { dbConnect } from "./config/db.js";
import { userRouter } from "./routes/userRoute.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.use("/v1/", userRouter);

dbConnect();

const port = process.env.PORT || 5473;

app.get("/", (req, res) => {
    return res
        .status(200)
        .json({ success: true, message: `Welcome to Book My Events Server!` });
});

app.listen(port, () => {
    console.log(`Server listening on PORT ${port}`);
});

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});
