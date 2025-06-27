import { PropsWithChildren, useEffect } from "react";
import { useCurrentUser } from "./use-current-user";
import { useConfig } from "./use-config";
import { useSession } from "./use-session";

/**
 * Провайдер для инициализации данных приложения.
 * Автоматически загружает данные пользователя и конфигурацию при старте.
 */
export function AppDataProvider({ children }: PropsWithChildren) {
    const { isAuthenticated } = useSession();
    const { refetch: refetchUser } = useCurrentUser();
    const { refetch: refetchConfig } = useConfig();

    // Загружаем данные при изменении статуса аутентификации
    useEffect(() => {
        if (isAuthenticated) {
            refetchUser();
        }
        // Конфигурацию загружаем всегда
        refetchConfig();
    }, [isAuthenticated, refetchUser, refetchConfig]);

    return <>{children}</>;
} 