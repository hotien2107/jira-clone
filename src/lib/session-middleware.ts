import {createMiddleware} from "hono/factory";
import {
    type Account as AccountType,
    Account,
    Client,
    type Databases as DatabaseType,
    Databases,
    Models
} from "node-appwrite";
import {getCookie} from "hono/cookie";
import {AUTH_COOKIE_NAME} from "@/features/auth/constants";

type AdditionContext = {
    Variables: {
        user: Models.User<Models.Preferences>
        account: AccountType
        databases: DatabaseType
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
        const databases = new Databases(client)
        c.set("user", user)
        c.set("account", account)
        c.set("databases", databases)
        return next()
    }
)