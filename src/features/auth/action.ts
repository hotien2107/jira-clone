import {client} from "@/lib/rpc";

export const getCurrentUser = async () => {
    try {
        const res = await client.api.v1.auth["user-info"]["$get"]()
        const data = await res.json()
        if (!data.id) {
            return null
        }
        return data
    } catch {
        return null
    }
}