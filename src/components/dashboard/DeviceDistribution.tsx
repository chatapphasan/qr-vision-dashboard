import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";

interface DeviceDistributionProps {
  isLoading: boolean;
}

const DeviceDistribution = ({ isLoading }: DeviceDistributionProps) => {
  const data = [
    { name: "iOS", value: 540 },
    { name: "Android", value: 620 },
    { name: "Desktop", value: 210 },
  ];

  const COLORS = ["#000000", "#404040", "#808080"];

  if (isLoading) {
    return <Skeleton className="h-[300px] w-full" />;
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default DeviceDistribution;
