import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { LogOut, Menu, User, Settings } from "lucide-react";

interface NavbarProps {
  appTitle?: string;
  logoUrl?: string;
  isAuthenticated?: boolean;
  userName?: string;
  userRole?: "administrator" | "staff" | "delegate";
  onLogin?: () => void;
  onLogout?: () => void;
}

const Navbar = ({
  appTitle = "Conference Delegate Management",
  logoUrl = "",
  isAuthenticated = false,
  userName = "Guest User",
  userRole = "delegate",
  onLogin = () => console.log("Login clicked"),
  onLogout = () => console.log("Logout clicked"),
}: NavbarProps) => {
  const userInitial = userName ? userName.charAt(0).toUpperCase() : "G";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          {logoUrl ? (
            <img src={logoUrl} alt="Logo" className="h-8 w-auto" />
          ) : (
            <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold">C</span>
            </div>
          )}
          <Link to="/" className="text-xl font-bold tracking-tight">
            {appTitle}
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <span className="hidden md:inline-block text-sm text-muted-foreground">
                {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
              </span>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`}
                        alt={userName}
                      />
                      <AvatarFallback>{userInitial}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{userName}</p>
                      <p className="w-[200px] truncate text-sm text-muted-foreground">
                        {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={onLogout}
                    className="cursor-pointer"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Button onClick={onLogin}>Log in</Button>
          )}

          {/* Mobile menu button - could expand to a full mobile menu in a real implementation */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
