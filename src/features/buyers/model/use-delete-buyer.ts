import { rqClient } from "@/shared/api/instance";
import { useQueryClient } from "@tanstack/react-query";

export function useDeleteBuyer() {
    const queryClient = useQueryClient();

    const deleteBuyerMutation = rqClient.useMutation("delete", "/buyers/{buyerId}", {
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: rqClient.queryKey("get", "/buyers"),
            });
        },
    });

    return {
        isPending: deleteBuyerMutation.isPending,
        deleteBuyer: deleteBuyerMutation.mutate,
    };
} 