import { FC, PropsWithChildren, useState } from "react";
import { TrendContext } from "..";

import { formatDate, getOneYearFromNow, getEndOfDay } from "@/util/date";
import { DateRangeSelection } from ".";
import { GraphContainer } from "@/features/trends/components/graph-container";
import { DayDropDownMenu } from "@/features/workout/components/day-dropdown";

export const TrendContainer: FC<PropsWithChildren> = ({ children }) => {
  const [startRange, setStartRange] = useState<string>(
    formatDate(getOneYearFromNow()),
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
        {children}
        <GraphContainer />
      </GraphContainer>
    </TrendContext.Provider>
  );
};
