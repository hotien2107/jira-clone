import {Hono} from "hono";
import {zValidator} from "@hono/zod-validator";
import {createWorkspaceSchema} from "@/features/workspace/schema";
import {sessionMiddleware} from "@/lib/session-middleware";
import {DATABASE_ID, WORKSPACE_ID} from "@/config";
import {ID} from "node-appwrite";

const app = new Hono()
    .post(
        "/",
        zValidator("json", createWorkspaceSchema),
        sessionMiddleware,
        async (c) => {
            const databases = c.get("databases")
            const user = c.get("user")
            const {name} = c.req.valid("json")
            const workspace = await databases.createDocument(
                DATABASE_ID,
                WORKSPACE_ID,
                ID.unique(),
                {
                    name: name,
                    user_id: user.$id
                }
            )
            return c.json({data: workspace})
        }
    )

export default app