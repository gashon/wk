import type { Workout } from "@/types";
import { sumFromKey } from "./sum-key";
import { averageFromKey } from "./average-key";
import { groupBy } from "./group-by";

export type HistoricTrainingVolume = Record<string, number>;

// @see https://www.google.com/search?q=training+volume+equation&sca_esv=594982741&sxsrf=AM9HkKnFzLWh6BugPT6wwbi_iWfm7wmYVA%3A1704160482107&ei=4myTZeObBr6lptQP55qf0A0&ved=0ahUKEwjjlLTBzL2DAxW-kokEHWfNB9oQ4dUDCBE&uact=5&oq=training+volume+equation&gs_lp=Egxnd3Mtd2l6LXNlcnAiGHRyYWluaW5nIHZvbHVtZSBlcXVhdGlvbjIFECEYoAEyBRAhGKABMgUQIRirAjIIECEYFhgeGB1I5A1QowRY7AxwAXgBkAEAmAHjAaABywmqAQUwLjYuMbgBA8gBAPgBAcICChAAGEcY1gQYsAPCAg0QABiABBiKBRhDGLADwgIKEAAYgAQYigUYQ8ICBRAAGIAEwgIIEAAYFhgeGA_CAgYQABgWGB7CAgsQABiABBiKBRiGA-IDBRIBMSAp4gMEGAAgQYgGAZAGCg&sclient=gws-wiz-serp
export const calculateTrainingVolume = (workouts: Workout[]): number =>
  sumFromKey("weight", workouts) * averageFromKey("repititions", workouts);

export const calculateAverageTrainingVolume = (
  workouts: Workout[],
): HistoricTrainingVolume => {
  const groupedWorkouts = groupBy("label", workouts);

  let result: HistoricTrainingVolume = {};

  for (const key in groupedWorkouts) {
    result[key] = calculateTrainingVolume(groupedWorkouts[key]);
  }

  return result;
};
