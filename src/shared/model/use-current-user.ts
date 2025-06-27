import { useQuery } from "@tanstack/react-query";
import { fetchClient } from "@/shared/api/instance";
import { ApiSchemas } from "@/shared/api/schema";
import { useSession } from "./use-session";

const getCurrentUser = async (): Promise<ApiSchemas["User"]> => {
    const response = await fetchClient.GET("/auth/current_user");

    if (!response.response.ok) {
        throw new Error("Failed to fetch current user");
    }

    return response.data!;
};

export function useCurrentUser() {
    const { isAuthenticated } = useSession();

    const query = useQuery({
        queryKey: ["current_user"],
        queryFn: getCurrentUser,
        enabled: isAuthenticated,
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes
        retry: (failureCount, error) => {
            // Don't retry on 401 errors
            if (error?.message?.includes("401")) {
                return false;
            }
            return failureCount < 3;
        },
    });

    return {
        user: query.data,
        isLoading: query.isLoading,
        error: query.error,
        refetch: query.refetch,
        // Simple role checks
        isAdmin: query.data?.role === "admin",
        isManager: query.data?.role === "manager",
        isBuyer: query.data?.role === "buyer",
    };
} 