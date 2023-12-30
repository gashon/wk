import { Dispatch, SetStateAction, createContext } from "react";
import { getSevenDaysFromNow, getEndOfDay, formatDate } from "@/util/date";

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
