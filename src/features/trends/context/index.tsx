import { FC, PropsWithChildren, useState } from "react";

import { Dispatch, SetStateAction, createContext } from "react";
import {
  getSevenDaysFromNow,
  getEndOfDay,
  formatDate,
  getOneMonthFromNow,
  getOneYearFromNow,
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

type Props = {
  oneMonth?: boolean;
} & PropsWithChildren;

export const TrendContextProvider: FC<Props> = ({ oneMonth, children }) => {
  const [startRange, setStartRange] = useState<string>(
    formatDate(oneMonth ? getOneMonthFromNow() : getOneYearFromNow()),
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
