import { useQuery } from "@tanstack/react-query";

import { Days, WorkoutGetRequest, WorkoutGetResponse } from "@/types";
import { errorNotification } from "@/lib/notification";

const fetchData = async ({
  type,
  start_timestamp,
  end_timestamp,
}: WorkoutGetRequest): Promise<WorkoutGetResponse> => {
  const url = new URL("/api/workout", window.location.origin);
  const params = new URLSearchParams({ type });

  if (start_timestamp !== undefined) {
    params.append("start_timestamp", start_timestamp);
  }
  if (end_timestamp !== undefined) {
    params.append("end_timestamp", end_timestamp);
  }

  url.search = params.toString();

  const res = await fetch(url.toString(), {
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

export const useGetWorkouts = ({
  type,
  startRange,
  endRange,
}: {
  type: Days;
  startRange?: number;
  endRange?: number;
}) =>
  useQuery({
    queryKey: ["workouts", type, startRange, endRange],
    queryFn: (): ReturnType<typeof fetchData> =>
      fetchData({
        start_timestamp: startRange?.toString(),
        end_timestamp: endRange?.toString(),
        type,
      }),
    refetchOnWindowFocus: false,
  });
