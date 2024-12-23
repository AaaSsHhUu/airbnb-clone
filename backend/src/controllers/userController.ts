import { NextFunction, Request, Response } from "express";
import { userSigninSchema, userSignupSchema } from "../schemas/userSchema";
import ApiError from "../utils/ApiError";
import UserModel from "../models/userModel";
import bcrypt from "bcrypt";
import asyncHandler from "../utils/asyncHandler";

export const signup = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password } = req.body;

    // zod validation
    const { success, error } = userSignupSchema.safeParse({
      username,
      email,
      password,
    });

    if (!success) {
      throw new ApiError(400, error.message || "Invalid Input");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      username,
      email,
      password: hashedPassword,
    });

    if (!newUser) {
      throw new ApiError(500, "Some error occured while creating new user");
    }

    const accessToken = await newUser.generateToken();
    // console.log("accessToken in sign-up : ", accessToken);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
        success : true,
        message : `Welcome ${newUser.username}`,
        // accessToken,
        // newUser
    })
  }
);

export const login = asyncHandler(async (req : Request, res : Response) => {
  const {email, password} = req.body;
  
  // Zod validation
  const {success, error} = userSigninSchema.safeParse({email, password});

  if(!success){
    throw new ApiError(400, error.message || "Invalid Inputs")
  }

  const isUserRegistered = await UserModel.findOne({email});
  
  if(!isUserRegistered){
    throw new ApiError(404, "User not registered, Please sign-up first");
  }

  const isPasswordCorrect = isUserRegistered.isPasswordCorrect(password);
  if(!isPasswordCorrect){
    throw new ApiError(400, "Invalid email or password");
  }

  const accessToken = await isUserRegistered.generateToken();
  // console.log("token after login : ", accessToken);

  res.cookie("accessToken", accessToken , {
    httpOnly : true,
    maxAge : 24 * 60 * 60 * 1000,
  })

  return res.status(200).json({
    success : true,
    message : `Welcome ${isUserRegistered.username}`,
    user : isUserRegistered
  })

})

export const logout = asyncHandler(async (req : Request, res : Response) => {
    console.log("req user before log out : ", req.user);
    console.log("token before log out : ", req.cookies.accessToken);
    res.clearCookie("accessToken",{
      httpOnly : true
    })
    
    req.user = undefined;

    return res.status(200).json({
        success : true,
        message : "Logged out"
    })
})

export const getCurrentUser = asyncHandler(async (req : Request, res : Response) => {
    const loggedInUser = req.user;
    if(!loggedInUser){
      throw new ApiError(404, "No current User, Login first");
    }
    return res.json({
        currentUser : loggedInUser
    })
})