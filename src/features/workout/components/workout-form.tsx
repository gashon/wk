import { FC, useContext } from "react";
import { useForm, Resolver } from "react-hook-form";

import { DayContext, useCreateWorkout } from "@/features/workout";

type FormValues = {
  label: string;
  weight: number;
  repititions: number;
};

export const WorkoutForm: FC = () => {
  const { register, handleSubmit, formState } = useForm<FormValues>();
  const { type } = useContext(DayContext);
  const createWorkoutMutation = useCreateWorkout();

  const onSubmit = handleSubmit((data) =>
    createWorkoutMutation.mutateAsync({
      ...data,
      type,
      created_at_date_string: new Date().toLocaleDateString(),
      created_at_timestamp: new Date().getTime(),
    }),
  );

  return (
    <form onSubmit={onSubmit} className="flex flex-col">
      <input type="text" {...register("label")} placeholder="label" />
      <input type="number" {...register("weight")} placeholder="weight" />
      <input type="number" {...register("repititions")} placeholder="reps" />
      <button type="submit">Add set</button>
    </form>
  );
};
