import "react-router-dom";

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  BOARDS: "/boards",
  BOARD: "/boards/:boardId",
  FAVORITE_BOARDS: "/boards/favorite",
  RECENT_BOARDS: "/boards/recent",
  USERS: "/users",
  CLICKS: "/clicks",
  PROMO_CODES: "/promo-codes",
  OFFERS: "/offers",
  CONVERSIONS: "/conversions",
} as const;

export const PAGE_TITLES: Record<string, string> = {
  [ROUTES.USERS]: "Users",
  [ROUTES.CLICKS]: "Clicks",
  [ROUTES.PROMO_CODES]: "Promo Codes",
  [ROUTES.OFFERS]: "Offers",
  [ROUTES.CONVERSIONS]: "Conversions",
  [ROUTES.BOARDS]: "Boards",
  [ROUTES.FAVORITE_BOARDS]: "Favorite Boards",
  [ROUTES.RECENT_BOARDS]: "Recent Boards",
};

export type PathParams = {
  [ROUTES.BOARD]: {
    boardId: string;
  };
};

declare module "react-router-dom" {
  interface Register {
    params: PathParams;
  }
}
