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
exports.isReviewAuthor = exports.isListingOwner = exports.isAuthenticated = void 0;
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
const listingModel_1 = __importDefault(require("../models/listingModel"));
const reviewModel_1 = __importDefault(require("../models/reviewModel"));
const isAuthenticated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userToken = req.cookies.accessToken;
        // console.log( "cookies : " ,userToken);
        if (!userToken) {
            return next(new ApiError_1.default(403, "Token not found, Please sign-in first"));
        }
        const decoded = (yield jsonwebtoken_1.default.verify(userToken, process.env.JWT_SECRET));
        // console.log("decoded : ", decoded);
        const userId = decoded._id;
        const loggedInUser = yield userModel_1.default.findOne({ _id: userId }).select("-password");
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
const isListingOwner = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    try {
        const listing = yield listingModel_1.default.findOne({ _id: id });
        if (!listing) {
            return next(new ApiError_1.default(404, "Listing not found"));
        }
        const ownerId = listing.owner;
        console.log("userID : ", userId);
        console.log("owner id : ", ownerId);
        if (ownerId.toString() !== userId) {
            new ApiError_1.default(403, "You cannot perform this action, Unauthorized user");
        }
        next();
    }
    catch (error) {
        return next(error);
    }
});
exports.isListingOwner = isListingOwner;
const isReviewAuthor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const review = yield reviewModel_1.default.findOne({ _id: id });
    if (!review) {
        return next(new ApiError_1.default(404, "Review Not Found"));
    }
    const reviewAuthor = String(review.author);
    if (reviewAuthor !== userId) {
        return next(new ApiError_1.default(403, "You can't edit someone else review"));
    }
    next();
});
exports.isReviewAuthor = isReviewAuthor;
