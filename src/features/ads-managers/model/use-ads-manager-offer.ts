import { rqClient } from "@/shared/api/instance";

export const useAdsManagerOffer = (adsManagerId: string) => {
    const { data, isLoading, isError } = rqClient.useQuery("get", "/ads_managers/{adsManagerId}/offer", {
        params: { path: { adsManagerId } },
    });

    return {
        offer: data?.offer || null,
        isLoading,
        isError,
    };
}; 