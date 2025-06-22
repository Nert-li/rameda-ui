import { Outlet } from "react-router-dom";

export function App() {
  return (
    <div className="h-full flex flex-col">
      <Outlet />
    </div>
  );
}
