import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

export const errorHandler = (
    err: any,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";
    let errors: any[] = [];

    // ✅ ZOD ERROR (FIXED)
    if (err instanceof ZodError) {
        statusCode = 400;
        message = "Validation error";
        errors = err.issues.map((issue) => ({
            path: issue.path.join("."),
            message: issue.message,
        }));
    }

    // MONGOOSE DUPLICATE KEY
    else if (err.code === 11000) {
        statusCode = 409;
        message = "Duplicate key error";
        errors = Object.keys(err.keyValue).map((key) => ({
            path: key,
            message: `${key} already exists`,
        }));
    }

    // MONGOOSE VALIDATION
    else if (err instanceof mongoose.Error.ValidationError) {
        statusCode = 400;
        message = "Validation error";
        errors = Object.values(err.errors).map((e: any) => ({
            path: e.path,
            message: e.message,
        }));
    }

    // JWT ERROR
    else if (err instanceof jwt.JsonWebTokenError) {
        statusCode = 401;
        message = "Invalid token";
    }

    res.status(statusCode).json({
        success: false,
        message,
        errors,
    });
};
