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

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: ROUTES.HOME,
      icon: IconDashboard,
    },
    {
      title: "Users",
      url: ROUTES.USERS,
      icon: IconUsers,
    },
    {
      title: "Clicks",
      url: ROUTES.CLICKS,
      icon: IconPointer,
    },
    {
      title: "Promo Codes",
      url: ROUTES.PROMO_CODES,
      icon: IconTicket,
    },
    {
      title: "Offers",
      url: ROUTES.OFFERS,
      icon: IconGift,
    },
    {
      title: "Conversions",
      url: ROUTES.CONVERSIONS,
      icon: IconTarget,
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
      url: ROUTES.USERS,
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
        <NavMain items={data.navMain} label="Main" />
        <NavMain items={data.documents} label="Ads Monitoring" />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
