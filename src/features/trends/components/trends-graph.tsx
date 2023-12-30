import { FC, PureComponent, useState, useContext } from "react";
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

export const TrendsGraph: FC = () => {
  const { startRange, endRange } = useContext(TrendContext);
  const { type } = useContext(DayContext);

  const { data, isFetching } = useGetWorkouts({
    type,
    startRange: new Date(startRange).getTime(),
    endRange: new Date(endRange).getTime(),
  });

  if (isFetching) return <p>Loading</p>;

  if (!data) return <p>Error</p>;

  const groupedLabel = groupBy("label", data.data);

  const averagedData = Object.fromEntries(
    Object.entries(groupedLabel).map(([label, data]) => {
      const groupedByDate = groupBy("created_at_date_string", data);
      const averaged = Object.entries(groupedByDate).map(([date, entries]) => {
        const averageWeight =
          //@ts-ignore
          entries.reduce((acc, curr) => acc + parseFloat(curr.weight), 0) /
          entries.length;
        const averageRepititions =
          //@ts-ignore
          entries.reduce((acc, curr) => acc + parseFloat(curr.repititions), 0) /
          entries.length;
        return {
          created_at_date_string: date,
          weight: averageWeight,
          repititions: averageRepititions,
        };
      });
      return [label, averaged];
    }),
  );

  console.log("av", averagedData);

  return (
    <>
      {Object.entries(averagedData).map(([label, data]) => (
        <div key={`graph:${label}`} className="flex flex-col">
          <h3>{label}</h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              width={500}
              height={300}
              data={data}
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
                dataKey="weight"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="repititions" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ))}
    </>
  );

  return (
    <>
      {Object.entries(groupedLabel).map(([label, data]) => (
        <div key={`graph:${label}`} className="flex flex-col">
          <h3>{label}</h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              width={500}
              height={300}
              data={data}
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
                dataKey="weight"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="repititions" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ))}
    </>
  );
};
