"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const listingSchema = zod_1.z.object({
    title: zod_1.z.string(),
    description: zod_1.z.string(),
    image: zod_1.z.object({
        url: zod_1.z.string(),
        filename: zod_1.z.string()
    }),
    price: zod_1.z.number().min(500, { message: "Price must be greater than 500" }),
    location: zod_1.z.string(),
    country: zod_1.z.string(),
    reviews: zod_1.z.array(zod_1.z.string()).default([]),
    owner: zod_1.z.string().optional(),
    category: zod_1.z.enum(["rooms", "mountains", "mountain-city", "castles", "forts", "swimming", "beaches", "hiking", "hotels", "snow", "camping", "farms"]).default("rooms"),
});
exports.default = listingSchema;
