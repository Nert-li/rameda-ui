import * as React from "react"
import {
  IconCamera,
  IconDashboard,
  IconFileAi,
  IconFileDescription,
  IconInnerShadowTop,
  IconSettings,
  IconChartLine,
} from "@tabler/icons-react"

import {
  UsersIcon,
  GiftIcon,
  MousePointerClickIcon,
  TicketPercentIcon,
  GoalIcon,
} from "lucide-react";

import { NavDocuments } from "@/shared/ui/nav-documents"
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
      icon: UsersIcon,
    },
    {
      title: "Clicks",
      url: ROUTES.CLICKS,
      icon: MousePointerClickIcon,
    },
    {
      title: "Promo Codes",
      url: ROUTES.PROMO_CODES,
      icon: TicketPercentIcon,
    },
    {
      title: "Offers",
      url: ROUTES.OFFERS,
      icon: GiftIcon,
    },
    {
      title: "Conversions",
      url: ROUTES.CONVERSIONS,
      icon: GoalIcon,
    },
    {
      title: "Ads Managers",
      url: ROUTES.ADS_MANAGERS,
      icon: IconChartLine,
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
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
