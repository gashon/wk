import { FC, useContext, useMemo } from "react";
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
import { reverseAndDeepCopy } from "@/util/reverse-array";
import { generateBestFitLineData, linearRegression } from "@/util/best-fit";

export const WeightTrendsGraph: FC = () => {
  const { bodyWeightData } = useContext(BodyWeightContext);

  if (!bodyWeightData) return <LoadingSkeleton />;

  if (bodyWeightData.length === 0)
    return <p className="opacity-50">No data...</p>;

  // Create a deep copy of the bodyWeightData array and reverse it
  const reversedData = reverseAndDeepCopy(bodyWeightData);

  const { slope, intercept } = linearRegression("weight", reversedData);
  const bestFitLineData = generateBestFitLineData(
    reversedData,
    slope,
    intercept,
  );

  const weights = bodyWeightData.map((item) => item.weight);
  const minY = Math.min(...weights);
  const maxY = Math.max(...weights);

  return (
    <>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          width={500}
          height={300}
          data={bestFitLineData}
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
          <Line type="linear" dataKey="bestFit" stroke="#999797" dot={false} />
          <Line
            type="monotone"
            dataKey="weight"
            stroke="#000000"
            activeDot={{ r: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};
