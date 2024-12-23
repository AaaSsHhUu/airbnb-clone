import express from "express";
import { deleteReview, getListingReviews, newReview, updateReview } from "../controllers/reviewController";
import { isAuthenticated, isReviewAuthor } from "../middlewares/auth";
import { uploadNone } from "../middlewares/multer";
const router = express.Router();

router.get("/:id", getListingReviews);
router.post("/new", isAuthenticated, uploadNone, newReview);
router.put("/:id", isAuthenticated, isReviewAuthor, uploadNone, updateReview);
router.delete("/:id", isAuthenticated, isReviewAuthor, deleteReview);
export default router;

// if you're using Multer and your PATCH or PUT routes do not expect any file uploads but might include a form with non-file data (like application/x-www-form-urlencoded or multipart/form-data), it is recommended to explicitly use the upload.none() middleware in those routes.