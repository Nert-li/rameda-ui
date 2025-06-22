import { rqClient } from "@/shared/api/instance";

export function useOffersList() {
    const { data, isLoading } = rqClient.useQuery("get", "/offers", {});

    return {
        offers: data?.offers,
        isLoading,
    };
} 