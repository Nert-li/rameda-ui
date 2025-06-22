import { rqClient } from "@/shared/api/instance";
import { paths } from "@/shared/api/schema/generated";

type PromoCodesListParams = paths["/promo_codes"]["get"]["parameters"]["query"];

export function usePromoCodesList(params: PromoCodesListParams = {}) {
    const { data, isLoading } = rqClient.useQuery("get", "/promo_codes", {
        params: {
            query: params,
        },
    });

    return {
        promoCodes: data?.promo_codes,
        isLoading,
        totalCount: data?.total_count,
        activeCount: data?.active_count,
        expiredCount: data?.expired_count,
    };
} 