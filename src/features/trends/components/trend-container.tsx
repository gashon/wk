import { FC, useState } from "react";
import { TrendContext } from "..";

import { formatDate, getEndOfDay, getSevenDaysFromNow } from "@/util/date";
import { DateRangeSelection, TrendsGraph } from ".";
import { GraphContainer } from "@/features/trends/components/graph-container";
import { DayDropDownMenu } from "@/features/workout/components/day-dropdown";

export const TrendContainer: FC = () => {
  const [startRange, setStartRange] = useState<string>(
    formatDate(getSevenDaysFromNow()),
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
      <GraphContainer>
        <div className="flex flex-row justify-between w-full my-10">
          <DateRangeSelection />
          <div className="opacity-75">
            <DayDropDownMenu />
          </div>
        </div>
        <TrendsGraph />
        <GraphContainer />
      </GraphContainer>
    </TrendContext.Provider>
  );
};
