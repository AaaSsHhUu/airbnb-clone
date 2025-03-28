import { AllListingResponse, AllListingSearchQuery, ListingResponse, MessageResponse, UpdateListingDetails } from "@/types/api-types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const listingApi = createApi({
    reducerPath : "listingApi",
    baseQuery : fetchBaseQuery({
        baseUrl : `${import.meta.env.VITE_SERVER}/api/v1/listing`,
        credentials : "include"
    }),
    tagTypes : ['listing'],
    endpoints : (builder) => ({
        // All listings
        allListing : builder.query<AllListingResponse, AllListingSearchQuery>({
            query : ({category, price}) => {
                let params = new URLSearchParams();
                if(category) params.append("category", category);
                if(price) params.append("price", price.toString());
                let baseQuery = `/all${params.toString() ? `?${params.toString()}` : ""}`
                // console.log("base query : ", baseQuery);
                return {
                    url : baseQuery,
                }
            },
        }),

        // One specific listing
        listingDetails : builder.query<ListingResponse, string>({
            query : (id) => ({
                url : `/${id}`
            }),
            providesTags : ['listing']
        }),

        // creating new listing
        createListing : builder.mutation<MessageResponse, FormData>({
            query : (formData) => {
                return {
                    url : "/new",
                    method : "POST",
                    body : formData,
                }
            },
            invalidatesTags : ['listing']
        }),

        // Update listing details
        updateListingdetails : builder.mutation<MessageResponse, UpdateListingDetails>({
            query : ({formdata, listingId}) => {
                return {
                    url : `/update/${listingId}`,
                    method : "PUT",
                    body : formdata
                }
            },
            invalidatesTags : ['listing']
        }),

        // Delete listing
        deleteListing : builder.mutation<MessageResponse,{listingId : string}>({
            query : ({listingId}) => ({
                url : `/${listingId}`,
                method : "DELETE"
            }),
            invalidatesTags : ['listing']
        })

    })
})

export const {useAllListingQuery, useListingDetailsQuery, useDeleteListingMutation, useUpdateListingdetailsMutation, useCreateListingMutation,} = listingApi;