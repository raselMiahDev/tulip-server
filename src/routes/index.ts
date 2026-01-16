import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import {UserProfileRoutes} from "../modules/user-profile/user.profile.route";

const router = Router();

router.use("/user", UserRoutes);
router.use("/profile", UserProfileRoutes);


router.get("/health",(req, res) => {
    res.status(200).json({message: "Tulip Connectivity REST API server : ALL IS WELL"});
})

export default router;
