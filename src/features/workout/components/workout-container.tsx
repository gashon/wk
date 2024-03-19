import { FC, useState } from "react";
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
        <WorkoutForm />
        <WorkoutList />
      </WorkoutDataContext.Provider>
    </DayContext.Provider>
  );
};
