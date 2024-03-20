import { FC, useContext } from "react";

import { DayContext, WorkoutDataContext, useGetWorkouts } from "..";
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
  const { isFetching, workoutsGroupedByDate } = useContext(WorkoutDataContext);
  const { isMounted } = useIsMounted();

  if (isFetching || !isMounted) return <LoadingSkeleton />;

  if (!workoutsGroupedByDate) return <p>Failed</p>;

  return (
    <div>
      {Object.entries(workoutsGroupedByDate).length === 0 && (
        <p className="opacity-50">No workouts yet...</p>
      )}

      {Object.entries(workoutsGroupedByDate).map(([date, workouts], i) => {
        const dataBeforeDate = Object.keys(
          workoutsGroupedByDate,
        ).reduce<HistoricTrainingVolume>((acc, _date) => {
          if (new Date(_date) < new Date(date)) {
            const tVolume = calculateAverageTrainingVolume(
              workoutsGroupedByDate[_date],
            );
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
