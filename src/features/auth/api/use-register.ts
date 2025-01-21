import {InferRequestType, InferResponseType} from "hono";
import {client} from "@/lib/rpc";
import {useMutation} from "@tanstack/react-query";

type RequestType = InferRequestType<typeof client.api.v1.auth.register["$post"]>["json"]
type ResponseType = InferResponseType<typeof client.api.v1.auth.register["$post"]>

export const useRegister = () => {
    return useMutation<ResponseType, Error, RequestType>(
        {
            mutationFn: async (json) => {
                const response = await client.api.v1.auth.register["$post"]({json});
                return await response.json()
            }
        }
    )
}