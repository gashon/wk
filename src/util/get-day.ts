import { PUSH_PULL_LEG_SCHEDULE } from "@/consts";
import storage from "@/lib/storage";
import { Days, StorageDayAndTime, WeekDays, WorkoutSchedule } from "@/types";

export const getTrainingGroupFromSchedule = (): Days => {
  const schedule = PUSH_PULL_LEG_SCHEDULE;
  const today = new Date().getDay() as WeekDays;

  return schedule[today]!;
};

export const getDayFromLocalStorageSchedule = (): Days => {
  const historicDay = storage.get<StorageDayAndTime>("day");
  const currentDate = new Date();

  if (!historicDay) {
    storage.set("day", {
      timestamp: new Date().toISOString(),
      workout: Days.PUSH,
    });
    return Days.PUSH;
  }

  const storedDate = new Date(historicDay.timestamp);

  const differenceInDays = Math.floor(
    (currentDate.getTime() - storedDate.getTime()) / (1000 * 60 * 60 * 24),
  );

  const schedule = [
    Days.PUSH,
    Days.PULL,
    Days.LEGS,
    Days.REST,
    Days.PUSH,
    Days.PULL,
    Days.LEGS,
  ];

  // Find the current day in the cycle
  const currentDayIndex = differenceInDays % schedule.length;
  return schedule[currentDayIndex];
};
