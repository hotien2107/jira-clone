import {InferRequestType, InferResponseType} from "hono";
import {client} from "@/lib/rpc";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useRouter} from "next/navigation";
import {toast} from "sonner";

type RequestType = InferRequestType<typeof client.api.v1.auth.login["$post"]>["json"]
type ResponseType = InferResponseType<typeof client.api.v1.auth.login["$post"]>

export const useLogin = () => {
    const queryClient = useQueryClient()
    const router = useRouter()
    return useMutation<ResponseType, Error, RequestType>(
        {
            mutationFn: async (json) => {
                const res = await client.api.v1.auth.login["$post"]({json})
                if (!res.ok) {
                    throw new Error("Login failed");
                }
                return await res.json()
            },
            onSuccess: () => {
                toast.success("Login successful");
                queryClient.invalidateQueries({queryKey: ["user-info"]})
                router.refresh()
            },
            onError: () => {
                toast.error("Login failed")
            }
        }
    )
}