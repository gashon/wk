import React, { FC, useContext } from "react";
import { Workout } from "@/types";
import { DayContext, useDeleteWorkout } from "..";
import { isWithinOneDayOfToday } from "@/util/date";
import { Button } from "@/components/ui/button";

type WorkoutItemProps = {
  workout: Workout;
};

export const WorkoutItem: FC<WorkoutItemProps> = ({ workout }) => {
  const { type } = useContext(DayContext);
  const deleteMutation = useDeleteWorkout(type);
  return (
    <li className="flex justify-between">
      <div className="flex justify-center items-center p-0 gap-1">
        <p>
          {workout.weight} <span className="opacity-50">lbs</span>
        </p>
        <p>
          {workout.repititions} <span className="opacity-50">reps</span>
        </p>
      </div>
      {isWithinOneDayOfToday(workout.created_at_timestamp) && (
        <Button
          type="button"
          onClick={() => deleteMutation.mutateAsync(workout.id)}
        >
          X
        </Button>
      )}
    </li>
  );
};
