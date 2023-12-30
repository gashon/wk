import { FC, useEffect, useContext } from "react";
import {
  useForm,
  Resolver,
  UseFormWatch,
  UseFormGetValues,
  UseFormSetValue,
} from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { DayContext, useCreateWorkout } from "@/features/workout";
import { WorkoutLabels } from "@/types";

type FormValues = {
  label: string;
  weight: number;
  repititions: number;
};

const LabelDropDownMenu: FC<{
  watch: UseFormWatch<FormValues>;
  getValues: UseFormGetValues<FormValues>;
  setValue: UseFormSetValue<FormValues>;
}> = ({ watch, getValues, setValue }) => {
  const { type } = useContext(DayContext);
  watch("label");

  return (
    <div className="cursor-pointer">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">{getValues().label}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="cursor-pointer w-56">
          <DropdownMenuLabel>Workout</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={getValues().label}
            onValueChange={(val) => setValue("label", val)}
          >
            {Object.values(WorkoutLabels[type]).map((label) => (
              <DropdownMenuRadioItem
                key={`workout:label:${label}`}
                value={label}
                className="cursor-pointer"
              >
                {label}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export const WorkoutForm: FC = () => {
  const { type } = useContext(DayContext);

  const { reset, watch, register, handleSubmit, setValue, getValues } =
    useForm<FormValues>({
      defaultValues: {
        label: Object.values(WorkoutLabels[type])[0] as string,
      },
    });

  useEffect(() => {
    reset({
      label: Object.values(WorkoutLabels[type])[0] as string,
    });
  }, [type, reset]);

  const createWorkoutMutation = useCreateWorkout(type);

  const onSubmit = handleSubmit(async (data) => {
    await createWorkoutMutation.mutateAsync({
      ...data,
      type,
      created_at_date_string: new Date().toLocaleDateString(),
      created_at_timestamp: new Date().getTime(),
    }),
      setValue("repititions", "");
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col">
      <LabelDropDownMenu
        watch={watch}
        getValues={getValues}
        setValue={setValue}
      />
      <Input type="number" {...register("weight")} placeholder="weight" />
      <Input type="number" {...register("repititions")} placeholder="reps" />
      <button type="submit">Add set</button>
    </form>
  );
};
