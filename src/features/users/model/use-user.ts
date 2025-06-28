import { createCrudHooks } from "@/shared/api";
import type { components } from "@/shared/api/schema/generated";

// Типы для пользователей из OpenAPI схемы
export type User = components["schemas"]["UserRecord"];

// Создаем полный набор CRUD хуков для пользователей
const {
    useEntityList,
    useEntityListDefault,
} = createCrudHooks<User>({
    entityName: "users",
    basePath: "/users",
    dataKey: "users"
});

// Экспортируем типизированные хуки
export const useUsersList = () => useEntityList(1, 25);
export const useUsersListDefault = useEntityListDefault;
