import { createListHooks } from "@/shared/api/hooks/use-list";

const adsManagersConfig = {
    endpoint: "/ads_managers",
    dataKey: "adsManagers" as const,
    defaultSortField: "created_at",
    defaultSortDirection: "desc" as const,
};

const { useEntityListDefault, useEntityList } = createListHooks(adsManagersConfig);

export const useAdsManagersListDefault = useEntityListDefault;
export const useAdsManagersList = useEntityList; 