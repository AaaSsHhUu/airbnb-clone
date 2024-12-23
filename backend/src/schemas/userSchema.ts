import { z } from "zod";

export const userSignupSchema = z.object({
    username : z.string(),
    email : z.string().email(),
    password : z.string().min(8, { message : "Password length must be greater than 8 characters"})
})

export const userSigninSchema = z.object({
    email : z.string().email(),
    password : z.string()
})

export type UserSignup = z.infer<typeof userSignupSchema>;
export type UserSignin = z.infer<typeof userSigninSchema>;