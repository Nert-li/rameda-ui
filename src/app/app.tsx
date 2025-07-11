import { Outlet } from "react-router-dom";
import { useAutoTitle } from "@/shared/lib/react";

export function App() {
  useAutoTitle();
  return (<Outlet />);
}
