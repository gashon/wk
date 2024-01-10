import { FC, PropsWithChildren, useState } from "react";

import { Dispatch, SetStateAction, createContext } from "react";
import {
  getSevenDaysFromNow,
  getEndOfDay,
  formatDate,
  getOneMonthFromNow,
} from "@/util/date";

export const TrendContext = createContext<{
  startRange: string;
  endRange: string;
  setStartRange: Dispatch<SetStateAction<string>>;
  setEndRange: Dispatch<SetStateAction<string>>;
}>({
  startRange: formatDate(getSevenDaysFromNow()),
  endRange: formatDate(getEndOfDay(new Date())),
  setStartRange: () => {}, //noop
  setEndRange: () => {},
});

export const TrendContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [startRange, setStartRange] = useState<string>(
    formatDate(getOneMonthFromNow()),
  );
  const [endRange, setEndRange] = useState<string>(
    formatDate(getEndOfDay(new Date())),
  );

  return (
    <TrendContext.Provider
      value={{
        startRange,
        endRange,
        setStartRange,
        setEndRange,
      }}
    >
      {children}
    </TrendContext.Provider>
  );
};
