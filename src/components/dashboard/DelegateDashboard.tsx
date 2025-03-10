import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, Bookmark, Bell, Settings } from "lucide-react";
import DashboardSidebar from "./DashboardSidebar";
import ConferenceRegistration from "../delegates/ConferenceRegistration";
import DelegateQRCode from "../delegates/DelegateQRCode";

interface RegisteredConference {
  id: string;
  title: string;
  date: string;
  location: string;
  status: "upcoming" | "ongoing" | "completed" | "cancelled";
  badgeId: string;
}

interface DelegateDashboardProps {
  delegateName?: string;
  delegateEmail?: string;
  delegateId?: string;
  registeredConferences?: RegisteredConference[];
  upcomingConferences?: number;
  completedConferences?: number;
  notifications?: number;
  onLogout?: () => void;
}

const DelegateDashboard = ({
  delegateName = "John Smith",
  delegateEmail = "john.smith@example.com",
  delegateId = "DEL-12345",
  registeredConferences = defaultRegisteredConferences,
  upcomingConferences = 3,
  completedConferences = 2,
  notifications = 4,
  onLogout = () => console.log("Logout clicked"),
}: DelegateDashboardProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedConference, setSelectedConference] =
    useState<RegisteredConference | null>(null);

  const handleViewQRCode = (conference: RegisteredConference) => {
    setSelectedConference(conference);
    setActiveTab("qrcode");
  };

  const getStatusBadgeVariant = (status: RegisteredConference["status"]) => {
    switch (status) {
      case "upcoming":
        return "default";
      case "ongoing":
        return "secondary";
      case "completed":
        return "outline";
      case "cancelled":
        return "destructive";
      default:
        return "default";
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar
        userRole="delegate"
        userName={delegateName}
        userEmail={delegateEmail}
        onLogout={onLogout}
      />

      <div className="flex-1 overflow-auto p-6">
        <div className="flex flex-col space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                Welcome, {delegateName}
              </h1>
              <p className="text-muted-foreground">
                Manage your conference registrations and access your QR codes
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-xs text-primary-foreground flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </Button>
              <Button variant="outline" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Upcoming Conferences
                </CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{upcomingConferences}</div>
                <p className="text-xs text-muted-foreground">
                  Conferences you're registered for
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Completed Conferences
                </CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{completedConferences}</div>
                <p className="text-xs text-muted-foreground">
                  Past conferences attended
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Delegate ID
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold">{delegateId}</div>
                <p className="text-xs text-muted-foreground">
                  Your unique identifier
                </p>
              </CardContent>
            </Card>
          </div>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3 lg:w-auto">
              <TabsTrigger value="overview">My Conferences</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
              <TabsTrigger value="qrcode">QR Code</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>My Registered Conferences</CardTitle>
                </CardHeader>
                <CardContent>
                  {registeredConferences.length > 0 ? (
                    <div className="space-y-4">
                      {registeredConferences.map((conference) => (
                        <div
                          key={conference.id}
                          className="flex items-center justify-between p-4 border rounded-lg"
                        >
                          <div className="space-y-1">
                            <h3 className="font-medium">{conference.title}</h3>
                            <div className="flex items-center text-sm text-muted-foreground gap-2">
                              <Calendar className="h-4 w-4" />
                              <span>{conference.date}</span>
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground gap-2">
                              <Users className="h-4 w-4" />
                              <span>{conference.location}</span>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <Badge
                              variant={getStatusBadgeVariant(conference.status)}
                              className="capitalize"
                            >
                              {conference.status}
                            </Badge>
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex items-center gap-2"
                              onClick={() => handleViewQRCode(conference)}
                            >
                              <Bookmark className="h-4 w-4" />
                              View QR Code
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium">
                        No Conferences Registered
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        You haven't registered for any conferences yet.
                      </p>
                      <Button onClick={() => setActiveTab("register")}>
                        Browse Conferences
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="register" className="mt-6">
              <ConferenceRegistration
                onRegister={(conferenceId, formData) => {
                  console.log(
                    "Registered for conference:",
                    conferenceId,
                    formData,
                  );
                  // In a real app, you would handle the registration and update the UI
                  setActiveTab("overview");
                }}
              />
            </TabsContent>

            <TabsContent value="qrcode" className="mt-6">
              {selectedConference ? (
                <DelegateQRCode
                  delegateId={delegateId}
                  delegateName={delegateName}
                  conferenceName={selectedConference.title}
                  conferenceDate={selectedConference.date}
                  badgeId={selectedConference.badgeId}
                  qrValue={`delegate:${delegateId}:${selectedConference.badgeId}`}
                />
              ) : (
                <Card>
                  <CardContent className="pt-6 text-center">
                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-lg font-medium">
                      No Conference Selected
                    </p>
                    <p className="text-muted-foreground mb-4">
                      Please select a conference from your registered
                      conferences to view the QR code.
                    </p>
                    <Button onClick={() => setActiveTab("overview")}>
                      View My Conferences
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

// Default data for when no props are provided
const defaultRegisteredConferences: RegisteredConference[] = [
  {
    id: "1",
    title: "Annual Tech Summit 2023",
    date: "November 15-18, 2023",
    location: "Convention Center, New York",
    status: "upcoming",
    badgeId: "BADGE-1001",
  },
  {
    id: "2",
    title: "Healthcare Innovation Conference",
    date: "December 5-7, 2023",
    location: "Medical Center, Boston",
    status: "upcoming",
    badgeId: "BADGE-1002",
  },
  {
    id: "3",
    title: "Global Business Forum",
    date: "October 20-22, 2023",
    location: "Business Center, Chicago",
    status: "completed",
    badgeId: "BADGE-1003",
  },
  {
    id: "4",
    title: "AI & Machine Learning Summit",
    date: "September 10-12, 2023",
    location: "Tech Hub, San Francisco",
    status: "completed",
    badgeId: "BADGE-1004",
  },
  {
    id: "5",
    title: "Marketing Strategies Conference",
    date: "August 5-7, 2023",
    location: "Marketing Center, Los Angeles",
    status: "cancelled",
    badgeId: "BADGE-1005",
  },
];

export default DelegateDashboard;
