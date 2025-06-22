import { rqClient } from "@/shared/api/instance";

export const useAdsManagersList = () => {
    const { data, isLoading, isError } = rqClient.useQuery("get", "/ads_managers");

    return {
        adsManagers: data?.ads_managers || [],
        isLoading,
        isError,
        stats: data?.stats,
        pagination: data?.pagination,
    };
}; 