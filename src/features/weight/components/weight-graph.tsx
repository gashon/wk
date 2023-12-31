import { FC, useContext } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
import { BodyWeightContext } from "..";

export const WeightTrendsGraph: FC = () => {
  const { bodyWeightData } = useContext(BodyWeightContext);

  if (!bodyWeightData) return <LoadingSkeleton />;

  const weights = bodyWeightData.map((item) => item.weight);
  const minY = Math.min(...weights);
  const maxY = Math.max(...weights);

  // Create a deep copy of the bodyWeightData array and reverse it
  const reversedData = JSON.parse(JSON.stringify(bodyWeightData)).reverse();

  return (
    <>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          width={500}
          height={300}
          data={reversedData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="created_at_date_string" />
          <YAxis domain={[minY - 1, maxY + 1]} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="weight"
            stroke="#000000"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};
