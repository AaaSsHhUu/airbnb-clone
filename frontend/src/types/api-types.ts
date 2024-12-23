import { Listing, Review, User } from "./types";

export type MessageResponse = {
    success : boolean;
    message : string;
}

export type SignupRequest = {
    username : string;
    email : string;
    password : string;
}

export type LoginRequest = {
    email : string;
    password : string;
}

export type LoginResponse = MessageResponse & {
    user : User;
}

export type AllListingResponse = {
    success :  boolean;
    allListings : Listing[];
}

export type AllListingSearchQuery = {
    category : string | undefined;
    price : number | undefined;
}

export type ListingResponse = {
    success : boolean;
    listing : Listing;
}

export type ReviewResponse = {
    success : boolean;
    allReviews : Review[];
}

export type CreateReviewRequest = {
    comment : string;
    rating : number;
}

export type CreateListingRequest = {
    title : string;
    description : string;
    price : number;
    category : string;
    image : File;
    location : string;
    country : string;
}

export type UpdateListingDetails = {
    listingId : string;
    formdata : FormData;
}