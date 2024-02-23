import { Inter } from "next/font/google";
import Link from "next/link";

import { WorkoutContainer } from "@/features/workout";
import { PageLayout } from "@/layouts";
import { Footer } from "@/components/ui/footer";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  console.log(
    "[run]",
    `console.log(\`https://wk.ghussein.org/api/login?token=\`)`,
  );
  return (
    <PageLayout title={"wk logs"}>
      <WorkoutContainer />
      <Footer bodyWeightLink trendsLink />
    </PageLayout>
  );
}
