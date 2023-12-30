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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{getValues().label}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={getValues().label}
          onValueChange={(val) => setValue("label", val)}
        >
          {Object.values(WorkoutLabels[type]).map((label) => (
            <DropdownMenuRadioItem key={`workout:label:${label}`} value={label}>
              {label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const WorkoutForm: FC = () => {
  const { type } = useContext(DayContext);

  const {
    reset,
    watch,
    register,
    handleSubmit,
    setValue,
    formState,
    getValues,
  } = useForm<FormValues>({
    defaultValues: {
      label: Object.values(WorkoutLabels[type])[0] as string,
    },
  });

  useEffect(() => {
    reset({
      label: Object.values(WorkoutLabels[type])[0] as string,
    });
  }, [type, reset]);

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
      <LabelDropDownMenu
        watch={watch}
        getValues={getValues}
        setValue={setValue}
      />
      <input type="number" {...register("weight")} placeholder="weight" />
      <input type="number" {...register("repititions")} placeholder="reps" />
      <button type="submit">Add set</button>
    </form>
  );
};
