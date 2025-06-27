import { queryClient } from "@/shared/api/query-client";
import { ThemeProvider } from "@/shared/model/use-theme";
import { QueryClientProvider } from "@tanstack/react-query";
import { AppDataProvider } from "@/shared/model/app-data-provider";
import { QueryParamProvider } from "use-query-params";
import { ReactRouter6Adapter } from "use-query-params/adapters/react-router-6";
import { PropsWithChildren } from "react";

export function Providers({ children }: PropsWithChildren) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <QueryParamProvider adapter={ReactRouter6Adapter}>
          <AppDataProvider>
            {children}
          </AppDataProvider>
        </QueryParamProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
