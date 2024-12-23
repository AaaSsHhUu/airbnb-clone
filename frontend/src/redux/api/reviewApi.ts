import { CreateReviewRequest, MessageResponse, ReviewResponse } from "@/types/api-types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reviewApi = createApi({
    reducerPath : "reviewApi",
    baseQuery : fetchBaseQuery({
        baseUrl : `${import.meta.env.VITE_SERVER}/api/v1/review`,
        credentials : "include"
    }),
    endpoints : (builder) => ({
        
        newReview : builder.mutation<MessageResponse, CreateReviewRequest>({
            query : ({comment, rating}) => ({
                url : "/new",
                body : {comment, rating}
            })
        }),

        getListingReviews : builder.query<ReviewResponse, string>({
            query : (id) => ({
                url : `/${id}`
            })
        }),


    })
})