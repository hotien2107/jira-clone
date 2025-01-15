import {client} from "@/lib/rpc";
import {useQuery} from "@tanstack/react-query";

export const useGetUserInfo = () => {
    return useQuery({
        queryKey: ["user-info"],
        queryFn: async (query) => {
            const response = await client.api.v1.auth["user-info"]["$get"]()
            if (!response.ok) {
                return null
            }
            return await response.json()
        }
    })
}