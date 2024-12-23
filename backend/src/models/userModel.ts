import mongoose,{Schema, Document, Types} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export interface User extends Document{
    _id : Types.ObjectId;
    username : string;
    email : string;
    password : string;
    generateToken : () => string;
    isPasswordCorrect : (password : string) => boolean;
}

const userSchema : Schema<User> = new Schema({
    username : {
        type : String,
        required : [true, "Please provide username"]
    },
    email : {
        type : String,
        unique : true,
        required : [true, "Please provide email"]
    },
    password : {
        type : String,
        requied : [true, "Please Provide password"]
    }
}, {timestamps : true})

userSchema.methods.generateToken = async function(){
    const token = jwt.sign(
        {_id : this._id},
        process.env.JWT_SECRET as string, 
        {expiresIn : '1d'}
    )

    return token;
}

userSchema.methods.isPasswordCorrect = async function(password : string){
    return await bcrypt.compare(password, this.password);
}

const UserModel = mongoose.model<User>("User", userSchema);
export default UserModel;