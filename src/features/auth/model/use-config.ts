import { useQuery } from "@tanstack/react-query";
import { publicFetchClient } from "@/shared/api/instance";
import { ApiSchemas } from "@/shared/api/schema";

const getConfig = async (): Promise<ApiSchemas["Config"]> => {
    const response = await publicFetchClient.GET("/auth/config");

    if (!response.response.ok) {
        throw new Error("Failed to fetch config");
    }

    return response.data!;
};

export function useConfig() {
    const query = useQuery({
        queryKey: ["config"],
        queryFn: getConfig,
        staleTime: 30 * 60 * 1000, // 30 minutes
        gcTime: 60 * 60 * 1000, // 1 hour
        refetchOnWindowFocus: false,
    });

    return {
        config: query.data,
        isLoading: query.isLoading,
        error: query.error,
        refetch: query.refetch,
    };
} 