import { rqClient } from "@/shared/api/instance";
import { useQueryClient } from "@tanstack/react-query";

export function useCreateReport() {
    const queryClient = useQueryClient();

    const createReportMutation = rqClient.useMutation("post", "/ads_managers/{adsManagerId}/reports", {
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["ads_managers"],
            });
            await queryClient.invalidateQueries({
                queryKey: ["reports"],
            });
        },
    });

    return {
        isPending: createReportMutation.isPending,
        createReport: createReportMutation.mutate,
    };
} 