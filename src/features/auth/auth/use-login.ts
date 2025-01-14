import {InferRequestType, InferResponseType} from "hono";
import {client} from "@/lib/rpc";
import {useMutation} from "@tanstack/react-query";

type RequestType = InferRequestType<typeof client.api.v1.auth.login["$post"]>["json"]
type ResponseType = InferResponseType<typeof client.api.v1.auth.login["$post"]>

export const useLogin = () => {
    return useMutation<ResponseType, Error, RequestType>(
        {
            mutationFn: async (json) => {
                const response = await client.api.v1.auth.login["$post"]({json});
                return await response.json()
            }
        }
    )
}