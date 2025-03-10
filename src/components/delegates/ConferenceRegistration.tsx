import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Calendar } from "lucide-react";
import ConferenceList from "./ConferenceList";
import RegistrationForm from "./RegistrationForm";

interface ConferenceRegistrationProps {
  selectedConferenceId?: string;
  onRegister?: (conferenceId: string, formData: any) => void;
  onViewDetails?: (conferenceId: string) => void;
}

const ConferenceRegistration = ({
  selectedConferenceId = "",
  onRegister = () => {},
  onViewDetails = () => {},
}: ConferenceRegistrationProps) => {
  const [activeTab, setActiveTab] = useState("browse");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedConference, setSelectedConference] = useState<{
    id: string;
    title: string;
    date: string;
    price: number;
  } | null>(null);

  // Handle conference selection for registration
  const handleRegisterClick = (conferenceId: string) => {
    // Find the conference in our mock data
    const conference = mockConferences.find((conf) => conf.id === conferenceId);

    if (conference) {
      setSelectedConference({
        id: conference.id,
        title: conference.title,
        date: formatDate(conference.date),
        price: conference.price || 499,
      });
      setActiveTab("register");
    }
  };

  // Handle form submission
  const handleFormSubmit = (formData: any) => {
    if (selectedConference) {
      onRegister(selectedConference.id, formData);
      // In a real app, you might redirect or show a confirmation
      console.log(
        "Registration submitted for",
        selectedConference.title,
        formData,
      );
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 bg-white">
      <CardHeader className="px-0">
        <CardTitle className="text-2xl font-bold">
          Conference Registration
        </CardTitle>
        <CardDescription>
          Browse available conferences and register for upcoming events
        </CardDescription>
      </CardHeader>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <TabsList className="mb-4 sm:mb-0">
            <TabsTrigger value="browse" className="px-4">
              Browse Conferences
            </TabsTrigger>
            <TabsTrigger
              value="register"
              className="px-4"
              disabled={!selectedConference}
            >
              Registration Form
            </TabsTrigger>
          </TabsList>

          {activeTab === "browse" && (
            <div className="flex gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search conferences..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        <TabsContent value="browse" className="mt-0">
          <ConferenceList
            conferences={mockConferences.filter(
              (conf) =>
                conf.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                conf.location.toLowerCase().includes(searchTerm.toLowerCase()),
            )}
            onRegister={handleRegisterClick}
            onViewDetails={onViewDetails}
          />
        </TabsContent>

        <TabsContent value="register" className="mt-0">
          {selectedConference ? (
            <RegistrationForm
              conferenceId={selectedConference.id}
              conferenceName={selectedConference.title}
              conferenceDate={selectedConference.date}
              conferencePrice={selectedConference.price}
              onSubmit={handleFormSubmit}
            />
          ) : (
            <Card>
              <CardContent className="pt-6 text-center">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-medium">No Conference Selected</p>
                <p className="text-muted-foreground mb-4">
                  Please browse and select a conference to register for.
                </p>
                <Button onClick={() => setActiveTab("browse")}>
                  Browse Conferences
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Mock data for conferences
const mockConferences = [
  {
    id: "1",
    title: "Annual Tech Summit 2023",
    description:
      "Join us for the biggest tech conference of the year featuring keynotes from industry leaders and hands-on workshops.",
    date: "2023-11-15",
    time: "09:00 - 18:00",
    location: "Convention Center, New York",
    capacity: 500,
    registeredCount: 342,
    status: "upcoming" as const,
    tags: ["Technology", "Innovation", "Networking"],
    imageUrl:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    price: 499,
  },
  {
    id: "2",
    title: "Healthcare Innovation Conference",
    description:
      "Exploring the latest advancements in healthcare technology and patient care methodologies.",
    date: "2023-12-05",
    time: "10:00 - 16:00",
    location: "Medical Center, Boston",
    capacity: 300,
    registeredCount: 187,
    status: "upcoming" as const,
    tags: ["Healthcare", "Innovation", "Research"],
    imageUrl:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
    price: 599,
  },
  {
    id: "3",
    title: "Global Business Forum",
    description:
      "Connect with business leaders from around the world and discover new opportunities for growth and collaboration.",
    date: "2023-10-20",
    time: "08:30 - 17:00",
    location: "Business Center, Chicago",
    capacity: 400,
    registeredCount: 400,
    status: "completed" as const,
    tags: ["Business", "Networking", "Global"],
    imageUrl:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80",
    price: 399,
  },
  {
    id: "4",
    title: "AI & Machine Learning Summit",
    description:
      "Dive deep into the world of artificial intelligence and machine learning with expert-led sessions and networking opportunities.",
    date: "2023-12-15",
    time: "09:30 - 17:30",
    location: "Tech Hub, San Francisco",
    capacity: 350,
    registeredCount: 210,
    status: "upcoming" as const,
    tags: ["AI", "Machine Learning", "Technology"],
    imageUrl:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
    price: 649,
  },
  {
    id: "5",
    title: "Sustainable Development Conference",
    description:
      "Join thought leaders and practitioners in discussing sustainable development goals and environmental conservation strategies.",
    date: "2024-01-10",
    time: "10:00 - 16:00",
    location: "Green Center, Portland",
    capacity: 250,
    registeredCount: 98,
    status: "upcoming" as const,
    tags: ["Sustainability", "Environment", "Development"],
    imageUrl:
      "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&q=80",
    price: 349,
  },
];

export default ConferenceRegistration;
