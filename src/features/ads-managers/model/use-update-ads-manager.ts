import { rqClient } from "@/shared/api/instance";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUpdateAdsManager() {
    const queryClient = useQueryClient();

    const updateAdsManagerMutation = rqClient.useMutation("put", "/ads_managers/{adsManagerId}", {
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["ads_managers"],
            });
            toast.success("Ads manager updated successfully!");
        },
        onError: () => {
            toast.error("Failed to update ads manager");
        },
    });

    return {
        isPending: updateAdsManagerMutation.isPending,
        updateAdsManager: updateAdsManagerMutation.mutate,
    };
} 