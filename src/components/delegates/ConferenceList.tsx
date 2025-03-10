import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users } from "lucide-react";

interface Conference {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  capacity: number;
  registeredCount: number;
  status: "upcoming" | "ongoing" | "completed" | "cancelled";
  tags: string[];
  imageUrl?: string;
}

interface ConferenceListProps {
  conferences?: Conference[];
  onRegister?: (conferenceId: string) => void;
  onViewDetails?: (conferenceId: string) => void;
}

const ConferenceList = ({
  conferences = [
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
      status: "upcoming",
      tags: ["Technology", "Innovation", "Networking"],
      imageUrl:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
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
      status: "upcoming",
      tags: ["Healthcare", "Innovation", "Research"],
      imageUrl:
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
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
      status: "completed",
      tags: ["Business", "Networking", "Global"],
      imageUrl:
        "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80",
    },
  ],
  onRegister = (id) => console.log(`Register for conference ${id}`),
  onViewDetails = (id) => console.log(`View details for conference ${id}`),
}: ConferenceListProps) => {
  const getStatusColor = (status: Conference["status"]) => {
    switch (status) {
      case "upcoming":
        return "secondary";
      case "ongoing":
        return "default";
      case "completed":
        return "outline";
      case "cancelled":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="w-full bg-background p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {conferences.map((conference) => (
          <Card
            key={conference.id}
            className="overflow-hidden flex flex-col h-full"
          >
            {conference.imageUrl && (
              <div className="h-48 overflow-hidden">
                <img
                  src={conference.imageUrl}
                  alt={conference.title}
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                />
              </div>
            )}
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{conference.title}</CardTitle>
                <Badge
                  variant={getStatusColor(conference.status)}
                  className="capitalize"
                >
                  {conference.status}
                </Badge>
              </div>
              <CardDescription className="mt-2">
                {conference.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{formatDate(conference.date)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{conference.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{conference.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {conference.registeredCount} / {conference.capacity}{" "}
                    registered
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {conference.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="bg-muted">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <Button
                variant="outline"
                onClick={() => onViewDetails(conference.id)}
              >
                View Details
              </Button>
              <Button
                onClick={() => onRegister(conference.id)}
                disabled={
                  conference.status !== "upcoming" ||
                  conference.registeredCount >= conference.capacity
                }
              >
                {conference.status !== "upcoming"
                  ? "Not Available"
                  : conference.registeredCount >= conference.capacity
                    ? "Fully Booked"
                    : "Register"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ConferenceList;
