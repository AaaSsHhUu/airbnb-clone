"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const dbConnect_1 = __importDefault(require("./utils/dbConnect"));
const errorMiddleware_1 = __importDefault(require("./middlewares/errorMiddleware"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
// App routes
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const listingRoutes_1 = __importDefault(require("./routes/listingRoutes"));
const reviewRoutes_1 = __importDefault(require("./routes/reviewRoutes"));
const app = (0, express_1.default)();
(0, dbConnect_1.default)();
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use("/api/v1/user", userRoutes_1.default);
app.use("/api/v1/listing", listingRoutes_1.default);
app.use("/api/v1/review", reviewRoutes_1.default);
app.use(errorMiddleware_1.default);
app.listen(8000, () => {
    console.log("Server is running on port 8000");
});
