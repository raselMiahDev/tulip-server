import { z } from "zod";
import {Types} from "mongoose";

export const createUserProfileSchema = z.object(
    {
        user_id: z.string(),
        phone_number: z.string().min(11),
        depo_name: z.string().min(5),
        zone: z.string().min(4),
        depo_location: z.string().min(5),
        bank_account: z.string().min(17),
        image: z.string().optional(),
    }
)

export const updateUserProfileSchema = z.object({
    phone_number: z.string().min(11).optional(),
    depo_name: z.string().min(2).optional(),
    zone: z.string().min(2).optional(),
    depo_location: z.string().min(2).optional(),
    bank_account: z.string().min(5).optional(),
});
