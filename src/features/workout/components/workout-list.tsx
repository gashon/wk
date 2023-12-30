import { FC, useContext } from "react";

import { DayContext, useDeleteWorkout, useGetWorkouts } from "..";
import { Button } from "@/components/ui/button";

export const WorkoutList: FC = () => {
  const { type } = useContext(DayContext);
  const { data, isFetching } = useGetWorkouts(type);
  const deleteMutation = useDeleteWorkout(type);

  if (isFetching) return <p>Loading...</p>;

  if (!data) return <p>Failed</p>;
  console.log("Data", data);

  return (
    <div>
      {(data.data ?? []).map((workout) => {
        return (
          <li key={`workout:${workout.id}`} className="flex justify-between">
            <p>
              {workout.label} {workout.weight} {workout.repititions}
            </p>
            <Button
              type="button"
              onClick={() => deleteMutation.mutateAsync(workout.id)}
            >
              X
            </Button>
          </li>
        );
      })}
    </div>
  );
};
