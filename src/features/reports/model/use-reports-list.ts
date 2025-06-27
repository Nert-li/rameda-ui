import { createListHooks } from "@/shared/api/hooks/use-list";

const reportsConfig = {
    endpoint: "/reports",
    dataKey: "reports" as const,
    defaultSortField: "report_date",
    defaultSortDirection: "desc" as const,
};

const { useEntityListDefault, useEntityList } = createListHooks(reportsConfig);

export const useReportsListDefault = useEntityListDefault;
export const useReportsList = useEntityList; 