import { useQuery } from "@tanstack/react-query";

import { WeightGetRequest, WeightGetResponse } from "@/types";
import { errorNotification } from "@/lib/notification";

const fetchData = async ({}: WeightGetRequest): Promise<WeightGetResponse> => {
  const url = new URL("/api/weight", window.location.origin);
  const params = new URLSearchParams({});

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

export const useGetWeights = () =>
  useQuery({
    queryKey: ["body-weight"],
    queryFn: (): ReturnType<typeof fetchData> => fetchData({}),
    refetchOnWindowFocus: false,
  });
