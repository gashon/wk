import { useMutation } from "@tanstack/react-query";

import {
  Days,
  Workout,
  WorkoutPostRequest,
  WorkoutPostResponse,
} from "@/types";
import { errorNotification, successNotification } from "@/lib/notification";
import { queryClient } from "@/lib/react-query";

const fetchMutation = async (
  payload: WorkoutPostRequest,
): Promise<WorkoutPostResponse> => {
  const res = await fetch("/api/workout", {
    method: "POST",
    mode: "same-origin",
    credentials: "include",
    keepalive: true,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  return data;
};

export const useCreateWorkout = (type: Days) =>
  useMutation({
    mutationKey: ["workout"],
    mutationFn: fetchMutation,
    onSuccess: (res) => {
      const prev: { data: Workout[] } | undefined = queryClient.getQueryData([
        "workouts",
        type,
      ]);

      queryClient.setQueryData(["workouts", type], {
        data: [res.data, ...(prev?.data ?? [])],
      });
      successNotification("Created");
    },
    onError: () => errorNotification("Failed"),
  });
