import { useState, FC, PropsWithChildren } from "react";

import { Days } from "@/types";
import { DayContext } from "@/features/workout";

export const GraphContainer: FC<PropsWithChildren> = ({ children }) => {
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
      {children}
    </DayContext.Provider>
  );
};
