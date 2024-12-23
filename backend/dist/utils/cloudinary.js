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
const cloudinary_1 = require("cloudinary");
const fs_1 = __importDefault(require("fs"));
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const uploadOnCloudinary = (localfilePath) => __awaiter(void 0, void 0, void 0, function* () {
    // check for the image
    if (!localfilePath)
        return null;
    try {
        // upload it on cloudinary
        const response = yield cloudinary_1.v2.uploader.upload(localfilePath, {
            resource_type: "auto",
        });
        // if upload successfull , remove it from temp folder
        fs_1.default.unlinkSync(localfilePath);
        return response;
    }
    catch (error) {
        // if upload failed, removeit from temp folder
        fs_1.default.unlinkSync(localfilePath);
        return null;
    }
});
exports.default = uploadOnCloudinary;
