/* eslint-disable @typescript-eslint/no-unused-vars */
import {Hono} from "hono";
import {handle} from "hono/vercel";
import authServer from "@/features/auth/server/route"
import workspaceServer from "@/features/workspace/server/route"

const app = new Hono().basePath("/api/v1")
const routes = app
    .route("/auth", authServer)
    .route("/workspace", workspaceServer)

export const GET = handle(app)
export const POST = handle(app)

export type AppType = typeof routes