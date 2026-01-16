import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { UserProfile } from "./user.profile.model";
import { updateUserProfileSchema } from "./user.profile.validation";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";

export const upsertUserProfile = catchAsync(
    async (req: Request & { file?: Express.Multer.File }, res: Response) => {
        // 1️⃣ Validate text fields
        updateUserProfileSchema.parse(req.body);

        // 2️⃣ Profile searching
        let profile = await UserProfile.findOne({
            user_id: req.params.userId,
        });

        // 3️⃣ Image থাকলে upload করো
        let imageUrl: string | undefined;
        if (req.file) {
            imageUrl = await uploadToCloudinary(req.file);
        }

        // 4️⃣ যদি profile না থাকে → CREATE
        if (!profile) {
            profile = await UserProfile.create({
                user_id: req.params.userId,
                ...req.body,
                ...(imageUrl && { image: imageUrl }),
            });

            return res.status(201).json({
                success: true,
                message: "User profile created successfully",
                data: profile,
            });
        }

        // 5️⃣ Profile থাকলে → UPDATE
        Object.assign(profile, req.body);
        if (imageUrl) profile.image = imageUrl;

        await profile.save();

        res.status(200).json({
            success: true,
            message: "User profile updated successfully",
            data: profile,
        });
    }
);

