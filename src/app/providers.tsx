import { queryClient } from "@/shared/api/query-client";
import { ThemeProvider } from "@/shared/model/use-theme";
import { QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";

export function Providers({ children }: PropsWithChildren) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </ThemeProvider>
  );
}
