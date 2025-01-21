import {client} from "@/lib/rpc";
import {useMutation} from "@tanstack/react-query";
import {InferRequestType, InferResponseType} from "hono";
import {useRouter} from "next/navigation";

type RequestType = InferRequestType<typeof client.api.v1.auth.register["$post"]>["json"]
type ResponseType = InferResponseType<typeof client.api.v1.auth.register["$post"]>


export const useRegister = () => {
    const router = useRouter()
    return useMutation<ResponseType, Error, RequestType>(
        {
            mutationFn: async (json) => {
                const res = await client.api.v1.auth.register["$post"]({json})
                return await res.json()
            },
            onSuccess: () => {
                router.push("/sign-in")
            }
        }
    )
}