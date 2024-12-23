import {z} from "zod";

const listingSchema = z.object({
    title : z.string(),
    description : z.string(),
    image : z.object({
        url : z.string(),
        filename : z.string()
    }),
    price : z.number().min(500,{message : "Price must be greater than 500"}),
    location : z.string(),
    country : z.string(),
    reviews : z.array(z.string()).default([]),
    owner : z.string().optional(),
    category : z.enum(["rooms","mountains","mountain-city","castles","forts","swimming","beaches","hiking","hotels","snow","camping","farms"]).default("rooms"),
})

export default listingSchema;