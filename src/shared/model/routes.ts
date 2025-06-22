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
