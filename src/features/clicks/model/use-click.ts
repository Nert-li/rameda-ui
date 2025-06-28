import { createCrudHooks } from "@/shared/api";
import type { components } from "@/shared/api/schema/generated";

// Типы для clicks из OpenAPI схемы
export type Click = components["schemas"]["ClickRecord"];

// Создаем полный набор CRUD хуков для clicks
const {
    useEntityList,
    useEntityListDefault,
} = createCrudHooks<Click>({
    entityName: "clicks",
    basePath: "/clicks",
    dataKey: "clicks"
});

// Экспортируем типизированные хуки
export const useClicksList = () => useEntityList(1, 25);
export const useClicksListDefault = useEntityListDefault;
