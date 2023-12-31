import { FC, useContext, useEffect, useState } from "react";

import { BodyWeightContext, useDeleteWeight, useGetWeights } from "..";
import { Button } from "@/components/ui/button";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
import { TrendContext } from "@/features/trends";

export const WeightList: FC = () => {
  const { setBodyWeightData } = useContext(BodyWeightContext);
  const { startRange, endRange } = useContext(TrendContext);
  const { data, isFetching } = useGetWeights({ startRange, endRange });

  const deleteMutation = useDeleteWeight({ startRange, endRange });
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (data) {
      setBodyWeightData(data.data);
    }
  }, [data, setBodyWeightData]);

  if (isFetching) return <LoadingSkeleton />;

  if (!data) return <p>Failed</p>;

  return (
    <div>
      <div
        onClick={() => setIsOpen((s: boolean) => !s)}
        className="cursor-pointer mt-10"
      >
        <Button>View Raw Logs</Button>
      </div>
      {isOpen && (
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
              {new Date().getTime() -
                new Date(weight.created_at_timestamp).getTime() <
                1000 * 60 * 60 * 24 && (
                <Button
                  type="button"
                  onClick={() => deleteMutation.mutateAsync(weight.id)}
                >
                  X
                </Button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
