import { useMutation } from "@tanstack/react-query";

import { BodyWeight, WeightDeleteRequest } from "@/types";
import { errorNotification, successNotification } from "@/lib/notification";
import { queryClient } from "@/lib/react-query";

const fetchMutation = async (id: WeightDeleteRequest["id"]) => {
  fetch(`/api/weight?id=${id}`, {
    method: "DELETE",
    mode: "same-origin",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const useDeleteWeight = ({
  startRange,
  endRange,
}: {
  startRange?: string;
  endRange?: string;
}) =>
  useMutation({
    mutationKey: ["weight", "delete", startRange, endRange],
    mutationFn: fetchMutation,
    onSuccess: (_, resId) => {
      const prev: { data: BodyWeight[] } | undefined = queryClient.getQueryData(
        ["body-weight", startRange, endRange],
      );

      queryClient.setQueryData(["body-weight", startRange, endRange], {
        data: (prev?.data ?? []).filter(({ id }) => id !== resId),
      });
      successNotification("Deleted");
    },
    onError: () => errorNotification("Failed"),
  });
