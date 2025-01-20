import {InferRequestType, InferResponseType} from "hono";
import {client} from "@/lib/rpc";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useRouter} from "next/navigation";

type RequestType = InferRequestType<typeof client.api.v1.auth.login["$post"]>["json"]
type ResponseType = InferResponseType<typeof client.api.v1.auth.login["$post"]>

export const useLogin = () => {
    const queryClient = useQueryClient()
    const router = useRouter()
    return useMutation<ResponseType, Error, RequestType>(
        {
            mutationFn: async (json) => {
                const response = await client.api.v1.auth.login["$post"]({json});
                return await response.json()
            },
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: ["user-info"]})
                router.refresh()
            }
        }
    )
}