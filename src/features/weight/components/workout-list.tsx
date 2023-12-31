import { FC, useContext } from "react";

import { DayContext, useDeleteWeight, useGetWeights } from "..";
import { Button } from "@/components/ui/button";
import { groupBy } from "@/util/group-by";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";

export const WeightList: FC = () => {
  const { type } = useContext(DayContext);
  const { data, isFetching } = useGetWeights({ type });
  const deleteMutation = useDeleteWeight(type);

  if (isFetching) return <LoadingSkeleton />;

  if (!data) return <p>Failed</p>;

  const groupedData = groupBy("created_at_date_string", data.data);

  return (
    <div>
      {Object.entries(groupedData).map(([date, weights]) => {
        const weightGroups = groupBy("label", weights);

        return (
          <div
            key={date}
            className="border-black border-l border-opacity-30 pl-2 my-4"
          >
            <h3 className="underline mb-4">{date}</h3>
            {Object.entries(weightGroups).map(([label, groupWeights]) => (
              <div
                key={label}
                className="ml-4 my-1 border-black border-l border-opacity-30 pl-2"
              >
                <h4 className="underline">{label}</h4>
                <ul>
                  {groupWeights.map((weight) => (
                    <li
                      key={`weight:${weight.id}`}
                      className="flex justify-between "
                    >
                      <div className="flex justify-center items-center p-0 gap-1">
                        <p>
                          {weight.weight}
                          <span className="opacity-50">lbs</span>{" "}
                        </p>
                        <p>
                          {weight.repititions}
                          <span className="opacity-50">reps</span>
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
            ))}
          </div>
        );
      })}
    </div>
  );
};
