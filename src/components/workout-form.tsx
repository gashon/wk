import { FC } from "react";
import { useForm, Resolver } from "react-hook-form";

type FormValues = {
  lift: string;
  weight: number;
  repititions: number;
};

export const WorkoutForm: FC = () => {
  const { register, handleSubmit, formState } = useForm<FormValues>();

  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <form onSubmit={onSubmit} className="flex flex-col">
      <input type="text" {...register("lift")} placeholder="lift" />
      <input type="number" {...register("weight")} placeholder="weight" />
      <input type="number" {...register("repititions")} placeholder="reps" />
      <button type="submit">Add set</button>
    </form>
  );
};
