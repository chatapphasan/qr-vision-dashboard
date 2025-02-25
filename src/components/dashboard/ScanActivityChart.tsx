
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";

interface ScanActivityChartProps {
  isLoading: boolean;
}

const ScanActivityChart = ({ isLoading }: ScanActivityChartProps) => {
  const data = [
    { date: "Jan", scans: 400 },
    { date: "Feb", scans: 300 },
    { date: "Mar", scans: 600 },
    { date: "Apr", scans: 800 },
    { date: "May", scans: 500 },
    { date: "Jun", scans: 900 },
    { date: "Jul", scans: 1200 },
  ];

  if (isLoading) {
    return <Skeleton className="h-[300px] w-full" />;
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis
          dataKey="date"
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
        <Line
          type="monotone"
          dataKey="scans"
          stroke="#000"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ScanActivityChart;
