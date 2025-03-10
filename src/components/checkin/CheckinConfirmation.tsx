import React from "react";
import { CheckCircle, Printer, X } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface CheckinConfirmationProps {
  delegateName?: string;
  conferenceTitle?: string;
  badgeId?: string;
  checkInTime?: string;
  onPrintBadge?: () => void;
  onClose?: () => void;
}

const CheckinConfirmation = ({
  delegateName = "John Smith",
  conferenceTitle = "Annual Tech Conference 2023",
  badgeId = "DEL-12345",
  checkInTime = new Date().toLocaleTimeString(),
  onPrintBadge = () => console.log("Print badge"),
  onClose = () => console.log("Close confirmation"),
}: CheckinConfirmationProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4 bg-background">
      <Card className="w-full max-w-md bg-white">
        <CardHeader className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
          <div className="flex flex-col items-center justify-center text-center">
            <div className="mb-2 rounded-full bg-green-100 p-3">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-xl font-bold">
              Check-in Successful!
            </CardTitle>
            <CardDescription>
              Delegate has been checked in successfully
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="rounded-lg bg-gray-50 p-4">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500">
                Delegate
              </span>
              <span className="font-medium">{delegateName}</span>
            </div>

            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500">
                Conference
              </span>
              <span className="font-medium">{conferenceTitle}</span>
            </div>

            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500">
                Badge ID
              </span>
              <Badge variant="secondary">{badgeId}</Badge>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500">
                Check-in Time
              </span>
              <span className="font-medium">{checkInTime}</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={onPrintBadge} className="flex items-center gap-2">
            <Printer className="h-4 w-4" />
            Print Badge
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CheckinConfirmation;
