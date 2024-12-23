import { NextFunction, Request, Response } from "express";
import ApiError from "../utils/ApiError";

const errorMiddleware = (err : ApiError, req : Request, res : Response, next : NextFunction) => {
    err.message ||= "Some error occured";
    err.statusCode ||= 500;

    res.status(err.statusCode).json({
        success : false,
        message : err.message,
        error : err
    })
}

export default errorMiddleware;