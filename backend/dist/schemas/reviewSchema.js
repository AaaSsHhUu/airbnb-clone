"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const reviewSchema = zod_1.z.object({
    username: zod_1.z.string().optional(),
    comment: zod_1.z.string().min(10, { message: "Comment must have atleast 10 characters" }),
    author: zod_1.z.string().optional(),
    rating: zod_1.z.number().min(1).max(5)
});
exports.default = reviewSchema;
