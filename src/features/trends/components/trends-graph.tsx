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
import { TrendContext } from "@/features/trends";
import { DayContext, useGetWorkouts } from "@/features/workout";
import { groupBy } from "@/util/group-by";
import { getStartOfDay, getEndOfDay } from "@/util/date";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
import { reverseAndDeepCopy } from "@/util/reverse-array";
import { calculateTrainingVolume } from "@/util/average-training-volume";
import { generateBestFitLineData, linearRegression } from "@/util/best-fit";

export const TrendsGraph: FC = () => {
  const { startRange, endRange } = useContext(TrendContext);
  const { type } = useContext(DayContext);

  const { data, isFetching } = useGetWorkouts({
    type,
    startRange: getStartOfDay(new Date(startRange)).getTime(),
    endRange: getEndOfDay(new Date(endRange)).getTime(),
  });

  if (isFetching) return <LoadingSkeleton />;

  if (!data) return <p>Error</p>;

  // Create a deep copy of the bodyWeightData array and reverse it
  const reversedData = reverseAndDeepCopy(data.data);

  const groupedLabel = groupBy("label", reversedData);

  const averagedData = Object.fromEntries(
    Object.entries(groupedLabel).map(([label, data]) => {
      const groupedByDate = groupBy("created_at_date_string", data);
      const averaged = Object.entries(groupedByDate).map(([date, entries]) => {
        const trainingVolume = calculateTrainingVolume(entries);

        // TODO(gashon) possibly several graphs per label
        // const averageWeight =
        //   //@ts-ignore
        //   entries.reduce((acc, curr) => acc + parseFloat(curr.weight), 0) /
        //   entries.length;
        // const averageRepititions =
        //   //@ts-ignore
        //   entries.reduce((acc, curr) => acc + parseFloat(curr.repititions), 0) /
        //   entries.length;
        return {
          created_at_date_string: date,
          trainingVolume,
        };
      });
      return [label, averaged];
    }),
  );

  return (
    <>
      {Object.entries(averagedData).map(([label, data]) => {
        if (data.length <= 1) return;
        const { slope, intercept } = linearRegression("trainingVolume", data);
        const bestFitLineData = generateBestFitLineData(data, slope, intercept);

        return (
          <div key={`graph:${label}`} className="flex flex-col mt-5">
            <h3 className="opacity-50 py-2">- {label}</h3>
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
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="trainingVolume"
                  stroke="#000000"
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="bestFit" stroke="#999797" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        );
      })}
    </>
  );
};
