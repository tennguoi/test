import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Users,
  Calendar,
  ClipboardList,
  QrCode,
  Settings,
  BarChart3,
  Clock,
  AlertCircle,
} from "lucide-react";
import DashboardSidebar from "./DashboardSidebar";

interface StaffDashboardProps {
  userName?: string;
  userEmail?: string;
  onLogout?: () => void;
  stats?: {
    totalDelegates: number;
    totalConferences: number;
    pendingRegistrations: number;
    upcomingConferences: number;
  };
  recentActivity?: Array<{
    id: string;
    type: "registration" | "check-in" | "conference";
    title: string;
    time: string;
    status?: "pending" | "approved" | "rejected" | "completed";
  }>;
}

const StaffDashboard = ({
  userName = "Staff User",
  userEmail = "staff@example.com",
  onLogout = () => console.log("Logout clicked"),
  stats = {
    totalDelegates: 245,
    totalConferences: 8,
    pendingRegistrations: 17,
    upcomingConferences: 3,
  },
  recentActivity = defaultRecentActivity,
}: StaffDashboardProps) => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar
        userRole="staff"
        userName={userName}
        userEmail={userEmail}
        onLogout={onLogout}
      />

      <div className="flex-1 overflow-auto p-6">
        <div className="flex flex-col space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                Staff Dashboard
              </h1>
              <p className="text-muted-foreground">
                Welcome back, {userName.split(" ")[0]}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                Staff Access
              </Badge>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="activity">Recent Activity</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Stats Cards */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Delegates
                    </CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {stats.totalDelegates}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Registered in the system
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Conferences
                    </CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {stats.totalConferences}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Past and upcoming events
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Pending Registrations
                    </CardTitle>
                    <ClipboardList className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {stats.pendingRegistrations}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Awaiting approval
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Upcoming Conferences
                    </CardTitle>
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {stats.upcomingConferences}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Scheduled events
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Button className="flex flex-col items-center justify-center h-24 space-y-2">
                    <Users className="h-6 w-6" />
                    <span>View Delegates</span>
                  </Button>
                  <Button className="flex flex-col items-center justify-center h-24 space-y-2">
                    <Calendar className="h-6 w-6" />
                    <span>Manage Conferences</span>
                  </Button>
                  <Button className="flex flex-col items-center justify-center h-24 space-y-2">
                    <ClipboardList className="h-6 w-6" />
                    <span>Process Registrations</span>
                  </Button>
                  <Button className="flex flex-col items-center justify-center h-24 space-y-2">
                    <QrCode className="h-6 w-6" />
                    <span>Check-in System</span>
                  </Button>
                </CardContent>
              </Card>

              {/* Upcoming Conferences */}
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Conferences</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingConferences.map((conference) => (
                      <div
                        key={conference.id}
                        className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                      >
                        <div className="flex flex-col">
                          <span className="font-medium">
                            {conference.title}
                          </span>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="mr-1 h-3 w-3" />
                            <span>{conference.date}</span>
                            <span className="mx-2">•</span>
                            <span>{conference.location}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              conference.registrationStatus === "Open"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {conference.registrationStatus}
                          </Badge>
                          <Button variant="outline" size="sm">
                            Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-start space-x-4 border-b pb-4 last:border-0 last:pb-0"
                      >
                        <div className="rounded-full bg-primary/10 p-2">
                          {activity.type === "registration" && (
                            <ClipboardList className="h-4 w-4 text-primary" />
                          )}
                          {activity.type === "check-in" && (
                            <QrCode className="h-4 w-4 text-primary" />
                          )}
                          {activity.type === "conference" && (
                            <Calendar className="h-4 w-4 text-primary" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">{activity.title}</p>
                            <div className="flex items-center">
                              <Clock className="mr-1 h-3 w-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">
                                {activity.time}
                              </span>
                            </div>
                          </div>
                          {activity.status && (
                            <Badge
                              variant={getStatusVariant(activity.status)}
                              className="mt-1"
                            >
                              {activity.status.charAt(0).toUpperCase() +
                                activity.status.slice(1)}
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Alerts and Notifications */}
              <Card>
                <CardHeader>
                  <CardTitle>Alerts & Notifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {alerts.map((alert, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-4 border-b pb-4 last:border-0 last:pb-0"
                      >
                        <div
                          className={`rounded-full p-2 ${alert.priority === "high" ? "bg-red-100" : "bg-amber-100"}`}
                        >
                          <AlertCircle
                            className={`h-4 w-4 ${alert.priority === "high" ? "text-red-600" : "text-amber-600"}`}
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{alert.message}</p>
                          <p className="text-sm text-muted-foreground">
                            {alert.details}
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

// Helper function to get badge variant based on status
const getStatusVariant = (status: string) => {
  switch (status) {
    case "approved":
      return "default";
    case "pending":
      return "secondary";
    case "rejected":
      return "destructive";
    case "completed":
      return "outline";
    default:
      return "secondary";
  }
};

// Mock data for upcoming conferences
const upcomingConferences = [
  {
    id: "1",
    title: "Annual Tech Summit 2023",
    date: "Nov 15-18, 2023",
    location: "San Francisco, CA",
    registrationStatus: "Open",
  },
  {
    id: "2",
    title: "Healthcare Innovation Conference",
    date: "Dec 5-7, 2023",
    location: "Boston, MA",
    registrationStatus: "Open",
  },
  {
    id: "3",
    title: "Sustainable Energy Forum",
    date: "Dec 1-3, 2023",
    location: "Seattle, WA",
    registrationStatus: "Coming Soon",
  },
];

// Mock data for alerts
const alerts = [
  {
    priority: "high",
    message: "Registration capacity reached",
    details:
      "Annual Tech Summit 2023 has reached 90% of its registration capacity.",
  },
  {
    priority: "medium",
    message: "New conference proposal",
    details: "A new conference proposal requires review and approval.",
  },
];

// Default recent activity data
const defaultRecentActivity = [
  {
    id: "1",
    type: "registration" as const,
    title: "New registration for Annual Tech Summit",
    time: "10 minutes ago",
    status: "pending" as const,
  },
  {
    id: "2",
    type: "check-in" as const,
    title: "John Smith checked in",
    time: "1 hour ago",
    status: "completed" as const,
  },
  {
    id: "3",
    type: "conference" as const,
    title: "Healthcare Conference updated",
    time: "2 hours ago",
  },
  {
    id: "4",
    type: "registration" as const,
    title: "Registration approved for Emily Davis",
    time: "3 hours ago",
    status: "approved" as const,
  },
  {
    id: "5",
    type: "registration" as const,
    title: "Registration rejected for invalid information",
    time: "5 hours ago",
    status: "rejected" as const,
  },
];

export default StaffDashboard;
