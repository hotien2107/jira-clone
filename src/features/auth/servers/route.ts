import {Hono} from "hono";
import {zValidator} from "@hono/zod-validator";
import {loginSchema} from "@/features/auth/schemas";

const app = new Hono()
    .post(
        "/login",
        zValidator("json", loginSchema),
        (c) => {
            const {email, password} = c.req.valid("json")
            return c.json({"email": email, password: password});
        }
    )
    .post("/register")


export default app