import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Conference {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  location: string;
  capacity: number;
  status: "upcoming" | "ongoing" | "completed" | "cancelled";
}

interface ConferenceTableProps {
  conferences?: Conference[];
  onEdit?: (conference: Conference) => void;
  onDelete?: (conferenceId: string) => void;
  onView?: (conference: Conference) => void;
}

const ConferenceTable = ({
  conferences = [
    {
      id: "1",
      name: "Annual Tech Summit 2023",
      startDate: "2023-10-15",
      endDate: "2023-10-18",
      location: "San Francisco, CA",
      capacity: 500,
      status: "upcoming" as const,
    },
    {
      id: "2",
      name: "Healthcare Innovation Conference",
      startDate: "2023-11-05",
      endDate: "2023-11-07",
      location: "Boston, MA",
      capacity: 350,
      status: "upcoming" as const,
    },
    {
      id: "3",
      name: "Global Marketing Summit",
      startDate: "2023-09-10",
      endDate: "2023-09-12",
      location: "New York, NY",
      capacity: 400,
      status: "completed" as const,
    },
    {
      id: "4",
      name: "Sustainable Energy Forum",
      startDate: "2023-12-01",
      endDate: "2023-12-03",
      location: "Seattle, WA",
      capacity: 300,
      status: "upcoming" as const,
    },
    {
      id: "5",
      name: "AI & Machine Learning Expo",
      startDate: "2023-08-20",
      endDate: "2023-08-22",
      location: "Austin, TX",
      capacity: 450,
      status: "cancelled" as const,
    },
  ],
  onEdit = () => {},
  onDelete = () => {},
  onView = () => {},
}: ConferenceTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter conferences based on search term
  const filteredConferences = conferences.filter(
    (conference) =>
      conference.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conference.location.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredConferences.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredConferences.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  const getStatusBadgeVariant = (status: Conference["status"]) => {
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
    <div className="w-full bg-white rounded-md shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Conferences</h2>
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search conferences..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <Table>
        <TableCaption>A list of all conferences</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Capacity</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentItems.length > 0 ? (
            currentItems.map((conference) => (
              <TableRow key={conference.id}>
                <TableCell className="font-medium">{conference.name}</TableCell>
                <TableCell>
                  {new Date(conference.startDate).toLocaleDateString()} -{" "}
                  {new Date(conference.endDate).toLocaleDateString()}
                </TableCell>
                <TableCell>{conference.location}</TableCell>
                <TableCell>{conference.capacity}</TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(conference.status)}>
                    {conference.status.charAt(0).toUpperCase() +
                      conference.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onView(conference)}>
                        View details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit(conference)}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onDelete(conference.id)}
                        className="text-destructive focus:text-destructive"
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center py-6 text-muted-foreground"
              >
                No conferences found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-end space-x-2 mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ConferenceTable;
