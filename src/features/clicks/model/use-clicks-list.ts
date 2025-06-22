import { rqClient } from "@/shared/api/instance";

type Query = NonNullable<Parameters<(typeof rqClient)["useQuery"]>[2]>["query"];

export function useClicksList(query: Query) {
    const { data, isLoading } = rqClient.useQuery("get", "/clicks", {
        query,
    });

    return {
        clicks: data?.clicks,
        total_count: data?.total_count,
        filtered_count: data?.filtered_count,
        isLoading,
    };
} 