import { useQuery } from "@tanstack/react-query";

import { WeightGetRequest, WeightGetResponse } from "@/types";
import { errorNotification } from "@/lib/notification";
import { getEndOfDay, getStartOfDay } from "@/util/date";

const fetchData = async ({
  start_timestamp,
  end_timestamp,
}: WeightGetRequest): Promise<WeightGetResponse> => {
  const url = new URL("/api/weight", window.location.origin);
  const params = new URLSearchParams({});

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

  return data as WeightGetResponse;
};

export const useGetWeights = ({
  startRange,
  endRange,
}: {
  startRange?: string;
  endRange?: string;
}) =>
  useQuery({
    queryKey: ["body-weight", startRange, endRange],
    queryFn: (): ReturnType<typeof fetchData> => {
      return fetchData({
        start_timestamp: startRange
          ? getStartOfDay(new Date(startRange)).getTime().toString()
          : undefined,
        end_timestamp: endRange
          ? getEndOfDay(new Date(endRange)).getTime().toString()
          : undefined,
      });
    },
    refetchOnWindowFocus: false,
  });
