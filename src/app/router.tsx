import { ROUTES, PAGE_TITLES } from "../shared/model/routes";
import { createBrowserRouter, redirect } from "react-router-dom";
import { App } from "./app";
import { Providers } from "./providers";
import { protectedLoader, ProtectedRoute } from "./protected-route";
import { RoleProtectedRoute } from "@/shared/ui/role-protected-route";

const appElement = (
  <Providers>
    <App />
  </Providers>
)

const addProtectedChildren = [
  {
    loader: protectedLoader,
    element: <ProtectedRoute />,
    children: [
      {
        path: ROUTES.DASHBOARD,
        lazy: () => import("@/features/dashboard/dashboard.page"),
        handle: { title: PAGE_TITLES[ROUTES.DASHBOARD] },
      },
      {
        path: ROUTES.ACCOUNT,
        lazy: () => import("@/features/account/account.page"),
        handle: { title: PAGE_TITLES[ROUTES.ACCOUNT] },
      },
      {
        path: ROUTES.SETTINGS,
        lazy: () => import("@/features/settings/settings.page"),
        handle: { title: PAGE_TITLES[ROUTES.SETTINGS] },
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
        handle: { title: PAGE_TITLES[ROUTES.USERS] },
      },
      {
        path: ROUTES.CLICKS,
        lazy: () => import("@/features/clicks/clicks.page"),
        handle: { title: PAGE_TITLES[ROUTES.CLICKS] },
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
        handle: { title: PAGE_TITLES[ROUTES.PROMO_CODES] },
      },
      {
        path: ROUTES.OFFERS,
        lazy: () => import("@/features/offers/offers.page"),
        handle: { title: PAGE_TITLES[ROUTES.OFFERS] },
      },
      {
        path: ROUTES.CONVERSIONS,
        lazy: () => import("@/features/conversions/conversions.page"),
        handle: { title: PAGE_TITLES[ROUTES.CONVERSIONS] },
      },
      {
        path: ROUTES.ADS_MANAGERS,
        lazy: () => import("@/features/ads-managers/ads-managers.page"),
        handle: { title: PAGE_TITLES[ROUTES.ADS_MANAGERS] },
      },
      {
        path: ROUTES.REPORTS,
        lazy: () => import("@/features/reports/reports.page"),
        handle: { title: PAGE_TITLES[ROUTES.REPORTS] },
      }
    ],
  },

  {
    path: ROUTES.LOGIN,
    lazy: () => import("@/features/auth/login.page"),
    handle: { title: PAGE_TITLES[ROUTES.LOGIN] },
  },
  {
    path: ROUTES.REGISTER,
    lazy: () => import("@/features/auth/register.page"),
    handle: { title: PAGE_TITLES[ROUTES.REGISTER] },
  },
  {
    path: ROUTES.HOME,
    loader: () => redirect(ROUTES.DASHBOARD),
  },
]

export const router = createBrowserRouter([
  {
    element: appElement,
    children: addProtectedChildren,
  },
]);
