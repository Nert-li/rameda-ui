import { createListHooks } from "@/shared/api/hooks/use-list";

const clicksConfig = {
    endpoint: "/clicks",
    dataKey: "clicks" as const,
    defaultSortField: "created_at",
    defaultSortDirection: "desc" as const,
};

const { useEntityListDefault, useEntityList } = createListHooks(clicksConfig);

export const useClicksListDefault = useEntityListDefault;
export const useClicksList = useEntityList; 