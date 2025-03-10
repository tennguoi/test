import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Settings, Users } from "lucide-react";
import RegistrationTable from "./RegistrationTable";

interface RegistrationManagementProps {
  onCreateRegistration?: () => void;
  onViewRegistration?: (id: string) => void;
  onEditRegistration?: (id: string) => void;
  onDeleteRegistration?: (id: string) => void;
  onApproveRegistration?: (id: string) => void;
  onRejectRegistration?: (id: string) => void;
  onExportRegistrations?: () => void;
}

const RegistrationManagement = ({
  onCreateRegistration = () => {},
  onViewRegistration = () => {},
  onEditRegistration = () => {},
  onDeleteRegistration = () => {},
  onApproveRegistration = () => {},
  onRejectRegistration = () => {},
  onExportRegistrations = () => {},
}: RegistrationManagementProps) => {
  const [activeTab, setActiveTab] = useState("all");

  // Stats for the dashboard cards
  const stats = {
    total: 42,
    pending: 12,
    approved: 25,
    rejected: 3,
    cancelled: 2,
  };

  return (
    <div className="w-full h-full bg-background p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Registration Management
          </h1>
          <p className="text-muted-foreground">
            Manage delegate registrations for all conferences.
          </p>
        </div>
        <Button onClick={onCreateRegistration}>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Registration
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Registrations
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">
              Across all conferences
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <div className="h-4 w-4 rounded-full bg-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pending}</div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <div className="h-4 w-4 rounded-full bg-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.approved}</div>
            <p className="text-xs text-muted-foreground">Confirmed attendees</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Rejected/Cancelled
            </CardTitle>
            <div className="h-4 w-4 rounded-full bg-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.rejected + stats.cancelled}
            </div>
            <p className="text-xs text-muted-foreground">Not attending</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs and Registration Table */}
      <Tabs
        defaultValue="all"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="all">All Registrations</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>

        <TabsContent value="all" className="mt-0">
          <RegistrationTable
            onView={onViewRegistration}
            onEdit={onEditRegistration}
            onDelete={onDeleteRegistration}
            onApprove={onApproveRegistration}
            onReject={onRejectRegistration}
            onExport={onExportRegistrations}
          />
        </TabsContent>

        <TabsContent value="pending" className="mt-0">
          <RegistrationTable
            registrations={mockRegistrations.filter(
              (r) => r.status === "pending",
            )}
            onView={onViewRegistration}
            onEdit={onEditRegistration}
            onDelete={onDeleteRegistration}
            onApprove={onApproveRegistration}
            onReject={onRejectRegistration}
            onExport={onExportRegistrations}
          />
        </TabsContent>

        <TabsContent value="approved" className="mt-0">
          <RegistrationTable
            registrations={mockRegistrations.filter(
              (r) => r.status === "approved",
            )}
            onView={onViewRegistration}
            onEdit={onEditRegistration}
            onDelete={onDeleteRegistration}
            onExport={onExportRegistrations}
          />
        </TabsContent>

        <TabsContent value="rejected" className="mt-0">
          <RegistrationTable
            registrations={mockRegistrations.filter(
              (r) => r.status === "rejected" || r.status === "cancelled",
            )}
            onView={onViewRegistration}
            onEdit={onEditRegistration}
            onDelete={onDeleteRegistration}
            onExport={onExportRegistrations}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Mock data for the component
const mockRegistrations = [
  {
    id: "1",
    delegateId: "d1",
    delegateName: "John Smith",
    conferenceId: "c1",
    conferenceName: "Annual Tech Summit 2023",
    registrationDate: new Date("2023-05-15"),
    status: "approved",
    paymentStatus: "paid",
    ticketType: "VIP",
    amount: 299.99,
  },
  {
    id: "2",
    delegateId: "d2",
    delegateName: "Sarah Johnson",
    conferenceId: "c1",
    conferenceName: "Annual Tech Summit 2023",
    registrationDate: new Date("2023-05-16"),
    status: "pending",
    paymentStatus: "unpaid",
    ticketType: "Standard",
    amount: 149.99,
  },
  {
    id: "3",
    delegateId: "d3",
    delegateName: "Michael Brown",
    conferenceId: "c2",
    conferenceName: "Developer Conference 2023",
    registrationDate: new Date("2023-06-01"),
    status: "approved",
    paymentStatus: "paid",
    ticketType: "Early Bird",
    amount: 99.99,
  },
  {
    id: "4",
    delegateId: "d4",
    delegateName: "Emily Davis",
    conferenceId: "c2",
    conferenceName: "Developer Conference 2023",
    registrationDate: new Date("2023-06-05"),
    status: "rejected",
    paymentStatus: "refunded",
    ticketType: "Standard",
    amount: 149.99,
  },
  {
    id: "5",
    delegateId: "d5",
    delegateName: "David Wilson",
    conferenceId: "c3",
    conferenceName: "Marketing Summit 2023",
    registrationDate: new Date("2023-07-10"),
    status: "cancelled",
    paymentStatus: "refunded",
    ticketType: "Premium",
    amount: 199.99,
  },
];

export default RegistrationManagement;
