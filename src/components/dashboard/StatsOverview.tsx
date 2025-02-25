
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { QrCode, Smartphone, MapPin, ArrowUpRight } from "lucide-react";

interface StatsOverviewProps {
  isLoading: boolean;
}

const StatsOverview = ({ isLoading }: StatsOverviewProps) => {
  const stats = [
    {
      label: "Total Scans",
      value: "12,438",
      change: "+12.5%",
      icon: QrCode,
    },
    {
      label: "Unique Devices",
      value: "3,842",
      change: "+5.2%",
      icon: Smartphone,
    },
    {
      label: "Locations",
      value: "156",
      change: "+8.1%",
      icon: MapPin,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat) => (
        <Card key={stat.label} className="p-6 shadow-sm">
          {isLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-8 w-[120px]" />
              <Skeleton className="h-4 w-[80px]" />
            </div>
          ) : (
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">{stat.label}</span>
                <stat.icon className="h-4 w-4 text-gray-400" />
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-semibold">{stat.value}</span>
                <span className="text-sm font-medium text-emerald-600 flex items-center">
                  {stat.change}
                  <ArrowUpRight className="h-3 w-3 ml-0.5" />
                </span>
              </div>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
};

export default StatsOverview;
