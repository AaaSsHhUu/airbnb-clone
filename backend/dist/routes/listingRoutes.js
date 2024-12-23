"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const listingController_js_1 = require("../controllers/listingController.js");
const multer_1 = require("../middlewares/multer");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
// To create a new listing
router.post("/new", auth_1.isAuthenticated, multer_1.uploadSingle, listingController_js_1.createListing);
// To get all listings
router.get("/all", listingController_js_1.getAllListings);
// For changing info of listing
router.put("/update/:id", auth_1.isAuthenticated, auth_1.isListingOwner, multer_1.uploadSingle, listingController_js_1.updateListingDetails);
router.route("/:id")
    .get(auth_1.isAuthenticated, listingController_js_1.getListing)
    .delete(auth_1.isAuthenticated, listingController_js_1.deleteListing);
exports.default = router;
