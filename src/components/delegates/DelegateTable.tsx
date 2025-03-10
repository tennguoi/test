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
import { MoreHorizontal, Search, Edit, Trash2, Eye } from "lucide-react";

interface Delegate {
  id: string;
  name: string;
  email: string;
  organization: string;
  phone: string;
  status: "active" | "inactive" | "pending";
  registeredEvents: number;
}

interface DelegateTableProps {
  delegates?: Delegate[];
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const DelegateTable = ({
  delegates = defaultDelegates,
  onView = () => {},
  onEdit = () => {},
  onDelete = () => {},
}: DelegateTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter delegates based on search term
  const filteredDelegates = delegates.filter(
    (delegate) =>
      delegate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delegate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delegate.organization.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Paginate delegates
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDelegates = filteredDelegates.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );
  const totalPages = Math.ceil(filteredDelegates.length / itemsPerPage);

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "active":
        return "default";
      case "inactive":
        return "secondary";
      case "pending":
        return "outline";
      default:
        return "default";
    }
  };

  return (
    <div className="w-full bg-white rounded-md shadow">
      <div className="p-4 flex items-center justify-between border-b">
        <h2 className="text-xl font-semibold">Delegates</h2>
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search delegates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <Table>
        <TableCaption>A list of all delegates.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Organization</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Registered Events</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentDelegates.length > 0 ? (
            currentDelegates.map((delegate) => (
              <TableRow key={delegate.id}>
                <TableCell className="font-medium">{delegate.name}</TableCell>
                <TableCell>{delegate.email}</TableCell>
                <TableCell>{delegate.organization}</TableCell>
                <TableCell>{delegate.phone}</TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(delegate.status)}>
                    {delegate.status.charAt(0).toUpperCase() +
                      delegate.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>{delegate.registeredEvents}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onView(delegate.id)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit(delegate.id)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onDelete(delegate.id)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
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
                colSpan={7}
                className="text-center py-6 text-muted-foreground"
              >
                No delegates found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {totalPages > 1 && (
        <div className="flex items-center justify-between p-4 border-t">
          <div className="text-sm text-muted-foreground">
            Showing {indexOfFirstItem + 1} to{" "}
            {Math.min(indexOfLastItem, filteredDelegates.length)} of{" "}
            {filteredDelegates.length} delegates
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

// Default data for the table when no props are provided
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

export default DelegateTable;
