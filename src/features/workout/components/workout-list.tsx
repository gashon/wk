import { Days } from "@/types";
import { FC } from "react";
import { useGetWorkouts } from "..";

type Props = {
  type: Days;
};

export const WorkoutList: FC<Props> = ({ type }) => {
  const { data, isFetching } = useGetWorkouts(type);

  if (isFetching) return <p>Loading...</p>;

  if (!data) return <p>Failed</p>;

  return (
    <div>
      {(data.data ?? []).map((workout) => {
        return (
          <li key={`workout:${workout.id}`}>
            {workout.label} {workout.weight} {workout.repititions}
          </li>
        );
      })}
    </div>
  );
};
