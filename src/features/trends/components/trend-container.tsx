import { FC, useState } from "react";
import { TrendContext } from "..";

import { formatDate, getEndOfDay, getSevenDaysFromNow } from "@/util/date";
import { DateRangeSelection } from ".";
import { GraphContainer } from "@/features/trends/components/graph-container";

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
      <div className="w-full lg:w-1/4 mt-10">
        <DateRangeSelection />
      </div>
      <GraphContainer />
    </TrendContext.Provider>
  );
};
