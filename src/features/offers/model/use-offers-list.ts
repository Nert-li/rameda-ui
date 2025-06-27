import { createListHooks } from "@/shared/api/hooks/use-list";

const offersConfig = {
    endpoint: "/offers",
    dataKey: "offers" as const,
    defaultSortField: "created_at",
    defaultSortDirection: "desc" as const,
};

const { useEntityListDefault, useEntityList } = createListHooks(offersConfig);

export const useOffersListDefault = useEntityListDefault;
export const useOffersList = useEntityList; 