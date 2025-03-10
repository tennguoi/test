import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, UserCheck, Users, QrCode, History } from "lucide-react";
import QRScanner from "./QRScanner";
import CheckinConfirmation from "./CheckinConfirmation";

interface Delegate {
  id: string;
  name: string;
  email: string;
  badgeId: string;
  organization: string;
  conferenceId: string;
  conferenceName: string;
  checkInStatus: "checked-in" | "not-checked-in";
  checkInTime?: string;
}

interface CheckinSystemProps {
  delegates?: Delegate[];
  onCheckin?: (delegateId: string) => void;
  onManualCheckin?: (badgeId: string) => void;
}

const CheckinSystem = ({
  delegates = defaultDelegates,
  onCheckin = () => {},
  onManualCheckin = () => {},
}: CheckinSystemProps) => {
  const [activeTab, setActiveTab] = useState<string>("scanner");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [selectedDelegate, setSelectedDelegate] = useState<Delegate | null>(
    null,
  );
  const [manualBadgeId, setManualBadgeId] = useState<string>("");

  // Filter delegates based on search term
  const filteredDelegates = delegates.filter(
    (delegate) =>
      delegate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delegate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delegate.badgeId.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Handle QR code scan success
  const handleScanSuccess = (data: string) => {
    console.log("QR code scanned:", data);
    // In a real app, you would validate the QR code data and find the matching delegate
    // For this example, we'll just use the first delegate in the list
    const delegate = delegates.find((d) => d.badgeId === data) || delegates[0];
    handleCheckin(delegate);
  };

  // Handle manual check-in
  const handleManualCheckin = () => {
    if (!manualBadgeId) return;

    const delegate = delegates.find((d) => d.badgeId === manualBadgeId);
    if (delegate) {
      handleCheckin(delegate);
    } else {
      // In a real app, you would show an error message
      console.error("Delegate not found with badge ID:", manualBadgeId);
    }

    // Reset the input field
    setManualBadgeId("");
  };

  // Handle delegate check-in from the list
  const handleDelegateCheckin = (delegate: Delegate) => {
    handleCheckin(delegate);
  };

  // Common check-in handler
  const handleCheckin = (delegate: Delegate) => {
    setSelectedDelegate(delegate);
    setShowConfirmation(true);
    onCheckin(delegate.id);
  };

  // Close confirmation dialog
  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
    setSelectedDelegate(null);
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-md">
      <Tabs
        defaultValue="scanner"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <div className="p-4 border-b">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
            <h2 className="text-2xl font-bold">Check-in System</h2>
            <TabsList className="mt-2 sm:mt-0">
              <TabsTrigger value="scanner" className="flex items-center gap-2">
                <QrCode className="h-4 w-4" />
                QR Scanner
              </TabsTrigger>
              <TabsTrigger value="manual" className="flex items-center gap-2">
                <UserCheck className="h-4 w-4" />
                Manual Check-in
              </TabsTrigger>
              <TabsTrigger
                value="delegates"
                className="flex items-center gap-2"
              >
                <Users className="h-4 w-4" />
                Delegates
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center gap-2">
                <History className="h-4 w-4" />
                History
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        <TabsContent value="scanner" className="p-4">
          <div className="max-w-md mx-auto">
            <QRScanner
              onScanSuccess={handleScanSuccess}
              onScanError={(error) => console.error(error)}
              isScanning={activeTab === "scanner"}
            />
          </div>
        </TabsContent>

        <TabsContent value="manual" className="p-4">
          <Card>
            <CardHeader>
              <CardTitle>Manual Check-in</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter Badge ID"
                    value={manualBadgeId}
                    onChange={(e) => setManualBadgeId(e.target.value)}
                  />
                  <Button onClick={handleManualCheckin}>Check In</Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Enter the delegate's badge ID to manually check them in.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="delegates" className="p-4">
          <div className="mb-4 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search delegates..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="space-y-2 max-h-[500px] overflow-y-auto">
            {filteredDelegates.length > 0 ? (
              filteredDelegates.map((delegate) => (
                <Card key={delegate.id} className="overflow-hidden">
                  <div className="p-4 flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{delegate.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {delegate.email}
                      </p>
                      <div className="flex items-center mt-1 space-x-2">
                        <Badge variant="outline">{delegate.badgeId}</Badge>
                        <span className="text-xs text-muted-foreground">
                          {delegate.conferenceName}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {delegate.checkInStatus === "checked-in" ? (
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                          Checked In
                        </Badge>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => handleDelegateCheckin(delegate)}
                        >
                          Check In
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No delegates found matching your search.
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="history" className="p-4">
          <Card>
            <CardHeader>
              <CardTitle>Check-in History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-[500px] overflow-y-auto">
                {delegates
                  .filter((d) => d.checkInStatus === "checked-in")
                  .map((delegate) => (
                    <div
                      key={delegate.id}
                      className="flex justify-between items-center p-3 border rounded-md"
                    >
                      <div>
                        <h3 className="font-medium">{delegate.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {delegate.badgeId} • {delegate.conferenceName}
                        </p>
                      </div>
                      <div className="text-sm text-right">
                        <Badge variant="outline" className="mb-1">
                          Checked In
                        </Badge>
                        <p className="text-xs text-muted-foreground">
                          {delegate.checkInTime || "Today, 10:30 AM"}
                        </p>
                      </div>
                    </div>
                  ))}

                {delegates.filter((d) => d.checkInStatus === "checked-in")
                  .length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No check-in history available.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Check-in Confirmation Dialog */}
      {showConfirmation && selectedDelegate && (
        <CheckinConfirmation
          delegateName={selectedDelegate.name}
          conferenceTitle={selectedDelegate.conferenceName}
          badgeId={selectedDelegate.badgeId}
          checkInTime={new Date().toLocaleTimeString()}
          onPrintBadge={() =>
            console.log("Printing badge for", selectedDelegate.name)
          }
          onClose={handleCloseConfirmation}
        />
      )}
    </div>
  );
};

// Default data for the component when no props are provided
const defaultDelegates: Delegate[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    badgeId: "DEL-1001",
    organization: "Acme Inc.",
    conferenceId: "conf-1",
    conferenceName: "Annual Tech Summit 2023",
    checkInStatus: "not-checked-in",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    badgeId: "DEL-1002",
    organization: "Globex Corp",
    conferenceId: "conf-1",
    conferenceName: "Annual Tech Summit 2023",
    checkInStatus: "checked-in",
    checkInTime: "Today, 9:45 AM",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    badgeId: "DEL-1003",
    organization: "Initech",
    conferenceId: "conf-1",
    conferenceName: "Annual Tech Summit 2023",
    checkInStatus: "not-checked-in",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    badgeId: "DEL-1004",
    organization: "Umbrella Corp",
    conferenceId: "conf-2",
    conferenceName: "Healthcare Innovation Conference",
    checkInStatus: "not-checked-in",
  },
  {
    id: "5",
    name: "David Wilson",
    email: "david.wilson@example.com",
    badgeId: "DEL-1005",
    organization: "Stark Industries",
    conferenceId: "conf-2",
    conferenceName: "Healthcare Innovation Conference",
    checkInStatus: "checked-in",
    checkInTime: "Today, 8:30 AM",
  },
];

export default CheckinSystem;
