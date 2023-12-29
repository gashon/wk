import { FC, useState } from "react";

import { WorkoutForm, WorkoutList } from ".";
import { Days } from "@/types";

export const WorkoutContainer: FC = () => {
  // TODO(gashon) predict day based on prior day
  const [type, setType] = useState<Days>(Days.PUSH);

  return (
    <div>
      <WorkoutForm type={type} />
      <WorkoutList type={type} />
    </div>
  );
};
