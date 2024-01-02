import { FC, useContext } from "react";

import { DayContext, useDeleteWorkout, useGetWorkouts } from "..";
import { groupBy } from "@/util/group-by";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
import { WorkoutGroup } from "@/features/workout";
import { useIsMounted } from "@/hooks";
import { Workout } from "@/types";

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
        let previousWorkouts = undefined;
        if (i < Object.keys(groupedData).length - 1)
          previousWorkouts = Object.values(
            groupedData[Object.keys(groupedData)[i + 1]],
          );

        return (
          <WorkoutGroup
            key={date}
            date={date}
            workouts={workouts}
            previousWorkouts={previousWorkouts}
          />
        );
      })}
    </div>
  );
};
