import { useQuery } from "@tanstack/react-query";

import { Days, WorkoutGetRequest, WorkoutGetResponse } from "@/types";
import { errorNotification } from "@/lib/notification";

const fetchData = async ({
  type,
}: WorkoutGetRequest): Promise<WorkoutGetResponse> => {
  const res = await fetch(`/api/workout?type=${type}`, {
    method: "GET",
    mode: "same-origin",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "Accept-Content": "application/json",
    },
  });
  const data = await res.json();

  return data as WorkoutGetResponse;
};

export const useGetWorkouts = (type: Days) =>
  useQuery({
    queryKey: ["workouts", type],
    queryFn: (): ReturnType<typeof fetchData> => fetchData({ type }),
    refetchOnWindowFocus: false,
  });
