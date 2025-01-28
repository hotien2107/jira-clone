import {Hono} from "hono";
import {zValidator} from "@hono/zod-validator";
import {createWorkspaceSchema} from "@/features/workspace/schema";
import {sessionMiddleware} from "@/lib/session-middleware";
import {GeneralResponseType} from "@/features/types";
import {RegisterResponseType} from "@/features/auth/server/types";

const app = new Hono()
    .post(
        "/",
        zValidator("form", createWorkspaceSchema),
        sessionMiddleware,
        async (c) => {
            const {name, image} = c.req.valid("form")
            const formData = new FormData();
            formData.set("name", name)
            if (image) {
                formData.set("image", image)
            }
            const res = await fetch("http://localhost:8080/api/jira-clone-api/v1/workspaces", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${c.get("token")}`
                },
                body: formData
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