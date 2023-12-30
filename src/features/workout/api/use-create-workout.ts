import { useMutation } from "@tanstack/react-query";

import { Days, Workout, WorkoutPostRequest } from "@/types";
import { errorNotification, successNotification } from "@/lib/notification";
import { queryClient } from "@/lib/react-query";

const fetchMutation = async (payload: WorkoutPostRequest) => {
  fetch("/api/workout", {
    method: "POST",
    mode: "same-origin",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
};

export const useCreateWorkout = (type: Days) =>
  useMutation({
    mutationKey: ["workout"],
    mutationFn: fetchMutation,
    onSuccess: (_, res) => {
      const prev: { data: Workout[] } | undefined = queryClient.getQueryData([
        "workouts",
        type,
      ]);

      queryClient.setQueryData(["workouts", type], {
        data: [res, ...(prev?.data ?? [])],
      });
      successNotification("Created");
    },
    onError: () => errorNotification("Failed"),
  });
