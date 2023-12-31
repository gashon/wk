import { useMutation } from "@tanstack/react-query";

import { BodyWeight, WeightPostRequest, WeightPostResponse } from "@/types";
import { errorNotification, successNotification } from "@/lib/notification";
import { queryClient } from "@/lib/react-query";

const fetchMutation = async (
  payload: WeightPostRequest,
): Promise<WeightPostResponse> => {
  const res = await fetch("/api/weight", {
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

export const useCreateWeight = () =>
  useMutation({
    mutationKey: ["body-weight-mutation"],
    mutationFn: fetchMutation,
    onSuccess: (res) => {
      const prev: { data: BodyWeight[] } | undefined = queryClient.getQueryData(
        ["weights"],
      );

      queryClient.setQueryData(["body-weight"], {
        data: [res.data, ...(prev?.data ?? [])],
      });
      successNotification("Created");
    },
    onError: () => errorNotification("Failed"),
  });
