import { queryClient } from "@/shared/api/query-client";
import { ThemeProvider } from "@/shared/model/use-theme";
import { SidebarProvider } from "@/shared/ui/kit/sidebar";
import { QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";

export function Providers({ children }: PropsWithChildren) {
  const defaultOpen = typeof window !== 'undefined'
    ? localStorage.getItem("sidebar_state") === "true"
    : false;

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <SidebarProvider
          defaultOpen={defaultOpen}
          style={
            {
              "--sidebar-width": "calc(var(--spacing) * 72)",
            } as React.CSSProperties
          }
        >
          {children}
        </SidebarProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
