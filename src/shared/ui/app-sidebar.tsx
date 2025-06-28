import * as React from "react"
import {
  IconCamera,
  IconChartLine,
  IconDashboard,
  IconFileAi,
  IconFileDescription,
  IconFileText,
  IconInnerShadowTop,
  IconSettings,
  IconUsers,
  IconGift,
  IconPointer,
  IconTicket,
  IconTarget,
} from "@tabler/icons-react"

import { NavMain } from "@/shared/ui/nav-main"
import { NavSecondary } from "@/shared/ui/nav-secondary"
import { NavUser } from "@/shared/ui/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/ui/kit/sidebar"
import { ROUTES } from "../model/routes"
import { useRouteAccess } from "../lib/react/use-route-access"
import { useCurrentUser } from "../model/use-current-user"
import { Skeleton } from "./kit/skeleton"
import { useEffect } from "react"
import { useLogout } from "../model/logout"

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: ROUTES.DASHBOARD,
      icon: IconDashboard,
    },
    {
      title: "Offers",
      url: ROUTES.OFFERS,
      icon: IconGift,
    },
    {
      title: "Clicks",
      url: ROUTES.CLICKS,
      icon: IconPointer,
    },
    {
      title: "Conversions",
      url: ROUTES.CONVERSIONS,
      icon: IconTarget,
    },
  ],
  navManagement: [
    {
      title: "Users",
      url: ROUTES.USERS,
      icon: IconUsers,
    },
    {
      title: "Promo Codes",
      url: ROUTES.PROMO_CODES,
      icon: IconTicket,
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: ROUTES.SETTINGS,
      icon: IconSettings,
    },
  ],
  documents: [
    {
      title: "Ads Managers",
      url: ROUTES.ADS_MANAGERS,
      icon: IconChartLine,
    },
    {
      title: "Reports",
      url: ROUTES.REPORTS,
      icon: IconFileText,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { hasAccess } = useRouteAccess();
  const { isLoading, error } = useCurrentUser();
  const { logout } = useLogout();

  // Если ошибка загрузки пользователя - выходим
  useEffect(() => {
    if (error && !error.message?.includes("401")) {
      logout();
    }
  }, [error, logout]);

  // Показываем скелетон пока загружается пользователь
  if (isLoading) {
    return (
      <Sidebar collapsible="offcanvas" {...props}>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <Skeleton className="h-10 w-full rounded-lg" />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <div className="space-y-4 p-2">
            <div className="space-y-2">
              <Skeleton className="h-4 w-16 rounded" />
              <Skeleton className="h-8 w-full rounded" />
              <Skeleton className="h-8 w-full rounded" />
              <Skeleton className="h-8 w-full rounded" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-20 rounded" />
              <Skeleton className="h-8 w-full rounded" />
              <Skeleton className="h-8 w-full rounded" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-24 rounded" />
              <Skeleton className="h-8 w-full rounded" />
              <Skeleton className="h-8 w-full rounded" />
            </div>
          </div>
        </SidebarContent>
        <SidebarFooter>
          <Skeleton className="h-12 w-full rounded-lg" />
        </SidebarFooter>
      </Sidebar>
    );
  }

  const filteredNavMain = data.navMain.filter(item => {
    return hasAccess(item.url);
  });

  const filteredNavManagement = data.navManagement.filter(item => {
    return hasAccess(item.url);
  });

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Rameda</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={filteredNavMain} label="Main" />
        {filteredNavManagement.length > 0 && (
          <NavMain items={filteredNavManagement} label="Management" />
        )}
        <NavMain items={data.documents} label="Ads Monitoring" />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
