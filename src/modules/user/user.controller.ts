import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import {registerUser, updateUserById} from "./user.service";
import {createUserSchema, loginSchema, updateUserSchema} from "./user.validation";
import {User} from "./user.model";
import {ApiError} from "../../utils/ApiError";
import bcrypt from "bcrypt";
import {signToken} from "../../utils/jwt";

export const register = catchAsync(
    async (req: Request, res: Response) => {
        createUserSchema.parse(req.body);

        const user = await registerUser(req.body);

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: user,
        });
    }
);
export const login = catchAsync(
    async (req: Request, res: Response) => {
        // 1️⃣ Validate request body
        loginSchema.parse(req.body);

        const { email, password } = req.body;

        // 2️⃣ Find user
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            throw new ApiError(401, "Invalid email or password");
        }

        // 3️⃣ Compare password
        const isPasswordMatched = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordMatched) {
            throw new ApiError(401, "Invalid email or password");
        }

        // 4️⃣ Generate JWT
        const token = signToken(user._id.toString(), user.role);

        // 5️⃣ Response
        res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
            },
        });
    }
);

/**
 * GET ALL USERS
 * GET /api/v1/users
 */
export const getUsers = catchAsync(
    async (_req: Request, res: Response) => {
        const users = await User.find().limit(2).lean().select("-password");

        res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            data: users,
        });
    }
);

/**
 * GET USER BY ID
 * GET /api/v1/users/:id
 */
export const getUserById = catchAsync(
    async (req: Request, res: Response) => {
        const { id } = req.params;

        const user = await User.findById(id).select("-password");

        if (!user) {
            throw new ApiError(404, "User not found");
        }

        res.status(200).json({
            success: true,
            message: "User fetched successfully",
            data: user,
        });
    }
);

export const updateUser = catchAsync(
    async (req: Request, res: Response) => {
        // 1️⃣ Validate body
        updateUserSchema.parse(req.body);

        // 2️⃣ Update
        const updatedUser = await updateUserById(
            req.params.id,
            req.body
        );

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: updatedUser,
        });
    }
);
