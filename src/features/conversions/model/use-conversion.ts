import { createCrudHooks } from "@/shared/api";
import type { components } from "@/shared/api/schema/generated";

// Типы для conversions из OpenAPI схемы
export type Conversion = components["schemas"]["ConversionRecord"];

// Создаем полный набор CRUD хуков для conversions
const {
    useEntityList,
    useEntityListDefault,
} = createCrudHooks<Conversion>({
    entityName: "conversions",
    basePath: "/conversions",
    dataKey: "conversions"
});

// Экспортируем типизированные хуки
export const useConversionsList = () => useEntityList(1, 25);
export const useConversionsListDefault = useEntityListDefault;
