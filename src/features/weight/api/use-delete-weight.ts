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

export const useDeleteWeight = () =>
  useMutation({
    mutationKey: ["weight", "delete"],
    mutationFn: fetchMutation,
    onSuccess: (_, resId) => {
      const prev: { data: BodyWeight[] } | undefined = queryClient.getQueryData(
        ["body-weight"],
      );

      queryClient.setQueryData(["body-weight"], {
        data: (prev?.data ?? []).filter(({ id }) => id !== resId),
      });
      console.log("deleted", resId);
      successNotification("Deleted");
    },
    onError: () => errorNotification("Failed"),
  });
