import mongoose, {Schema, Document, Types} from "mongoose";
import { User } from "./userModel";

export interface Review extends Document{
    username : string;
    comment : string;
    rating : number;
    author : User | Types.ObjectId;
}

const reviewSchema : Schema<Review> = new Schema({
    comment : {
        type : String
    },
    rating : {
        type : Number,
        min : 1,
        max : 5
    },
    author : {
        type : Schema.Types.ObjectId,
        ref : "User"
    }
},{timestamps : true})

const ReviewModel = mongoose.model<Review>("Review", reviewSchema);
export default ReviewModel;