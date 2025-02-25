
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";

interface LocationChartProps {
  isLoading: boolean;
}

const LocationChart = ({ isLoading }: LocationChartProps) => {
  const data = [
    { location: "New York", scans: 1200 },
    { location: "London", scans: 900 },
    { location: "Tokyo", scans: 800 },
    { location: "Paris", scans: 600 },
    { location: "Berlin", scans: 400 },
  ];

  if (isLoading) {
    return <Skeleton className="h-[300px] w-full" />;
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis
          dataKey="location"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Tooltip />
        <Bar dataKey="scans" fill="#000" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default LocationChart;
