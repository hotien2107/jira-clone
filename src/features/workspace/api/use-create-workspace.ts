import {InferRequestType, InferResponseType} from "hono";
import {client} from "@/lib/rpc";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useRouter} from "next/navigation";
import {toast} from "sonner";

type RequestType = InferRequestType<typeof client.api.v1.workspace["$post"]>
type ResponseType = InferResponseType<typeof client.api.v1.workspace["$post"]>

export const useCreateWorkspace = () => {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation<ResponseType, Error, RequestType>(
        {
            mutationFn: async (json) => {
                try {
                    const response = await client.api.v1.workspace["$post"](json);
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return await response.json();
                } catch (error) {
                    console.error("Error creating workspace:", error);
                    throw error;
                }
            },
            onSuccess: () => {
                toast.success("Workspace created");
                queryClient.invalidateQueries({queryKey: ["workspaces"]});
                router.refresh();
            },
            onError: (error) => {
                console.error("Mutation error:", error);
                toast.error("Failed to create workspace");
            }
        }
    );
}