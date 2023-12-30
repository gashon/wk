import { FC, useContext } from "react";

import { Input } from "@/components/ui/input";
import { TrendContext } from "..";

export const DateRangeSelection: FC = () => {
  const { startRange, endRange, setStartRange, setEndRange } =
    useContext(TrendContext);

  console.log("Dates", startRange, endRange);

  return (
    <div className="flex flex-row justify-between gap-5">
      <Input
        id="startRange"
        type="date"
        value={startRange}
        onChange={(e) => setStartRange(e.target.value)}
        className="mt-1 block w-full border-none shadow-sm focus:ring-black focus:border-black rounded-md"
      />
      <Input
        id="endRange"
        type="date"
        value={endRange}
        onChange={(e) => setEndRange(e.target.value)}
        className="mt-1 block w-full border-none shadow-sm focus:ring-black focus:border-black rounded-md"
      />
    </div>
  );
};
