import {InferResponseType} from "hono";
import {client} from "@/lib/rpc";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useRouter} from "next/navigation";

type ResponseType = InferResponseType<typeof client.api.v1.auth.logout["$post"]>

export const useLogout = () => {
    const queryClient = useQueryClient()
    const router = useRouter()
    return useMutation<ResponseType, Error>(
        {
            mutationFn: async (json) => {
                const response = await client.api.v1.auth.logout["$post"]({json});
                return await response.json()
            },
            onSuccess: () => {
                router.refresh()
                queryClient.invalidateQueries({queryKey: ["user-info"]})
            }
        }
    )
}