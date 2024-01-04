import { warningNotification } from "@/lib/notification";
import { useState, useEffect, useCallback } from "react";

const RESET_DURATION_IN_MILLISECONDS = 5000;

export enum DeletionConfirmationStage {
  Unconfirmed,
  Confirmed,
}

export const useDeletionConfirmation = () => {
  const [deletionConfirmation, setDeletionConfirmation] =
    useState<DeletionConfirmationStage>(DeletionConfirmationStage.Unconfirmed);

  const attemptDeletion = useCallback(
    (callback: () => void) => {
      if (deletionConfirmation === DeletionConfirmationStage.Confirmed) {
        callback();
        return;
      }

      warningNotification("Click again to delete");
      setDeletionConfirmation(DeletionConfirmationStage.Confirmed);
    },
    [deletionConfirmation],
  );

  useEffect(() => {
    // if recently confirmed, set timer to reset
    if (deletionConfirmation === DeletionConfirmationStage.Confirmed) {
      setTimeout(() => {
        setDeletionConfirmation(DeletionConfirmationStage.Unconfirmed);
      }, RESET_DURATION_IN_MILLISECONDS);
    }
  }, [deletionConfirmation]);

  return { attemptDeletion, deletionConfirmation };
};
