import { rqClient } from "@/shared/api/instance";

export const useAdsManagerOffers = (adsManagerId: string) => {
    const { data, isLoading, isError } = rqClient.useQuery("get", "/ads_managers/{adsManagerId}/offers", {
        params: { path: { adsManagerId } },
    });

    return {
        offers: data?.offers || [],
        isLoading,
        isError,
    };
}; 