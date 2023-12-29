import { useMutation } from "@tanstack/react-query";

import { WorkoutPostRequest } from "@/types";
import { errorNotification, successNotification } from "@/lib/notification";

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

export const useCreateWorkout = () =>
  useMutation({
    mutationKey: ["workout"],
    mutationFn: fetchMutation,
    onSuccess: () => successNotification("Created"),
    onError: () => errorNotification("Failed"),
  });
