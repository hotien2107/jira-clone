import {createMiddleware} from "hono/factory";
import {type Account as AccountType, Account, Client, Models} from "node-appwrite";
import {getCookie} from "hono/cookie";
import {AUTH_COOKIE_NAME} from "@/features/auth/constants";

type AdditionContext = {
    Variables: {
        user: Models.User<Models.Preferences>
        account: AccountType
    }
}

export const sessionMiddleware = createMiddleware<AdditionContext>(
    async (c, next) => {
        const client = new Client()
            .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT ?? "")
            .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT ?? "");

        const session = getCookie(c, AUTH_COOKIE_NAME)
        if (!session) {
            return c.json({error: "Unauthorized"}, 401)
        }
        client.setSession(session)
        const account = new Account(client)
        const user = await account.get()
        c.set("user", user)
        c.set("account", account)
        return next()
    }
)