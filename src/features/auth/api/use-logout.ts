import {InferResponseType} from "hono";
import {client} from "@/lib/rpc";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useRouter} from "next/navigation";
import {toast} from "sonner";

type ResponseType = InferResponseType<typeof client.api.v1.auth.logout["$post"]>

export const useLogout = () => {
    const queryClient = useQueryClient()
    const router = useRouter()
    return useMutation<ResponseType, Error>(
        {
            mutationFn: async (json) => {
                const response = await client.api.v1.auth.logout["$post"]({json});
                if (!response.ok) {
                    throw new Error("Logout failed");
                }
                return await response.json()
            },
            onSuccess: () => {
                toast.success("Logout successful");
                router.refresh()
                queryClient.invalidateQueries({queryKey: ["user-info"]})
            },
            onError: () => {
                toast.error("Logout failed")
            }
        }
    )
}