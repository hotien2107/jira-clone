import {createMiddleware} from "hono/factory";
import {AUTH_COOKIE_NAME} from "@/features/auth/constants";
import {GeneralResponseType, User} from "@/features/types";
import {GetUserInfoResponseType} from "@/features/auth/server/types";
import {getCookie} from "hono/cookie";

type AdditionContext = {
    Variables: {
        user: User
        token: string
    }
}

export const sessionMiddleware = createMiddleware<AdditionContext>(
    async (c, next) => {
        const token = getCookie(c, AUTH_COOKIE_NAME)
        if (!token) {
            return c.json({error: "Unauthorized"}, 401)
        }
        const res = await fetch("http://localhost:8080/api/jira-clone-api/v1/auth/user-info", {
            headers: {
                "Authorization": `Bearer ${token}`
            },
        })
        const data = await res.json() as GeneralResponseType<GetUserInfoResponseType>
        if (res.ok && data.data) {
            c.set("token", token)
            c.set("user", {
                id: data.data.id,
                username: data.data.username,
                email: data.data.email
            })
        }
        return next()
    }
)