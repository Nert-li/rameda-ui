import { rqClient } from "@/shared/api/instance";

export function useAllReports() {
    const { data, isLoading, isError } = rqClient.useQuery("get", "/reports");

    return {
        reports: data?.reports || [],
        stats: data?.stats,
        isLoading,
        isError,
    };
}