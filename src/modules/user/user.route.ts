import { Router } from "express";
import {register, login, getUsers, getUserById, updateUser} from "./user.controller";
import {auth} from "../../middlewares/auth";

const router = Router();

router.post("/register", register);
router.post("/login", login);

// Protected Routes
router.get("/",getUsers);
router.get("/:id",auth("admin"), getUserById);
router.patch("/update/:id", auth("admin"), updateUser);

export const UserRoutes = router;
