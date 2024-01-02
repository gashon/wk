import { successNotification } from "@/lib/notification";
import { FC, PropsWithChildren } from "react";

import { Toaster, toast } from "sonner";
type Props = PropsWithChildren<{
  title: string;
}>;

export const PageLayout: FC<Props> = ({ title, children }) => (
  <main className="relative w-full h-full flex justify-center py-10">
    <div className="w-11/12 lg:w-3/4">
      <h1 className="text-2xl">{title}</h1>
      {children}
    </div>
  </main>
);
