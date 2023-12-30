import { FC, useState } from "react";
import { DayDropDownMenu, WorkoutForm, WorkoutList } from ".";
import { Days } from "@/types";
import { DayContext } from "@/features/workout";

export const WorkoutContainer: FC = () => {
  // TODO(gashon) predict day based on prior day
  const [type, setType] = useState<Days>(Days.PUSH);

  return (
    <DayContext.Provider value={{ type, setType }}>
      <WorkoutForm />
      <WorkoutList />
    </DayContext.Provider>
  );
};
