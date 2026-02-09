import { FileText, FilePlus, Layers, FileStack, Home } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const tools = [
  {
    title: "Home",
    url: "/",
    icon: Home,
    color: "text-foreground",
  },
  {
    title: "Edit PDF",
    url: "/edit-pdf",
    icon: FileText,
    color: "text-tool-pdf",
  },
  {
    title: "Edit DOCX",
    url: "/edit-docx",
    icon: FilePlus,
    color: "text-tool-docx",
  },
  {
    title: "Merge PDF",
    url: "/merge-pdf",
    icon: Layers,
    color: "text-tool-merge",
  },
  {
    title: "Merge DOCX",
    url: "/merge-docx",
    icon: FileStack,
    color: "text-tool-merge",
  },
];

export function AppSidebar() {
  const sidebar = useSidebar();
  const collapsed = sidebar.state === "collapsed";
  const location = useLocation();

  return (
    <Sidebar collapsible="icon" className="border-r border-border/50">
      <div className="flex items-center gap-2 px-4 py-4 border-b border-border/50">
        {!collapsed && (
          <span className="text-lg font-semibold tracking-tight">DocFlow</span>
        )}
        <SidebarTrigger className={collapsed ? "mx-auto" : "ml-auto"} />
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {tools.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className="flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-accent"
                      activeClassName="bg-accent text-accent-foreground font-medium"
                    >
                      <item.icon className={`h-4 w-4 shrink-0 ${item.color}`} />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {!collapsed && (
        <div className="mt-auto px-4 py-4 border-t border-border/50">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="w-2 h-2 rounded-full bg-tool-merge animate-pulse" />
            <span>All files stay in your browser</span>
          </div>
        </div>
      )}
    </Sidebar>
  );
}
