import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusCircle, RefreshCw } from "lucide-react";
import ConferenceTable from "./ConferenceTable";
import ConferenceForm from "./ConferenceForm";

interface Conference {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  location: string;
  capacity: number;
  status: "upcoming" | "ongoing" | "completed" | "cancelled";
  description?: string;
}

interface ConferenceManagementProps {
  initialConferences?: Conference[];
}

const ConferenceManagement = ({
  initialConferences = [
    {
      id: "1",
      name: "Annual Tech Summit 2023",
      startDate: "2023-10-15",
      endDate: "2023-10-18",
      location: "San Francisco, CA",
      capacity: 500,
      status: "upcoming" as const,
      description:
        "The biggest tech conference of the year featuring keynotes from industry leaders.",
    },
    {
      id: "2",
      name: "Healthcare Innovation Conference",
      startDate: "2023-11-05",
      endDate: "2023-11-07",
      location: "Boston, MA",
      capacity: 350,
      status: "upcoming" as const,
      description:
        "Exploring the latest advancements in healthcare technology.",
    },
    {
      id: "3",
      name: "Global Marketing Summit",
      startDate: "2023-09-10",
      endDate: "2023-09-12",
      location: "New York, NY",
      capacity: 400,
      status: "completed" as const,
      description:
        "Connect with marketing professionals from around the world.",
    },
  ],
}: ConferenceManagementProps) => {
  const [conferences, setConferences] =
    useState<Conference[]>(initialConferences);
  const [activeTab, setActiveTab] = useState("list");
  const [selectedConference, setSelectedConference] =
    useState<Conference | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Handle viewing a conference (placeholder)
  const handleViewConference = (conference: Conference) => {
    console.log("Viewing conference:", conference);
    // In a real application, this might open a detailed view or navigate to a details page
  };

  // Handle editing a conference
  const handleEditConference = (conference: Conference) => {
    setSelectedConference(conference);
    setActiveTab("edit");
  };

  // Handle deleting a conference
  const handleDeleteConference = (conferenceId: string) => {
    // In a real application, you would show a confirmation dialog
    if (window.confirm("Are you sure you want to delete this conference?")) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setConferences(conferences.filter((conf) => conf.id !== conferenceId));
        setIsLoading(false);
      }, 500);
    }
  };

  // Handle creating a new conference
  const handleCreateConference = (data: any) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const newConference = {
        id: `${conferences.length + 1}`,
        name: data.name,
        description: data.description,
        startDate: data.startDate.toISOString().split("T")[0],
        endDate: data.endDate ? data.endDate.toISOString().split("T")[0] : "",
        location: data.location,
        capacity: data.capacity,
        status: "upcoming" as const,
      };
      setConferences([...conferences, newConference]);
      setActiveTab("list");
      setIsLoading(false);
    }, 500);
  };

  // Handle updating an existing conference
  const handleUpdateConference = (data: any) => {
    if (!selectedConference) return;

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const updatedConferences = conferences.map((conf) =>
        conf.id === selectedConference.id
          ? {
              ...conf,
              name: data.name,
              description: data.description,
              startDate: data.startDate.toISOString().split("T")[0],
              endDate: data.endDate
                ? data.endDate.toISOString().split("T")[0]
                : conf.endDate,
              location: data.location,
              capacity: data.capacity,
              status: data.status === "cancelled" ? "cancelled" : conf.status,
            }
          : conf,
      );
      setConferences(updatedConferences);
      setActiveTab("list");
      setSelectedConference(null);
      setIsLoading(false);
    }, 500);
  };

  // Handle refreshing the conference list
  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate API call to refresh data
    setTimeout(() => {
      // In a real application, you would fetch fresh data from the server
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Conference Management</h1>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isLoading}
          >
            <RefreshCw
              className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
          <Button
            size="sm"
            onClick={() => {
              setSelectedConference(null);
              setActiveTab("create");
            }}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            New Conference
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="list">Conference List</TabsTrigger>
          <TabsTrigger value="create" disabled={activeTab === "edit"}>
            Create Conference
          </TabsTrigger>
          <TabsTrigger value="edit" disabled={!selectedConference}>
            Edit Conference
          </TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          <ConferenceTable
            conferences={conferences}
            onView={handleViewConference}
            onEdit={handleEditConference}
            onDelete={handleDeleteConference}
          />
        </TabsContent>

        <TabsContent value="create">
          <ConferenceForm onSubmit={handleCreateConference} />
        </TabsContent>

        <TabsContent value="edit">
          {selectedConference && (
            <ConferenceForm
              isEditing={true}
              initialData={{
                name: selectedConference.name,
                description: selectedConference.description || "",
                location: selectedConference.location,
                capacity: selectedConference.capacity,
                status: "published" as const,
                startDate: new Date(selectedConference.startDate),
                endDate: selectedConference.endDate
                  ? new Date(selectedConference.endDate)
                  : undefined,
                price: 0, // Assuming a default price if not available in the conference data
              }}
              onSubmit={handleUpdateConference}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConferenceManagement;
