import { useSession } from "@/shared/model/session";
import { Button } from "@/shared/ui/kit/button";
import { Link, useLocation } from "react-router-dom";
import { PAGE_TITLES, ROUTES } from "@/shared/model/routes";
import { ThemeToggle } from "./theme-toggle";
import {
  UsersIcon,
  GiftIcon,
  MousePointerClickIcon,
  TicketPercentIcon,
  GoalIcon,
  ChevronRight,
} from "lucide-react";

export function AppHeader() {
  const { session, logout } = useSession();
  const { pathname } = useLocation();

  if (!session) {
    return null;
  }

  const pageTitle = PAGE_TITLES[pathname];

  return (
    <header className="sticky top-0 z-50 bg-background/95 border-b border-border/40 shadow-sm py-3 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="text-xl font-semibold">Rameda</div>
          {pageTitle && (
            <>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <div className="text-lg font-semibold text-muted-foreground">{pageTitle}</div>
            </>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button asChild variant={pathname === ROUTES.USERS ? "default" : "outline"} className="h-auto font-normal text-sm px-3 py-1.5">
            <Link to={ROUTES.USERS} className="flex items-center gap-2">
              <UsersIcon className="h-4 w-4" />
              Users
            </Link>
          </Button>
          <Button asChild variant={pathname === ROUTES.OFFERS ? "default" : "outline"} className="h-auto font-normal text-sm px-3 py-1.5">
            <Link to={ROUTES.OFFERS} className="flex items-center gap-2">
              <GiftIcon className="h-4 w-4" />
              Offers
            </Link>
          </Button>
          <Button asChild variant={pathname === ROUTES.CLICKS ? "default" : "outline"} className="h-auto font-normal text-sm px-3 py-1.5">
            <Link to={ROUTES.CLICKS} className="flex items-center gap-2">
              <MousePointerClickIcon className="h-4 w-4" />
              Clicks
            </Link>
          </Button>
          <Button asChild variant={pathname === ROUTES.PROMO_CODES ? "default" : "outline"} className="h-auto font-normal text-sm px-3 py-1.5">
            <Link to={ROUTES.PROMO_CODES} className="flex items-center gap-2">
              <TicketPercentIcon className="h-4 w-4" />
              Promo Codes
            </Link>
          </Button>
          <Button asChild variant={pathname === ROUTES.CONVERSIONS ? "default" : "outline"} className="h-auto font-normal text-sm px-3 py-1.5">
            <Link to={ROUTES.CONVERSIONS} className="flex items-center gap-2">
              <GoalIcon className="h-4 w-4" />
              Conversions
            </Link>
          </Button>
          <ThemeToggle />
          <span className="text-sm text-muted-foreground">{session.email}</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => logout()}
            className="hover:bg-destructive/10"
          >
            Выйти
          </Button>
        </div>
      </div>
    </header>
  );
}
