import { ROUTES } from "@/shared/model/routes";
import { Outlet, redirect } from "react-router-dom";
import { useSession } from "@/shared/model/session";
import { Navigate } from "react-router-dom";
import { enableMocking } from "@/shared/api/mocks";

export function ProtectedRoute() {
  const { session } = useSession();

  if (!session) {
    return <Navigate to={ROUTES.LOGIN} />;
  }

  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <Outlet />
      </div>
    </div>
  )
}

export async function protectedLoader() {
  await enableMocking();

  const token = useSession.getState().token;

  if (!token) {
    return redirect(ROUTES.LOGIN);
  }

  return null;
}
