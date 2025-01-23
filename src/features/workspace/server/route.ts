import {Hono} from "hono";
import {zValidator} from "@hono/zod-validator";
import {createWorkspaceSchema} from "@/features/workspace/schema";
import {sessionMiddleware} from "@/lib/session-middleware";
import {GeneralResponseType} from "@/features/types";
import {RegisterResponseType} from "@/features/auth/server/types";

const app = new Hono()
    .post(
        "/",
        zValidator("json", createWorkspaceSchema),
        sessionMiddleware,
        async (c) => {
            const {name} = c.req.valid("json")
            const res = await fetch("http://localhost:8080/api/jira-clone-api/v1/workspaces", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({name})
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

export default app