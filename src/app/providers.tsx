import { queryClient } from "@/shared/api/query-client";
import { ThemeProvider } from "@/shared/model/use-theme";
import { QueryClientProvider } from "@tanstack/react-query";
import { AppDataProvider } from "@/shared/model/app-data-provider";
import { PropsWithChildren } from "react";

export function Providers({ children }: PropsWithChildren) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <AppDataProvider>
          {children}
        </AppDataProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
