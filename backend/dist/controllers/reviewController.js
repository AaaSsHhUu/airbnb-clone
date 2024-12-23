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
exports.deleteReview = exports.updateReview = exports.newReview = exports.getListingReviews = void 0;
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const reviewModel_1 = __importDefault(require("../models/reviewModel"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const reviewSchema_1 = __importDefault(require("../schemas/reviewSchema"));
const listingModel_1 = __importDefault(require("../models/listingModel"));
// export const getAllReviews = asyncHandler(async (req : Request, res : Response) => {
//     const allReviews = await ReviewModel.find();
//     if(!allReviews){
//         throw new ApiError(404, "Reviews not found");
//     }
//     return res.status(200).json({
//         success : true,
//         allReviews
//     })
// })
exports.getListingReviews = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const listing = yield listingModel_1.default.findOne({ _id: id });
    if (!listing) {
        throw new ApiError_1.default(404, "Listing not found");
    }
    const allReviews = listing.reviews;
    return res.status(200).json({
        success: true,
        allReviews
    });
}));
exports.newReview = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { comment, rating } = req.body;
    const username = (_a = req.user) === null || _a === void 0 ? void 0 : _a.username;
    const author = (_b = req.user) === null || _b === void 0 ? void 0 : _b._id;
    const { success, error } = reviewSchema_1.default.safeParse({
        username,
        comment,
        rating: Number(rating),
        author: String(author)
    });
    if (error || !success) {
        // console.log("zod error : ", error);
        throw new ApiError_1.default(400, error.message || "Invalid Inputs");
    }
    const newReview = yield reviewModel_1.default.create({
        username,
        comment,
        rating: Number(rating),
        author
    });
    if (!newReview) {
        throw new ApiError_1.default(500, "Something went wrong while adding your review");
    }
    return res.status(201).json({
        success: true,
        message: "Review added successfully",
        // newReview
    });
}));
exports.updateReview = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // console.log("update body : ", req.body);
    const newReview = yield reviewModel_1.default.findOneAndUpdate({ _id: id }, Object.assign({}, req.body), { new: true });
    if (!newReview) {
        throw new ApiError_1.default(500, "Some Error occured while updating your review");
    }
    return res.status(200).json({
        success: true,
        message: "Review modified successsfully",
        newReview
    });
}));
exports.deleteReview = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const review = yield reviewModel_1.default.findOneAndDelete({ _id: id });
    if (!review) {
        throw new ApiError_1.default(500, "Something went wrong while deleting the review");
    }
    res.status(200).json({
        success: true,
        message: "Review deleted successfully",
        review
    });
}));
