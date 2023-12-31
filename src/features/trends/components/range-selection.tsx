import { FC, useContext } from "react";

import { Input } from "@/components/ui/input";
import { TrendContext } from "..";
import { prettyDate } from "@/util/date";

export const DateRangeSelection: FC = () => {
  const { startRange, endRange, setStartRange, setEndRange } =
    useContext(TrendContext);

  return (
    <div className="flex flex-row justify-between gap-3">
      <Input
        id="startRange"
        type="date"
        value={prettyDate(startRange)}
        onChange={(e) => setStartRange(e.target.value)}
        className="cursor-pointer block w-full shadow-sm focus:ring-black focus:border-black rounded-md"
      />
      <Input
        id="endRange"
        type="date"
        value={prettyDate(endRange)}
        onChange={(e) => setEndRange(e.target.value)}
        className="cursor-pointer block w-full shadow-sm focus:ring-black focus:border-black rounded-md"
      />
    </div>
  );
};
