import "react-router-dom";

export const ROUTES = {
  HOME: "/",
  DASHBOARD: "/dashboard",
  LOGIN: "/login",
  REGISTER: "/register",
  ACCOUNT: "/account",
  SETTINGS: "/settings",
  USERS: "/users",
  CLICKS: "/clicks",
  PROMO_CODES: "/promo-codes",
  OFFERS: "/offers",
  CONVERSIONS: "/conversions",
  ADS_MANAGERS: "/ads-managers",
  REPORTS: "/reports",
  ADS_MANAGER_REPORTS: "/ads-managers/:adsManagerId/reports",
} as const;

export const PAGE_TITLES: Record<string, string> = {
  [ROUTES.DASHBOARD]: "Dashboard",
  [ROUTES.ACCOUNT]: "Account",
  [ROUTES.SETTINGS]: "Settings",
  [ROUTES.USERS]: "Users",
  [ROUTES.CLICKS]: "Clicks",
  [ROUTES.PROMO_CODES]: "Promo Codes",
  [ROUTES.OFFERS]: "Offers",
  [ROUTES.CONVERSIONS]: "Conversions",
  [ROUTES.ADS_MANAGERS]: "Ads Managers",
  [ROUTES.REPORTS]: "Reports",
  [ROUTES.ADS_MANAGER_REPORTS]: "Ads Manager Reports",
  [ROUTES.LOGIN]: "Login",
  [ROUTES.REGISTER]: "Register",
};

export type PathParams = {
  [ROUTES.USERS]: {
    userId: string;
  };
  [ROUTES.CLICKS]: {
    clickId: string;
  };
  [ROUTES.PROMO_CODES]: {
    promoCodeId: string;
  };
  [ROUTES.OFFERS]: {
    offerId: string;
  },
  [ROUTES.CONVERSIONS]: {
    conversionId: string;
  },
  [ROUTES.ADS_MANAGERS]: {
    adsManagerId: string;
  }
};

declare module "react-router-dom" {
  interface Register {
    params: PathParams;
  }
  interface RouteHandle {
    title?: string;
  }
}
