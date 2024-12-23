import {configureStore} from "@reduxjs/toolkit";
import { userApi } from "./api/userApi";
import { userReducer } from "./reducer/userReducer";
import { listingApi } from "./api/listingApi";
import { listingReducer } from "./reducer/listingReducer";

export const store = configureStore({
    reducer : {
        // Api
        [userApi.reducerPath] : userApi.reducer, 
        [listingApi.reducerPath] : listingApi.reducer,

        // Reducer
        [userReducer.name] : userReducer.reducer,
        [listingReducer.name] : listingReducer.reducer,
    },

    middleware : (defaultMiddlewares) => defaultMiddlewares().concat(
        userApi.middleware,
        listingApi.middleware
    )
})

export type RootState = ReturnType<typeof store.getState>;

// <any>Api.reducer manages api states like data, isLoading, error etc.

// <any>Reducer.reducer manages state for features like UI preferences, form data, or any business logic that does not come from an API.