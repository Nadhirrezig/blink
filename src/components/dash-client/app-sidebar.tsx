"use client"

import * as React from "react"
import {
  ArrowUpCircleIcon,
  ClipboardListIcon,
  DatabaseIcon,
  HelpCircleIcon,
  LayoutDashboardIcon,
  SearchIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react"
import { 
  IconToolsKitchen3,
  IconClipboardText,
  IconBrandGoogleAnalytics,
} from "@tabler/icons-react"
import { NavProjects } from "./nav-projects"
import { NavMain } from '@/components/dash-client/nav-main'
import { NavSecondary } from "./nav-secondary"
import { NavUser } from '@/components/dash-client/nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/dashboard/sidebar'
import { owners } from "@/lib/placeholder-data"

// For now, using the first owner as the logged-in user
// In a real app, this would come from authentication context
const owner = owners[0]

const data = {
  user: {
    name: owner.name,
    email: owner.email,
    avatar: "/avatars/shadcn.jpg", // You might want to add avatar to the Owner type
    profiles: owner.profiles,
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Orders",
      url: "/admin/dashboard/orders",
      icon: IconToolsKitchen3,
    },
    {
      title: "Analytics",
      url: "/admin/dashboard/analytics",
      icon: IconBrandGoogleAnalytics,
    },
    {
      title: "Menu Manager",
      url: "/admin/dashboard/menu-manager",
      icon: IconClipboardText,
    },
    {
      title: "Team",
      url: "/admin/dashboard/team",
      icon: UsersIcon,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: SettingsIcon,
    },
    {
      title: "Get Help",
      url: "#",
      icon: HelpCircleIcon,
    },
    {
      title: "Search",
      url: "#",
      icon: SearchIcon,
    },
  ],
  documents: [
    {
      name: "Store stock",
      url: "#",
      icon: DatabaseIcon,
    },
    {
      name: "Reports",
      url: "#",
      icon: ClipboardListIcon,
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
                <ArrowUpCircleIcon className="h-5 w-5" />
                <span className="text-base font-semibold">Blink</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.documents} />
      </SidebarContent>
      <SidebarFooter>
        <NavSecondary items={data.navSecondary} />
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
