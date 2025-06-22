import "react-router-dom";

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  USERS: "/users",
  CLICKS: "/clicks",
  PROMO_CODES: "/promo-codes",
  OFFERS: "/offers",
  CONVERSIONS: "/conversions",
  ADS_MANAGERS: "/ads-managers",
} as const;

export const PAGE_TITLES: Record<string, string> = {
  [ROUTES.USERS]: "Users",
  [ROUTES.CLICKS]: "Clicks",
  [ROUTES.PROMO_CODES]: "Promo Codes",
  [ROUTES.OFFERS]: "Offers",
  [ROUTES.CONVERSIONS]: "Conversions",
  [ROUTES.ADS_MANAGERS]: "Ads Managers",
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
}
