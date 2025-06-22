import { rqClient } from "@/shared/api/instance";
import { paths } from "@/shared/api/schema/generated";

type ConversionsListParams = paths["/conversions"]["get"]["parameters"]["query"];

export function useConversionsList(params: ConversionsListParams = {}) {
    const { data, isLoading } = rqClient.useQuery("get", "/conversions", {
        params: {
            query: params,
        },
    });

    return {
        conversions: data?.conversions,
        pagination: data?.pagination,
        stats: data?.stats,
        isLoading,
    };
} 