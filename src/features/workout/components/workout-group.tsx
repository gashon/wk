import React, { FC, useState } from "react";
import { groupBy } from "@/util/group-by";
import { WorkoutItem } from "@/features/workout";
import { Workout } from "@/types";
import { averageFromKey } from "@/util/average-key";
import { isWithinOneDayOfToday } from "@/util/date";

type WorkoutsGroup = {
  [key: string]: Workout[];
};

type WorkoutGroupProps = {
  date: string;
  workouts: Workout[];
  previousWorkouts?: Workout[];
};

type WorkoutMetricsProps = Pick<
  WorkoutGroupProps,
  "workouts" | "previousWorkouts"
> & { label: string };

const WorkoutMetrics: FC<WorkoutMetricsProps> = ({
  workouts,
  previousWorkouts,
  label,
}) => {
  if (!previousWorkouts) return;

  const changeClass = (improvementScore: number) => {
    return improvementScore > 0 ? "text-green-500" : "text-red-500";
  };

  const filteredPreviousWorkouts = previousWorkouts.filter(
    (w) => w.label === label,
  );
  const improvementInfo = filteredPreviousWorkouts
    ? calculateImprovementScore(workouts, filteredPreviousWorkouts)
    : undefined;

  return (
    <>
      {improvementInfo && (
        <p className="opacity-50">
          <span className={changeClass(improvementInfo.improvementScore)}>
            {improvementInfo.improvementScore > 0 ? "+" : ""}
            {improvementInfo.improvementScore.toFixed(2)}%
          </span>
        </p>
      )}
    </>
  );
};

const WorkoutGroupDisplay: FC<
  Omit<WorkoutGroupProps, "date"> & { label: string }
> = ({ workouts, previousWorkouts, label }) => (
  <div className="ml-4 my-1 border-black border-l border-opacity-30 pl-2">
    <div className="flex flex-row justify-between ">
      <h4 className="underline">{label}</h4>
      <WorkoutMetrics
        workouts={workouts}
        previousWorkouts={previousWorkouts}
        label={label}
      />
    </div>
    <ul>
      {workouts.map((workout) => (
        <WorkoutItem key={`workout:${workout.id}`} workout={workout} />
      ))}
    </ul>
  </div>
);

export const WorkoutGroup: FC<WorkoutGroupProps> = ({
  date,
  workouts,
  previousWorkouts,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(
    isWithinOneDayOfToday(date),
  );
  const workoutGroups = groupBy("label", workouts) as WorkoutsGroup;

  return (
    <div className="border-black border-l border-opacity-30 pl-2 my-4">
      <h3
        className="underline mb-4 cursor-pointer"
        onClick={() => setIsVisible((v) => !v)}
      >
        {date}
      </h3>
      {isVisible && (
        <>
          {Object.entries(workoutGroups).map(([label, groupWorkouts]) => (
            <WorkoutGroupDisplay
              key={`workout:group:${label}`}
              workouts={groupWorkouts}
              previousWorkouts={previousWorkouts}
              label={label}
            />
          ))}
        </>
      )}
    </div>
  );
};

// @see https://www.google.com/search?q=training+volume+equation&sca_esv=594982741&sxsrf=AM9HkKnFzLWh6BugPT6wwbi_iWfm7wmYVA%3A1704160482107&ei=4myTZeObBr6lptQP55qf0A0&ved=0ahUKEwjjlLTBzL2DAxW-kokEHWfNB9oQ4dUDCBE&uact=5&oq=training+volume+equation&gs_lp=Egxnd3Mtd2l6LXNlcnAiGHRyYWluaW5nIHZvbHVtZSBlcXVhdGlvbjIFECEYoAEyBRAhGKABMgUQIRirAjIIECEYFhgeGB1I5A1QowRY7AxwAXgBkAEAmAHjAaABywmqAQUwLjYuMbgBA8gBAPgBAcICChAAGEcY1gQYsAPCAg0QABiABBiKBRhDGLADwgIKEAAYgAQYigUYQ8ICBRAAGIAEwgIIEAAYFhgeGA_CAgYQABgWGB7CAgsQABiABBiKBRiGA-IDBRIBMSAp4gMEGAAgQYgGAZAGCg&sclient=gws-wiz-serp
const calcluateTrainingVolume = (workouts: Workout[]): number =>
  workouts.length *
  averageFromKey("weight", workouts) *
  averageFromKey("repititions", workouts);

type ImprovementInfo = {
  currentTrainingVolume: number;
  previousTrainingVolume: number;
  improvementScore: number;
};

const calculateImprovementScore = (
  currentWorkouts: Workout[],
  previousWorkouts: Workout[],
): ImprovementInfo => {
  const currentTrainingVolume = calcluateTrainingVolume(currentWorkouts);
  const previousTrainingVolume = calcluateTrainingVolume(previousWorkouts);

  return {
    currentTrainingVolume,
    previousTrainingVolume,
    improvementScore:
      ((currentTrainingVolume - previousTrainingVolume) /
        previousTrainingVolume) *
      100,
  };
};
