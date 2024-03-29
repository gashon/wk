import { Dispatch, SetStateAction, createContext } from "react";
import { Days, Workout } from "@/types";
import { getTrainingGroupFromSchedule } from "@/util/get-day";

export const DayContext = createContext<{
  type: Days;
  setType: (val: Days) => undefined;
}>({
  type: getTrainingGroupFromSchedule(),
  setType: () => { }, //noop init func
});

export const WorkoutDataContext = createContext<{
  workoutHistory: Workout[] | undefined;
  workoutsGroupedByDate: Record<string, Workout[]>;
  isFetching: boolean;
}>({
  workoutHistory: [],
  workoutsGroupedByDate: {},
  isFetching: false,
});
