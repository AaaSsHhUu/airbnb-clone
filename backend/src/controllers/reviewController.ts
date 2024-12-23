import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import ReviewModel from "../models/reviewModel";
import ApiError from "../utils/ApiError";
import reviewSchema from "../schemas/reviewSchema";
import ListingModel from "../models/listingModel";

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

export const getListingReviews = asyncHandler(async (req : Request, res : Response) => {
    const {id} = req.params;

    const listing = await ListingModel.findOne({_id : id});
    if(!listing){
        throw new ApiError(404, "Listing not found");
    }

    const allReviews = listing.reviews;

    return res.status(200).json({
        success : true,
        allReviews
    })
})

export const newReview = asyncHandler(async (req : Request, res : Response) => {
    const {comment, rating} = req.body;
    const username = req.user?.username;
    const author = req.user?._id;

    const {success, error} = reviewSchema.safeParse({
        username,
        comment,
        rating : Number(rating), 
        author : String(author) 
    });

    if(error || !success){
        // console.log("zod error : ", error);
        throw new ApiError(400, error.message || "Invalid Inputs");
    }

    const newReview = await ReviewModel.create({
        username,
        comment,
        rating : Number(rating),
        author
    })

    if(!newReview){
        throw new ApiError(500, "Something went wrong while adding your review");
    }

    return res.status(201).json({
        success : true,
        message : "Review added successfully",
        // newReview
    })
})

export const updateReview = asyncHandler(async (req : Request, res : Response) => {
    const {id} = req.params;
    // console.log("update body : ", req.body);

    const newReview = await ReviewModel.findOneAndUpdate({_id : id},{...req.body},{new : true});

    if(!newReview){
        throw new ApiError(500, "Some Error occured while updating your review");
    }

    return res.status(200).json({
        success : true,
        message : "Review modified successsfully",
        newReview
    })
})

export const deleteReview = asyncHandler(async (req : Request, res : Response) => {
    const {id} = req.params;

    const review = await ReviewModel.findOneAndDelete({_id : id});

    if(!review){
        throw new ApiError(500, "Something went wrong while deleting the review");
    }

    res.status(200).json({
        success : true,
        message : "Review deleted successfully",
        review
    })
})