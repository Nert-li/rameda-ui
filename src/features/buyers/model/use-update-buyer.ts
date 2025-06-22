import { rqClient } from "@/shared/api/instance";
import { useQueryClient } from "@tanstack/react-query";

export function useUpdateBuyer() {
    const queryClient = useQueryClient();

    const updateBuyerMutation = rqClient.useMutation("put", "/buyers/{buyerId}", {
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: rqClient.queryKey("get", "/buyers"),
            });
        },
    });

    return {
        isPending: updateBuyerMutation.isPending,
        updateBuyer: updateBuyerMutation.mutate,
    };
} 