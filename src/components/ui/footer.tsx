import { FC } from "react";
import Link from "next/link";

type Props = {
  wkLink?: boolean;
  bodyWeightLink?: boolean;
  trendsLink?: boolean;
};

export const Footer: FC<Props> = ({ wkLink, bodyWeightLink, trendsLink }) => (
  <footer className="fixed bottom-5 right-5 opacity-60">
    <div className="flex gap-5 underline text-sm">
      {wkLink && <Link href="/">wk</Link>}

      {bodyWeightLink && <Link href="/weight">body-weight</Link>}

      {trendsLink && <Link href="/trends">trends</Link>}
    </div>
  </footer>
);
