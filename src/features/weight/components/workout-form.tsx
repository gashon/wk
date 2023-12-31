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
  useCreateWeight,
} from "@/features/weight";
import { WeightLabels } from "@/types";

type FormValues = {
  weight: number;
};

const resolver: Resolver<FormValues> = async (values: FormValues) => {
  let errors = {};
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

  return {
    values: Object.keys(errors).length === 0 ? values : {},
    errors: errors,
  };
};

export const WeightForm: FC = () => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<FormValues>({
    resolver,
  });

  const createWeightMutation = useCreateWeight();

  const onSubmit = handleSubmit(async ({weight}) => {
    await createWeightMutation.mutateAsync({
    weight 
    }),
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
        </div>

      <div className="w-full flex justify-end mt-5">
        <Button
          disabled={createWeightMutation.isPending}
          type="submit"
          size={"lg"}
          className="px-0"
        >
          {createWeightMutation.isPending ? "Loading..." : "Add set"}
        </Button>
      </div>
    </form>
  );
};
