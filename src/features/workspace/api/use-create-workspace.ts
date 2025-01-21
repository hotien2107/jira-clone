import {InferRequestType, InferResponseType} from "hono";
import {client} from "@/lib/rpc";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useRouter} from "next/navigation";

type RequestType = InferRequestType<typeof client.api.v1.workspace["$post"]>
type ResponseType = InferResponseType<typeof client.api.v1.workspace["$post"]>

export const useCreateWorkspace = () => {
    const queryClient = useQueryClient()
    const router = useRouter()
    return useMutation<ResponseType, Error, RequestType>(
        {
            mutationFn: async (json) => {
                const response = await client.api.v1.workspace["$post"](json);
                return await response.json()
            },
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: ["workspaces"]})
                router.refresh()
            }
        }
    )
}