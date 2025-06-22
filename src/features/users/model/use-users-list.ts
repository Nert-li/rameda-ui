import { rqClient } from "@/shared/api/instance";

export function useUsersList() {
    const { data, isLoading } = rqClient.useQuery("get", "/users", {});

    return {
        users: data?.users,
        isLoading,
    };
} 