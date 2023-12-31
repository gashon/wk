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
import { BodyWeight } from "@/types";

const mean = (arr: number[]): number =>
  arr.reduce((acc, val) => acc + val, 0) / arr.length;

const linearRegression = (
  bodyWeight: BodyWeight[],
): { slope: number; intercept: number } => {
  const x = bodyWeight.map((_, index) => index);
  const y = bodyWeight.map((item) => item.weight);
  const xMean = mean(x);
  const yMean = mean(y);
  const slope =
    x.reduce((acc, xVal, idx) => acc + (xVal - xMean) * (y[idx] - yMean), 0) /
    x.reduce((acc, xVal) => acc + Math.pow(xVal - xMean, 2), 0);
  const intercept = yMean - slope * xMean;
  return { slope, intercept };
};

const generateBestFitLineData = (
  bodyWeight: BodyWeight[],
  slope: number,
  intercept: number,
): (BodyWeight & { bestFit: number })[] => {
  return bodyWeight.map((item, index) => ({
    ...item,
    bestFit: slope * index + intercept,
  }));
};

export const WeightTrendsGraph: FC = () => {
  const { bodyWeightData } = useContext(BodyWeightContext);

  if (!bodyWeightData) return <LoadingSkeleton />;

  // Create a deep copy of the bodyWeightData array and reverse it
  const reversedData = JSON.parse(JSON.stringify(bodyWeightData)).reverse();

  const { slope, intercept } = linearRegression(reversedData);
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
