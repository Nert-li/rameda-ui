import { rqClient } from "@/shared/api/instance";
import { useQueryClient } from "@tanstack/react-query";

export function useCreateBuyer() {
    const queryClient = useQueryClient();

    const createBuyerMutation = rqClient.useMutation("post", "/buyers", {
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: rqClient.queryKey("get", "/buyers"),
            });
        },
    });

    return {
        isPending: createBuyerMutation.isPending,
        createBuyer: createBuyerMutation.mutate,
    };
} 