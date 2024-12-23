import mongoose, {Schema, Document, Types} from "mongoose";
import { Review } from "./reviewModel";
import { User } from "./userModel";

export interface Listing extends Document{
    title : string;
    description : string;
    image : {
        url : string,
        filename : string;
    },
    price : number;
    location : string;
    country : string;
    reviews : Review[] | Types.ObjectId[];
    owner : User | Types.ObjectId;
    category : "rooms"|"mountains"|"mountain-city"|"castles"|"forts"|"swimming"|"beaches"|"hiking"|"hotels"|"snow"|"camping"|"farms";
}

const listingSchema : Schema<Listing> = new Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    image : {
        url : String,
        filename : String
    },
    price : {
        type : Number,
        required : true
    },
    location : {
        type : String,
        required : true
    },
    country : {
        type : String,
        required : true
    },
    reviews : [
        {
            type : Schema.Types.ObjectId,
            ref : "Review"
        },
    ],
    owner : {
        type : Schema.Types.ObjectId,
        ref : "User",
        default : new mongoose.Types.ObjectId("674df7033cfc911b6df325a0")
    },
    category : {
        type : String,
        enum : ["rooms","mountains","mountain-city","castles","forts","swimming","beaches","hiking","hotels","snow","camping","farms"],
        default : "rooms"
    }
})

const ListingModel = mongoose.model<Listing>("Listng", listingSchema);
export default ListingModel;