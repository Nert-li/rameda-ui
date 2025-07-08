import { ROUTES } from "@/shared/model/routes";
import { Outlet, redirect } from "react-router-dom";
import { useSession } from "@/shared/model/use-session";
import { Navigate } from "react-router-dom";
import { AppSidebar } from "@/shared/ui/app-sidebar"
import { SiteHeader } from "@/shared/ui/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/shared/ui/kit/sidebar"

export function ProtectedRoute() {
  const { session } = useSession();

  if (!session) {
    return <Navigate to={ROUTES.LOGIN} />;
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
          height: "100vh",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset className="h-screen-4 flex flex-col">
        <SiteHeader />
        <div className="flex-1 min-h-0 overflow-hidden">
          <div className="@container/main h-full">
            <Outlet />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export async function protectedLoader() {

  const token = useSession.getState().token;

  if (!token) {
    return redirect(ROUTES.LOGIN);
  }

  return null;
}
