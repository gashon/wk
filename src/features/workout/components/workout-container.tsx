import { FC, useState } from "react";

import { WorkoutForm } from ".";
import { Days } from "@/types";

export const WorkoutContainer: FC = () => {
  // TODO(gashon) predict day based on prior day
  const [type, setType] = useState<Days>(Days.PUSH);

  return <WorkoutForm type={type} />;
};
