import { FC, PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  title: string;
}>;

export const PageLayout: FC<Props> = ({ title, children }) => (
  <main className="w-full h-full flex justify-center py-10">
    <div className="w-11/12 lg:w-3/4">
      <h1 className="text-2xl">{title}</h1>
      {children}
    </div>
  </main>
);
