import { createListHooks } from "@/shared/api/hooks/use-list";

const promoCodesConfig = {
    endpoint: "/promo_codes",
    dataKey: "promoCodes" as const,
    defaultSortField: "created_at",
    defaultSortDirection: "desc" as const,
};

const { useEntityListDefault, useEntityList } = createListHooks(promoCodesConfig);

export const usePromoCodesListDefault = useEntityListDefault;
export const usePromoCodesList = useEntityList; 