import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import ListingModel from "../models/listingModel";
import listingSchema from "../schemas/listingSchema";
import ApiError from "../utils/ApiError";
import uploadOnCloudinary from "../utils/cloudinary";
import { BaseQuery, SearchQueryInputs } from "../types/types";

// Create new Listing
export const createListing = asyncHandler(async (req : Request, res : Response) => {
    let url, filename;    
    const {title, description, price, location, country, reviews, category} = req.body;

    console.log("req file path : ", req.file);

    if(req.file?.path){
        const response = await uploadOnCloudinary(req.file.path);
        // console.log("cloudinary res : ", response);
        if(!response){
            throw new ApiError(500, "Upload failed");
        }
        url = response?.secure_url;
        filename = response?.original_filename;
    }

    // zod validation
    const {success, error} = listingSchema.safeParse({title, description, price : Number(price), location, country, reviews, category, image : {url, filename}});

    if(!success){
        // console.log("zod validation error - ", error);
        throw new Error(error.message || "Invalid inputs");
    }

    const listing = new ListingModel(req.body);
    if(url && filename){
        listing.image.url = url;
        listing.image.filename = filename;
    }
    if(!req.user?._id){
        throw new ApiError(400, "Log in first");
    }
    listing.owner = req.user?._id;

    // console.log("listing : ", listing);
    const newListing = await listing.save();
    console.log("new listing : ", newListing);

    if(!newListing){
        throw new ApiError(500, "Some error occured while creating listing");
    }

    return res.status(200).json({
        success : true,
        message : "Listing creating successfully",
        newListing
    })
})

// Get all Listing
export const getAllListings = asyncHandler(async (req : Request, res : Response) => {
    const {category, price} : SearchQueryInputs = req.query;
    
    let baseQuery : BaseQuery = {};

    if(category){
        baseQuery.category = {
            $regex : category,
            $options : 'i'
        }
    }

    if(price){
        baseQuery.price = {
            $lte : price
        }
    }

    const allListings = await ListingModel.find(baseQuery);

    if(!allListings){
        throw new ApiError(404, "Listings not found");
    }

    return res.status(200).json({
        success : true,
        allListings
    })
})

// get listing info
export const getListing = asyncHandler(async (req : Request, res : Response) => {
    const {id} = req.params;

    if(!id){
        throw new ApiError(400,"Invalid listing id");
    }

    const listing = await ListingModel.findOne({_id : id});

    if(!listing){
        throw new ApiError(404, "Listing not found");
    }

    return res.status(200).json({
        success : true,
        listing,
    })
})

// update listing info
export const updateListingDetails = asyncHandler(async (req : Request, res : Response) => {
    const {id} = req.params;
    console.log("req body: ", req.body);
    const {title, description, price, country, location, category} = req.body;
    
    const listing = await ListingModel.findById({_id : id});

    if(!listing){
        throw new ApiError(404, "Listing not found");
    }

    if(req.file?.path){
        const response = await uploadOnCloudinary(req.file.path);
        let url = response?.secure_url;
        let filename = response?.original_filename;

        if(!url || !filename){
           throw new ApiError(500,"Image upload failed");
        }

        listing.image = {url, filename};
    }

    if(title) listing.title = title;
    if(description) listing.description = description;
    if(price) listing.price = price;
    if(country) listing.country = country;
    if(category) listing.category = category;
    if(location) listing.location = location;

    const updatedListing = await listing.save();

    if(!updatedListing){
        throw new ApiError(500, "Something went wrong while updating the listing info");
    }

    return res.status(200).json({
        success : true,
        message : "Listing updated successfully",
        updatedListing
    })
})

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

export const deleteListing = asyncHandler(async (req : Request, res : Response) => {
    const {id} = req.params;

    const listing =  await ListingModel.findOneAndDelete({_id : id});
    if(!listing){
        throw new ApiError(500, "Some error occured while deleting the listing");
    }

    return res.status(200).json({
        success : true,
        message : "Listing deleted successfully"
    })
})