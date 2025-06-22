import { rqClient } from "@/shared/api/instance";
import { useQueryClient } from "@tanstack/react-query";

export function useUpdateOffer() {
    const queryClient = useQueryClient();

    const updateOfferMutation = rqClient.useMutation("put", "/offers/{offerId}", {
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["offers"],
            });
            await queryClient.invalidateQueries({
                queryKey: ["ads_managers"],
            });
        },
    });

    return {
        isPending: updateOfferMutation.isPending,
        updateOffer: updateOfferMutation.mutate,
    };
} 