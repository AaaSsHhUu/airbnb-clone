import { LoginRequest, LoginResponse, MessageResponse, SignupRequest } from "@/types/api-types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";

export const userApi = createApi({
    reducerPath : "userApi",
    baseQuery : fetchBaseQuery({
        baseUrl : `${import.meta.env.VITE_SERVER}/api/v1/user`,
        credentials : "include"
    }),
    endpoints : (builder) => ({
        // signup mutation
        signup : builder.mutation<MessageResponse, SignupRequest>({
            query : (userCredentials) => ({
                url : '/signup',
                method : "POST",
                body : userCredentials
            })
        }),

        // login mutation
        login : builder.mutation<LoginResponse, LoginRequest>({
            query : (loginCredentials) => ({
                url : "/login",
                method : "POST",
                body : loginCredentials
            })
        }),

        // logout
        logout : builder.mutation({
            query : () => ({
                url : "/logout",
                method : "GET"
            })
        })
        
    })
})

export const getCurrentUser = async () => {

    const response = await axios.get(`${import.meta.env.VITE_SERVER}/api/v1/user/current-user`,{
        withCredentials : true
    });
    // console.log("current user res : ", response.data);
    const user = {
        _id : response.data.currentUser._id,
        username : response.data.currentUser.username,
        email : response.data.currentUser.email
    }
    return user;
}

export const {useSignupMutation, useLoginMutation, useLogoutMutation} = userApi;