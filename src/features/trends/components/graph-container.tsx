import { useState, FC } from "react";

import { Days } from "@/types";
import { DayContext, DayDropDownMenu } from "@/features/workout";
import { TrendsGraph } from "@/features/trends/components";

export const GraphContainer: FC = () => {
  const [type, setType] = useState<Days>(Days.PUSH);

  return (
    <DayContext.Provider
      value={{
        type,
        setType: (v: Days) => {
          setType(v);
        },
      }}
    >
      <DayDropDownMenu />
      <TrendsGraph />
    </DayContext.Provider>
  );
};
