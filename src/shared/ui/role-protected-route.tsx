import { Navigate, useLocation } from "react-router-dom";
import { useRouteAccess } from "@/shared/lib/react/use-route-access";
import { ROUTES } from "@/shared/model/routes";
import { UserRole } from "@/shared/model/user-roles";

interface RoleProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles: UserRole[];
    fallbackPath?: string;
}

export function RoleProtectedRoute({
    children,
    allowedRoles,
    fallbackPath = ROUTES.DASHBOARD
}: RoleProtectedRouteProps) {
    const { userRole, isLoading } = useRouteAccess();
    const location = useLocation();

    // Показываем простую загрузку пока определяется роль
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[200px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    // Проверяем доступ по роли
    if (!userRole || !allowedRoles.includes(userRole)) {
        // Сохраняем попытку доступа для потенциального возврата
        return (
            <Navigate
                to={fallbackPath}
                replace
                state={{ from: location }}
            />
        );
    }

    return <>{children}</>;
} 