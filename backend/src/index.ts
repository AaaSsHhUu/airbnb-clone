import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./utils/dbConnect";
import errorMiddleware from "./middlewares/errorMiddleware";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";

// App routes
import userRoutes from "./routes/userRoutes";
import listingRoutes from "./routes/listingRoutes";
import reviewRoutes from "./routes/reviewRoutes";

const app = express();
connectDB();

const allowedOrigins = ["http://localhost:5173"]

const corsOptions : cors.CorsOptions = {
    origin : (origin, callback) => {
        if(!origin || allowedOrigins.includes(origin)){
            callback(null, true) // Allow the request
        }
        else{
            callback(new Error("Not allowed by cors")); // Block the request
        }
    },
    credentials : true
}

app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/listing", listingRoutes);
app.use("/api/v1/review", reviewRoutes);

app.use(errorMiddleware);

app.listen(8000, () => {
    console.log("Server is running on port 8000");
})