import { ListingReducerInitialState } from "@/types/reducer-type";
import { createSlice } from "@reduxjs/toolkit";

const initialState : ListingReducerInitialState = {
    category : undefined,
    price : undefined
}

export const listingReducer = createSlice({
    name : "listingReducer",
    initialState,
    reducers : {
        setListingQueryProps : (state, action) => {
            const {category, price} = action.payload;
            if(category) state.category = category;
            if(price) state.price = price;
        }
    }
})

export const {setListingQueryProps} = listingReducer.actions;
    