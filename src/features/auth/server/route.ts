import {Hono} from "hono";
import {zValidator} from "@hono/zod-validator";
import {loginSchema, registerSchema} from "@/features/auth/schemas";
import {deleteCookie, setCookie} from "hono/cookie";
import {AUTH_COOKIE_NAME} from "@/features/auth/constants";
import {sessionMiddleware} from "@/lib/session-middleware";
import {GeneralResponseType} from "@/features/types";
import {LoginResponseType, RegisterResponseType} from "@/features/auth/server/types";


const app = new Hono()
    .post(
        "/login",
        zValidator("json", loginSchema),
        async (c) => {
            const {username, password} = c.req.valid("json")
            const res = await fetch("http://localhost:8080/api/jira-clone-api/v1/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({password, username})
            })
            const data = await res.json() as GeneralResponseType<LoginResponseType>
            if (!res.ok || !data.data) {
                return c.json({
                    error: data.error,
                }, data.status_code);
            }
            setCookie(c, AUTH_COOKIE_NAME, data.data.access_token, {
                path: "/",
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                maxAge: 60 * 60 * 24 * 30
            })
            return c.json({data: data.data});
        }
    )
    .post("/register",
        zValidator("json", registerSchema),
        async (c) => {
            const {email, password, username} = c.req.valid("json")
            const res = await fetch("http://localhost:8080/api/jira-clone-api/v1/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({password, username, email})
            })
            const data = await res.json() as GeneralResponseType<RegisterResponseType>
            if (!res.ok || !data.data) {
                return c.json({
                    error: data.error,
                }, data.status_code);
            }
            return c.json({data: data.data});
        }
    )
    .post("/logout",
        async (c) => {
            deleteCookie(c, AUTH_COOKIE_NAME)
            return c.json({success: true});
        })
    .get("/user-info", sessionMiddleware,
        (c) => {
            const user = c.get("user")
            return c.json(user)
        })


export default app