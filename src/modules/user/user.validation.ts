import { z } from "zod";

export const createUserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
});
export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export const updateUserSchema = z.object({
    name: z.string().min(1).optional(),
    email: z.string().email().optional(),
    role: z.enum(["admin", "manager", "user"]).optional(),
    isActive: z.boolean().optional(),
});