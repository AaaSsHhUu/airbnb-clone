"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reviewController_1 = require("../controllers/reviewController");
const auth_1 = require("../middlewares/auth");
const multer_1 = require("../middlewares/multer");
const router = express_1.default.Router();
router.get("/:id", reviewController_1.getListingReviews);
router.post("/new", auth_1.isAuthenticated, multer_1.uploadNone, reviewController_1.newReview);
router.put("/:id", auth_1.isAuthenticated, auth_1.isReviewAuthor, multer_1.uploadNone, reviewController_1.updateReview);
router.delete("/:id", auth_1.isAuthenticated, auth_1.isReviewAuthor, reviewController_1.deleteReview);
exports.default = router;
// if you're using Multer and your PATCH or PUT routes do not expect any file uploads but might include a form with non-file data (like application/x-www-form-urlencoded or multipart/form-data), it is recommended to explicitly use the upload.none() middleware in those routes.
