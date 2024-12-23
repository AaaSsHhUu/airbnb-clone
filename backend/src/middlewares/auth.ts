import { NextFunction, Request, Response } from "express";
import ApiError from "../utils/ApiError";
import jwt, { JwtPayload } from "jsonwebtoken";
import UserModel from "../models/userModel";
import ListingModel from "../models/listingModel";
import ReviewModel from "../models/reviewModel";

export const isAuthenticated = async (req: Request,res: Response,next: NextFunction) => {
  try {
    const userToken = req.cookies.accessToken;
    // console.log( "cookies : " ,userToken);
    if (!userToken) {
      return next(new ApiError(403, "Token not found, Please sign-in first"));
    }

    const decoded = (await jwt.verify(
      userToken,
      process.env.JWT_SECRET as string
    )) as JwtPayload;
    // console.log("decoded : ", decoded);
    const userId = decoded._id;

    const loggedInUser = await UserModel.findOne({ _id: userId }).select("-password");
    if (!loggedInUser) {
      return next(new ApiError(500, "Invalid token, Please login again"));
    }

    req.user = loggedInUser;

    return next();
  } catch (error) {
    return next(new ApiError(500, `Token validation error - ${error}`));
  }
};

export const isListingOwner = async (req: Request,res: Response,next: NextFunction) => {
  const { id } = req.params;
  const userId = req.user?.id;

  try {
    const listing = await ListingModel.findOne({ _id: id });
    if (!listing) {
      return next(new ApiError(404, "Listing not found"));
    }
  
    const ownerId = listing.owner;
    console.log("userID : ", userId);
    console.log("owner id : ", ownerId);
  
    if (ownerId.toString() !== userId) {
        new ApiError(403, "You cannot perform this action, Unauthorized user")
    }

    next();
  }catch (error) {
    return next(error);
  }
};

export const isReviewAuthor = async (req: Request,res: Response,next: NextFunction) => {
  const { id } = req.params;
  const userId = req.user?.id;

  const review = await ReviewModel.findOne({_id : id});
  if(!review){
      return next(new ApiError(404, "Review Not Found"));
  }
  const reviewAuthor = String(review.author);
  if(reviewAuthor !== userId){
      return next(new ApiError(403, "You can't edit someone else review"));
  }
  
  next();
};
