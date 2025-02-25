
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import ScanActivityChart from "@/components/dashboard/ScanActivityChart";
import DeviceDistribution from "@/components/dashboard/DeviceDistribution";
import LocationChart from "@/components/dashboard/LocationChart";
import LocationHeatmap from "@/components/dashboard/LocationHeatmap";
import StatsOverview from "@/components/dashboard/StatsOverview";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="space-y-1">
        <div className="flex items-center space-x-2">
          <div className="h-6 w-1.5 bg-gray-900 rounded-full" />
          <h1 className="text-2xl font-medium tracking-tight">QR Analytics Dashboard</h1>
        </div>
        <p className="text-gray-500">Monitor your QR code performance and insights</p>
      </header>

      {/* Stats Overview */}
      <StatsOverview isLoading={isLoading} />

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-4">Scan Activity</h3>
          <ScanActivityChart isLoading={isLoading} />
        </Card>

        <Card className="p-6 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-4">Device Distribution</h3>
          <DeviceDistribution isLoading={isLoading} />
        </Card>

        <Card className="p-6 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-4">Scans by Location</h3>
          <LocationChart isLoading={isLoading} />
        </Card>

        <Card className="p-6 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-4">Location Heatmap</h3>
          <LocationHeatmap isLoading={isLoading} />
        </Card>
      </div>
    </div>
  );
};

export default Index;
