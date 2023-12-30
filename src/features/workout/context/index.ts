import { Dispatch, SetStateAction, createContext } from "react";
import { Days } from "@/types";

export const DayContext = createContext<{
  type: Days;
  setType: Dispatch<SetStateAction<Days>>;
}>({
  type: Days.PUSH,
  setType: () => {}, //noop init func
});
