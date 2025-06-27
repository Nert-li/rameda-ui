import { ROUTES } from "./routes";
import { UserRole } from "./user-roles";

export const ROUTE_PERMISSIONS: Record<string, UserRole[]> = {
    // Доступны всем ролям
    [ROUTES.DASHBOARD]: ["admin", "manager", "buyer"],
    [ROUTES.ACCOUNT]: ["admin", "manager", "buyer"],
    [ROUTES.SETTINGS]: ["admin", "manager", "buyer"],
    [ROUTES.CLICKS]: ["admin", "manager", "buyer"],
    [ROUTES.OFFERS]: ["admin", "manager", "buyer"],
    [ROUTES.CONVERSIONS]: ["admin", "manager", "buyer"],
    [ROUTES.ADS_MANAGERS]: ["admin", "manager", "buyer"],
    [ROUTES.REPORTS]: ["admin", "manager", "buyer"],
    [ROUTES.ADS_MANAGER_REPORTS]: ["admin", "manager", "buyer"],

    // Ограничены для buyers
    [ROUTES.USERS]: ["admin", "manager"], // НЕ доступны buyers
    [ROUTES.PROMO_CODES]: ["admin", "manager"], // НЕ доступны buyers
};

export function hasRouteAccess(route: string, userRole: UserRole | undefined): boolean {
    if (!userRole) return false;

    const allowedRoles = ROUTE_PERMISSIONS[route];
    return allowedRoles ? allowedRoles.includes(userRole) : false;
}

export function getAccessibleRoutes(userRole: UserRole | undefined): string[] {
    if (!userRole) return [];

    return Object.keys(ROUTE_PERMISSIONS).filter(route =>
        hasRouteAccess(route, userRole)
    );
} 