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

const resolver: Resolver<FormValues> = async (values: FormValues) => {
  let errors = {};
  if (!values.label) {
    errors = {
      ...errors,
      label: { message: "label is required", type: "required" },
    };
  }

  // @ts-ignore
  if (values.weight == "" || isNaN(values.weight)) {
    errors = {
      ...errors,
      weight: { message: "weight must be a number", type: "typeError" },
    };
  } else if (!values.weight) {
    errors = {
      ...errors,
      weight: { message: "weight is required", type: "required" },
    };
  }

  // @ts-ignore
  if (values.repititions == "" || isNaN(values.repititions)) {
    errors = {
      ...errors,
      repititions: {
        message: "repetitions must be a number",
        type: "typeError",
      },
    };
  } else if (!values.repititions) {
    errors = {
      ...errors,
      repititions: { message: "repetitions is required", type: "required" },
    };
  }

  return {
    values: Object.keys(errors).length === 0 ? values : {},
    errors: errors,
  };
};

const LabelDropDownMenu: FC<{
  watch: UseFormWatch<FormValues>;
  getValues: UseFormGetValues<FormValues>;
  setValue: UseFormSetValue<FormValues>;
}> = ({ watch, getValues, setValue }) => {
  const { type } = useContext(DayContext);

  //@ts-ignore
  const entries = Object.entries(WorkoutLabels[type]);
  watch("label");

  return (
    <div className="cursor-pointer h-full">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">{getValues().label}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="cursor-pointer w-56 bg-white overflow-y-auto max-h-80">
          <DropdownMenuLabel>Workout</DropdownMenuLabel>

          {entries.map(([muscle, exercises]) => {
            return (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>{muscle}</DropdownMenuLabel>
                <DropdownMenuRadioGroup
                  value={getValues().label}
                  onValueChange={(val) => setValue("label", val)}
                >
                  {/* @ts-ignore */}
                  {(Object.values(exercises) as string[]).map((label) => (
                    <DropdownMenuRadioItem
                      key={`workout:label:${label}`}
                      value={label}
                      className="cursor-pointer"
                    >
                      <p>{label}</p>
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export const WorkoutForm: FC = () => {
  const { type } = useContext(DayContext);

  const {
    formState: { errors },
    reset,
    watch,
    register,
    handleSubmit,
    setValue,
    getValues,
  } = useForm<FormValues>({
    resolver,
    defaultValues: {
      label: Object.values(
        // @ts-ignore
        Object.values(WorkoutLabels[type])[0],
      )[0] as string,
    },
  });

  useEffect(() => {
    reset({
      // @ts-ignore
      label: Object.values(Object.values(WorkoutLabels[type])[0])[0] as string,
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
          <div className="flex flex-col w-full">
            <Input type="number" {...register("weight")} placeholder="weight" />
            {errors.weight && (
              <p className="text-red-800 opacity-75 text-sm ">
                {errors.weight.message}
              </p>
            )}
          </div>
          <DayDropDownMenu />
        </div>

        <div className="flex flex-row gap-2 justify-between">
          <div className="flex flex-col w-full">
            <Input
              type="number"
              {...register("repititions")}
              placeholder="reps"
            />
            {errors.repititions && (
              <p className="text-red-800 opacity-75 text-sm ">
                {errors.repititions.message}
              </p>
            )}
          </div>

          <LabelDropDownMenu
            watch={watch}
            getValues={getValues}
            setValue={setValue}
          />
        </div>
      </div>
      <div className="w-full flex justify-end mt-5">
        <Button
          disabled={createWorkoutMutation.isPending}
          type="submit"
          size={"lg"}
          className="px-0"
        >
          {createWorkoutMutation.isPending ? "Loading..." : "Add set"}
        </Button>
      </div>
    </form>
  );
};
