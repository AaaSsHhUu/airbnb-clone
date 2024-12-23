import { lazy } from "react";

const Home = lazy(() => import("./Home"));
const ListingDetails = lazy(() => import("./ListingDetails"));

export {
    Home, 
    ListingDetails
}