import { useState, FC, PropsWithChildren } from "react";

import { Days } from "@/types";
import { DayContext } from "@/features/workout";
import { getTrainingGroupFromSchedule } from "@/util/get-day";

export const GraphContainer: FC<PropsWithChildren> = ({ children }) => {
  const [type, setType] = useState<Days>(getTrainingGroupFromSchedule());

  return (
    <DayContext.Provider
      value={{
        type,
        setType: (v: Days) => {
          setType(v);
        },
      }}
    >
      {children}
    </DayContext.Provider>
  );
};
