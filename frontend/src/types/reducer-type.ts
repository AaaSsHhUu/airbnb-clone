import { User } from "./types";

export type UserReducerInitialState = {
    user : User | null;
    loading : boolean;
}

export type ListingReducerInitialState = {
    category : string | undefined;
    price : number | undefined;
}