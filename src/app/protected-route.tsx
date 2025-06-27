import { ROUTES } from "@/shared/model/routes";
import { Outlet, redirect } from "react-router-dom";
import { useSession } from "@/shared/model/session";
import { Navigate } from "react-router-dom";
// import { enableMocking } from "@/shared/api/mocks";
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
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 md:gap-6">
              <Outlet />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export async function protectedLoader() {
  // await enableMocking();

  const token = useSession.getState().token;

  if (!token) {
    return redirect(ROUTES.LOGIN);
  }

  return null;
}
