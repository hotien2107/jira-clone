import {client} from "@/lib/rpc";
import {useQuery} from "@tanstack/react-query";

export const useGetUserInfo = () => {
    return useQuery({
        queryKey: ["user-info"],
        queryFn: async () => {
            const response = await client.api.v1.auth["user-info"]["$get"]()
            if (!response.ok) {
                const logoutRes = await client.api.v1.auth["logout"]["$post"]()
                if (!logoutRes.ok) {
                    return null
                }
                return null
            }
            return await response.json()
        },
        retry: false
    })
}