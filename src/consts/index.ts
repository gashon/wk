import { Days, WeekDays, WorkoutSchedule } from "@/types";

export const ANON_TOKEN = "wk-anon-token";

export const PUSH_PULL_LEG_SCHEDULE: WorkoutSchedule = {
  [WeekDays.Monday]: Days.PULL,
  [WeekDays.Tuesday]: Days.LEGS,
  [WeekDays.Wednesday]: Days.REST,
  [WeekDays.Thursday]: Days.PUSH,
  [WeekDays.Friday]: Days.PULL,
  [WeekDays.Saturday]: Days.LEGS,
  [WeekDays.Sunday]: Days.PUSH,
};
