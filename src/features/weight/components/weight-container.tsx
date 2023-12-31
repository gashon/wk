import { FC, useState } from "react";
import { WeightForm, WeightList, WeightTrendsGraph } from ".";
import { BodyWeightContext } from "..";
import { BodyWeight } from "@/types";
import { TrendContextProvider } from "@/features/trends";

export const WeightContainer: FC = () => {
  const [bodyWeightData, setBodyWeightData] = useState<
    BodyWeight[] | undefined
  >(undefined);

  return (
    <BodyWeightContext.Provider value={{ bodyWeightData, setBodyWeightData }}>
      <TrendContextProvider>
        <WeightForm />
        <WeightTrendsGraph />
        <WeightList />
      </TrendContextProvider>
    </BodyWeightContext.Provider>
  );
};
