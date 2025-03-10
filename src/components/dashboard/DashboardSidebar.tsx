import React from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Users,
  Calendar,
  ClipboardList,
  QrCode,
  Settings,
  LogOut,
  Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const SidebarLink = ({
  to,
  icon,
  label,
  active = false,
  onClick,
}: SidebarLinkProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
          isActive || active
            ? "bg-primary text-primary-foreground hover:bg-primary/90"
            : "text-muted-foreground hover:bg-muted hover:text-foreground",
        )
      }
      onClick={onClick}
    >
      {icon}
      {label}
    </NavLink>
  );
};

interface DashboardSidebarProps {
  userRole?: "admin" | "staff" | "delegate";
  userName?: string;
  userEmail?: string;
  onLogout?: () => void;
}

const DashboardSidebar = ({
  userRole = "admin",
  userName = "John Doe",
  userEmail = "john.doe@example.com",
  onLogout = () => console.log("Logout clicked"),
}: DashboardSidebarProps) => {
  return (
    <div className="flex h-full w-64 flex-col border-r bg-white">
      <div className="p-4">
        <div className="flex items-center gap-2 py-3">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
            {userName.charAt(0)}
          </div>
          <div className="flex flex-col">
            <span className="font-medium">{userName}</span>
            <span className="text-xs text-muted-foreground">{userEmail}</span>
          </div>
        </div>
      </div>

      <Separator />

      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1 px-2">
          <SidebarLink
            to="/dashboard"
            icon={<Home className="h-4 w-4" />}
            label="Dashboard"
          />

          {/* Admin and Staff Links */}
          {(userRole === "admin" || userRole === "staff") && (
            <>
              <SidebarLink
                to="/delegates"
                icon={<Users className="h-4 w-4" />}
                label="Delegates"
              />
              <SidebarLink
                to="/conferences"
                icon={<Calendar className="h-4 w-4" />}
                label="Conferences"
              />
              <SidebarLink
                to="/registrations"
                icon={<ClipboardList className="h-4 w-4" />}
                label="Registrations"
              />
              <SidebarLink
                to="/check-in"
                icon={<QrCode className="h-4 w-4" />}
                label="Check-in"
              />
            </>
          )}

          {/* Delegate Links */}
          {userRole === "delegate" && (
            <>
              <SidebarLink
                to="/my-conferences"
                icon={<Calendar className="h-4 w-4" />}
                label="My Conferences"
              />
              <SidebarLink
                to="/register"
                icon={<ClipboardList className="h-4 w-4" />}
                label="Register for Events"
              />
              <SidebarLink
                to="/my-qr-code"
                icon={<QrCode className="h-4 w-4" />}
                label="My QR Code"
              />
            </>
          )}

          {/* Common Links */}
          <SidebarLink
            to="/settings"
            icon={<Settings className="h-4 w-4" />}
            label="Settings"
          />
        </nav>
      </div>

      <div className="mt-auto p-4">
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={onLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </Button>
      </div>
    </div>
  );
};

export default DashboardSidebar;
