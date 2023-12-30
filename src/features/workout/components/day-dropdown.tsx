import { FC, useContext } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DayContext } from "..";
import { Days, WorkoutLabels } from "@/types";

export const DayDropDownMenu: FC = () => {
  const { type, setType } = useContext(DayContext);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{type}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="opacity-100 bg-white w-full">
        <DropdownMenuLabel>Day Selection</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={type}
          onValueChange={(val) => setType(val as Days)}
        >
          {Object.keys(WorkoutLabels).map((label) => (
            <DropdownMenuRadioItem key={`workout:label:${label}`} value={label}>
              {label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
