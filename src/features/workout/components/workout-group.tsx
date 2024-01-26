import React, { FC, useState } from "react";
import { groupBy } from "@/util/group-by";
import { WorkoutItem } from "@/features/workout";
import { Workout } from "@/types";
import { isWithinOneDayOfToday } from "@/util/date";
import {
  HistoricTrainingVolume,
  calculateTrainingVolume,
} from "@/util/average-training-volume";

type WorkoutsGroup = {
  [key: string]: Workout[];
};

type WorkoutGroupProps = {
  date: string;
  workouts: Workout[];
  historicTrainingVolume: HistoricTrainingVolume;
};

type WorkoutMetricsProps = Pick<
  WorkoutGroupProps,
  "workouts" | "historicTrainingVolume"
> & { label: string };

const WorkoutMetrics: FC<WorkoutMetricsProps> = ({
  workouts,
  historicTrainingVolume,
  label,
}) => {
  const changeClass = (improvementScore: number) => {
    return improvementScore >= 0 ? "text-green-500" : "text-red-500";
  };

  const currentTrainingVolume = calculateTrainingVolume(workouts);
  const improvementInfo = historicTrainingVolume[label]
    ? calculateImprovementScore(
        currentTrainingVolume,
        historicTrainingVolume[label],
      )
    : { improvementScore: 0 };

  return (
    <>
      <p className="opacity-50">
        <span className={changeClass(improvementInfo.improvementScore)}>
          {improvementInfo.improvementScore > 0 ? "+" : ""}
          {improvementInfo.improvementScore.toFixed(2)}%
        </span>
      </p>
    </>
  );
};

const WorkoutGroupDisplay: FC<
  Omit<WorkoutGroupProps, "date"> & { label: string }
> = ({ workouts, historicTrainingVolume, label }) => (
  <div className="ml-4 my-1 border-black border-l border-opacity-30 pl-2">
    <div className="flex flex-row justify-between ">
      <h4 className="underline">{label}</h4>
      <WorkoutMetrics
        workouts={workouts}
        historicTrainingVolume={historicTrainingVolume}
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
  historicTrainingVolume,
  date,
  workouts,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(
    isWithinOneDayOfToday(date),
  );
  const workoutGroups = groupBy("label", workouts) as WorkoutsGroup;
  const duration = getWorkoutDurationInMinutes(workouts);

  return (
    <div className="border-black border-l border-opacity-30 pl-2 my-4">
      <div
        onClick={() => setIsVisible((v) => !v)}
        className="flex flex-row justify-between cursor-pointer gap-1 mb-4"
      >
        <h3 className="underline">{date}</h3>
        <p className="opacity-25">{duration}m</p>
      </div>
      {isVisible && (
        <>
          {Object.entries(workoutGroups).map(([label, groupWorkouts]) => (
            <WorkoutGroupDisplay
              key={`workout:group:${label}`}
              workouts={groupWorkouts}
              historicTrainingVolume={historicTrainingVolume}
              label={label}
            />
          ))}
        </>
      )}
    </div>
  );
};
type ImprovementInfo = {
  improvementScore: number;
};

const calculateImprovementScore = (
  currentTrainingVolume: number,
  historicTrainingVolume: number,
): ImprovementInfo => {
  return {
    improvementScore:
      ((currentTrainingVolume - historicTrainingVolume) /
        historicTrainingVolume) *
      100,
  };
};

const getWorkoutDurationInMinutes = (workouts: Workout[]): number => {
  const sortedExercises = workouts.sort(
    (a, b) => a.created_at_timestamp - b.created_at_timestamp,
  );

  const diff =
    (sortedExercises[sortedExercises.length - 1].created_at_timestamp -
      sortedExercises[0].created_at_timestamp) /
    (1000 * 60);

  return Number(diff.toFixed(0));
};
