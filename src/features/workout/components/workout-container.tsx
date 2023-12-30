import { FC, useState } from "react";
import { DayDropDownMenu, WorkoutForm, WorkoutList } from ".";
import { Days } from "@/types";
import { DayContext } from "@/features/workout";
import { getDayFromLocalStorageSchedule } from "@/util/get-day";
import storage from "@/lib/storage";
import type { StorageDayAndTime } from "@/types";

export const WorkoutContainer: FC = () => {
  // TODO(gashon) predict day based on prior day
  const [type, setType] = useState<Days>(getDayFromLocalStorageSchedule());

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
      <WorkoutForm />
      <WorkoutList />
    </DayContext.Provider>
  );
};
