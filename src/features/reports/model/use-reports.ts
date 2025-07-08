import { createCrudHooks } from "@/shared/api";
import type { components } from "@/shared/api/schema/generated";

// Типы для reports из OpenAPI схемы
export type Report = components["schemas"]["ReportRecord"];
export type CreateReportData = components["schemas"]["ReportInput"];

// Создаем полный набор CRUD хуков для reports
const {
    useEntityList,
    useEntityListDefault,
    useEntityCreate,
    useEntityUpdate,
    useEntityDelete
} = createCrudHooks<Report>({
    entityName: "reports",
    basePath: "/reports",
    dataKey: "reports"
});

// Экспортируем типизированные хуки
export const useReportsList = () => useEntityList(1, 25);
export const useReportsListDefault = useEntityListDefault;

export const useCreateReport = () => useEntityCreate({
    onSuccess: (report) => {
        console.log("Отчёт создан:", report);
    },
    onError: (error) => {
        console.error("Ошибка создания отчёта:", error);
    }
});

export const useUpdateReport = () => useEntityUpdate({
    onSuccess: (report) => {
        console.log("Отчёт обновлён:", report);
    },
    onError: (error) => {
        console.error("Ошибка обновления отчёта:", error);
    }
});

export const useDeleteReport = () => useEntityDelete({
    confirmMessage: "Вы уверены, что хотите удалить этот отчёт?",
    onSuccess: () => {
        console.log("Отчёт удалён");
    },
    onError: (error) => {
        console.error("Ошибка удаления отчёта:", error);
    }
}); 