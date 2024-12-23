import express from "express";
import { createListing, deleteListing, getAllListings, getListing, updateListingDetails } from "../controllers/listingController.js";
import { uploadSingle } from "../middlewares/multer";
import {isAuthenticated, isListingOwner} from "../middlewares/auth";
const router = express.Router();

// To create a new listing
router.post("/new", isAuthenticated, uploadSingle, createListing);
// To get all listings
router.get("/all", getAllListings);
// For changing info of listing
router.put("/update/:id", isAuthenticated, isListingOwner, uploadSingle, updateListingDetails);

router.route("/:id")
    .get(isAuthenticated, getListing)
    .delete(isAuthenticated, deleteListing)

export default router;

