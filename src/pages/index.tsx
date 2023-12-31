import { Inter } from "next/font/google";
import Link from "next/link";

import { WorkoutContainer } from "@/features/workout";
import { PageLayout } from "@/layouts";
import { Footer } from "@/components/ui/footer";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <PageLayout title={"wk logs"}>
      <WorkoutContainer />
      <Footer bodyWeightLink trendsLink />
    </PageLayout>
  );
}
