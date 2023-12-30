import { FC } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const NUM_SKELETONS = 10;

export const LoadingSkeleton: FC = () => (
  <div className="flex flex-col gap-2">
    {Array(NUM_SKELETONS)
      .fill(0)
      .map((_, i) => (
        <Skeleton key={`loading:${i}`} className="h-12 w-full " />
      ))}
  </div>
);
