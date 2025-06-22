import { rqClient } from "@/shared/api/instance";
import { useQueryClient } from "@tanstack/react-query";

export function useDeleteAdsManager() {
    const queryClient = useQueryClient();

    const deleteAdsManagerMutation = rqClient.useMutation("delete", "/ads_managers/{adsManagerId}", {
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["ads_managers"],
            });
        },
    });

    return {
        isPending: deleteAdsManagerMutation.isPending,
        deleteAdsManager: deleteAdsManagerMutation.mutate,
    };
} 