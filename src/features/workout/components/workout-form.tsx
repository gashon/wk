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
import {
  DayContext,
  DayDropDownMenu,
  useCreateWorkout,
} from "@/features/workout";
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
        <DropdownMenuContent className="cursor-pointer w-56 bg-white">
          <DropdownMenuLabel>Workout</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={getValues().label}
            onValueChange={(val) => setValue("label", val)}
          >
            {(Object.values(WorkoutLabels[type]) as string[]).map((label) => (
              <DropdownMenuRadioItem
                key={`workout:label:${label}`}
                value={label}
                className="cursor-pointer"
              >
                <p>{label}</p>
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
      //@ts-ignore
      setValue("repititions", "");
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col my-10">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2 justify-between ">
          <Input type="number" {...register("weight")} placeholder="weight" />
          <DayDropDownMenu />
        </div>

        <div className="flex flex-row gap-2 justify-between">
          <Input
            type="number"
            {...register("repititions")}
            placeholder="reps"
          />
          <LabelDropDownMenu
            watch={watch}
            getValues={getValues}
            setValue={setValue}
          />
        </div>
      </div>
      <div className="w-full flex justify-end mt-5">
        <Button type="submit" size={"lg"} className="px-0">
          Add set
        </Button>
      </div>
    </form>
  );
};
