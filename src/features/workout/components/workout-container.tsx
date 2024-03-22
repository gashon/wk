import { FC, useState, useEffect, useContext } from "react";

import { DayDropDownMenu, WorkoutForm, WorkoutList } from ".";

import { Days } from "@/types";

import {
  DayContext,
  WorkoutDataContext,
  useGetWorkouts,
} from "@/features/workout";

import {
  getDayFromLocalStorageSchedule,
  getTrainingGroupFromSchedule,
} from "@/util/get-day";

import storage from "@/lib/storage";
import type { StorageDayAndTime } from "@/types";
import { useIsMounted } from "@/hooks";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
import { groupBy } from "@/util/group-by";

const TimeSinceLastWorkout: FC = () => {
  const { workoutHistory } = useContext(WorkoutDataContext);
  const [timeSinceLastWorkout, setTimeSinceLastWorkout] = useState<number | undefined>(undefined);

  const latestWorkout = workoutHistory?.[0];

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined = undefined;
    // only mount if within last 10 minutes
    if (latestWorkout) {
      const currentTime = new Date().getTime();
      const lastWorkoutTime = new Date(latestWorkout.created_at_timestamp).getTime();
      const timeDifference = (currentTime - lastWorkoutTime) / 1000;

      if (timeDifference > 600) {
        return
      }

      interval = setInterval(() => {
        if(!latestWorkout) {
          setTimeSinceLastWorkout(undefined);
          clearInterval(interval);
          return 
        }
        const currentTime = new Date().getTime();
        const lastWorkoutTime = new Date(latestWorkout.created_at_timestamp).getTime();
        const timeDifference = (currentTime - lastWorkoutTime) / 1000;
        setTimeSinceLastWorkout(timeDifference);
      }, 100);
    }

    return () => {
      interval && clearInterval(interval);
    };

  }, [latestWorkout]);

  if (!latestWorkout || !timeSinceLastWorkout) return null;

  return <p className="text-sm opacity-25">{timeSinceLastWorkout.toFixed(2)}s</p>;
}

export const WorkoutContainer: FC = () => {
  // TODO(gashon) predict day based on prior day
  const [type, setType] = useState<Days>(getTrainingGroupFromSchedule());
  const { data, isFetching } = useGetWorkouts({ type });

  // handle localStorage mount
  const { isMounted } = useIsMounted();
  if (!isMounted) return <LoadingSkeleton />;

  return (
    <DayContext.Provider
      value={{
        type,
        setType: (val: Days) => {
          storage.set<StorageDayAndTime>("day", {
            timestamp: new Date().toISOString(),
            workout: val,
          });
          setType(val);
        },
      }}
    >
      <WorkoutDataContext.Provider
        value={{
          workoutHistory: data?.data,
          workoutsGroupedByDate: data?.data
            ? groupBy("created_at_date_string", data.data)
            : {},
          isFetching,
        }}
      >
        <TimeSinceLastWorkout />
        <WorkoutForm />
        <WorkoutList />
      </WorkoutDataContext.Provider>
    </DayContext.Provider>
  );
};
