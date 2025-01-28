import {client} from "@/lib/rpc";
import {useMutation} from "@tanstack/react-query";
import {InferRequestType, InferResponseType} from "hono";
import {useRouter} from "next/navigation";
import {toast} from "sonner";

type RequestType = InferRequestType<typeof client.api.v1.auth.register["$post"]>["json"]
type ResponseType = InferResponseType<typeof client.api.v1.auth.register["$post"]>


export const useRegister = () => {
    const router = useRouter()
    return useMutation<ResponseType, Error, RequestType>(
        {
            mutationFn: async (json) => {
                const res = await client.api.v1.auth.register["$post"]({json})
                if (!res.ok) {
                    throw new Error("Registration failed");
                }
                return await res.json()
            },
            onSuccess: () => {
                toast.success("Registration successful");
                router.push("/sign-in")
            },
            onError: () => {
                toast.error("Registration failed")
            }
        }
    )
}