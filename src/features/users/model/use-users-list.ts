import { createListHooks } from "@/shared/api/hooks/use-list";

// Конфигурация для users API
const usersConfig = {
    endpoint: "/users",
    dataKey: "users" as const,
    defaultSortField: "created_at",
    defaultSortDirection: "desc" as const,
};

// Создаем специфические хуки через фабрику
const { useEntityListDefault, useEntityList } = createListHooks(usersConfig);

export const useUsersListDefault = useEntityListDefault;
export const useUsersList = useEntityList;
