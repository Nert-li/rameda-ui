import { Separator } from "@/shared/ui/kit/separator"
import { SidebarTrigger } from "@/shared/ui/kit/sidebar"
import { ThemeToggle } from "@/shared/ui/theme-toggle"
import { useLocation } from "react-router-dom"
import { PAGE_TITLES } from "../model/routes"
import { useHeaderContent } from "../model/use-header-content"

export function SiteHeader() {
  const { pathname } = useLocation()
  const pageTitle = PAGE_TITLES[pathname];
  const { headerContent } = useHeaderContent();

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{pageTitle}</h1>
        <div className="flex-1 flex justify-end items-center gap-2">
          {headerContent}
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
