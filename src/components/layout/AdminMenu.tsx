import React from "react";
import { Link } from "react-router-dom";
import {
  BarChart3,
  Users,
  Calendar,
  ClipboardList,
  QrCode,
  Settings,
  LogOut,
} from "lucide-react";

interface AdminMenuProps {
  onLogout: () => void;
}

const AdminMenu: React.FC<AdminMenuProps> = ({ onLogout }) => {
  return (
    <div className="bg-white border-r h-full w-64 flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold">Admin Dashboard</h2>
      </div>
      <nav className="flex-1 overflow-auto py-4">
        <ul className="space-y-1 px-2">
          <li>
            <Link
              to="/admin/dashboard"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground text-muted-foreground"
            >
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/admin/delegates"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground text-muted-foreground"
            >
              <Users className="h-4 w-4" />
              Delegates
            </Link>
          </li>
          <li>
            <Link
              to="/admin/conferences"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground text-muted-foreground"
            >
              <Calendar className="h-4 w-4" />
              Conferences
            </Link>
          </li>
          <li>
            <Link
              to="/admin/registrations"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground text-muted-foreground"
            >
              <ClipboardList className="h-4 w-4" />
              Registrations
            </Link>
          </li>
          <li>
            <Link
              to="/admin/checkin"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground text-muted-foreground"
            >
              <QrCode className="h-4 w-4" />
              Check-in
            </Link>
          </li>
          <li>
            <Link
              to="/admin/settings"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground text-muted-foreground"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </li>
        </ul>
      </nav>
      <div className="p-4 border-t">
        <button
          onClick={onLogout}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground text-muted-foreground"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminMenu;
