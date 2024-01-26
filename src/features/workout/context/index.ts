import { Dispatch, SetStateAction, createContext } from "react";
import { Days } from "@/types";
import { getTrainingGroupFromSchedule } from "@/util/get-day";

export const DayContext = createContext<{
  type: Days;
  setType: (val: Days) => undefined;
}>({
  type: getTrainingGroupFromSchedule(),
  setType: () => {}, //noop init func
});
