"use client"
import { AppSidebar } from "@/components/dash-client/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/dashboard/breadcrumb"
import { Separator } from "@/components/ui/dashboard/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/dashboard/sidebar"
import React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { owners } from "@/lib/placeholder-data"
import { ProfileProvider } from "@/lib/context/profile-context"

function getBreadcrumbs(pathname: string) {
  const segments = pathname.split("/").filter(Boolean)
  const breadcrumbs = []
  let href = ""
  for (let i = 0; i < segments.length; i++) {
    href += "/" + segments[i]
    breadcrumbs.push({
      label: segments[i].charAt(0).toUpperCase() + segments[i].slice(1),
      href,
      isLast: i === segments.length - 1,
    })
  }
  return breadcrumbs
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const breadcrumbs = getBreadcrumbs(pathname)
  const header = breadcrumbs.length > 0 ? breadcrumbs[breadcrumbs.length - 1].label : "Dashboard"

  // Get the first owner's first profile as the initial profile
  const initialProfile = owners[0].profiles[0]

  return (
    <ProfileProvider initialProfile={initialProfile}>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="sticky top-0 z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <div className="flex flex-col">
                <span className="font-semibold text-lg mb-1">{header}</span>
                <Breadcrumb>
                  <BreadcrumbList>
                    {breadcrumbs.map((crumb, idx) => (
                      <React.Fragment key={crumb.href}>
                        <BreadcrumbItem>
                          {crumb.isLast ? (
                            <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                          ) : (
                            <BreadcrumbLink asChild>
                              <Link href={crumb.href}>{crumb.label}</Link>
                            </BreadcrumbLink>
                          )}
                        </BreadcrumbItem>
                        {!crumb.isLast && <BreadcrumbSeparator />}
                      </React.Fragment>
                    ))}
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ProfileProvider>
  )
}
