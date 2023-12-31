import { FC, useContext } from "react";
import { useForm, Resolver } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateWeight } from "@/features/weight";
import { DateRangeSelection, TrendContext } from "@/features/trends";

type FormValues = {
  weight: string;
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
    setValue,
  } = useForm<FormValues>({
    resolver,
  });

  const { startRange, endRange } = useContext(TrendContext);
  const createWeightMutation = useCreateWeight({ startRange, endRange });

  const onSubmit = handleSubmit(async ({ weight }) => {
    await createWeightMutation.mutateAsync({
      weight: parseFloat(weight),
    });
    setValue("weight", "");
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col my-10">
      <div className="flex flex-col lg:flex-row gap-5 lg:gap-10 justify-between items-center">
        <div className="w-full lg:w-auto">
          <DateRangeSelection />
        </div>
        <div className="flex flex-col w-full">
          <Input
            step="any"
            type="number"
            {...register("weight")}
            placeholder="weight..."
          />
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
          {createWeightMutation.isPending ? "Loading..." : "Add weight"}
        </Button>
      </div>
    </form>
  );
};
