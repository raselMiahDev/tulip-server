import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import {UserProfileRoutes} from "../modules/user-profile/user.profile.route";
import {Request,Response} from "express";
import {User} from "../modules/user/user.model";

const router = Router();

router.use("/user", UserRoutes);
router.get("/data",async (req: Request, res: Response) => {
    const data = await User.find();
    res.status(200).json(data);
})
router.use("/profile", UserProfileRoutes);


router.get("/health",(req, res) => {
    res.status(200).json({message: "Tulip Connectivity REST API server : ALL IS WELL"});
})

export default router;
