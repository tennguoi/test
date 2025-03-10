import React, { useState } from "react";
import { Plus, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DelegateTable from "./DelegateTable";
import DelegateForm from "./DelegateForm";

interface Delegate {
  id: string;
  name: string;
  email: string;
  organization: string;
  phone: string;
  status: "active" | "inactive" | "pending";
  registeredEvents: number;
}

interface DelegateManagementProps {
  initialDelegates?: Delegate[];
}

const DelegateManagement = ({
  initialDelegates = defaultDelegates,
}: DelegateManagementProps) => {
  const [delegates, setDelegates] = useState<Delegate[]>(initialDelegates);
  const [activeTab, setActiveTab] = useState("list");
  const [editingDelegate, setEditingDelegate] = useState<Delegate | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Handle delegate actions
  const handleViewDelegate = (id: string) => {
    console.log(`View delegate with ID: ${id}`);
    // In a real app, you would navigate to a detail view or open a modal
  };

  const handleEditDelegate = (id: string) => {
    const delegateToEdit = delegates.find((delegate) => delegate.id === id);
    if (delegateToEdit) {
      setEditingDelegate(delegateToEdit);
      setActiveTab("form");
    }
  };

  const handleDeleteDelegate = (id: string) => {
    // In a real app, you would show a confirmation dialog
    setDelegates(delegates.filter((delegate) => delegate.id !== id));
  };

  const handleAddDelegate = () => {
    setEditingDelegate(null);
    setActiveTab("form");
  };

  const handleSubmitDelegate = (data: any) => {
    if (editingDelegate) {
      // Update existing delegate
      const updatedDelegates = delegates.map((delegate) =>
        delegate.id === editingDelegate.id
          ? {
              ...delegate,
              name: `${data.firstName} ${data.lastName}`,
              email: data.email,
              phone: data.phone,
              organization: data.organization || "",
            }
          : delegate,
      );
      setDelegates(updatedDelegates);
    } else {
      // Add new delegate
      const newDelegate: Delegate = {
        id: `${delegates.length + 1}`,
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        phone: data.phone,
        organization: data.organization || "",
        status: "pending",
        registeredEvents: 0,
      };
      setDelegates([...delegates, newDelegate]);
    }
    setActiveTab("list");
    setEditingDelegate(null);
  };

  // Prepare form initial data if editing
  const getFormInitialData = () => {
    if (!editingDelegate) return {};

    const nameParts = editingDelegate.name.split(" ");
    return {
      firstName: nameParts[0] || "",
      lastName: nameParts.slice(1).join(" ") || "",
      email: editingDelegate.email,
      phone: editingDelegate.phone,
      organization: editingDelegate.organization,
    };
  };

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-sm">
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Delegate Management</h1>
          <Button onClick={handleAddDelegate}>
            <Plus className="mr-2 h-4 w-4" /> Add Delegate
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="list">Delegate List</TabsTrigger>
            <TabsTrigger value="form">
              {editingDelegate ? "Edit Delegate" : "Add Delegate"}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="mt-6">
            <Card>
              <CardHeader className="pb-0">
                <CardTitle>Delegates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 mb-6 mt-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by name, email, or organization..."
                      className="pl-8"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Select
                      value={statusFilter}
                      onValueChange={setStatusFilter}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>

                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <DelegateTable
                  delegates={delegates.filter(
                    (delegate) =>
                      statusFilter === "all" ||
                      delegate.status === statusFilter,
                  )}
                  onView={handleViewDelegate}
                  onEdit={handleEditDelegate}
                  onDelete={handleDeleteDelegate}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="form" className="mt-6">
            <DelegateForm
              initialData={getFormInitialData()}
              isEditing={!!editingDelegate}
              onSubmit={handleSubmitDelegate}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

// Default data for when no props are provided
const defaultDelegates: Delegate[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    organization: "Acme Inc.",
    phone: "+1 (555) 123-4567",
    status: "active",
    registeredEvents: 3,
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    organization: "Globex Corp",
    phone: "+1 (555) 987-6543",
    status: "active",
    registeredEvents: 2,
  },
  {
    id: "3",
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    organization: "Initech",
    phone: "+1 (555) 456-7890",
    status: "inactive",
    registeredEvents: 0,
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    organization: "Umbrella Corp",
    phone: "+1 (555) 234-5678",
    status: "pending",
    registeredEvents: 1,
  },
  {
    id: "5",
    name: "Michael Wilson",
    email: "michael.wilson@example.com",
    organization: "Stark Industries",
    phone: "+1 (555) 876-5432",
    status: "active",
    registeredEvents: 4,
  },
];

export default DelegateManagement;
