// Get the next weight prediction (progressive overload)
import { useContext, useEffect, useState } from "react"
import { DayContext, WorkoutDataContext } from "@/features/workout"
import { Days, Workout } from "@/types";
import { queryClient } from "@/lib/react-query";
import { DATE_RANGE_FOR_AVERAGE_WEIGHT_AND_REPS_IN_WEEKS } from "@/consts";
import { groupBy } from "@/util/group-by";

type Prediction = {
  weight: number | undefined;
  repititions: number | undefined;
  setIndex: number;
  workoutIndex: number;
  predictable: boolean;
}

type WorkoutHistoryRange = {
  workoutLabel: string,
  workoutsGroupedByDate: Record<string, Workout[]>,
  setIndex: number,
  workoutIndex: number,
  startRange: Date,
  endRange: Date
}

const initialPrediction: Prediction = {
  weight: undefined,
  repititions: undefined,
  setIndex: 0,
  workoutIndex: 0,
  predictable: false
}

const isWithinRange = (date: Date, startRange: Date, endRange: Date) => {
  return date.getTime() > startRange.getTime() && date.getTime() < endRange.getTime();
}

const labelsOrderedByDate = (workouts: Workout[]) => {
  const groupedByLabel = groupBy("label", workouts);

  // we want to sort between entries
  const labelsSortedByDate = Object.keys(groupedByLabel).sort((a, b) => {
    const aDate = new Date(groupedByLabel[a][0].created_at_timestamp);
    const bDate = new Date(groupedByLabel[b][0].created_at_timestamp);
    return aDate.getTime() - bDate.getTime();
  });

  return labelsSortedByDate;
}


const getDataWithinFilters = ({
  workoutLabel, workoutsGroupedByDate, startRange, endRange, setIndex, workoutIndex
}: WorkoutHistoryRange): Workout[] => {

  // get keys within range
  let targetDataKeys = Object.keys(workoutsGroupedByDate).filter((key) => {
    const date = new Date(key);
    return isWithinRange(date, startRange, endRange);
  });

  targetDataKeys = targetDataKeys.filter((key) => {
    // get the workoutIndex at this date
    const labelsByDate = labelsOrderedByDate(workoutsGroupedByDate[key]);
    return labelsByDate.indexOf(workoutLabel) === workoutIndex;
  })

  // get data within setIndex 
  const workoutData = targetDataKeys.map((key) => {
    const groupedByLabel = groupBy("label", workoutsGroupedByDate[key]);
    if (!groupedByLabel[workoutLabel]) return undefined;

    const targetWorkoutsWithSortedDate = groupedByLabel[workoutLabel].sort((a, b) => {
      const aDate = new Date(a.created_at_timestamp);
      const bDate = new Date(b.created_at_timestamp);
      return aDate.getTime() - bDate.getTime();
    });
    
    return targetWorkoutsWithSortedDate[setIndex];
  }).filter((workout) => workout !== undefined) as Workout[];

  return workoutData;
}

const averageWeightWithinTimeRange = ({
  workoutLabel, workoutsGroupedByDate, startRange, endRange,
  setIndex, workoutIndex
}: WorkoutHistoryRange) => {
  const workoutData = getDataWithinFilters({
    workoutLabel, workoutsGroupedByDate, startRange, endRange, setIndex, workoutIndex
  })

  const sum = workoutData.reduce((acc, { weight, repititions }) => {
    // @ts-ignore stored as string
    acc["weight"] += parseFloat(weight);
    // @ts-ignore
    acc["repititions"] += parseFloat(repititions);

    return acc;
  }, { weight: 0, repititions: 0 })

  const average = {
    weight: Math.ceil(sum.weight / workoutData.length),
    repititions: Math.ceil(sum.repititions / workoutData.length)
  }

  return { ...average, hasData: workoutData.length > 0 };
}

//setIndex and workoutIndex
const analyzeTodaysWorkout = (workoutLabel: string, type: Days) => {
  const workouts = queryClient.getQueryData<Workout[]>(["workouts", type, undefined, undefined]);

  if (!workouts?.data) return { setIndex: 0, workoutIndex: 0 };

  const todayStart = new Date().setHours(0, 0, 0, 0);
  const todayEnd = new Date().setHours(23, 59, 59, 999);

  const todaysWorkouts = workouts.data.filter(({ created_at_timestamp }) => {
    const createdAt = new Date(created_at_timestamp);
    return createdAt.getTime() > todayStart && createdAt.getTime() < todayEnd;
  })

  // find nextSetNumber of workoutLabel and workoutIndex
  const setIndex = todaysWorkouts.filter(({ label }) => label === workoutLabel).length;
  const groupedByLabel = labelsOrderedByDate(todaysWorkouts);
  let workoutIndex = -1;
  if (groupedByLabel?.includes(workoutLabel)){
    workoutIndex = groupedByLabel.indexOf(workoutLabel);
  } else {
    workoutIndex = groupedByLabel.length = groupedByLabel.length; 
  }

  return { setIndex, workoutIndex: workoutIndex === -1 ? 0 : workoutIndex };
}

export const useGetProgressiveOverloadPrediction = (workout: string): Prediction => {
  const context = useContext(WorkoutDataContext);
  const { type } = useContext(DayContext);
  const [prediction, setPrediction] = useState<Prediction>(initialPrediction);

  const startRange = new Date();
  startRange.setDate(startRange.getDate() - 7 * DATE_RANGE_FOR_AVERAGE_WEIGHT_AND_REPS_IN_WEEKS);
  const endRange = new Date();
  // exclude today 
  endRange.setHours(0, 0, 0, 0);

  if (!context) {
    throw new Error("Must use in WorkoutDataContext")
  }

  useEffect(() => {
    const { workoutsGroupedByDate, isFetching } = context;

    if (isFetching) {
      setPrediction(initialPrediction)
      return;
    }

    const { setIndex, workoutIndex } = analyzeTodaysWorkout(workout, type);

    const averages = averageWeightWithinTimeRange({
      workoutLabel: workout,
      workoutsGroupedByDate: workoutsGroupedByDate,
      setIndex: setIndex, // get average for the next set
      workoutIndex,
      startRange,
      endRange
    })

    if (!averages.hasData) {
      setPrediction({...initialPrediction, setIndex, workoutIndex})
      return;
    }

    setPrediction({ ...averages, setIndex: setIndex, workoutIndex, predictable: true })
  }, [context, workout, type])

  return prediction
}
