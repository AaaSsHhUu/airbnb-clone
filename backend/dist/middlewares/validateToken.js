"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
const isAuthenticated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userToken = req.cookies.accessToken;
        // console.log(req.cookies)
        if (!userToken) {
            return next(new ApiError_1.default(403, "Token not found, Please sign-in first"));
        }
        const decoded = yield jsonwebtoken_1.default.verify(userToken, process.env.JWT_SECRET);
        // console.log("decoded : ", decoded);
        const userId = decoded._id;
        const loggedInUser = yield userModel_1.default.findOne({ _id: userId });
        if (!loggedInUser) {
            return next(new ApiError_1.default(500, "Invalid token, Please login again"));
        }
        req.user = loggedInUser;
        return next();
    }
    catch (error) {
        return next(new ApiError_1.default(500, `Token validation error - ${error}`));
    }
});
exports.isAuthenticated = isAuthenticated;
