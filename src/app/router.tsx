import { ROUTES } from "../shared/model/routes";
import { createBrowserRouter, redirect } from "react-router-dom";
import { App } from "./app";
import { Providers } from "./providers";
import { protectedLoader, ProtectedRoute } from "./protected-route";

export const router = createBrowserRouter([
  {
    element: (
      <Providers>
        <App />
      </Providers>
    ),
    children: [
      {
        // loader: protectedLoader,
        element: (
          <div className="flex flex-1 flex-col"><ProtectedRoute /></div>
        ),
        children: [
          {
            path: ROUTES.USERS,
            lazy: () => import("@/features/users/users.page"),
          },
          {
            path: ROUTES.CLICKS,
            lazy: () => import("@/features/clicks/clicks.page"),
          },
          {
            path: ROUTES.PROMO_CODES,
            lazy: () => import("@/features/promo-codes/promo-codes.page"),
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
            lazy: () => import("@/features/reports/reports-overview.page"),
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
        loader: () => redirect(ROUTES.USERS),
      },
    ],
  },
]);
