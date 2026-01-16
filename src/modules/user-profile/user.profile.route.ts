import { Router } from "express";
import { upsertUserProfile } from "./user.profile.controller";
import { upload } from "../../middlewares/upload";
import { auth } from "../../middlewares/auth";

const router = Router();

/**
 * PATCH /api/v1/profiles/:userId
 * multipart/form-data
 */
router.patch(
    "/:userId",
    auth("admin"),
    upload.single("image"),
    upsertUserProfile
);

export const UserProfileRoutes = router;
