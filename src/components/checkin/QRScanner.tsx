import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Camera, RefreshCw, CheckCircle, XCircle } from "lucide-react";

interface QRScannerProps {
  onScanSuccess?: (data: string) => void;
  onScanError?: (error: string) => void;
  isScanning?: boolean;
}

const QRScanner = ({
  onScanSuccess = (data) => console.log("QR code scanned:", data),
  onScanError = (error) => console.error("QR scan error:", error),
  isScanning = true,
}: QRScannerProps) => {
  const [hasCamera, setHasCamera] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string>("");
  const [lastScanned, setLastScanned] = useState<string>("");
  const [scanStatus, setScanStatus] = useState<"idle" | "success" | "error">(
    "idle",
  );

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Mock QR code scanning function (in a real app, you would use a library like jsQR)
  const scanQRCode = () => {
    if (!isScanning) return;

    // Simulate QR code detection with random success/failure
    const success = Math.random() > 0.3;

    if (success) {
      const mockData = `DELEGATE-${Math.floor(Math.random() * 1000)}`;
      setLastScanned(mockData);
      setScanStatus("success");
      onScanSuccess(mockData);

      // Reset status after 2 seconds
      setTimeout(() => {
        setScanStatus("idle");
      }, 2000);
    } else {
      setScanStatus("error");
      onScanError("Could not read QR code");

      // Reset status after 2 seconds
      setTimeout(() => {
        setScanStatus("idle");
      }, 2000);
    }
  };

  const startCamera = async () => {
    try {
      const constraints = {
        video: { facingMode: "environment" },
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setHasCamera(true);
        setCameraError("");
      }
    } catch (err) {
      setHasCamera(false);
      setCameraError("Camera access denied or not available");
      console.error("Error accessing camera:", err);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const restartCamera = () => {
    stopCamera();
    startCamera();
  };

  useEffect(() => {
    startCamera();

    // Set up interval for scanning
    const scanInterval = setInterval(() => {
      scanQRCode();
    }, 1000);

    return () => {
      clearInterval(scanInterval);
      stopCamera();
    };
  }, [isScanning]);

  return (
    <Card className="w-full max-w-md mx-auto bg-white">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>QR Code Scanner</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={restartCamera}
            title="Restart camera"
          >
            <RefreshCw className="h-5 w-5" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative aspect-video bg-black rounded-md overflow-hidden mb-4">
          {hasCamera ? (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 w-full h-full hidden"
              />

              {/* Scanning indicator */}
              {isScanning && scanStatus === "idle" && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-64 border-2 border-white rounded-lg relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-blue-500 animate-scan" />
                  </div>
                </div>
              )}

              {/* Success/Error indicators */}
              {scanStatus === "success" && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <div className="bg-white p-4 rounded-lg flex items-center">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
                    <span>QR Code Detected</span>
                  </div>
                </div>
              )}

              {scanStatus === "error" && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <div className="bg-white p-4 rounded-lg flex items-center">
                    <XCircle className="h-6 w-6 text-red-500 mr-2" />
                    <span>Invalid QR Code</span>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
              <div className="text-center p-4">
                <Camera className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-white text-sm">
                  {cameraError || "Camera not available"}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={startCamera}
                  className="mt-2"
                >
                  Try Again
                </Button>
              </div>
            </div>
          )}
        </div>

        {lastScanned && (
          <Alert className="mb-4">
            <AlertDescription>
              Last scanned: <strong>{lastScanned}</strong>
            </AlertDescription>
          </Alert>
        )}

        <div className="text-center text-sm text-gray-500">
          <p>Position the QR code within the frame to scan</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default QRScanner;
