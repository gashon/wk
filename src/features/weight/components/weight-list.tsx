import { FC } from "react";

import { useDeleteWeight, useGetWeights } from "..";
import { Button } from "@/components/ui/button";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";

export const WeightList: FC = () => {
  const { data, isFetching } = useGetWeights();
  const deleteMutation = useDeleteWeight();

  if (isFetching) return <LoadingSkeleton />;

  if (!data) return <p>Failed</p>;

  return (
    <div>
      <ul>
        {(data?.data ?? []).map((weight) => (
          <li key={`weight:${weight.id}`} className="flex justify-between ">
            <div className="flex justify-center items-center p-0 gap-1">
              <p className="opacity-50">{weight.created_at_date_string}</p>

              <p>
                {weight.weight}
                <span className="opacity-50">lbs</span>{" "}
              </p>
            </div>
            <Button
              type="button"
              onClick={() => deleteMutation.mutateAsync(weight.id)}
            >
              X
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};
