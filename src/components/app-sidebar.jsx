import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import NavUser from "./nav-user";

export const data = {
  navMain: [
    {
      title: "Public Pages",
      url: "#",
      items: [
        {
          title: "All Shapes",
          url: "/",
        },
        {
          title: "Overlapping Shapes",
          url: "/overlaps",
        },
      ],
    },
    {
      title: "Account",
      url: "#",
      items: [
        {
          title: "Login",
          url: "/login",
        },
        {
          title: "Register",
          url: "/register",
        },
      ],
    },
    {
      title: "Shape Dashboard",
      url: "#",
      items: [
        {
          title: "Create Shape",
          url: "/dashboard/create",
        },
        {
          title: "Update Shape",
          url: "/dashboard/manage",
        },
        {
          title: "Delete Shape",
          url: "/dashboard/delete",
        },
      ],
    },
    {
      title: "Developed By",
      url: "#",
      items: [
        {
          title: "Dominic Lakshan",
          url: "https://github.com/lakshankd",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar {...props}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Table of Contents</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="font-medium">
                      {item.title}
                    </a>
                  </SidebarMenuButton>
                  {item.items?.length ? (
                    <SidebarMenuSub>
                      {item.items.map((item) => (
                        <SidebarMenuSubItem key={item.title}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={item.isActive}
                          >
                            <a href={item.url}>{item.title}</a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  ) : null}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
