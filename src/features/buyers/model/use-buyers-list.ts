import { rqClient } from "@/shared/api/instance";

export function useBuyersList() {
    const { data, isLoading, isError } = rqClient.useQuery("get", "/buyers", {});

    return {
        buyers: data?.buyers ?? [],
        isLoading,
        isError,
    };
} 