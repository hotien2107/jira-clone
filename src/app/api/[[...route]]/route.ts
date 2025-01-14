import {Hono} from "hono";
import {handle} from "hono/vercel";
import authServer from "@/features/auth/servers/route"

const app = new Hono().basePath("/api/v1")
const routes = app
    .route("/auth", authServer)

export const GET = handle(app)
export const POST = handle(app)

export type AppType = typeof routes