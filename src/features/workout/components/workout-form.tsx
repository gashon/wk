import { FC } from "react";
import { useForm, Resolver } from "react-hook-form";

import { useCreateWorkout } from "@/features/workout";
import { Days } from "@/types";

type FormValues = {
  label: string;
  weight: number;
  repititions: number;
};

type Props = {
  type: Days;
};

export const WorkoutForm: FC<Props> = ({ type }) => {
  const { register, handleSubmit, formState } = useForm<FormValues>();
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
