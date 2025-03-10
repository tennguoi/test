import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  PlusCircle,
  BarChart3,
  Users,
  Calendar,
  ClipboardList,
  QrCode,
} from "lucide-react";
import DashboardSidebar from "./DashboardSidebar";
import DelegateManagement from "../delegates/DelegateManagement";
import ConferenceManagement from "../conferences/ConferenceManagement";
import RegistrationManagement from "../registrations/RegistrationManagement";
import CheckinSystem from "../checkin/CheckinSystem";

interface AdminDashboardProps {
  userName?: string;
  userEmail?: string;
  onLogout?: () => void;
}

const AdminDashboard = ({
  userName = "Admin User",
  userEmail = "admin@example.com",
  onLogout = () => console.log("Logout clicked"),
}: AdminDashboardProps) => {
  const [activeSection, setActiveSection] = useState<string>("overview");

  // Dashboard stats
  const stats = {
    totalDelegates: 156,
    totalConferences: 8,
    upcomingConferences: 5,
    totalRegistrations: 423,
    pendingRegistrations: 42,
    checkedInToday: 37,
  };

  const renderContent = () => {
    switch (activeSection) {
      case "delegates":
        return <DelegateManagement />;
      case "conferences":
        return <ConferenceManagement />;
      case "registrations":
        return <RegistrationManagement />;
      case "checkin":
        return <CheckinSystem />;
      case "overview":
      default:
        return renderOverview();
    }
  };

  const renderOverview = () => (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">
          Dashboard Overview
        </h1>
        <p className="text-muted-foreground">
          Welcome back, {userName}. Here's what's happening with your
          conferences.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Delegates
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalDelegates}</div>
            <p className="text-xs text-muted-foreground">
              Registered in the system
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conferences</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalConferences}</div>
            <p className="text-xs text-muted-foreground">
              {stats.upcomingConferences} upcoming events
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Registrations</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalRegistrations}</div>
            <p className="text-xs text-muted-foreground">
              {stats.pendingRegistrations} pending approvals
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center">
                  <div className="mr-2 h-2 w-2 rounded-full bg-primary" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="h-24 flex flex-col items-center justify-center gap-2"
                onClick={() => setActiveSection("delegates")}
              >
                <Users className="h-6 w-6" />
                <span>Manage Delegates</span>
              </Button>
              <Button
                variant="outline"
                className="h-24 flex flex-col items-center justify-center gap-2"
                onClick={() => setActiveSection("conferences")}
              >
                <Calendar className="h-6 w-6" />
                <span>Manage Conferences</span>
              </Button>
              <Button
                variant="outline"
                className="h-24 flex flex-col items-center justify-center gap-2"
                onClick={() => setActiveSection("registrations")}
              >
                <ClipboardList className="h-6 w-6" />
                <span>View Registrations</span>
              </Button>
              <Button
                variant="outline"
                className="h-24 flex flex-col items-center justify-center gap-2"
                onClick={() => setActiveSection("checkin")}
              >
                <QrCode className="h-6 w-6" />
                <span>Check-in System</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Conferences</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingConferences.map((conference) => (
              <div
                key={conference.id}
                className="flex justify-between items-center p-3 border rounded-md"
              >
                <div>
                  <h3 className="font-medium">{conference.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {conference.date} • {conference.location}
                  </p>
                </div>
                <div className="text-sm text-right">
                  <p className="font-medium">
                    {conference.registrations} registrations
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {conference.capacity} capacity
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar
        userRole="admin"
        userName={userName}
        userEmail={userEmail}
        onLogout={onLogout}
      />
      <div className="flex-1 overflow-auto">{renderContent()}</div>
    </div>
  );
};

// Mock data for the dashboard
const recentActivities = [
  {
    title: "New delegate registered: Sarah Johnson",
    time: "10 minutes ago",
  },
  {
    title: "Conference updated: Annual Tech Summit 2023",
    time: "1 hour ago",
  },
  {
    title: "Registration approved: Michael Brown for Developer Conference",
    time: "2 hours ago",
  },
  {
    title: "New conference created: AI & Machine Learning Summit",
    time: "Yesterday at 3:30 PM",
  },
  {
    title: "37 delegates checked in today",
    time: "Today at 9:00 AM",
  },
];

const upcomingConferences = [
  {
    id: "1",
    name: "Annual Tech Summit 2023",
    date: "Nov 15-18, 2023",
    location: "San Francisco, CA",
    registrations: 342,
    capacity: 500,
  },
  {
    id: "2",
    name: "Healthcare Innovation Conference",
    date: "Dec 5-7, 2023",
    location: "Boston, MA",
    registrations: 187,
    capacity: 350,
  },
  {
    id: "3",
    name: "Sustainable Energy Forum",
    date: "Dec 1-3, 2023",
    location: "Seattle, WA",
    registrations: 156,
    capacity: 300,
  },
  {
    id: "4",
    name: "AI & Machine Learning Summit",
    date: "Dec 15-17, 2023",
    location: "Austin, TX",
    registrations: 210,
    capacity: 450,
  },
];

export default AdminDashboard;
