import { useCurrentUser } from "@/shared/model/use-current-user";
import { hasRouteAccess, getAccessibleRoutes } from "@/shared/model/route-permissions";

export function useRouteAccess() {
    const { user, isLoading, error } = useCurrentUser();

    return {
        hasAccess: (route: string) => {
            // Пока загружается - блокируем доступ
            if (isLoading) return false;
            // При ошибке - блокируем доступ  
            if (error) return false;
            return hasRouteAccess(route, user?.role);
        },
        getAccessibleRoutes: () => getAccessibleRoutes(user?.role),
        userRole: user?.role,
        isLoading,
        error,
        isAdmin: user?.role === "admin",
        isManager: user?.role === "manager",
        isBuyer: user?.role === "buyer",
    };
}