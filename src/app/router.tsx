import { ROUTES } from "../shared/model/routes";
import { createBrowserRouter, redirect } from "react-router-dom";
import { App } from "./app";
import { Providers } from "./providers";
import { protectedLoader, ProtectedRoute } from "./protected-route";
import { RoleProtectedRoute } from "@/shared/ui/role-protected-route";

export const router = createBrowserRouter([
  {
    element: (
      <Providers>
        <App />
      </Providers>
    ),
    children: [
      {
        loader: protectedLoader,
        element: (
          <div className="flex flex-1 flex-col"><ProtectedRoute /></div>
        ),
        children: [
          {
            path: ROUTES.DASHBOARD,
            lazy: () => import("@/features/dashboard/dashboard.page"),
          },
          {
            path: ROUTES.ACCOUNT,
            lazy: () => import("@/features/account/account.page"),
          },
          {
            path: ROUTES.SETTINGS,
            lazy: () => import("@/features/settings/settings.page"),
          },
          {
            path: ROUTES.USERS,
            lazy: async () => {
              const { Component } = await import("@/features/users/users.page");
              return {
                Component: () => (
                  <RoleProtectedRoute allowedRoles={["admin", "manager"]}>
                    <Component />
                  </RoleProtectedRoute>
                ),
              };
            },
          },
          {
            path: ROUTES.CLICKS,
            lazy: () => import("@/features/clicks/clicks.page"),
          },
          {
            path: ROUTES.PROMO_CODES,
            lazy: async () => {
              const { Component } = await import("@/features/promo-codes/promo-codes.page");
              return {
                Component: () => (
                  <RoleProtectedRoute allowedRoles={["admin", "manager"]}>
                    <Component />
                  </RoleProtectedRoute>
                ),
              };
            },
          },
          {
            path: ROUTES.OFFERS,
            lazy: () => import("@/features/offers/offers.page"),
          },
          {
            path: ROUTES.CONVERSIONS,
            lazy: () => import("@/features/conversions/conversions.page"),
          },
          {
            path: ROUTES.ADS_MANAGERS,
            lazy: () => import("@/features/ads-managers/ads-managers.page"),
          },
          {
            path: ROUTES.REPORTS,
            lazy: () => import("@/features/reports/reports.page"),
          },
          {
            path: ROUTES.ADS_MANAGER_REPORTS,
            lazy: () => import("@/features/reports/reports.page"),
          },
        ],
      },

      {
        path: ROUTES.LOGIN,
        lazy: () => import("@/features/auth/login.page"),
      },
      {
        path: ROUTES.REGISTER,
        lazy: () => import("@/features/auth/register.page"),
      },
      {
        path: ROUTES.HOME,
        loader: () => redirect(ROUTES.DASHBOARD),
      },
    ],
  },
]);
