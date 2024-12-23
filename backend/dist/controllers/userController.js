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
exports.getCurrentUser = exports.logout = exports.login = exports.signup = void 0;
const userSchema_1 = require("../schemas/userSchema");
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const userModel_1 = __importDefault(require("../models/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
exports.signup = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    // zod validation
    const { success, error } = userSchema_1.userSignupSchema.safeParse({
        username,
        email,
        password,
    });
    if (!success) {
        throw new ApiError_1.default(400, error.message || "Invalid Input");
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    const newUser = yield userModel_1.default.create({
        username,
        email,
        password: hashedPassword,
    });
    if (!newUser) {
        throw new ApiError_1.default(500, "Some error occured while creating new user");
    }
    const accessToken = yield newUser.generateToken();
    // console.log("accessToken in sign-up : ", accessToken);
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
        success: true,
        message: `Welcome ${newUser.username}`,
        // accessToken,
        // newUser
    });
}));
exports.login = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    // Zod validation
    const { success, error } = userSchema_1.userSigninSchema.safeParse({ email, password });
    if (!success) {
        throw new ApiError_1.default(400, error.message || "Invalid Inputs");
    }
    const isUserRegistered = yield userModel_1.default.findOne({ email });
    if (!isUserRegistered) {
        throw new ApiError_1.default(404, "User not registered, Please sign-up first");
    }
    const isPasswordCorrect = isUserRegistered.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
        throw new ApiError_1.default(400, "Invalid email or password");
    }
    const accessToken = yield isUserRegistered.generateToken();
    // console.log("token after login : ", accessToken);
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
        success: true,
        message: `Welcome ${isUserRegistered.username}`,
        user: isUserRegistered
    });
}));
exports.logout = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("req user before log out : ", req.user);
    console.log("token before log out : ", req.cookies.accessToken);
    res.clearCookie("accessToken", {
        httpOnly: true
    });
    req.user = undefined;
    return res.status(200).json({
        success: true,
        message: "Logged out"
    });
}));
exports.getCurrentUser = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const loggedInUser = req.user;
    if (!loggedInUser) {
        throw new ApiError_1.default(404, "No current User, Login first");
    }
    return res.json({
        currentUser: loggedInUser
    });
}));
