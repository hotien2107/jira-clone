import z from "zod";

export const loginSchema = z.object({
    email: z.string().trim().email().min(1, "Required"),
    password: z.string().min(1, "Required"),
})

export const registerSchema = z.object({
    email: z.string().trim().email().min(1, "Email is required"),
    password: z.string().min(8, "Password must be at least 8 characters").max(256, "Password maximum 256 characters"),
    name: z.string().trim().min(1, "Name is required"),
})