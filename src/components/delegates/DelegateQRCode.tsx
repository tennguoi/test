import React, { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
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
import { Download, Share2 } from "lucide-react";

interface DelegateQRCodeProps {
  delegateId?: string;
  delegateName?: string;
  conferenceName?: string;
  conferenceDate?: string;
  badgeId?: string;
  qrValue?: string;
  onDownload?: () => void;
  onShare?: () => void;
}

const DelegateQRCode = ({
  delegateId = "DEL-12345",
  delegateName = "John Smith",
  conferenceName = "Annual Tech Conference 2023",
  conferenceDate = "June 15-17, 2023",
  badgeId = "BADGE-789",
  qrValue = "delegate:DEL-12345:BADGE-789",
  onDownload = () => console.log("Download QR code"),
  onShare = () => console.log("Share QR code"),
}: DelegateQRCodeProps) => {
  const [qrSize, setQrSize] = useState(200);

  // Function to handle QR code download
  const handleDownload = () => {
    // In a real implementation, this would generate and download the QR code
    onDownload();
  };

  // Function to handle QR code sharing
  const handleShare = () => {
    // In a real implementation, this would open a share dialog
    onShare();
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white">
      <CardHeader className="text-center">
        <CardTitle>Delegate QR Code</CardTitle>
        <CardDescription>
          Use this QR code for check-in at the conference
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="mb-6 p-4 border rounded-lg bg-white">
          <QRCodeSVG
            value={qrValue}
            size={qrSize}
            level="H" // High error correction capability
            includeMargin={true}
            className="mx-auto"
          />
        </div>

        <div className="w-full space-y-4">
          <div className="flex justify-between items-center p-2 bg-muted/30 rounded">
            <span className="text-sm font-medium">Delegate ID:</span>
            <Badge variant="outline">{delegateId}</Badge>
          </div>

          <div className="flex justify-between items-center p-2 bg-muted/30 rounded">
            <span className="text-sm font-medium">Name:</span>
            <span>{delegateName}</span>
          </div>

          <div className="flex justify-between items-center p-2 bg-muted/30 rounded">
            <span className="text-sm font-medium">Conference:</span>
            <span className="text-right">{conferenceName}</span>
          </div>

          <div className="flex justify-between items-center p-2 bg-muted/30 rounded">
            <span className="text-sm font-medium">Date:</span>
            <span>{conferenceDate}</span>
          </div>

          <div className="flex justify-between items-center p-2 bg-muted/30 rounded">
            <span className="text-sm font-medium">Badge ID:</span>
            <Badge variant="secondary">{badgeId}</Badge>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={handleDownload}
          className="flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          Download
        </Button>
        <Button onClick={handleShare} className="flex items-center gap-2">
          <Share2 className="h-4 w-4" />
          Share
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DelegateQRCode;
