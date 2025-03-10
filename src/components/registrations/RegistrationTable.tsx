import React, { useState } from "react";
import {
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Download,
} from "lucide-react";
import { format } from "date-fns";

import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface Registration {
  id: string;
  delegateId: string;
  delegateName: string;
  conferenceId: string;
  conferenceName: string;
  registrationDate: Date;
  status: "pending" | "approved" | "rejected" | "cancelled";
  paymentStatus: "unpaid" | "paid" | "refunded";
  ticketType: string;
  amount: number;
}

interface RegistrationTableProps {
  registrations?: Registration[];
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onExport?: () => void;
}

const RegistrationTable = ({
  registrations = mockRegistrations,
  onView = () => {},
  onEdit = () => {},
  onDelete = () => {},
  onApprove = () => {},
  onReject = () => {},
  onExport = () => {},
}: RegistrationTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [paymentFilter, setPaymentFilter] = useState<string>("all");

  // Filter registrations based on search term and filters
  const filteredRegistrations = registrations.filter((registration) => {
    const matchesSearch =
      registration.delegateName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      registration.conferenceName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || registration.status === statusFilter;
    const matchesPayment =
      paymentFilter === "all" || registration.paymentStatus === paymentFilter;

    return matchesSearch && matchesStatus && matchesPayment;
  });

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "approved":
        return "default";
      case "pending":
        return "secondary";
      case "rejected":
        return "destructive";
      case "cancelled":
        return "outline";
      default:
        return "secondary";
    }
  };

  const getPaymentBadgeVariant = (status: string) => {
    switch (status) {
      case "paid":
        return "default";
      case "unpaid":
        return "secondary";
      case "refunded":
        return "outline";
      default:
        return "secondary";
    }
  };

  return (
    <div className="w-full bg-white rounded-md shadow p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-xl font-semibold">Registration Management</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by delegate or conference..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>

          <Select value={paymentFilter} onValueChange={setPaymentFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Payment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Payments</SelectItem>
              <SelectItem value="unpaid">Unpaid</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="refunded">Refunded</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Delegate</TableHead>
              <TableHead>Conference</TableHead>
              <TableHead>Registration Date</TableHead>
              <TableHead>Ticket Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRegistrations.length > 0 ? (
              filteredRegistrations.map((registration) => (
                <TableRow key={registration.id}>
                  <TableCell className="font-medium">
                    {registration.delegateName}
                  </TableCell>
                  <TableCell>{registration.conferenceName}</TableCell>
                  <TableCell>
                    {format(registration.registrationDate, "MMM dd, yyyy")}
                  </TableCell>
                  <TableCell>{registration.ticketType}</TableCell>
                  <TableCell>${registration.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(registration.status)}>
                      {registration.status.charAt(0).toUpperCase() +
                        registration.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={getPaymentBadgeVariant(
                        registration.paymentStatus,
                      )}
                    >
                      {registration.paymentStatus.charAt(0).toUpperCase() +
                        registration.paymentStatus.slice(1)}
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
                        <DropdownMenuItem
                          onClick={() => onView(registration.id)}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onEdit(registration.id)}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {registration.status === "pending" && (
                          <>
                            <DropdownMenuItem
                              onClick={() => onApprove(registration.id)}
                            >
                              Approve
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => onReject(registration.id)}
                            >
                              Reject
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                          </>
                        )}
                        <DropdownMenuItem
                          onClick={() => onDelete(registration.id)}
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
                <TableCell colSpan={8} className="h-24 text-center">
                  No registrations found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

// Mock data for default display
const mockRegistrations: Registration[] = [
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

export default RegistrationTable;
