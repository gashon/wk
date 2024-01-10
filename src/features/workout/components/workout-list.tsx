import { FC, useContext } from "react";

import { DayContext, useGetWorkouts } from "..";
import { groupBy } from "@/util/group-by";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
import { WorkoutGroup } from "@/features/workout";
import { useIsMounted } from "@/hooks";
import {
  HistoricTrainingVolume,
  calculateAverageTrainingVolume,
  calculateTrainingVolume,
} from "@/util/average-training-volume";

export const WorkoutList: FC = () => {
  const { type } = useContext(DayContext);
  const { data, isFetching } = useGetWorkouts({ type });
  const { isMounted } = useIsMounted();

  if (isFetching || !isMounted) return <LoadingSkeleton />;

  if (!data) return <p>Failed</p>;

  const groupedData = groupBy("created_at_date_string", data.data);

  return (
    <div>
      {Object.entries(groupedData).map(([date, workouts], i) => {
        const dataBeforeDate = Object.keys(
          groupedData,
        ).reduce<HistoricTrainingVolume>((acc, _date) => {
          if (new Date(_date) < new Date(date)) {
            const tVolume = calculateAverageTrainingVolume(groupedData[_date]);
            for (const d in tVolume) {
              // average
              if (acc[d]) acc[d] = (tVolume[d] + acc[d]) / 2;
              else acc[d] = tVolume[d];
            }
          }
          return acc;
        }, {});

        return (
          <WorkoutGroup
            key={date}
            date={date}
            workouts={workouts}
            historicTrainingVolume={dataBeforeDate}
          />
        );
      })}
    </div>
  );
};
