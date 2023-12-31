import { Dispatch, SetStateAction, createContext } from "react";
import { BodyWeight } from "@/types";

export const BodyWeightContext = createContext<{
  bodyWeightData: BodyWeight[] | undefined;
  setBodyWeightData: Dispatch<SetStateAction<BodyWeight[] | undefined>>;
}>({
  bodyWeightData: undefined,
  setBodyWeightData: () => {}, //noop init func
});
