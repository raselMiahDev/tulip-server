import { Schema, model } from "mongoose";
import {IUserProfile} from "./user.profile.interface";

const userProfileSchema = new Schema<IUserProfile>(
    {
        user_id: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true, // one profile per user
        },
        phone_number: {
            type: String,
            required: true,
        },
        depo_name: {
            type: String,
            required: true,
        },
        zone: {
            type: String,
            required: true,
        },
        depo_location: {
            type: String,
            required: true,
        },
        bank_account: {
            type: String,
        },
        image: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

export const UserProfile = model<IUserProfile>(
    "UserProfile",
    userProfileSchema
);
