import { useMutation } from "@tanstack/react-query";

import { Days, Workout, WorkoutDeleteRequest } from "@/types";
import { errorNotification, successNotification } from "@/lib/notification";
import { queryClient } from "@/lib/react-query";

const fetchMutation = async (id: WorkoutDeleteRequest["id"]) => {
  fetch(`/api/workout?id=${id}`, {
    method: "DELETE",
    mode: "same-origin",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const useDeleteWorkout = (type: Days) =>
  useMutation({
    mutationKey: ["workout", "delete", type],
    mutationFn: fetchMutation,
    onSuccess: (_, resId) => {
      const prev: { data: Workout[] } | undefined = queryClient.getQueryData([
        "workouts",
        type,
      ]);

      queryClient.setQueryData(["workouts", type], {
        data: (prev?.data ?? []).filter(({ id }) => id !== resId),
      });
      successNotification("Deleted");
    },
    onError: () => errorNotification("Failed"),
  });
