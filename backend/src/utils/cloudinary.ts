import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localfilePath: string) => {
    // check for the image
    if (!localfilePath) return null;

    try {
        // upload it on cloudinary
        const response = await cloudinary.uploader.upload(localfilePath, {
        resource_type: "auto",
        });
        // if upload successfull , remove it from temp folder
        fs.unlinkSync(localfilePath);
        return response;
    }catch (error) {
        // if upload failed, removeit from temp folder
        fs.unlinkSync(localfilePath);
        return null;
    }
};

export default uploadOnCloudinary;
