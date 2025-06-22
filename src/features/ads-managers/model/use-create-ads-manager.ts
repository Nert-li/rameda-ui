import { rqClient } from "@/shared/api/instance";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreateAdsManager() {
    const queryClient = useQueryClient();

    const createAdsManagerMutation = rqClient.useMutation("post", "/ads_managers", {
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["ads_managers"],
            });
            toast.success("Ads manager created successfully!");
        },
        onError: () => {
            toast.error("Failed to create ads manager");
        },
    });

    return {
        isPending: createAdsManagerMutation.isPending,
        createAdsManager: createAdsManagerMutation.mutate,
    };
} 