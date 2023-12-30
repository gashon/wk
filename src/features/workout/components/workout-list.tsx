import { FC, useContext } from "react";

import { DayContext, useGetWorkouts } from "..";

export const WorkoutList: FC = () => {
  const { type } = useContext(DayContext);
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
