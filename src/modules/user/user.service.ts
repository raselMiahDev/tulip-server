import { User } from "./user.model";
import bcrypt from "bcrypt";
import { ApiError } from "../../utils/ApiError";

export const registerUser = async (payload: any) => {
    const isExist = await User.findOne({ email: payload.email });

    if (isExist) {
        throw new ApiError(409, "Email already registered");
    }

    payload.password = await bcrypt.hash(payload.password, 10);
    return User.create(payload);
};

export const updateUserById = async (
    userId: string | string[],
    payload: Partial<any>
) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // Optional: prevent email duplication
    if (payload.email) {
        const isEmailExist = await User.findOne({
            email: payload.email,
            _id: { $ne: userId },
        });

        if (isEmailExist) {
            throw new ApiError(409, "Email already in use");
        }
    }

    Object.assign(user, payload);
    await user.save();

    return user;
};