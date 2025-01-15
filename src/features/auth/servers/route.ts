import {Hono} from "hono";
import {zValidator} from "@hono/zod-validator";
import {loginSchema, registerSchema} from "@/features/auth/schemas";
import {createAdminClient} from "@/lib/appwrite";
import {ID} from "node-appwrite";
import {deleteCookie, setCookie} from "hono/cookie";
import {AUTH_COOKIE_NAME} from "@/features/auth/constants";
import {sessionMiddleware} from "@/lib/session-middleware";


const app = new Hono()
    .post(
        "/login",
        zValidator("json", loginSchema),
        async (c) => {
            const {email, password} = c.req.valid("json")
            const {account} = await createAdminClient()
            await account.get()
            return c.json({"email": email, password: password});
        }
    )
    .post("/register",
        zValidator("json", registerSchema),
        async (c) => {
            const {email, password, name} = c.req.valid("json")
            const {account} = await createAdminClient()
            await account.create(ID.unique(), email, password, name)
            const session = await account.createEmailPasswordSession(email, password)
            setCookie(c, AUTH_COOKIE_NAME, session.secret, {
                path: "/",
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                maxAge: 60 * 60 * 24 * 30
            })
            return c.json({success: true});
        }
    )
    .post("/logout", sessionMiddleware,
        async (c) => {
            const account = c.get("account")
            deleteCookie(c, AUTH_COOKIE_NAME)
            await account.deleteSession("current ")

            return c.json({success: true});
        })
    .get("/user-info", sessionMiddleware,
        (c) => {
            const user = c.get("user")
            return c.json(user)
        })


export default app