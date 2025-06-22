import { useSession } from "@/shared/model/session";
import { Button } from "@/shared/ui/kit/button";
import { Link } from "react-router-dom";
import { ROUTES } from "@/shared/model/routes";
import { ThemeToggle } from "./theme-toggle";

export function AppHeader() {
  const { session, logout } = useSession();

  if (!session) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/40 shadow-sm py-3 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-xl font-semibold">Rameda</div>

        <div className="flex items-center gap-4">
          <Link to={ROUTES.USERS} className="text-sm hover:underline">Users</Link>
          <Link to={ROUTES.OFFERS} className="text-sm hover:underline">Offers</Link>
          <Link to={ROUTES.CLICKS} className="text-sm hover:underline">Clicks</Link>
          <Link to={ROUTES.PROMO_CODES} className="text-sm hover:underline">Promo Codes</Link>
          <Link to={ROUTES.CONVERSIONS} className="text-sm hover:underline">Conversions</Link>
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
