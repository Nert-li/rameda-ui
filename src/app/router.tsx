import { ROUTES } from "../shared/model/routes";
import { createBrowserRouter, redirect } from "react-router-dom";
import { App } from "./app";
import { Providers } from "./providers";
import { protectedLoader, ProtectedRoute } from "./protected-route";
import { AppHeader } from "@/features/header";

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
          <>
            <AppHeader />
            <main className="flex-1 overflow-y-auto bg-muted/20">
              <ProtectedRoute />
            </main>
          </>
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
            path: ROUTES.BOARDS,
            lazy: () => import("@/features/boards-list/boards-list.page"),
          },
          {
            path: ROUTES.FAVORITE_BOARDS,
            lazy: () =>
              import("@/features/boards-list/boards-list-favorite.page"),
          },
          {
            path: ROUTES.RECENT_BOARDS,
            lazy: () =>
              import("@/features/boards-list/boards-list-recent.page"),
          },
          {
            path: ROUTES.BOARD,
            lazy: () => import("@/features/board/board.page"),
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
