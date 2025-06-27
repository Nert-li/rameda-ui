import { createListHooks } from "@/shared/api/hooks/use-list";

const conversionsConfig = {
    endpoint: "/conversions",
    dataKey: "conversions" as const,
    defaultSortField: "created_at",
    defaultSortDirection: "desc" as const,
};

const { useEntityListDefault, useEntityList } = createListHooks(conversionsConfig);

export const useConversionsListDefault = useEntityListDefault;
export const useConversionsList = useEntityList; 