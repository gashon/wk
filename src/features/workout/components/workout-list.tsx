import { FC, useContext } from "react";

import { DayContext, useDeleteWorkout, useGetWorkouts } from "..";
import { Button } from "@/components/ui/button";
import { groupBy } from "@/util/group-by";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";

export const WorkoutList: FC = () => {
  const { type } = useContext(DayContext);
  const { data, isFetching } = useGetWorkouts({ type });
  const deleteMutation = useDeleteWorkout(type);

  if (isFetching) return <LoadingSkeleton />;

  if (!data) return <p>Failed</p>;

  const groupedData = groupBy("created_at_date_string", data.data);

  return (
    <div>
      {Object.entries(groupedData).map(([date, workouts]) => {
        const workoutGroups = groupBy("label", workouts);

        return (
          <div
            key={date}
            className="border-black border-l border-opacity-30 pl-2 my-4"
          >
            <h3 className="underline mb-4">{date}</h3>
            {Object.entries(workoutGroups).map(([label, groupWorkouts]) => (
              <div
                key={label}
                className="ml-4 my-1 border-black border-l border-opacity-30 pl-2"
              >
                <h4 className="underline">{label}</h4>
                <ul>
                  {groupWorkouts.map((workout) => (
                    <li
                      key={`workout:${workout.id}`}
                      className="flex justify-between "
                    >
                      <div className="flex justify-center items-center p-0 gap-1">
                        <p>
                          {workout.weight}
                          <span className="opacity-50">lbs</span>{" "}
                        </p>
                        <p>
                          {workout.repititions}
                          <span className="opacity-50">reps</span>
                        </p>
                      </div>
                      <Button
                        type="button"
                        onClick={() => deleteMutation.mutateAsync(workout.id)}
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
