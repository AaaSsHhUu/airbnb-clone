import {z} from "zod";

const reviewSchema = z.object({
    username : z.string().optional(),
    comment : z.string().min(10,{message : "Comment must have atleast 10 characters"}),
    author : z.string().optional(),
    rating : z.number().min(1).max(5)
})

export default reviewSchema;