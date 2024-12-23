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
exports.deleteListing = exports.updateListingDetails = exports.getListing = exports.getAllListings = exports.createListing = void 0;
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const listingModel_1 = __importDefault(require("../models/listingModel"));
const listingSchema_1 = __importDefault(require("../schemas/listingSchema"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
// Create new Listing
exports.createListing = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    let url, filename;
    const { title, description, price, location, country, reviews, category } = req.body;
    console.log("req file path : ", req.file);
    if ((_a = req.file) === null || _a === void 0 ? void 0 : _a.path) {
        const response = yield (0, cloudinary_1.default)(req.file.path);
        // console.log("cloudinary res : ", response);
        if (!response) {
            throw new ApiError_1.default(500, "Upload failed");
        }
        url = response === null || response === void 0 ? void 0 : response.secure_url;
        filename = response === null || response === void 0 ? void 0 : response.original_filename;
    }
    // zod validation
    const { success, error } = listingSchema_1.default.safeParse({ title, description, price: Number(price), location, country, reviews, category, image: { url, filename } });
    if (!success) {
        // console.log("zod validation error - ", error);
        throw new Error(error.message || "Invalid inputs");
    }
    const listing = new listingModel_1.default(req.body);
    if (url && filename) {
        listing.image.url = url;
        listing.image.filename = filename;
    }
    if (!((_b = req.user) === null || _b === void 0 ? void 0 : _b._id)) {
        throw new ApiError_1.default(400, "Log in first");
    }
    listing.owner = (_c = req.user) === null || _c === void 0 ? void 0 : _c._id;
    // console.log("listing : ", listing);
    const newListing = yield listing.save();
    console.log("new listing : ", newListing);
    if (!newListing) {
        throw new ApiError_1.default(500, "Some error occured while creating listing");
    }
    return res.status(200).json({
        success: true,
        message: "Listing creating successfully",
        newListing
    });
}));
// Get all Listing
exports.getAllListings = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { category, price } = req.query;
    let baseQuery = {};
    if (category) {
        baseQuery.category = {
            $regex: category,
            $options: 'i'
        };
    }
    if (price) {
        baseQuery.price = {
            $lte: price
        };
    }
    const allListings = yield listingModel_1.default.find(baseQuery);
    if (!allListings) {
        throw new ApiError_1.default(404, "Listings not found");
    }
    return res.status(200).json({
        success: true,
        allListings
    });
}));
// get listing info
exports.getListing = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        throw new ApiError_1.default(400, "Invalid listing id");
    }
    const listing = yield listingModel_1.default.findOne({ _id: id });
    if (!listing) {
        throw new ApiError_1.default(404, "Listing not found");
    }
    return res.status(200).json({
        success: true,
        listing,
    });
}));
// update listing info
exports.updateListingDetails = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    console.log("req body: ", req.body);
    const { title, description, price, country, location, category } = req.body;
    const listing = yield listingModel_1.default.findById({ _id: id });
    if (!listing) {
        throw new ApiError_1.default(404, "Listing not found");
    }
    if ((_a = req.file) === null || _a === void 0 ? void 0 : _a.path) {
        const response = yield (0, cloudinary_1.default)(req.file.path);
        let url = response === null || response === void 0 ? void 0 : response.secure_url;
        let filename = response === null || response === void 0 ? void 0 : response.original_filename;
        if (!url || !filename) {
            throw new ApiError_1.default(500, "Image upload failed");
        }
        listing.image = { url, filename };
    }
    if (title)
        listing.title = title;
    if (description)
        listing.description = description;
    if (price)
        listing.price = price;
    if (country)
        listing.country = country;
    if (category)
        listing.category = category;
    if (location)
        listing.location = location;
    const updatedListing = yield listing.save();
    if (!updatedListing) {
        throw new ApiError_1.default(500, "Something went wrong while updating the listing info");
    }
    return res.status(200).json({
        success: true,
        message: "Listing updated successfully",
        updatedListing
    });
}));
// update listing image
// export const updateListingImage = asyncHandler(async (req : Request, res : Response) => {
//     const {id} = req.params;
//     let url, filename;
//     const listing = await ListingModel.findOne({_id : id});
//     if(!listing){
//         throw new ApiError(404, "Listing not found");
//     }
//     if(req.file?.path){
//         const response = await uploadOnCloudinary(req.file?.path);
//         url = response?.secure_url;
//         filename = response?.original_filename;
//     }else{
//         throw new ApiError(400, "Please Provide Image for updation");
//     }
//     if(!url || !filename){
//         throw new ApiError(500,"Image upload failed");
//     }
//     listing.image = {url, filename};
//     const updatedListing = await listing.save();
//     if(!updatedListing){
//         throw new ApiError(500,"Something went wrong while updating the Listing Image");
//     }
//     return res.status(200).json({
//         success : true,
//         message : "Listing image updated successfully",
//         // updatedListing
//     })
// })
// delete listing
exports.deleteListing = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const listing = yield listingModel_1.default.findOneAndDelete({ _id: id });
    if (!listing) {
        throw new ApiError_1.default(500, "Some error occured while deleting the listing");
    }
    return res.status(200).json({
        success: true,
        message: "Listing deleted successfully"
    });
}));
